import { NextResponse } from "next/server";
import { CONSENT_COOKIE,CONSENT_AGE,sameOrigin } from "../../../lib/privacy.mjs";
import { VISITOR_COOKIE } from "../../../lib/visitor-session.mjs";
export async function POST(request){
  if(!sameOrigin(request))return new Response(null,{status:403});
  if(Number(request.headers.get("content-length")||0)>256)return new Response(null,{status:413});
  const raw=await request.text();if(raw.length>256)return new Response(null,{status:413});
  let body;try{body=JSON.parse(raw);}catch{return new Response(null,{status:400});}
  if(body?.choice!=="declined")return new Response(null,{status:400});
  const r=new NextResponse(null,{status:204,headers:{"Cache-Control":"no-store"}});
  // The client preference is authoritative; do not overwrite a newer choice during a delayed withdrawal response.
  r.cookies.set(VISITOR_COOKIE,"",{path:"/",sameSite:"lax",secure:true,httpOnly:true,maxAge:0});
  return r;
}
