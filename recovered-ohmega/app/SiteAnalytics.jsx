"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import EventsSection from "./EventsSection";
import "./events.css";

export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <><EventsSection/><Analytics /></>;
}
