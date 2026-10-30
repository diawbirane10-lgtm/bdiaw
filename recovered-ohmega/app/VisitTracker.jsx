"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

let memorySession;
function session(now) {
  let value;
  try { value = JSON.parse(sessionStorage.getItem("ohmega-visit-session") || "null") || memorySession; } catch { value = memorySession; }
  if (!value?.id || now - value.lastSeen > 30 * 60 * 1000) value = { id: crypto.randomUUID() };
  value.lastSeen = now;
  memorySession = value;
  try { sessionStorage.setItem("ohmega-visit-session", JSON.stringify(value)); } catch { /* Tracking never blocks navigation. */ }
  return value.id;
}

export default function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    // Cleanup avoids duplicate records during React Strict Mode effect replay.
    const timer = setTimeout(() => {
      try {
        const payload = { id: crypto.randomUUID(), sessionId: session(Date.now()), page: pathname, referrer: document.referrer };
        fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      } catch { /* Browser restrictions must not hide the portfolio. */ }
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}
