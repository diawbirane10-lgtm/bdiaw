"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import SkillsSupplement from "./SkillsSupplement";
import EventCopyPatch from "./EventCopyPatch";
import VisitTracker from "./VisitTracker";
import CookieConsent,{useConsent,currentChoice} from "./CookieConsent";

export default function SiteAnalytics() {
  const pathname = usePathname();
  const choice=useConsent();
  if (pathname?.startsWith("/admin")) return null;
  return <><SkillsSupplement/><EventCopyPatch/><CookieConsent choice={choice}/>{choice==="accepted"&&<><Analytics beforeSend={event=>currentChoice()==="accepted"&&!location.pathname.startsWith("/admin")?event:null}/><VisitTracker /></>}</>;
}
