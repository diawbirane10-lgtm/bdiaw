export const VISIT_PREFIX = "visit-history/v1/";
export const HISTORY_PAGE_SIZE = 50;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const pages = new Set(["/", "/projects/ufls-smartgrid", "/projects/wave-energy-conversion", "/projects/railway-traction-25kv", "/projects/digital-twin-liion-battery", "/projects/digital-twin-electric-drive", "/research/grid-forming-vsm-hvdc-bess"]);
export const TIME_ZONES = ["Africa/Casablanca", "Africa/Dakar", "UTC", "Europe/Paris", "America/New_York"];

export function validZone(value) { return TIME_ZONES.includes(value) ? value : "Africa/Casablanca"; }

export function periodStart(days, zone, now = Date.now()) {
  if (days === 0) return 0;
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: validZone(zone), year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  const parts = value => Object.fromEntries(formatter.formatToParts(new Date(value)).filter(x => x.type !== "literal").map(x => [x.type, Number(x.value)]));
  const p = parts(now);
  const midnight = Date.UTC(p.year, p.month - 1, p.day - (days - 1));
  let utc = midnight;
  for (let i = 0; i < 3; i++) {
    const v = parts(utc);
    utc -= Date.UTC(v.year, v.month - 1, v.day, v.hour, v.minute, v.second) - midnight;
  }
  return utc;
}

function cleanHeader(headers, name, max = 100) {
  let value = headers.get(name) || "";
  try { value = decodeURIComponent(value); } catch { /* Keep readable input on malformed encoding. */ }
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, max) || null;
}

export function referrerHost(value) {
  try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.hostname.slice(0, 200) : null; } catch { return null; }
}

export function makeVisit(body, headers, now = Date.now(), { allowBots = false } = {}) {
  if (!body || !uuid.test(body.id || "") || !uuid.test(body.sessionId || "") || !pages.has(body.page)) return null;
  const ua = headers.get("user-agent") || "";
  const automated = /bot\b|crawler|spider|lighthouse|headless|preview|facebookexternalhit/i.test(ua);
  if (automated && !allowBots) return null;
  const code = cleanHeader(headers, "x-vercel-ip-country", 2)?.toUpperCase();
  const countryCode = /^[A-Z]{2}$/.test(code || "") ? code : null;
  let country = null;
  if (countryCode) { try { country = new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode); } catch { /* Unknown location. */ } }
  return {
    id: body.id, sessionId: body.sessionId, page: body.page, occurredAt: new Date(now).toISOString(), kind: "pageview", automated,
    countryCode, country, city: cleanHeader(headers, "x-vercel-ip-city"), region: cleanHeader(headers, "x-vercel-ip-country-region"),
    timeZone: cleanHeader(headers, "x-vercel-ip-timezone"),
    referrer: referrerHost(body.referrer),
    device: /ipad|tablet/i.test(ua) ? "Tablette" : /mobi|android|iphone/i.test(ua) ? "Mobile" : "Ordinateur",
    browser: /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Autre",
  };
}

export function visitPath(visit) {
  const type = visit.kind === "download" ? `download-${visit.reportId}-` : "";
  return `${VISIT_PREFIX}${String(9999999999999 - Date.parse(visit.occurredAt)).padStart(13, "0")}-${type}${visit.id}.json`;
}

export function groupVisits(events) {
  const groups = new Map();
  for (const event of [...events].sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt))) {
    const key = event.sessionId;
    if (!groups.has(key)) groups.set(key, { ...event, firstSeen: event.occurredAt, lastSeen: event.occurredAt, events: [], pages: [], downloads: [] });
    const visit = groups.get(key);
    if (visit.events.some(x => x.id === event.id)) continue;
    visit.events.push(event);
    if (event.kind === "download") visit.downloads.push(event);
    else if (!visit.pages.includes(event.page)) visit.pages.push(event.page);
    if (event.occurredAt < visit.firstSeen) visit.firstSeen = event.occurredAt;
    // Acquisition belongs to the earliest page loaded for a session.
    visit.referrer = event.referrer;
  }
  return [...groups.values()];
}
