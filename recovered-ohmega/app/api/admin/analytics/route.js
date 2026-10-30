import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "../../../../lib/admin-auth";
import { periodStart, validZone } from "../../../../lib/visit-model.mjs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PROJECT_ID = "prj_hmKkukNq47FmaXfUpmwUXh3WVaXs";
const TEAM_ID = "team_fE9xyZGsmU8cn68geLgHLvV5";
const API = "https://api.vercel.com/v1/query/web-analytics/visits";

function authOk(request) {
  return verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value);
}

function range(days, zone) {
  const until = new Date();
  const since = new Date(periodStart(days, zone, until.getTime()));
  return { since: since.toISOString(), until: until.toISOString() };
}

async function vercelQuery(mode, params) {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  if (!token) throw new Error("VERCEL_ANALYTICS_TOKEN is missing.");

  const url = new URL(`${API}/${mode}`);
  url.searchParams.set("projectId", PROJECT_ID);
  url.searchParams.set("teamId", TEAM_ID);
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || data?.message || `Vercel Analytics API returned ${response.status}`;
    throw new Error(message);
  }
  return data;
}

async function countDays(days, zone) {
  const { since, until } = range(days, zone);
  const result = await vercelQuery("count", { since, until });
  return {
    days,
    pageviews: Number(result?.data?.pageviews || 0),
    visitors: Number(result?.data?.visitors || 0),
  };
}

async function aggregate(days, by, zone, limit = 12) {
  const { since, until } = range(days, zone);
  const result = await vercelQuery("aggregate", { since, until, by, limit });
  return Array.isArray(result?.data) ? result.data : [];
}

function labelCountry(code) {
  if (!code) return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(String(code).toUpperCase()) || code;
  } catch {
    return code;
  }
}

function normalize(rows, dimension) {
  return rows.map((row) => {
    const raw = row?.[dimension] ?? row?.value ?? row?.key ?? "Unknown";
    return {
      key: String(raw),
      name: dimension === "country" ? labelCountry(raw) : String(raw || "Direct / Unknown"),
      pageviews: Number(row?.pageviews ?? row?.count ?? 0),
      visitors: Number(row?.visitors ?? 0),
    };
  });
}

export async function GET(request) {
  if (!authOk(request)) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  if (!token) {
    return NextResponse.json({
      ok: false,
      authenticated: true,
      configured: false,
      error: "Analytics token is not available to this deployment yet.",
    }, { status: 503 });
  }

  const periodParam = Number(new URL(request.url).searchParams.get("days") || 30);
  const days = [1, 7, 30].includes(periodParam) ? periodParam : 30;
  const zone = validZone(new URL(request.url).searchParams.get("tz"));

  try {
    const [
      today,
      week,
      month,
      pages,
      referrers,
    ] = await Promise.all([
      countDays(1, zone),
      countDays(7, zone),
      countDays(30, zone),
      aggregate(days, "requestPath", zone, 15),
      aggregate(days, "referrerHostname", zone, 12),
    ]);

    return NextResponse.json({
      ok: true,
      authenticated: true,
      configured: true,
      generatedAt: new Date().toISOString(),
      periodDays: days,
      totals: { today, week, month },
      pages: normalize(pages, "requestPath"),
      referrers: normalize(referrers, "referrerHostname"),
    }, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      authenticated: true,
      configured: true,
      error: error?.message || "Unable to load analytics.",
    }, { status: 502 });
  }
}
