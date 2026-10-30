import { after } from "next/server";
import { serveReport } from "../../../../lib/report-access.mjs";
import { storeVisit } from "../../../../lib/visit-history.mjs";
import { ADMIN_COOKIE, verifySessionValue } from "../../../../lib/admin-auth";
import { VISITOR_COOKIE, visitorSession } from "../../../../lib/visitor-session.mjs";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=60;
async function handle(request,context){
  const {report}=await context.params;
  return serveReport(request,report,{
    sessionId:visitorSession(request.cookies.get(VISITOR_COOKIE)?.value),
    record:process.env.VERCEL_ENV==="production"&&!verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value),
    schedule:after,store:storeVisit,
  });
}
export const GET=handle;
export const HEAD=handle;
