"use client";

import {useEffect,useState} from "react";
import {createPortal} from "react-dom";

const copy={
  en:{
    date:"Aug 2026 — Present",
    title:"Engineering Studies & Tendering Assistant",
    meta:"S4E SARL · Dakar, Senegal",
    body1Title:"Democratic Republic of the Congo — PASEL",
    body1:"Contributed to the preparation of an Expression of Interest for an engineering-consulting assignment related to electricity-network extension works.",
    body2Title:"Kolda, Senegal — NEA Kolda",
    body2:"Supported technical review, drawing coordination and works monitoring for the Kolda solar power project developed by AXIAN Energy, with S4E acting locally in Senegal.",
    tags:["Tendering","Power Networks","Solar PV","BESS","AutoCAD","PVsyst","Excel"]
  },
  fr:{
    date:"Août 2026 — Aujourd’hui",
    title:"Assistant études & appels d’offres — Ingénierie électrique",
    meta:"S4E SARL · Dakar, Sénégal",
    body1Title:"République démocratique du Congo — PASEL",
    body1:"Contribution à la préparation d’une manifestation d’intérêt pour une mission d’ingénieur-conseil liée à des travaux d’extension de réseaux électriques.",
    body2Title:"Kolda, Sénégal — NEA Kolda",
    body2:"Appui à la revue technique, à la coordination des plans et au contrôle-suivi des travaux de la centrale solaire de Kolda portée par AXIAN Energy, avec S4E intervenant localement au Sénégal.",
    tags:["Appels d’offres","Réseaux électriques","Solaire PV","BESS","AutoCAD","PVsyst","Excel"]
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
        <p className="experienceBody"><strong>{t.body1Title}</strong><br/>{t.body1}</p>
        <p className="experienceBody"><strong>{t.body2Title}</strong><br/>{t.body2}</p>
        <div className="experienceTags">
          {t.tags.map(tag=><span className="experienceTag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>,
    target
  );
}
