"use client";

import {useEffect,useState} from "react";
import {createPortal} from "react-dom";
import {usePathname} from "next/navigation";

const copy={
  en:{
    office:["Microsoft 365 & Office","Word · Excel · PowerPoint · Access"],
    soft:["Soft skills","Analytical thinking · Problem solving · Technical communication · Teamwork · Adaptability · Organization · Initiative"]
  },
  fr:{
    office:["Microsoft 365 & Pack Office","Word · Excel · PowerPoint · Access"],
    soft:["Compétences comportementales","Esprit d’analyse · Résolution de problèmes · Communication technique · Travail en équipe · Adaptabilité · Organisation · Initiative"]
  }
};

export default function SkillsSupplement(){
  const pathname=usePathname();
  const[lang,setLang]=useState("en");
  const[mount,setMount]=useState(null);

  useEffect(()=>{
    if(pathname!=="/") return;
    const root=document.documentElement;
    const syncLang=()=>setLang(root.lang==="fr"?"fr":"en");
    syncLang();
    const observer=new MutationObserver(syncLang);
    observer.observe(root,{attributes:true,attributeFilter:["lang"]});

    const list=document.querySelector("#skills .list");
    let portal=document.getElementById("skills-supplement-mount");
    if(list && !portal){
      portal=document.createElement("div");
      portal.id="skills-supplement-mount";
      portal.style.display="contents";
      list.appendChild(portal);
    }
    setMount(portal||null);
    return()=>{
      observer.disconnect();
      setMount(null);
      portal?.remove();
    };
  },[pathname]);

  if(pathname!=="/"||!mount) return null;
  const t=copy[lang];
  return createPortal(<>
    <article className="skill"><h3>{t.office[0]}</h3><p>{t.office[1]}</p></article>
    <article className="skill"><h3>{t.soft[0]}</h3><p>{t.soft[1]}</p></article>
  </>,mount);
}
