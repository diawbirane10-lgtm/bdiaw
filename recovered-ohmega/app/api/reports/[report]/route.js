import { after } from "next/server";
import { serveReport } from "../../../../lib/report-download.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(request, context) {
  const { report } = await context.params;
  return serveReport(request, report, { schedule: after });
}

export const GET = handle;
export const HEAD = handle;
