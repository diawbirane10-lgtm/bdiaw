"use client";

import {useEffect} from "react";

const copy={
  en:"Five days of work on the institutional and technical preparation of Senegal’s nuclear power programme under the IAEA Milestones Approach, including experience sharing, institutional coordination, planning, capacity development and infrastructure preparation. The session also included introductory technical discussions on nuclear power generation, grid integration, electrical protection, instrumentation and control, as well as the role of applicable nuclear-industry standards, codes and regulatory frameworks. These exchanges were not intended as a detailed engineering study, but they provided a broader view of the technical requirements associated with a future nuclear power programme.",
  fr:"Cinq jours de travaux consacrés à la préparation institutionnelle et technique du programme électronucléaire du Sénégal selon l’approche par jalons de l’AIEA, avec des échanges d’expérience, des discussions sur la coordination institutionnelle, la planification, le développement des capacités et la préparation des infrastructures. La session a également donné lieu à des échanges techniques introductifs sur la production électronucléaire, l’intégration au réseau, les protections électriques, l’instrumentation et le contrôle-commande, ainsi que sur le rôle des normes, codes et cadres réglementaires applicables à l’industrie nucléaire. Ces échanges ne constituaient pas une étude d’ingénierie détaillée, mais ils ont permis d’élargir la compréhension des exigences techniques liées à un futur programme électronucléaire."
};

export default function EventCopyPatch(){
  useEffect(()=>{
    const apply=()=>{
      const body=document.querySelector("#events .eventBody");
      if(!body) return;
      const lang=document.documentElement.lang?.toLowerCase().startsWith("fr")?"fr":"en";
      if(body.textContent!==copy[lang]) body.textContent=copy[lang];
    };
    apply();
    const observer=new MutationObserver(apply);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    const timer=window.setInterval(apply,400);
    return()=>{observer.disconnect();window.clearInterval(timer)};
  },[]);
  return null;
}
