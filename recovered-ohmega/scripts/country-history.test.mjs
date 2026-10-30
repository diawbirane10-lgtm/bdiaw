import test from "node:test";
import assert from "node:assert/strict";
import { ALL_COUNTRIES, countryOptions, matchesCountry } from "../lib/countries.mjs";
import { makeVisit, visitPath } from "../lib/visit-model.mjs";
import { readVisitHistory } from "../lib/visit-history.mjs";

test("countries remain selectable with no traffic, and collection accepts worldwide geography",()=>{
  assert.equal(ALL_COUNTRIES.length,249);
  assert.equal(countryOptions([]).find(x=>x.code==="FR").name,"France");
  assert.equal(countryOptions([{countryCode:"US"},{countryCode:"MA"}]).length,249);
  assert.ok(countryOptions([{countryCode:"XK"}]).some(x=>x.code==="XK"));
  for(const code of ["FR","SN","JP","BR","ZA","AU"]){
    const event=makeVisit({id:"54274204-3264-4f6a-9b37-89cf60311d08",sessionId:"9d363407-8eaf-460b-918f-82069409d162",page:"/"},new Headers({"x-vercel-ip-country":code}));
    assert.equal(event.countryCode,code);
    assert.ok(matchesCountry(event,code));
  }
  assert.ok(matchesCountry({country:"France"},"FR"));
  assert.ok(matchesCountry({country:null,countryCode:null},"unknown"));
});

test("France is found beyond an initial page containing only US and Morocco records",async()=>{
  const events=[{id:"us",sessionId:"us",countryCode:"US",occurredAt:"2026-10-30T12:00:00Z"},{id:"ma",sessionId:"ma",countryCode:"MA",occurredAt:"2026-10-30T11:00:00Z"},{id:"fr",sessionId:"fr",countryCode:"FR",occurredAt:"2026-10-30T10:00:00Z"}];
  const calls=[];
  const result=await readVisitHistory({country:"FR"},{
    list:async ({cursor})=>{calls.push(cursor);return cursor?{blobs:[{pathname:visitPath(events[2])}],hasMore:false}:{blobs:events.slice(0,2).map(event=>({pathname:visitPath(event)})),hasMore:true,cursor:"older"};},
    get:async path=>({statusCode:200,stream:new Response(JSON.stringify(events.find(event=>visitPath(event)===path))).body}),
  });
  assert.deepEqual(calls,[undefined,"older"]);
  assert.deepEqual(result.events.map(event=>event.id),["fr"]);
  assert.equal(result.nextCursor,null);
});

test("bounded country searches retain a continuation cursor without inventing visits",async()=>{
  let count=0;
  const event={id:"us",sessionId:"us",countryCode:"US",occurredAt:"2026-10-30T12:00:00Z"};
  const result=await readVisitHistory({country:"FR"},{list:async()=>({blobs:[{pathname:visitPath(event)}],hasMore:true,cursor:`next-${++count}`}),get:async()=>({statusCode:200,stream:new Response(JSON.stringify(event)).body})});
  assert.equal(count,5);assert.deepEqual(result.events,[]);assert.equal(result.nextCursor,"next-5");
});
