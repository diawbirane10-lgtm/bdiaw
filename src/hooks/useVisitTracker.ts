import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { analyticsAllowed, useAnalyticsChoice, subscribeChoice } from "@/lib/analyticsConsent";

const paths = new Set(["/","/power-systems","/nuclear-energy","/critical-systems","/research"]);
const key="ohmega_analytics_session_v2";
type Session={id:string,last:number,referrer:string|null,tags:Record<string,string>};
let memory:Session|null=null;
function allowed(){return analyticsAllowed();}
subscribeChoice(()=>{if(!allowed()){memory=null;lastRoute="";lastView=0;try{sessionStorage.removeItem(key);}catch{}}});
function session():Session{
  let s=memory;
  try{s=JSON.parse(sessionStorage.getItem(key)||"null")||s;}catch{}
  const now=Date.now();
  if(!s || now-s.last>30*60000){
    const tags:Record<string,string>={};
    const q=new URLSearchParams(location.search);
    for(const k of ["utm_source","utm_medium","utm_campaign","utm_content"]){const v=q.get(k);if(v && /^[a-z0-9_.-]{1,80}$/i.test(v)) tags[k]=v;}
    let referrer=null;
    try{referrer=new URL(document.referrer).origin;}catch{}
    s={id:crypto.randomUUID(),last:now,referrer,tags};
  }
  s.last=now;memory=s;
  try{sessionStorage.setItem(key,JSON.stringify(s));}catch{}
  return s;
}
async function send(event_type:string,target?:string){
  try{
    if(!paths.has(location.pathname) || !allowed()) return;
    const {data}=await supabase.auth.getSession();
    if(data.session?.user.app_metadata?.portfolio_admin===true || data.session?.user.app_metadata?.portfolio_admin==="true")return;
    if(!allowed() || !paths.has(location.pathname)) return;
    const s=session();
    await supabase.functions.invoke("track-visit-v2",{body:{consent_version:"v1",id:crypto.randomUUID(),session_id:s.id,event_type,page:location.pathname,target,referrer:s.referrer,tags:s.tags}});
  }catch{/* analytics must not interrupt the public site */}
}
export const trackProjectOpen=(target:string)=>void send("project_open",target);
let lastRoute="";
let lastView=0;
export const useVisitTracker=()=>{
  const {pathname}=useLocation();
  const consent=useAnalyticsChoice();
  useEffect(()=>{
    if(consent!=="accepted" || !allowed() || !paths.has(pathname))return;
    const now=Date.now();
    if(pathname!==lastRoute || now-lastView>1000){lastRoute=pathname;lastView=now;void send("page_view");}
    let visibleSeconds=0;
    const timer=window.setInterval(()=>{
      if(document.visibilityState==="visible" && ++visibleSeconds>=15){clearInterval(timer);void send("engaged");}
    },1000);
    const click=(e:MouseEvent)=>{
      const a=(e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement|null;
      if(!a)return;
      try{
        const u=new URL(a.href);
        if(!["http:","https:"].includes(u.protocol))return;
        if(/\.pdf$/i.test(u.pathname)||a.hasAttribute("download"))void send("document_open",u.hostname===location.hostname?u.pathname:u.hostname);
        else if(u.hostname!==location.hostname)void send("outbound",u.hostname);
      }catch{}
    };
    document.addEventListener("click",click);
    return()=>{clearInterval(timer);document.removeEventListener("click",click);};
  },[pathname,consent]);
};
export const VisitTracker=()=>{useVisitTracker();return null;};
