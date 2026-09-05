import crypto from "node:crypto";

export const ADMIN_COOKIE = "ohmega_admin";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  return process.env.VERCEL_ANALYTICS_TOKEN || "ohmega-admin-session";
}

export function passwordMatches(password) {
  const expected = "6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6";
  const actual = crypto.createHash("sha256").update(String(password || "")).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export function createSessionValue() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `admin:${issuedAt}`;
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${issuedAt}.${sig}`;
}

export function verifySessionValue(value) {
  if (!value || !value.includes(".")) return false;
  const [issuedRaw, sig] = value.split(".");
  const issuedAt = Number(issuedRaw);
  if (!Number.isFinite(issuedAt)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (issuedAt > now + 60 || now - issuedAt > MAX_AGE) return false;
  const payload = `admin:${issuedAt}`;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export const ADMIN_MAX_AGE = MAX_AGE;
