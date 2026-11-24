import {randomUUID} from "node:crypto";
import {put} from "@vercel/blob";
import {ADMIN_COOKIE,verifySessionValue} from "../../../lib/admin-auth";
import {sameOrigin} from "../../../lib/privacy.mjs";
import {historyConfigured} from "../../../lib/visit-history.mjs";
import {AUDIENCE_OPTOUT,audienceAllowed,audiencePath,countryCode} from "../../../lib/audience-model.mjs";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function POST(request){
 const headers={"Cache-Control":"no-store"};
 if(!sameOrigin(request))return new Response(null,{status:403,headers});
 if(process.env.VERCEL_ENV!=="production"||verifySessionValue(request.cookies.get(ADMIN_COOKIE)?.value)||!audienceAllowed(request.headers,request.cookies.get(AUDIENCE_OPTOUT)?.value))return new Response(null,{status:204,headers});
 if(!historyConfigured())return new Response(null,{status:503,headers});
 try{
  await put(audiencePath(Date.now(),countryCode(request.headers),randomUUID()),"{}",{access:"private",contentType:"application/json",addRandomSuffix:false,allowOverwrite:false});
  return new Response(null,{status:204,headers});
 }catch{console.warn("Basic audience count write failed.");return new Response(null,{status:503,headers});}
}
