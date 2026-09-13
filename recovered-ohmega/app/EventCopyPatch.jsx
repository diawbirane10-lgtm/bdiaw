"use client";

import {useEffect} from "react";

const copy={
  en:"Five days of work on the preparation of Senegal’s nuclear power programme under the IAEA Milestones Approach, with discussions on planning, institutional coordination, capacity development, infrastructure preparation, and selected technical aspects of nuclear power generation and grid integration.",
  fr:"Cinq jours de travaux consacrés à la préparation du programme électronucléaire du Sénégal selon l’approche par jalons de l’AIEA, avec des échanges sur la planification, la coordination institutionnelle, le développement des capacités, la préparation des infrastructures et certains aspects techniques liés à la production électronucléaire et à son intégration au réseau."
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
