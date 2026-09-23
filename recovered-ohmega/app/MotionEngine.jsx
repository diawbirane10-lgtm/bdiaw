"use client";

import {useEffect} from "react";

export default function MotionEngine(){
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer=window.matchMedia("(pointer: fine)").matches;
    const root=document.documentElement;
    root.classList.add("motionReady");

    const items=[...document.querySelectorAll(".motionItem")];
    const sections=[...document.querySelectorAll(".motionSection")];

    if(reduce){
      items.forEach(el=>el.classList.add("motionIn"));
      sections.forEach(el=>el.classList.add("motionIn"));
      root.style.setProperty("--scroll-progress","1");
      return()=>root.classList.remove("motionReady");
    }

    const reveal=(entries,observer)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const parent=entry.target.parentElement;
        if(entry.target.classList.contains("motionItem")&&parent){
          const siblings=[...parent.children].filter(node=>node.classList?.contains("motionItem"));
          const index=siblings.indexOf(entry.target);
          entry.target.style.setProperty("--motion-delay",`${Math.min(Math.max(index,0)*55,180)}ms`);
        }
        entry.target.classList.add("motionIn");
        observer.unobserve(entry.target);
      });
    };

    const itemObserver=new IntersectionObserver(reveal,{threshold:.14,rootMargin:"0px 0px -8% 0px"});
    const sectionObserver=new IntersectionObserver(reveal,{threshold:.1,rootMargin:"0px 0px -10% 0px"});
    items.forEach(el=>itemObserver.observe(el));
    sections.forEach(el=>sectionObserver.observe(el));

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
    },{rootMargin:"-30% 0px -58% 0px",threshold:[0,.15,.35,.6]});
    navSections.forEach(({section})=>navObserver.observe(section));

    let scrollFrame=0;
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
    updateProgress();
    window.addEventListener("scroll",onScroll,{passive:true});

    const tiltCleanups=[];
    if(finePointer){
      [...document.querySelectorAll(".depthCard")].forEach(el=>{
        let frame=0;
        let rx=0;
        let ry=0;

        const paint=()=>{
          frame=0;
          el.style.setProperty("--rx",rx.toFixed(2)+"deg");
          el.style.setProperty("--ry",ry.toFixed(2)+"deg");
        };

        const onMove=(event)=>{
          const rect=el.getBoundingClientRect();
          const x=(event.clientX-rect.left)/rect.width-.5;
          const y=(event.clientY-rect.top)/rect.height-.5;
          rx=-y*1.5;
          ry=x*1.8;
          if(!frame)frame=requestAnimationFrame(paint);
        };

        const onLeave=()=>{
          cancelAnimationFrame(frame);
          frame=0;
          el.style.setProperty("--rx","0deg");
          el.style.setProperty("--ry","0deg");
        };

        el.addEventListener("pointermove",onMove,{passive:true});
        el.addEventListener("pointerleave",onLeave,{passive:true});
        tiltCleanups.push(()=>{
          cancelAnimationFrame(frame);
          el.removeEventListener("pointermove",onMove);
          el.removeEventListener("pointerleave",onLeave);
        });
      });
    }

    return()=>{
      itemObserver.disconnect();
      sectionObserver.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll",onScroll);
      cancelAnimationFrame(scrollFrame);
      tiltCleanups.forEach(fn=>fn());
      root.classList.remove("motionReady");
    };
  },[]);

  return <div className="scrollProgress" aria-hidden="true"/>;
}
