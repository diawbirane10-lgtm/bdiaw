import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "../../../../lib/admin-auth";
import { downloadCounts, historyConfigured } from "../../../../lib/visit-history.mjs";
import { periodStart, validZone } from "../../../../lib/visit-model.mjs";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request){
  const headers={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow"};
  if(!verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value))return NextResponse.json({ok:false},{status:401,headers});
  if(!historyConfigured())return NextResponse.json({ok:false},{status:503,headers});
  const query=new URL(request.url).searchParams;const requested=Number(query.get("days")??7);const days=[0,1,7,30].includes(requested)?requested:7;
  try{return NextResponse.json({ok:true,...await downloadCounts(periodStart(days,validZone(query.get("tz"))))},{headers});}
  catch{console.warn("Download counts read failed.");return NextResponse.json({ok:false,error:"Les compteurs PDF sont temporairement indisponibles."},{status:503,headers});}
}
