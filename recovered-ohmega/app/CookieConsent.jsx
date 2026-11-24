"use client";
import { useEffect,useState } from "react";
import { CONSENT_COOKIE,CONSENT_AGE } from "../lib/privacy.mjs";
import { AUDIENCE_OPTOUT } from "../lib/audience-model.mjs";

const CHANGE="ohmega:consent";
function browserBlocked(){return navigator.globalPrivacyControl===true||navigator.doNotTrack==="1";}
export function currentChoice(){
  if(typeof document==="undefined")return null;
  if(browserBlocked())return "declined";
  const c=document.cookie.split("; ").find(x=>x.startsWith(CONSENT_COOKIE+"="))?.split("=")[1];
  return c==="accepted"||c==="declined"?c:null;
}
function save(choice){
  if(browserBlocked())choice="declined";
  document.cookie=CONSENT_COOKIE+"="+choice+"; Max-Age="+CONSENT_AGE+"; Path=/; SameSite=Lax; Secure";
  if(choice==="declined"){
    try{sessionStorage.removeItem("ohmega-visit-session");}catch{}
    // The server clears the HttpOnly visitor cookie on withdrawal.
    fetch("/api/privacy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({choice}),keepalive:true}).catch(()=>{});
  }
  window.dispatchEvent(new Event(CHANGE));
  try{localStorage.setItem("ohmega-consent-change",String(Date.now()));}catch{}
}
export function useConsent(){
  const [choice,setChoice]=useState(undefined);
  useEffect(()=>{
    const update=()=>setChoice(currentChoice());
    update();window.addEventListener(CHANGE,update);window.addEventListener("storage",update);window.addEventListener("focus",update);
    return()=>{window.removeEventListener(CHANGE,update);window.removeEventListener("storage",update);window.removeEventListener("focus",update);};
  },[]);
  return choice;
}
export default function CookieConsent({choice}){
  const [open,setOpen]=useState(false);
  const [details,setDetails]=useState(false);
  const [audienceOff,setAudienceOff]=useState(false);
  useEffect(()=>{setAudienceOff(document.cookie.split("; ").includes(AUDIENCE_OPTOUT+"=1"));},[]);
  const toggleAudience=()=>{const next=!audienceOff;document.cookie=AUDIENCE_OPTOUT+"="+(next?"1":"0")+"; Max-Age="+CONSENT_AGE+"; Path=/; SameSite=Lax; Secure";setAudienceOff(next);};
  if(choice===undefined)return null;
  const decide=v=>{save(v);setOpen(false);setDetails(false);};
  const button={border:"1px solid #183a59",background:"#183a59",color:"white",padding:"10px 16px",borderRadius:6,font:"inherit",fontSize:14,minHeight:44,cursor:"pointer",flex:"1 1 130px"};
  if(choice!==null&&!open)return <button type="button" onClick={()=>setOpen(true)} style={{position:"fixed",bottom:12,left:12,zIndex:90,background:"#fff",color:"#183a59",border:"1px solid #b9c3cc",borderRadius:5,padding:"8px 12px",fontSize:12,cursor:"pointer"}}>Privacy / cookies</button>;
  return <section aria-label="Privacy and analytics choices" style={{position:"fixed",bottom:12,left:12,right:12,maxWidth:620,margin:"auto",zIndex:10000,background:"#fff",color:"#192a39",border:"1px solid #b9c3cc",borderRadius:9,padding:14,boxShadow:"0 6px 30px #0002",maxHeight:"80vh",overflow:"auto",fontSize:14,lineHeight:1.5}}>
    <strong style={{fontSize:16}}>Cookies</strong>
    <p style={{margin:"6px 0"}}>We count public page views by country without visitor identifiers. Optional cookies enable additional session analytics. <span style={{whiteSpace:"nowrap"}}><button type="button" onClick={()=>setDetails(v=>!v)} aria-expanded={details} style={{padding:0,border:0,background:"transparent",color:"#183a59",font:"inherit",textDecoration:"underline",cursor:"pointer"}}>Learn more</button></span></p>
    {details&&<p style={{margin:"8px 0",fontSize:13}}>Basic audience measurement counts page views by approximate country without an IP address, session identifier or individual browsing history in the statistics. It respects browser privacy signals and can be disabled separately below. Optional analytics measure visits, approximate network location, referral and campaign sources, and report requests only after acceptance. Our private Vercel journal does not store raw IP addresses or search queries. Essential storage remembers your choice for up to six months and supports admin sign-in. You can change your choice at any time. No advertising cookies are used by this analytics feature. Privacy questions: <a href="/#contact" style={{textDecoration:"underline"}}>contact</a>.</p>}
    {browserBlocked()&&<p>Your browser privacy preference disables analytics.</p>}
    <p style={{fontSize:13,margin:"8px 0"}}>Basic audience counts are independent of optional cookies. <button type="button" onClick={toggleAudience} style={{border:0,padding:0,background:"transparent",textDecoration:"underline",font:"inherit",color:"#183a59",cursor:"pointer"}}>{audienceOff?"Enable basic counts":"Disable basic counts"}</button></p>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
      <button type="button" style={button} disabled={browserBlocked()} onClick={()=>decide("accepted")}>Accept optional</button>
      <button type="button" style={button} onClick={()=>decide("declined")}>Decline optional</button>
      {choice!==null&&<button type="button" style={{...button,background:"white",color:"#183a59",flex:"0 1 auto"}} onClick={()=>{setOpen(false);setDetails(false);}}>Close</button>}
    </div>
  </section>;
}
