"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {AUDIENCE_OPTOUT} from "../lib/audience-model.mjs";
export default function BasicAudience(){
 const path=usePathname();
 useEffect(()=>{
  if(!path||path.startsWith("/admin")||path.startsWith("/api"))return;
  const timer=setTimeout(()=>{
   if(navigator.globalPrivacyControl===true||navigator.doNotTrack==="1"||document.cookie.split("; ").includes(AUDIENCE_OPTOUT+"=1"))return;
   fetch("/api/audience",{method:"POST",keepalive:true}).catch(()=>{});
  },150);
  return()=>clearTimeout(timer);
 },[path]);
 return null;
}
