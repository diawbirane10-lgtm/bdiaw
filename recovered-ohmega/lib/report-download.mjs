import { createHmac } from "node:crypto";
import { reports, reportUrl } from "../app/report-catalog.mjs";

const noStore = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function sendDownloadAlert(id, request, { env = process.env, fetchImpl = fetch, now = Date.now() } = {}) {
  if (!env.RESEND_API_KEY || !env.DOWNLOAD_ALERT_FROM) return "unconfigured";
  // Suppress retries for a report/client within a minute, across server instances.
  // Neither the IP nor the user agent is included in the email or logged.
  const minute = Math.floor(now / 60000);
  const client = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || request.headers.get("user-agent") || "unknown";
  const digest = createHmac("sha256", env.RESEND_API_KEY).update(`${id}:${client}:${minute}`).digest("hex");
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `report-${digest}` },
    body: JSON.stringify({
      from: env.DOWNLOAD_ALERT_FROM,
      to: [env.DOWNLOAD_ALERT_TO || "diawbirane10@gmail.com"],
      subject: `[b-diaw.com] Report requested: ${reports[id].title}`,
      text: `Report: ${reports[id].title}\nFile: ${reports[id].file}\nUTC minute: ${new Date(minute * 60000).toISOString()}\n\nThe website accepted a report download request. This does not establish the visitor's identity or confirm that they saved or read the file. Repeat requests from the same client/report within a minute are grouped.`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return "accepted";
}

export async function serveReport(request, id, { fetchImpl = fetch, schedule, notify = sendDownloadAlert, log = console.warn } = {}) {
  const report = Object.hasOwn(reports, id) ? reports[id] : null;
  if (!report) return new Response("Report not found", { status: 404, headers: noStore });
  const purpose = `${request.headers.get("purpose") || ""} ${request.headers.get("sec-purpose") || ""}`;
  if (/prefetch|prerender/i.test(purpose)) return new Response(null, { status: 204, headers: noStore });

  let upstream;
  try {
    upstream = await fetchImpl(reportUrl(report), { method: request.method === "HEAD" ? "HEAD" : "GET", redirect: "error", cache: "no-store", signal: AbortSignal.timeout(20000) });
  } catch {
    return new Response("Report temporarily unavailable", { status: 502, headers: noStore });
  }
  if (!upstream.ok) return new Response("Report temporarily unavailable", { status: 502, headers: noStore });
  const headers = { ...noStore, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${report.file}"`, "X-Content-Type-Options": "nosniff" };
  if (request.method === "HEAD") return new Response(null, { headers });
  if (!upstream.body) return new Response("Report temporarily unavailable", { status: 502, headers: noStore });

  // Next.js after() keeps this alive after the response, without waiting for email.
  // An accepted request is observable; a completed save to disk is not.
  schedule(async () => {
    try {
      const result = await notify(id, request);
      if (result === "unconfigured") log("Download email alerts are not configured.");
    } catch {
      log("Download email alert failed; the report response was not blocked.");
    }
  });
  return new Response(upstream.body, { headers });
}
