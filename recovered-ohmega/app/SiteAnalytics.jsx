"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Analytics />;
}
