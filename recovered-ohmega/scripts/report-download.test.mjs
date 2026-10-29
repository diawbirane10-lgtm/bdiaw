import test from "node:test";
import assert from "node:assert/strict";
import { serveReport, sendDownloadAlert } from "../lib/report-download.mjs";
import { reports, reportUrl, reportDownloadHref } from "../app/report-catalog.mjs";

test("unknown report IDs cannot fetch arbitrary URLs or send email", async () => {
  for (const id of ["https://example.com", "../admin", "__proto__", "constructor", "unknown"]) {
    const response = await serveReport(new Request("https://b-diaw.com/api/reports/unknown"), id, {
      fetchImpl: () => assert.fail("No outgoing request allowed"),
      schedule: () => assert.fail("No notification allowed"),
    });
    assert.equal(response.status, 404);
  }
});

test("failed upstream, HEAD and prefetch never generate alerts", async () => {
  for (const [init, status] of [[{}, 502], [{ method: "HEAD" }, 200], [{ headers: { purpose: "prefetch" } }, 204]]) {
    const response = await serveReport(new Request("https://b-diaw.com/api/reports/battery", init), "battery", {
      fetchImpl: async () => new Response(null, { status: init.method === "HEAD" ? 200 : 404 }),
      schedule: () => assert.fail("No notification allowed"),
    });
    assert.equal(response.status, status);
  }
});

test("PDF bytes reach the visitor even when the email provider fails", async () => {
  let task, logged = false;
  const response = await serveReport(new Request("https://b-diaw.com/api/reports/battery"), "battery", {
    fetchImpl: async url => {
      assert.equal(url, reportUrl(reports.battery));
      return new Response("%PDF-test", { headers: { "Content-Type": "application/pdf" } });
    },
    schedule: callback => { task = callback; },
    notify: async () => { throw new Error("Provider down"); },
    log: () => { logged = true; },
  });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "%PDF-test");
  assert.match(response.headers.get("Content-Disposition"), /attachment; filename="Rapport_Digital_Twin_LiIon.pdf"/);
  assert.match(response.headers.get("Cache-Control"), /no-store/);
  await task();
  assert.equal(logged, true);
});

test("missing sender configuration never calls the email API", async () => {
  assert.equal(await sendDownloadAlert("battery", new Request("https://b-diaw.com"), {
    env: {}, fetchImpl: () => assert.fail("No email credentials"),
  }), "unconfigured");
});

test("repeat requests have a stable email payload and idempotency key, without visitor details", async () => {
  const sent = [];
  const request = new Request("https://b-diaw.com/api/reports/battery", { headers: { "x-vercel-forwarded-for": "192.0.2.45", "user-agent": "private-test-agent" } });
  const options = {
    env: { RESEND_API_KEY: "test-only", DOWNLOAD_ALERT_FROM: "alerts@example.com" },
    now: 1793304000123,
    fetchImpl: async (url, init) => { sent.push({ url, ...init }); return new Response("{}", { status: 200 }); },
  };
  await sendDownloadAlert("battery", request, options);
  await sendDownloadAlert("battery", request, { ...options, now: options.now + 1000 });
  assert.equal(sent[0].url, "https://api.resend.com/emails");
  assert.equal(sent[0].headers["Idempotency-Key"], sent[1].headers["Idempotency-Key"]);
  assert.equal(sent[0].body, sent[1].body);
  assert.deepEqual(JSON.parse(sent[0].body).to, ["diawbirane10@gmail.com"]);
  assert.doesNotMatch(sent[0].body, /192\.0\.2\.45|private-test-agent/);
  await assert.rejects(sendDownloadAlert("battery", request, { ...options, fetchImpl: async () => new Response(null, { status: 429 }) }), /429/);
});

test("only the seven exact existing report links are routed through downloads", () => {
  for (const [id, report] of Object.entries(reports)) assert.equal(reportDownloadHref(reportUrl(report)), `/api/reports/${id}`);
  assert.equal(reportDownloadHref("https://example.com/report.pdf"), "https://example.com/report.pdf");
  assert.equal(reportDownloadHref("mailto:diawbirane10@gmail.com"), "mailto:diawbirane10@gmail.com");
});
