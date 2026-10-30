import { put, list, get } from "@vercel/blob";
import { VISIT_PREFIX, HISTORY_PAGE_SIZE, visitPath } from "./visit-model.mjs";

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
