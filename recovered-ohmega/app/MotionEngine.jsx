"use client";

import {useEffect} from "react";

// Progress is decorative. Content must remain visible without observer callbacks.
export default function MotionEngine(){
  useEffect(()=>{
    const root=document.documentElement;

    let ticking=false;
    const updateProgress=()=>{
      ticking=false;
      const max=document.documentElement.scrollHeight-window.innerHeight;
      const progress=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
      root.style.setProperty("--scroll-progress",String(progress));
    };
    const onScroll=()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll",onScroll,{passive:true});

    return()=>{
      window.removeEventListener("scroll",onScroll);
    };
  },[]);

  return <div className="scrollProgress" aria-hidden="true"/>;
}
