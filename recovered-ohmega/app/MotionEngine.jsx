"use client";

import {useEffect} from "react";

export default function MotionEngine(){
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine=window.matchMedia("(pointer: fine)").matches;
    const root=document.documentElement;
    root.classList.add("motionReady");

    const sections=[...document.querySelectorAll(".motionSection")];
    const items=[...document.querySelectorAll(".motionItem")];

    if(reduce){
      sections.forEach(el=>el.classList.add("motionIn"));
      items.forEach(el=>el.classList.add("motionIn"));
      root.style.setProperty("--scroll-progress","1");
      return()=>root.classList.remove("motionReady");
    }

    const reveal=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add("motionIn");
        reveal.unobserve(entry.target);
      });
    },{threshold:.14,rootMargin:"0px 0px -8% 0px"});

    sections.forEach(el=>reveal.observe(el));
    items.forEach((el,index)=>{
      el.style.setProperty("--motion-delay",`${Math.min((index%3)*60,120)}ms`);
      reveal.observe(el);
    });

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
    },{rootMargin:"-28% 0px -62% 0px",threshold:[0,.2,.5]});
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

    const tiltCleanups=[];
    if(fine){
      document.querySelectorAll(".depthCard").forEach(card=>{
        let frame=0;
        let rx=0;
        let ry=0;
        const apply=()=>{
          frame=0;
          card.style.setProperty("--rx",rx.toFixed(2)+"deg");
          card.style.setProperty("--ry",ry.toFixed(2)+"deg");
        };
        const move=(event)=>{
          const rect=card.getBoundingClientRect();
          const x=(event.clientX-rect.left)/rect.width-.5;
          const y=(event.clientY-rect.top)/rect.height-.5;
          rx=-y*2.2;
          ry=x*2.6;
          if(!frame)frame=requestAnimationFrame(apply);
        };
        const leave=()=>{
          rx=0;ry=0;
          if(!frame)frame=requestAnimationFrame(apply);
        };
        card.addEventListener("pointermove",move,{passive:true});
        card.addEventListener("pointerleave",leave,{passive:true});
        tiltCleanups.push(()=>{
          cancelAnimationFrame(frame);
          card.removeEventListener("pointermove",move);
          card.removeEventListener("pointerleave",leave);
        });
      });
    }

    updateProgress();
    window.addEventListener("scroll",onScroll,{passive:true});

    return()=>{
      reveal.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll",onScroll);
      tiltCleanups.forEach(fn=>fn());
      cancelAnimationFrame(scrollFrame);
      root.classList.remove("motionReady");
    };
  },[]);

  return <div className="scrollProgress" aria-hidden="true"/>;
}
