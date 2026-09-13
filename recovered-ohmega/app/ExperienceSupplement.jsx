"use client";

import {useEffect,useState} from "react";
import {createPortal} from "react-dom";

const copy={
  en:{
    date:"Aug 2026 — Present",
    title:"Engineering Studies & Tendering Assistant",
    meta:"S4E SARL · Dakar, Senegal",
    body:"Contributing to engineering-office activities and tender preparation for electrical and infrastructure assignments, with current work focused on a Republic of the Congo tender dossier. Responsibilities include reviewing requirements, structuring technical documentation, consolidating engineering inputs and supporting consistency and compliance checks across the bid package.",
    tags:["Engineering studies","Tendering","Technical documentation","Bid compliance"]
  },
  fr:{
    date:"Août 2026 — Aujourd’hui",
    title:"Assistant études & appels d’offres — Ingénierie électrique",
    meta:"S4E SARL · Dakar, Sénégal",
    body:"Participation aux activités du bureau d’études et à la préparation de dossiers d’appels d’offres pour des missions d’ingénierie électrique et d’infrastructures, avec un travail actuellement centré sur un dossier en République du Congo. Les contributions portent notamment sur l’analyse des exigences, la structuration de la documentation technique, la consolidation des éléments d’ingénierie et les vérifications de cohérence et de conformité du dossier.",
    tags:["Études d’ingénierie","Appels d’offres","Documentation technique","Conformité du dossier"]
  }
};

export default function ExperienceSupplement(){
  const [target,setTarget]=useState(null);
  const [logoSrc,setLogoSrc]=useState("");
  const [lang,setLang]=useState("en");

  useEffect(()=>{
    let raf=0;
    const sync=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const list=document.querySelector("#experience .experienceList");
        if(!list) return;

        let mount=document.getElementById("s4e-current-experience-mount");
        if(mount && mount.parentElement!==list){
          mount.remove();
          mount=null;
        }
        if(!mount){
          mount=document.createElement("div");
          mount.id="s4e-current-experience-mount";
          mount.style.display="contents";
          list.prepend(mount);
        }
        setTarget(mount);

        const src=list.querySelector(".s4eLogo img")?.getAttribute("src")||"";
        if(src) setLogoSrc(src);

        const heading=document.querySelector("#experience .sectionTitle")?.textContent||"";
        setLang(/expérience/i.test(heading)?"fr":"en");
      });
    };

    sync();
    const observer=new MutationObserver(sync);
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    return()=>{
      observer.disconnect();
      cancelAnimationFrame(raf);
      document.getElementById("s4e-current-experience-mount")?.remove();
    };
  },[]);

  if(!target) return null;
  const t=copy[lang];

  return createPortal(
    <article className="experienceItem currentS4eExperience">
      <span className="experienceDate">{t.date}</span>
      <div className="experienceContent">
        <div className="experienceHeader">
          <div>
            <h3>{t.title}</h3>
            <p className="experienceMeta">{t.meta}</p>
          </div>
          {logoSrc&&<div className="experienceLogo s4eLogo"><img src={logoSrc} alt="S4E SARL logo"/></div>}
        </div>
        <p className="experienceBody">{t.body}</p>
        <div className="experienceTags">
          {t.tags.map(tag=><span className="experienceTag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>,
    target
  );
}
