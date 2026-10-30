import { put, list, get } from "@vercel/blob";
import { VISIT_PREFIX, HISTORY_PAGE_SIZE, visitPath } from "./visit-model.mjs";
import { reports } from "../app/report-catalog.mjs";

export function historyConfigured() { return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN); }

export async function storeVisit(visit, storage = { put }) {
  return storage.put(visitPath(visit), JSON.stringify(visit), {
    access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: false,
  });
}

export async function readVisitHistory({ since = 0, cursor } = {}, storage = { list, get }) {
  const result = await storage.list({ prefix: VISIT_PREFIX, limit: HISTORY_PAGE_SIZE, cursor: cursor || undefined });
  // Bounded concurrency; each event is immutable so simultaneous page views never overwrite one another.
  const events = [];
  let missing = 0;
  for (let i = 0; i < result.blobs.length; i += 8) {
    const batch = await Promise.all(result.blobs.slice(i, i + 8).map(async blob => {
      const timestamp = 9999999999999 - Number(blob.pathname.slice(VISIT_PREFIX.length, VISIT_PREFIX.length + 13));
      if (!Number.isFinite(timestamp) || timestamp < since) return null;
      const item = await storage.get(blob.pathname, { access: "private", useCache: false });
      if (!item || item.statusCode !== 200) { missing++; return null; }
      const event = await new Response(item.stream).json();
      return event && typeof event.id === "string" && typeof event.sessionId === "string" && Number.isFinite(Date.parse(event.occurredAt)) ? event : null;
    }));
    events.push(...batch.filter(Boolean));
  }
  const oldest = result.blobs.at(-1);
  const oldestTime = oldest ? 9999999999999 - Number(oldest.pathname.slice(VISIT_PREFIX.length, VISIT_PREFIX.length + 13)) : 0;
  const hasMore = Boolean(result.hasMore && oldestTime >= since);
  return { events: events.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)), nextCursor: hasMore ? result.cursor : null, partial: missing > 0 };
}

export async function downloadCounts(since=0,storage={list}){
  const counts=Object.fromEntries(Object.keys(reports).map(id=>[id,0]));
  let cursor,complete=true,scanned=0;
  do{
    const result=await storage.list({prefix:VISIT_PREFIX,limit:1000,cursor});
    let reachedPeriodEnd=false;
    for(const blob of result.blobs){
      const suffix=blob.pathname.slice(VISIT_PREFIX.length);
      const timestamp=9999999999999-Number(suffix.slice(0,13));
      if(!Number.isFinite(timestamp)||timestamp<since){reachedPeriodEnd=true;continue;}
      for(const id of Object.keys(reports))if(suffix.startsWith(`${suffix.slice(0,13)}-download-${id}-`))counts[id]++;
    }
    scanned+=result.blobs.length;
    cursor=!reachedPeriodEnd&&result.hasMore?result.cursor:null;
    if(cursor&&scanned>=10000){complete=false;break;}
  }while(cursor);
  return {reports:Object.entries(reports).map(([id,report])=>({id,...report,count:counts[id]})),total:Object.values(counts).reduce((sum,value)=>sum+value,0),complete};
}
