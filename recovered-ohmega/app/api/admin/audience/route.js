import {list} from "@vercel/blob";
import {NextResponse} from "next/server";
import {ADMIN_COOKIE,verifySessionValue} from "../../../../lib/admin-auth";
import {historyConfigured} from "../../../../lib/visit-history.mjs";
import {periodStart,validZone} from "../../../../lib/visit-model.mjs";
import {AUDIENCE_PREFIX,parseAudiencePath,audienceLabel} from "../../../../lib/audience-model.mjs";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request){
 const headers={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow"};
 if(!verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value))return NextResponse.json({ok:false},{status:401,headers});
 if(!historyConfigured())return NextResponse.json({ok:false},{status:503,headers});
 const p=new URL(request.url).searchParams,v=Number(p.get("days")??7),days=[0,1,7,30].includes(v)?v:7;
 const since=periodStart(days,validZone(p.get("tz"))),counts=new Map();let total=0,cursor,scanned=0,complete=true;
 try{
  do{
   const result=await list({prefix:AUDIENCE_PREFIX,limit:1000,cursor});let older=false;
   for(const b of result.blobs){const e=parseAudiencePath(b.pathname);if(!e)continue;if(e.hour<since){older=true;continue;}total++;counts.set(e.country,(counts.get(e.country)||0)+1);}
   scanned+=result.blobs.length;cursor=!older&&result.hasMore?result.cursor:null;
   if(cursor&&scanned>=10000){complete=false;break;}
  }while(cursor);
  return NextResponse.json({ok:true,total,complete,countries:[...counts].map(([key,pageviews])=>({key,name:audienceLabel(key),pageviews})).sort((a,b)=>b.pageviews-a.pageviews)},{headers});
 }catch{console.warn("Basic audience summary read failed.");return NextResponse.json({ok:false},{status:503,headers});}
}
