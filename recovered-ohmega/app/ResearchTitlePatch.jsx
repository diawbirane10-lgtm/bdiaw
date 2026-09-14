"use client";

import { useEffect } from "react";

const OLD_TITLE = "Grid-Forming Virtual Synchronous Machine Control with DC-Coupled Battery Storage for Frequency Stability in a Multi-Terminal VSC-HVDC Renewable Power System";
const NEW_TITLE = "Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems";

export default function ResearchTitlePatch() {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll("#research h3").forEach((node) => {
        if (node.textContent?.trim() === OLD_TITLE) node.textContent = NEW_TITLE;
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
