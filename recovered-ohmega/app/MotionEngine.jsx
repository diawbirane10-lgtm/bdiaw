"use client";

import {useEffect} from "react";

// Scroll-driven reveal + progress state.
export default function MotionEngine(){
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root=document.documentElement;
    root.classList.add("motionReady");

    const sections=[...document.querySelectorAll(".section, .motionSection")];
    const items=[...document.querySelectorAll(".motionItem")];

    if(reduce){
      sections.forEach(el=>el.classList.add("motionIn"));
      items.forEach(el=>el.classList.add("motionIn"));
      root.style.setProperty("--scroll-progress","1");
      return()=>root.classList.remove("motionReady");
    }

    const sectionObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add("motionIn");
        sectionObserver.unobserve(entry.target);
      });
    },{threshold:.16,rootMargin:"0px 0px -12% 0px"});

    sections.forEach(el=>sectionObserver.observe(el));

    const itemObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const parent=entry.target.parentElement;
        if(parent){
          const siblings=[...parent.children].filter(node=>node.classList?.contains("motionItem"));
          const index=siblings.indexOf(entry.target);
          entry.target.style.setProperty("--motion-delay",`${Math.min(Math.max(index,0)*80,320)}ms`);
        }
        entry.target.classList.add("motionIn");
        itemObserver.unobserve(entry.target);
      });
    },{threshold:.18,rootMargin:"0px 0px -8% 0px"});

    items.forEach(el=>itemObserver.observe(el));

    let ticking=false;
    let lastY=window.scrollY;
    const topbar=document.querySelector(".topbar");
    const updateProgress=()=>{
      ticking=false;
      const y=window.scrollY;
      const max=document.documentElement.scrollHeight-window.innerHeight;
      const progress=max>0?Math.min(1,Math.max(0,y/max)):0;
      root.style.setProperty("--scroll-progress",String(progress));

      if(topbar){
        const navOpen=document.getElementById("portfolio-navigation")?.classList.contains("isOpen");
        const delta=y-lastY;
        if(y<72 || delta<-6 || navOpen){
          topbar.classList.remove("is-hidden");
        }else if(delta>6 && y>120){
          topbar.classList.add("is-hidden");
        }
      }
      lastY=y;
    };
    const onScroll=()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll",onScroll,{passive:true});

    return()=>{
      sectionObserver.disconnect();
      itemObserver.disconnect();
      window.removeEventListener("scroll",onScroll);
      topbar?.classList.remove("is-hidden");
      root.classList.remove("motionReady");
    };
  },[]);

  return <div className="scrollProgress" aria-hidden="true"/>;
}
