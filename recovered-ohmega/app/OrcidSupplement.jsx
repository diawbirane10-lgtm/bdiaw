"use client";

import {useEffect} from "react";

const ORCID_URL="https://orcid.org/0009-0003-4015-7854";
const ORCID_ID="0009-0003-4015-7854";

function makeLink(className,label){
  const a=document.createElement("a");
  a.href=ORCID_URL;
  a.target="_blank";
  a.rel="noreferrer";
  a.className=className;
  a.setAttribute("aria-label",`ORCID ${ORCID_ID}`);
  a.title=`ORCID ${ORCID_ID}`;
  a.innerHTML=`<span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:1.15em;height:1.15em;border-radius:50%;background:#A6CE39;color:#fff;font-weight:700;font-size:.9em;line-height:1;margin-right:.42em">iD</span><span>${label}</span>`;
  return a;
}

export default function OrcidSupplement(){
  useEffect(()=>{
    const sync=()=>{
      const contact=document.querySelector("#contact .contactActions");
      if(contact && !contact.querySelector(".orcidContact")){
        const link=makeLink("contactAction orcidContact", "ORCID");
        contact.appendChild(link);
      }

      const hero=document.querySelector(".projectHero");
      if(hero && !hero.querySelector(".orcidProjectLink")){
        const link=makeLink("orcidProjectLink", `ORCID ${ORCID_ID}`);
        link.style.display="inline-flex";
        link.style.alignItems="center";
        link.style.marginTop="1rem";
        link.style.fontSize=".92rem";
        link.style.fontWeight="600";
        link.style.textDecoration="none";
        hero.appendChild(link);
      }

      const research=document.querySelector("#research .inline");
      if(research && !research.querySelector(".orcidResearchLink")){
        const link=makeLink("orcidResearchLink", `ORCID ${ORCID_ID}`);
        research.appendChild(link);
      }
    };

    sync();
    const observer=new MutationObserver(sync);
    observer.observe(document.body,{childList:true,subtree:true});
    return()=>observer.disconnect();
  },[]);

  return null;
}
