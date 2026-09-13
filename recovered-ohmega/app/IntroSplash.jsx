"use client";

import {useEffect,useState} from "react";

export default function IntroSplash(){
  const [visible,setVisible]=useState(true);
  const [leaving,setLeaving]=useState(false);

  useEffect(()=>{
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";

    const fadeTimer=window.setTimeout(()=>setLeaving(true),2350);
    const hideTimer=window.setTimeout(()=>{
      setVisible(false);
      document.body.style.overflow=previousOverflow;
    },2800);

    return()=>{
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow=previousOverflow;
    };
  },[]);

  if(!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:"fixed",
        inset:0,
        zIndex:100000,
        display:"grid",
        placeItems:"center",
        background:"#ffffff",
        opacity:leaving?0:1,
        transition:"opacity 450ms cubic-bezier(.4,0,.2,1)",
        pointerEvents:"none"
      }}
    >
      <div
        style={{
          width:"clamp(150px, 22vw, 220px)",
          aspectRatio:"1 / 1",
          display:"grid",
          placeItems:"center",
          transform:leaving?"scale(.97)":"scale(1)",
          transition:"transform 450ms cubic-bezier(.4,0,.2,1)"
        }}
      >
        <img
          src="/intro-grid.svg"
          alt=""
          draggable="false"
          style={{width:"100%",height:"100%",display:"block",objectFit:"contain"}}
        />
      </div>
    </div>
  );
}
