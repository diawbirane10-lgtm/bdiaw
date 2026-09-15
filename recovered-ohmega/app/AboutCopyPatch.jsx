"use client";

import { useEffect } from "react";

const COPY = {
  en: {
    lead: "State Engineering Student — Electrical Engineering & Intelligent Systems.",
    about:
      "I am a State Engineering student in Electrical Engineering and Intelligent Systems, with a focus on advanced power systems, power electronics, control and critical electrical infrastructure. My work combines modelling, simulation and system-level engineering across grid-connected energy systems, converter-dominated networks, energy storage and intelligent electrical systems. I am particularly interested in reliable high-power architectures, grid stability, HVDC / HVAC, grid-forming technologies, renewable and low-carbon energy integration, and the application of control and digital tools to complex electrical systems."
  },
  fr: {
    lead: "Élève ingénieur d’État — Génie Électrique et Systèmes Intelligents.",
    about:
      "Je suis élève ingénieur d’État en Génie Électrique et Systèmes Intelligents, avec un intérêt marqué pour les réseaux électriques avancés, l’électronique de puissance, la commande et les infrastructures électriques critiques. Mon travail combine modélisation, simulation et ingénierie système appliquées aux systèmes énergétiques connectés au réseau, aux réseaux dominés par les convertisseurs, au stockage d’énergie et aux systèmes électriques intelligents. Je m’intéresse particulièrement aux architectures électriques de forte puissance, à la stabilité des réseaux, au HVDC / HVAC, aux technologies grid-forming, à l’intégration des énergies renouvelables et bas-carbone, ainsi qu’à l’application des outils de commande et du numérique aux systèmes électriques complexes."
  }
};

export default function AboutCopyPatch() {
  useEffect(() => {
    const apply = () => {
      const lead = document.querySelector("#top .lead");
      const intro = document.querySelector("#top .introCopy");
      if (!lead || !intro) return;

      const text = `${lead.textContent || ""} ${intro.textContent || ""}`.toLowerCase();
      const isFrench = text.includes("élève") || text.includes("génie") || text.includes("je suis");
      const copy = isFrench ? COPY.fr : COPY.en;

      if (lead.textContent !== copy.lead) lead.textContent = copy.lead;
      if (intro.textContent !== copy.about) intro.textContent = copy.about;
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
