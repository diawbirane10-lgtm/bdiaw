import crypto from "node:crypto";

export const ADMIN_COOKIE = "ohmega_admin";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  if(process.env.ADMIN_SESSION_SECRET)return process.env.ADMIN_SESSION_SECRET;
  const token=process.env.VERCEL_ANALYTICS_TOKEN;
  return token?crypto.createHmac("sha256",token).update("ohmega-admin-session-v2").digest():null;
}

export function passwordMatches(password) {
  const expected = process.env.ADMIN_PASSWORD_SHA256 || "6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6";
  if(!/^[0-9a-f]{64}$/i.test(expected))return false;
  const actual = crypto.createHash("sha256").update(String(password || "")).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected.toLowerCase()));
}

export function createSessionValue() {
  if (!secret()) throw new Error("Admin session secret is not configured.");
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `admin:${issuedAt}`;
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${issuedAt}.${sig}`;
}

export function verifySessionValue(value) {
  if (!secret()) return false;
  if (typeof value!=="string" || !/^\d{1,12}\.[a-f0-9]{64}$/.test(value)) return false;
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
