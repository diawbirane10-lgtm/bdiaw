import test from "node:test";
import assert from "node:assert/strict";
import { serveReport } from "../lib/report-access.mjs";
import { downloadCounts } from "../lib/visit-history.mjs";
import { visitPath, groupVisits } from "../lib/visit-model.mjs";
import { reports, reportUrl, reportDownloadHref } from "../app/report-catalog.mjs";

const sid="9d363407-8eaf-460b-918f-82069409d162";
test("only known PDFs are served; HEAD, prefetch and upstream failure are never counted",async()=>{
  const fail=()=>assert.fail("No history record permitted");
  const options={schedule:fail,fetchImpl:async()=>new Response(null,{status:404})};
  assert.equal((await serveReport(new Request("https://b-diaw.com"),"__proto__",options)).status,404);
  assert.equal((await serveReport(new Request("https://b-diaw.com"),"battery",options)).status,502);
  assert.equal((await serveReport(new Request("https://b-diaw.com",{headers:{purpose:"prefetch"}}),"battery",options)).status,204);
  assert.equal((await serveReport(new Request("https://b-diaw.com",{method:"HEAD"}),"battery",{...options,fetchImpl:async()=>new Response(null,{status:200})})).status,200);
});

test("successful PDF request streams original bytes and records the report in the same navigation session",async()=>{
  let task,record;
  const response=await serveReport(new Request("https://b-diaw.com/api/reports/battery",{headers:{"user-agent":"Mozilla/5.0 Chrome/140.0","x-vercel-ip-country":"US","x-vercel-ip-city":"Seattle"}}),"battery",{
    sessionId:sid,fetchImpl:async url=>{assert.equal(url,reportUrl(reports.battery));return new Response("%PDF-original");},schedule:callback=>task=callback,store:async value=>record=value,
  });
  assert.equal(await response.text(),"%PDF-original");assert.match(response.headers.get("Content-Disposition"),/attachment/);await task();
  assert.equal(record.kind,"download");assert.equal(record.sessionId,sid);assert.equal(record.file,reports.battery.file);assert.equal(record.city,"Seattle");
  const sessions=groupVisits([{...record,id:"first",kind:"pageview"},record]);assert.equal(sessions.length,1);assert.equal(sessions[0].downloads.length,1);
});

test("storage failure never blocks a report and automated requests are labelled",async()=>{
  let task,warned=false;
  const response=await serveReport(new Request("https://b-diaw.com/api/reports/wave",{headers:{"user-agent":"HeadlessChrome"}}),"wave",{fetchImpl:async()=>new Response("%PDF-test"),schedule:callback=>task=callback,store:async value=>{assert.equal(value.automated,true);throw Error("Storage offline");},log:()=>warned=true});
  assert.equal(response.status,200);await task();assert.equal(warned,true);
});

test("PDF counters scan all metadata pages and respect timezone period boundaries",async()=>{
  const now=Date.parse("2026-10-30T12:00:00Z");const pageEvent={id:"test",occurredAt:new Date(now).toISOString()};
  const paths=[visitPath({...pageEvent,kind:"download",reportId:"battery"}),visitPath(pageEvent),visitPath({...pageEvent,kind:"download",reportId:"ufls-en"}),visitPath({...pageEvent,kind:"download",reportId:"battery",occurredAt:"2026-10-29T00:00:00Z"})];
  let calls=0;const result=await downloadCounts(now-1000,{list:async options=>{calls++;return options.cursor?{blobs:paths.slice(2).map(pathname=>({pathname})),hasMore:true,cursor:"never"}:{blobs:paths.slice(0,2).map(pathname=>({pathname})),hasMore:true,cursor:"next"};}});
  assert.equal(calls,2);assert.equal(result.total,2);assert.equal(result.reports.find(x=>x.id==="battery").count,1);assert.equal(result.complete,true);
  for(const [id,report] of Object.entries(reports))assert.equal(reportDownloadHref(reportUrl(report)),`/api/reports/${id}`);
});
