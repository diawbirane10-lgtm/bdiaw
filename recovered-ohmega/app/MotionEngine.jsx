"use client";

import {useEffect} from "react";

export default function MotionEngine(){
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer=window.matchMedia("(pointer: fine)").matches;
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
    },{threshold:.12,rootMargin:"0px 0px -10% 0px"});
    sections.forEach(el=>sectionObserver.observe(el));

    const itemObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const parent=entry.target.parentElement;
        if(parent){
          const siblings=[...parent.children].filter(node=>node.classList?.contains("motionItem"));
          const index=siblings.indexOf(entry.target);
          entry.target.style.setProperty("--motion-delay",`${Math.min(Math.max(index,0)*55,220)}ms`);
        }
        entry.target.classList.add("motionIn");
        itemObserver.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:"0px 0px -8% 0px"});
    items.forEach(el=>itemObserver.observe(el));

    const navLinks=[...document.querySelectorAll('#portfolio-navigation a[href^="#"]')];
    const navSections=navLinks
      .map(link=>({link,section:document.querySelector(link.getAttribute("href"))}))
      .filter(item=>item.section);

    const navObserver=new IntersectionObserver((entries)=>{
      const visible=entries
        .filter(entry=>entry.isIntersecting)
        .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      navSections.forEach(({link,section})=>{
        if(section===visible.target)link.setAttribute("aria-current","page");
        else link.removeAttribute("aria-current");
      });
    },{rootMargin:"-28% 0px -62% 0px",threshold:[0,.15,.35,.6]});
    navSections.forEach(({section})=>navObserver.observe(section));

    let scrollFrame=0;
    let pointerFrame=0;
    let pointerX=0;
    let pointerY=0;

    const updateProgress=()=>{
      scrollFrame=0;
      const max=document.documentElement.scrollHeight-window.innerHeight;
      const progress=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
      root.style.setProperty("--scroll-progress",String(progress));
    };

    const onScroll=()=>{
      if(scrollFrame)return;
      scrollFrame=requestAnimationFrame(updateProgress);
    };

    const updatePointer=()=>{
      pointerFrame=0;
      root.style.setProperty("--pointer-x",pointerX.toFixed(3));
      root.style.setProperty("--pointer-y",pointerY.toFixed(3));
    };

    const onPointerMove=(event)=>{
      if(!finePointer)return;
      pointerX=(event.clientX/window.innerWidth)-.5;
      pointerY=(event.clientY/window.innerHeight)-.5;
      if(pointerFrame)return;
      pointerFrame=requestAnimationFrame(updatePointer);
    };

    updateProgress();
    window.addEventListener("scroll",onScroll,{passive:true});
    if(finePointer)window.addEventListener("pointermove",onPointerMove,{passive:true});

    return()=>{
      sectionObserver.disconnect();
      itemObserver.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("pointermove",onPointerMove);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      root.classList.remove("motionReady");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  },[]);

  return <div className="scrollProgress" aria-hidden="true"/>;
}
