import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { attribution, trafficSignal } from "../_shared/analytics-classify.mjs";

const origins = new Set(["https://b-diaw.com","https://www.b-diaw.com"]);
const extra = Deno.env.get("ANALYTICS_TEST_ORIGIN"); if(extra) origins.add(extra);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const events = new Set(["page_view","engaged","project_open","outbound","document_open"]);
const routes = new Set(["/","/power-systems","/nuclear-energy","/critical-systems","/research"]);
const safe = (v: unknown) => typeof v === "string" ? v.slice(0,150) : null;
const db = createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false}});

Deno.serve(async req => {
  const origin=req.headers.get("origin") || "";
  const cors={"Access-Control-Allow-Origin":origin,"Vary":"Origin","Access-Control-Allow-Headers":"authorization, apikey, x-client-info, content-type, traceparent, tracestate, baggage","Access-Control-Allow-Methods":"POST, OPTIONS"};
  const reply=(status:number, body:unknown)=>new Response(JSON.stringify(body),{status,headers:{...cors,"Content-Type":"application/json","Cache-Control":"no-store"}});
  if (!origins.has(origin)) return new Response(null,{status:403});
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:cors});
  if(req.method!=="POST") return reply(405,{ok:false});
  if(req.headers.get("sec-gpc")==="1" || req.headers.get("dnt")==="1") return reply(200,{ok:true});
  try{
    const contentLength=Number(req.headers.get("content-length")||0);
    if(contentLength>4096) return reply(413,{ok:false});
    const raw=await req.text();
    if(raw.length>4096) return reply(413,{ok:false});
    const b=JSON.parse(raw);
    if(!b || !uuid.test(b.id || "") || !uuid.test(b.session_id || "") || !events.has(b.event_type) || !routes.has(b.page)) return reply(400,{ok:false});
    const ua=req.headers.get("user-agent") || "";
    const {count,error:countError}=await db.from("analytics_events").select("id",{count:"exact",head:true}).eq("session_id",b.session_id).gte("created_at",new Date(Date.now()-60000).toISOString());
    if(countError) return reply(503,{ok:false});
    if((count||0)>=30) return reply(429,{ok:false});
    const a=attribution(b.referrer,b.tags || {});
    let geo:Record<string,unknown>={};
    let geoSource:string|null=null;
    if(b.event_type==="page_view"){
      const ip=(req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0] || "").trim();
      // IP geolocation is approximate; headers and provider results must be validated in production.
      if(/^[0-9a-f:.]{3,45}$/i.test(ip) && !/^(127\.|10\.|192\.168\.|169\.254\.|::1$|fc|fd|fe80)/i.test(ip)){
        try{
          const res=await fetch("https://ipapi.co/"+encodeURIComponent(ip)+"/json/",{signal:AbortSignal.timeout(2500)});
          if(res.ok){const g=await res.json();if(!g.error){geo=g;geoSource="ipapi.co / gateway IP (approximate)";}}
        }catch{}
      }
    }
    const target=typeof b.target==="string" && /^[a-zA-Z0-9._/:-]{1,180}$/.test(b.target) ? b.target : null;
    const {error}=await db.from("analytics_events").upsert({
      id:b.id,session_id:b.session_id,event_type:b.event_type,page:b.page,target,
      ...a,country:safe(geo.country_name),region:safe(geo.region),city:safe(geo.city),
      network_org:safe(geo.org),network_asn:safe(geo.asn),geo_source:geoSource,
      traffic_signal:trafficSignal(ua,String(geo.org||"")),
      device:/iPad|Tablet/i.test(ua)?"Tablet":/Android|Mobile|iPhone/i.test(ua)?"Mobile":ua?"Desktop/other":"Unknown",
      browser:/Edg\//i.test(ua)?"Edge":/Firefox/i.test(ua)?"Firefox":/Chrome/i.test(ua)?"Chrome":/Safari/i.test(ua)?"Safari":"Other"
    },{onConflict:"id",ignoreDuplicates:true});
    if(error) return reply(503,{ok:false});
    return reply(200,{ok:true});
  }catch{return reply(400,{ok:false});}
});
