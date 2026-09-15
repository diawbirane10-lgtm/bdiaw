"use client";

import { useEffect } from "react";

export default function HeroNamePatch() {
  useEffect(() => {
    const apply = () => {
      const heroTitle = document.querySelector("#top h1");
      if (heroTitle && heroTitle.textContent?.trim() !== "Birane Idriss DIAW") {
        heroTitle.textContent = "Birane Idriss DIAW";
      }
    };

    apply();
    const timer = window.setTimeout(apply, 250);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
