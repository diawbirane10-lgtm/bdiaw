"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import SkillsSupplement from "./SkillsSupplement";
import EventCopyPatch from "./EventCopyPatch";

export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <><SkillsSupplement/><EventCopyPatch/><Analytics /></>;
}
