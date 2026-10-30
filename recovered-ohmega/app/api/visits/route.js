import { NextResponse } from "next/server";
import { makeVisit } from "../../../lib/visit-model.mjs";
import { historyConfigured, storeVisit } from "../../../lib/visit-history.mjs";
import { ADMIN_COOKIE, verifySessionValue } from "../../../lib/admin-auth";
import { VISITOR_COOKIE } from "../../../lib/visitor-session.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const headers = { "Cache-Control": "no-store" };
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  if (!origin || origin !== url.origin || request.headers.get("sec-fetch-site") === "cross-site") return new Response(null, { status: 403, headers });
  if (verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value) || process.env.VERCEL_ENV !== "production") return new Response(null, { status: 204, headers });
  if (!historyConfigured()) return NextResponse.json({ ok: false }, { status: 503, headers });
  if (!request.headers.get("content-type")?.startsWith("application/json") || Number(request.headers.get("content-length") || 0) > 2048) return new Response(null, { status: 400, headers });
  const raw = await request.text();
  if (raw.length > 2048) return new Response(null, { status: 400, headers });
  let body;
  try { body = JSON.parse(raw); } catch { return new Response(null, { status: 400, headers }); }
  const event = makeVisit(body, request.headers);
  if (!event) return new Response(null, { status: 204, headers });
  try {
    await storeVisit(event);
    const response = new NextResponse(null, { status: 204, headers });
    response.cookies.set(VISITOR_COOKIE, event.sessionId, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 1800 });
    return response;
  } catch {
    console.warn("Visit history write failed.");
    return NextResponse.json({ ok: false }, { status: 503, headers });
  }
}
