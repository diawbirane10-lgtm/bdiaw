"use client";

import { useEffect } from "react";

const EN_TEXT = "Fourth-year State Engineering student in Electrical Engineering & Intelligent Systems, currently in the engineering cycle at EMSI Rabat. The program focuses on electrical engineering, intelligent systems and industrial technologies, connecting power systems, smart grids, automation, supervision, embedded systems and applied engineering projects.";

const FR_TEXT = "Élève ingénieur d’État en quatrième année en Génie Électrique et Systèmes Intelligents, actuellement en cycle ingénieur à l’EMSI Rabat. La formation couvre le génie électrique, les systèmes intelligents et les technologies industrielles, avec un lien entre systèmes électriques, smart grids, automatisation, supervision, systèmes embarqués et projets d’ingénierie appliquée.";

export default function AcademicPathPatch() {
  useEffect(() => {
    const apply = () => {
      const section = document.getElementById("path");
      if (!section) return;
      const firstEntry = section.querySelector(".time");
      const body = firstEntry?.querySelector(".timeBody");
      if (!body) return;

      const pageText = section.textContent || "";
      const isFrench = pageText.includes("Parcours") || pageText.includes("ingénieur d’État") || document.documentElement.lang === "fr";
      const nextText = isFrench ? FR_TEXT : EN_TEXT;

      if (body.textContent?.trim() !== nextText) {
        body.textContent = nextText;
      }
    };

    apply();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(apply);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
