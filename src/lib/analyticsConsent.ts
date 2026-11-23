import { useSyncExternalStore } from "react";

export type AnalyticsChoice = "accepted" | "declined" | "unset";
const KEY = "ohmega_analytics_consent_v1";
const SESSION = "ohmega_analytics_session_v2";
const TTL = 180 * 86400000;
const CHANGE = "ohmega:analytics-consent";
let temporary: { choice: AnalyticsChoice; expires: number } | null = null;

export function privacySignal() {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === "1";
}

export function readChoice(): AnalyticsChoice {
  if (privacySignal()) return "declined";
  try {
    const raw = localStorage.getItem(KEY);
    const p = raw ? JSON.parse(raw) : temporary;
    return p && p.expires > Date.now() && ["accepted","declined"].includes(p.choice) ? p.choice : "unset";
  } catch { return temporary && temporary.expires > Date.now() ? temporary.choice : "unset"; }
}

export function analyticsAllowed() { return readChoice() === "accepted"; }

export function setChoice(choice: "accepted" | "declined") {
  const effective = privacySignal() ? "declined" : choice;
  temporary = { choice: effective, expires: Date.now() + TTL };
  try { localStorage.setItem(KEY, JSON.stringify(temporary)); } catch {}
  if (effective === "declined") {
    try { sessionStorage.removeItem(SESSION); } catch {}
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function subscribeChoice(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if(e.key === KEY || e.key === null) callback();
  };
  window.addEventListener(CHANGE,callback);
  window.addEventListener("storage",onStorage);
  window.addEventListener("focus",callback);
  return () => {
    window.removeEventListener(CHANGE,callback);
    window.removeEventListener("storage",onStorage);
    window.removeEventListener("focus",callback);
  };
}
export function useAnalyticsChoice() {
  return useSyncExternalStore(subscribeChoice,readChoice,()=> "unset" as AnalyticsChoice);
}
