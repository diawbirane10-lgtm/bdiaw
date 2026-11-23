"use client";
import { useEffect,useState } from "react";
import { CONSENT_COOKIE,CONSENT_AGE } from "../lib/privacy.mjs";

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
  if(choice===undefined)return null;
  const decide=v=>{save(v);setOpen(false);};
  const button={border:"1px solid #183a59",background:"#183a59",color:"white",padding:"10px 16px",borderRadius:6,font:"inherit",fontSize:14,minHeight:44,cursor:"pointer",flex:"1 1 130px"};
  if(choice!==null&&!open)return <button type="button" onClick={()=>setOpen(true)} style={{position:"fixed",bottom:12,left:12,zIndex:90,background:"#fff",color:"#183a59",border:"1px solid #b9c3cc",borderRadius:5,padding:"8px 12px",fontSize:12,cursor:"pointer"}}>Privacy / cookies</button>;
  return <section aria-label="Privacy and analytics choices" style={{position:"fixed",bottom:12,left:12,right:12,maxWidth:700,margin:"auto",zIndex:10000,background:"#fff",color:"#192a39",border:"1px solid #b9c3cc",borderRadius:9,padding:20,boxShadow:"0 6px 30px #0002",maxHeight:"80vh",overflow:"auto",fontSize:14,lineHeight:1.5}}>
    <strong style={{fontSize:18}}>Your privacy choices</strong>
    <p style={{margin:"8px 0"}}>With your permission, OHMEGA uses optional analytics to measure visits, approximate network country and city, referral sources, campaign tags and report requests. The private visit journal does not store raw IP addresses or search queries. Vercel provides hosting and aggregate analytics. No advertising cookies are used by this analytics feature.</p>
    <p style={{margin:"8px 0"}}>Essential storage remembers your choice for up to six months and supports administration. You may decline without losing access and change your choice at any time. Privacy questions: <a href="/#contact" style={{textDecoration:"underline"}}>contact</a>.</p>
    {browserBlocked()&&<p>Your browser privacy preference disables analytics.</p>}
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
      <button type="button" style={button} disabled={browserBlocked()} onClick={()=>decide("accepted")}>Accept analytics</button>
      <button type="button" style={button} onClick={()=>decide("declined")}>Decline analytics</button>
      {choice!==null&&<button type="button" style={{...button,background:"white",color:"#183a59",flex:"0 1 auto"}} onClick={()=>setOpen(false)}>Close</button>}
    </div>
  </section>;
}
