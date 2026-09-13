"use client";

import {useEffect,useState} from "react";
import {createPortal} from "react-dom";

const copy={
  en:{
    date:"Aug 2026 — Present",
    title:"Engineering Studies & Tendering Assistant",
    meta:"S4E SARL · Dakar, Senegal",
    body:"Supporting engineering-office activities through preparation of an Expression of Interest dossier for an electrical-infrastructure assignment in the Democratic Republic of the Congo, together with technical review, drawing coordination and works monitoring for the Kolda solar power project.",
    tags:["PVsyst","AutoCAD","Excel","Tendering","IEC 62548","IEC 62446-1"]
  },
  fr:{
    date:"Août 2026 — Aujourd’hui",
    title:"Assistant études & appels d’offres — Ingénierie électrique",
    meta:"S4E SARL · Dakar, Sénégal",
    body:"Appui aux activités du bureau d’études avec la préparation d’un dossier de manifestation d’intérêt pour une mission d’infrastructure électrique en République démocratique du Congo, ainsi que la revue technique, la coordination des plans et le suivi des travaux de la centrale solaire de Kolda.",
    tags:["PVsyst","AutoCAD","Excel","Appels d’offres","IEC 62548","IEC 62446-1"]
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
