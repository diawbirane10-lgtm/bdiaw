import test from "node:test";
import assert from "node:assert/strict";
import { makeVisit, periodStart, validZone, groupVisits, visitPath, VISIT_PREFIX } from "../lib/visit-model.mjs";
import { storeVisit, readVisitHistory } from "../lib/visit-history.mjs";

const id="54274204-3264-4f6a-9b37-89cf60311d08", sessionId="9d363407-8eaf-460b-918f-82069409d162";
const now=Date.parse("2026-10-30T10:00:00Z");
const input={id,sessionId,page:"/projects/ufls-smartgrid",referrer:"https://google.com/search?q=private-query",city:"Fake city",occurredAt:"2000-01-01",ip:"private"};
const headers=new Headers({"user-agent":"Mozilla/5.0 Chrome/140.0 Safari/537.36","x-vercel-ip-country":"US","x-vercel-ip-city":"Seattle","x-vercel-ip-country-region":"WA","x-forwarded-for":"192.0.2.3"});

test("location and time are server sourced, and no IP/query/raw user agent is stored",()=>{
  const event=makeVisit(input,headers,now);
  assert.equal(event.country,"United States");assert.equal(event.city,"Seattle");assert.equal(event.occurredAt,"2026-10-30T10:00:00.000Z");assert.equal(event.referrer,"google.com");
  assert.doesNotMatch(JSON.stringify(event),/Fake city|2000-01-01|192\.0\.2\.3|private-query|Mozilla/);
  const unknown=makeVisit(input,new Headers(),now);assert.equal(unknown.city,null);assert.equal(unknown.country,null);
  assert.equal(makeVisit({...input,page:"/admin"},headers,now),null);
  assert.equal(makeVisit({...input,id:"../attack"},headers,now),null);
  assert.equal(makeVisit(input,new Headers({"user-agent":"Googlebot"}),now),null);
});

test("today follows the selected zone, including US daylight saving boundaries",()=>{
  // Casablanca's future offset depends on the runtime's IANA data; assert local midnight, not a fixed UTC offset.
  const localParts=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date(periodStart(1,"Africa/Casablanca",now)));
  assert.equal(localParts,"00:00");
  assert.equal(new Date(periodStart(1,"America/New_York",Date.parse("2026-11-01T15:00:00Z"))).toISOString(),"2026-11-01T04:00:00.000Z");
  assert.equal(new Date(periodStart(1,"America/New_York",Date.parse("2026-11-02T15:00:00Z"))).toISOString(),"2026-11-02T05:00:00.000Z");
  assert.equal(periodStart(0,"UTC",now),0);assert.equal(validZone("invalid"),"Africa/Casablanca");
});

test("session grouping deduplicates navigation events and merges older pages loaded later",()=>{
  const a=makeVisit(input,headers,now);
  const b={...a,id:"8a08506c-8ed8-4081-93c6-c31b854d2c3b",page:"/",occurredAt:"2026-10-30T09:55:00.000Z"};
  const other={...a,id:"ddc01f78-edb9-4d54-95ea-a6138d8314fb",sessionId:"944d3620-bd66-4744-8a7d-75c5a289b049",occurredAt:"2026-10-30T10:02:00.000Z"};
  const groups=groupVisits([b,a,a,other]);assert.equal(groups.length,2);assert.equal(groups[1].events.length,2);assert.equal(groups[1].pages.length,2);assert.equal(groups[1].firstSeen,b.occurredAt);assert.equal(groups[0].lastSeen,other.occurredAt);
});

test("private immutable writes, reverse timestamp ordering and period-aware pagination",async()=>{
  const event=makeVisit(input,headers,now);
  await storeVisit(event,{put:async(path,raw,options)=>{assert.equal(path,visitPath(event));assert.equal(JSON.parse(raw).city,"Seattle");assert.equal(options.access,"private");assert.equal(options.allowOverwrite,false);}});
  const older={...event,occurredAt:"2026-10-29T10:00:00.000Z"};assert.ok(visitPath(event)<visitPath(older));
  const result=await readVisitHistory({since:now-1000,cursor:"page-1"},{list:async options=>{assert.equal(options.prefix,VISIT_PREFIX);assert.equal(options.cursor,"page-1");return{blobs:[{pathname:visitPath(event)},{pathname:visitPath(older)}],hasMore:true,cursor:"page-2"};},get:async(path,options)=>{assert.equal(options.access,"private");assert.equal(path,visitPath(event));return{statusCode:200,stream:new Response(JSON.stringify(event)).body};}});
  assert.equal(result.events.length,1);assert.equal(result.nextCursor,null);
  const missing=await readVisitHistory({},{list:async()=>({blobs:[{pathname:visitPath(event)}],hasMore:true,cursor:"next"}),get:async()=>null});assert.equal(missing.partial,true);assert.equal(missing.nextCursor,"next");
});

test("admin sessions fail closed when no server secret is configured",async()=>{
  const old=process.env.VERCEL_ANALYTICS_TOKEN, oldSecret=process.env.ADMIN_SESSION_SECRET;
  delete process.env.VERCEL_ANALYTICS_TOKEN;delete process.env.ADMIN_SESSION_SECRET;
  try { const {verifySessionValue,createSessionValue}=await import("../lib/admin-auth.js");assert.equal(verifySessionValue("123.fake"),false);assert.throws(createSessionValue,/not configured/); }
  finally { if(old===undefined)delete process.env.VERCEL_ANALYTICS_TOKEN;else process.env.VERCEL_ANALYTICS_TOKEN=old;if(oldSecret===undefined)delete process.env.ADMIN_SESSION_SECRET;else process.env.ADMIN_SESSION_SECRET=oldSecret; }
});
