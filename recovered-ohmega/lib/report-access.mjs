import { randomUUID } from "node:crypto";
import { reports, reportUrl } from "../app/report-catalog.mjs";
import { makeVisit } from "./visit-model.mjs";

export async function serveReport(request, id, { sessionId, record = true, fetchImpl = fetch, schedule, store, log = console.warn } = {}) {
  const report = Object.hasOwn(reports,id)?reports[id]:null;
  const headers={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow"};
  if(!report)return new Response("Report not found",{status:404,headers});
  if(/prefetch|prerender/i.test(`${request.headers.get("purpose")} ${request.headers.get("sec-purpose")}`))return new Response(null,{status:204,headers});
  let upstream;
  try{upstream=await fetchImpl(reportUrl(report),{method:request.method==="HEAD"?"HEAD":"GET",redirect:"error",cache:"no-store",signal:AbortSignal.timeout(20000)});}
  catch{return new Response("Report temporarily unavailable",{status:502,headers});}
  if(!upstream.ok||request.method!=="HEAD"&&!upstream.body)return new Response("Report temporarily unavailable",{status:502,headers});
  Object.assign(headers,{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${report.file}"`,"X-Content-Type-Options":"nosniff"});
  if(request.method==="HEAD")return new Response(null,{headers});
  if(record){
    const visit=makeVisit({id:randomUUID(),sessionId:sessionId||randomUUID(),page:report.page,referrer:request.headers.get("referer")},request.headers,Date.now(),{allowBots:true});
    const event={...visit,kind:"download",reportId:id,file:report.file};
    schedule(async()=>{try{await store(event);}catch{log("Report request history write failed.");}});
  }
  return new Response(upstream.body,{headers});
}
