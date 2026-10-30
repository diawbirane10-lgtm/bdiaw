import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "../../../../lib/admin-auth";
import { periodStart, validZone } from "../../../../lib/visit-model.mjs";
import { historyConfigured, readVisitHistory } from "../../../../lib/visit-history.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
  if (!verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ ok: false }, { status: 401, headers });
  if (!historyConfigured()) return NextResponse.json({ ok: false, error: "Le journal des visites n’est pas connecté." }, { status: 503, headers });
  const params = new URL(request.url).searchParams;
  const value = Number(params.get("days") ?? 7);
  const days = [0, 1, 7, 30].includes(value) ? value : 7;
  const zone = validZone(params.get("tz"));
  const cursor = params.get("cursor") || undefined;
  if (cursor && cursor.length > 4096) return NextResponse.json({ ok: false }, { status: 400, headers });
  try {
    return NextResponse.json({ ok: true, generatedAt: new Date().toISOString(), ...await readVisitHistory({ since: periodStart(days, zone), cursor }) }, { headers });
  } catch {
    console.warn("Visit history read failed.");
    return NextResponse.json({ ok: false, error: "Le journal est temporairement indisponible. Réessayez dans un instant." }, { status: 503, headers });
  }
}
