"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { currentChoice } from "./CookieConsent";

let memorySession;
function session(now) {
  let value;
  try { value = JSON.parse(sessionStorage.getItem("ohmega-visit-session") || "null") || memorySession; } catch { value = memorySession; }
  if (!value?.id || now - value.lastSeen > 30 * 60 * 1000) { const q=new URLSearchParams(location.search);const tags={};for(const k of ["utm_source","utm_medium","utm_campaign","utm_content"]){const v=q.get(k);if(v&&/^[a-z0-9_.-]{1,64}$/i.test(v))tags[k]=v;} value={id:crypto.randomUUID(),referrer:document.referrer,tags}; }
  value.lastSeen = now;
  memorySession = value;
  try { sessionStorage.setItem("ohmega-visit-session", JSON.stringify(value)); } catch { /* Tracking never blocks navigation. */ }
  return value;
}

export default function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    // Cleanup avoids duplicate records during React Strict Mode effect replay.
    const timer = setTimeout(() => {
      try {
        if(currentChoice()!=="accepted")return;
        const s=session(Date.now());
        const payload = { id: crypto.randomUUID(), sessionId:s.id, page: pathname, referrer:s.referrer, tags:s.tags };
        fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      } catch { /* Browser restrictions must not hide the portfolio. */ }
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}
