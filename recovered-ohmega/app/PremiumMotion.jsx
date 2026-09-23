"use client";

import {useEffect,useMemo,useRef,useState} from "react";

const ACCENTS={
  "ufls-smartgrid":"#7BE495",
  "wave-energy-conversion":"#FF79B7",
  "railway-traction-25kv":"#FFD95A",
  "digital-twin-liion-battery":"#8F7CFF",
  "digital-twin-electric-drive":"#63D7E8",
};

function useReducedMotion(){
  const[reduce,setReduce]=useState(false);
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>setReduce(mq.matches);
    update();mq.addEventListener?.("change",update);
    return()=>mq.removeEventListener?.("change",update);
  },[]);
  return reduce;
}

export function HeroFluidField(){
  const canvasRef=useRef(null);
  const reduce=useReducedMotion();

  useEffect(()=>{
    if(reduce)return;
    const canvas=canvasRef.current;
    if(!canvas)return;
    let raf=0,observer=null,visible=true,disposed=false,startTimer=0;
    let gl=null,program=null,buffer=null,start=performance.now();

    const init=()=>{
      if(disposed)return;
      gl=canvas.getContext("webgl",{alpha:true,antialias:false,powerPreference:"low-power"});
      if(!gl)return;
      const vs=gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs,`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`);
      gl.compileShader(vs);
      const fs=gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs,`
        precision mediump float;
        uniform vec2 r;
        uniform float t;
        float blob(vec2 p, vec2 c, float s){return exp(-dot(p-c,p-c)*s);}
        void main(){
          vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
          float b1=blob(uv,vec2(-.45+.12*sin(t*.23),.12+.16*cos(t*.17)),2.8);
          float b2=blob(uv,vec2(.38+.18*cos(t*.19),-.18+.13*sin(t*.21)),3.2);
          float b3=blob(uv,vec2(.02+.12*sin(t*.11),.48+.08*cos(t*.15)),4.0);
          vec3 paper=vec3(1.0);
          vec3 green=vec3(.10,.42,.29);
          vec3 lilac=vec3(.58,.48,1.0);
          vec3 cyan=vec3(.28,.78,.86);
          vec3 col=paper;
          col=mix(col,green,.16*b1);
          col=mix(col,lilac,.12*b2);
          col=mix(col,cyan,.10*b3);
          float vign=1.-.08*smoothstep(.35,1.2,length(uv));
          gl_FragColor=vec4(col*vign,.96);
        }
      `);
      gl.compileShader(fs);
      program=gl.createProgram();
      gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
      buffer=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const p=gl.getAttribLocation(program,"p");
      gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
      const ur=gl.getUniformLocation(program,"r"),ut=gl.getUniformLocation(program,"t");

      const resize=()=>{
        const dpr=Math.min(window.devicePixelRatio||1,window.innerWidth<640?1:1.5);
        const rect=canvas.getBoundingClientRect();
        const w=Math.max(1,Math.floor(rect.width*dpr));
        const h=Math.max(1,Math.floor(rect.height*dpr));
        if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
      };

      const draw=(now)=>{
        if(disposed||!gl)return;
        if(visible){
          resize();
          gl.useProgram(program);
          gl.uniform2f(ur,canvas.width,canvas.height);
          gl.uniform1f(ut,(now-start)/1000);
          gl.drawArrays(gl.TRIANGLES,0,6);
        }
        raf=requestAnimationFrame(draw);
      };

      observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:0});
      observer.observe(canvas);
      window.addEventListener("resize",resize,{passive:true});
      draw(performance.now());

      return()=>window.removeEventListener("resize",resize);
    };

    let removeResize=()=>{};
    const kickoff=()=>{const cleanup=init();if(cleanup)removeResize=cleanup;};
    if("requestIdleCallback" in window){
      const id=window.requestIdleCallback(kickoff,{timeout:700});
      startTimer=()=>window.cancelIdleCallback(id);
    }else{
      const id=setTimeout(kickoff,120);
      startTimer=()=>clearTimeout(id);
    }

    return()=>{
      disposed=true;
      if(typeof startTimer==="function")startTimer();
      cancelAnimationFrame(raf);
      observer?.disconnect();
      removeResize();
      if(gl){
        if(buffer)gl.deleteBuffer(buffer);
        if(program)gl.deleteProgram(program);
      }
    };
  },[reduce]);

  return <canvas ref={canvasRef} className="premiumHeroShader" aria-hidden="true"/>;
}

export function OmegaDepth(){
  const ref=useRef(null);
  const reduce=useReducedMotion();
  useEffect(()=>{
    const el=ref.current;
    if(!el||reduce||!window.matchMedia("(pointer:fine)").matches)return;
    let frame=0,tx=0,ty=0,cx=0,cy=0;
    const paint=()=>{
      frame=0;
      cx+=(tx-cx)*.16;cy+=(ty-cy)*.16;
      el.style.setProperty("--omega-rx",`${cy.toFixed(2)}deg`);
      el.style.setProperty("--omega-ry",`${(-cx).toFixed(2)}deg`);
      if(Math.abs(tx-cx)>.01||Math.abs(ty-cy)>.01)frame=requestAnimationFrame(paint);
    };
    const move=(e)=>{
      const r=el.getBoundingClientRect();
      tx=((e.clientX-r.left)/r.width-.5)*8;
      ty=((e.clientY-r.top)/r.height-.5)*-7;
      if(!frame)frame=requestAnimationFrame(paint);
    };
    const leave=()=>{tx=0;ty=0;if(!frame)frame=requestAnimationFrame(paint);};
    el.addEventListener("pointermove",move,{passive:true});
    el.addEventListener("pointerleave",leave,{passive:true});
    return()=>{cancelAnimationFrame(frame);el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",leave);};
  },[reduce]);

  return <div ref={ref} className="omegaDepth" aria-hidden="true">
    <div className="omegaDepthStack">
      {Array.from({length:8},(_,i)=><span className="omegaLayer" style={{"--layer":i}} key={i}>Ω</span>)}
      <span className="omegaFace">Ω</span>
    </div>
  </div>;
}

function MiniFrame({children,label,active}){
  return <div className={`miniVisual${active?" isActive":""}`}>
    <span className="miniLabel">{label}</span>
    {children}
  </div>;
}

export function ProjectMiniVisual({slug}){
  const ref=useRef(null);
  const[active,setActive]=useState(false);
  const reduce=useReducedMotion();
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>setActive(e.isIntersecting),{threshold:.25});
    io.observe(el);return()=>io.disconnect();
  },[]);
  const on=active&&!reduce;
  let visual=null;
  if(slug==="ufls-smartgrid")visual=<MiniFrame active={on} label="ILLUSTRATIVE · UFLS"><svg viewBox="0 0 360 170"><path className="axis" d="M20 135H340M35 24V145"/><path className="signal" d="M35 55 C80 52 91 59 112 84 S156 121 188 123 S230 95 252 88 S298 78 332 68"/><path className="threshold" d="M35 99H332"/><g className="steps"><rect x="108" y="100" width="28" height="25"/><rect x="141" y="93" width="28" height="32"/><rect x="174" y="85" width="28" height="40"/></g></svg></MiniFrame>;
  else if(slug==="wave-energy-conversion")visual=<MiniFrame active={on} label="ILLUSTRATIVE · dq / PMSG"><svg viewBox="0 0 360 170"><path className="axis" d="M20 135H340M35 24V145"/><path className="signal waveA" d="M35 85 C58 35 81 35 104 85 S150 135 173 85 S219 35 242 85 S288 135 332 85"/><path className="signal waveB" d="M35 92 C58 142 81 142 104 92 S150 42 173 92 S219 142 242 92 S288 42 332 92"/></svg></MiniFrame>;
  else if(slug==="railway-traction-25kv")visual=<MiniFrame active={on} label="ILLUSTRATIVE · TRACTION"><svg viewBox="0 0 360 170"><path className="axis" d="M20 135H340M35 24V145"/><path className="signal" d="M35 125 L92 72 L168 58 L226 58 L274 102 L332 120"/><path className="regen" d="M226 112 C250 87 270 85 294 110"/><circle className="marker" cx="226" cy="58" r="5"/><circle className="marker" cx="294" cy="110" r="5"/></svg></MiniFrame>;
  else if(slug==="digital-twin-liion-battery")visual=<MiniFrame active={on} label="ILLUSTRATIVE · SOC"><svg viewBox="0 0 360 170"><path className="axis" d="M20 135H340M35 24V145"/><path className="signal" d="M35 45 C92 54 112 58 145 75 S210 96 243 101 S292 109 332 118"/><path className="relax" d="M205 101 C222 87 239 87 256 99"/><g className="cells"><rect x="278" y="34" width="18" height="36"/><rect x="300" y="34" width="18" height="36"/><rect x="322" y="34" width="18" height="36"/></g></svg></MiniFrame>;
  else visual=<MiniFrame active={on} label="ILLUSTRATIVE · CASCADE PI"><svg viewBox="0 0 360 170"><path className="axis" d="M20 135H340M35 24V145"/><path className="target" d="M35 58H332"/><path className="signal" d="M35 128 C58 128 72 128 84 120 C102 108 96 42 126 48 C145 52 142 73 163 66 C190 58 208 58 332 58"/><g className="loop"><rect x="240" y="88" width="44" height="22"/><path d="M284 99H318M318 99V122H240V110"/></g></svg></MiniFrame>;
  return <div ref={ref}>{visual}</div>;
}

export function ThickCard({project,lang,index}){
  const ref=useRef(null);
  const reduce=useReducedMotion();
  const accent=ACCENTS[project.slug]||"#7BE495";
  const shades=useMemo(()=>Array.from({length:8},(_,i)=>i),[]);
  useEffect(()=>{
    const el=ref.current;
    if(!el||reduce||!window.matchMedia("(pointer:fine)").matches)return;
    let frame=0,rx=0,ry=0,trx=0,tryy=0;
    const paint=()=>{
      frame=0;
      rx+=(trx-rx)*.18;ry+=(tryy-ry)*.18;
      el.style.setProperty("--card-rx",`${rx.toFixed(2)}deg`);
      el.style.setProperty("--card-ry",`${ry.toFixed(2)}deg`);
      if(Math.abs(trx-rx)>.01||Math.abs(tryy-ry)>.01)frame=requestAnimationFrame(paint);
    };
    const move=(e)=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      trx=-y*4.2;tryy=x*5.0;
      el.style.setProperty("--shine-x",`${(x+.5)*100}%`);
      el.style.setProperty("--shine-y",`${(y+.5)*100}%`);
      if(!frame)frame=requestAnimationFrame(paint);
    };
    const leave=()=>{trx=0;tryy=0;if(!frame)frame=requestAnimationFrame(paint);};
    el.addEventListener("pointermove",move,{passive:true});el.addEventListener("pointerleave",leave,{passive:true});
    return()=>{cancelAnimationFrame(frame);el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",leave);};
  },[reduce]);

  const tags=project.tags||[];
  return <article ref={ref} className="thickCardWrap motionItem" style={{"--accent":accent,"--idle-rot":`${[-2.7,2.2,-1.3,2.8,-2][index]||0}deg`}}>
    <a className="thickCard" href={`/projects/${project.slug}`}>
      <span className="thickShine" aria-hidden="true"></span>
      {shades.map(i=><span className="thickLayer" style={{"--layer":i}} aria-hidden="true" key={i}></span>)}
      <div className="thickFace">
        <div className="thickTop">
          <span>{project.no}</span>
          <span>{project.field[lang]}</span>
        </div>
        <ProjectMiniVisual slug={project.slug}/>
        <div className="thickCopy">
          <h3>{project.title}</h3>
          <p>{project.body[lang]}</p>
        </div>
        <div className="thickBottom">
          <span>{lang==="fr"?"Ouvrir le projet":"Open case study"}</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </a>
  </article>;
}

export function AnimatedStats({lang}){
  const ref=useRef(null);
  const[shown,setShown]=useState(false);
  const[vals,setVals]=useState([0,0,0]);
  const reduce=useReducedMotion();
  const finals=[17,1,3];
  const labels=lang==="fr"
    ?["Projets d’ingénierie","Publication de recherche","Expériences d’ingénierie"]
    :["Engineering projects","Research publication","Engineering experiences"];

  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);io.disconnect();}},{threshold:.35});
    io.observe(el);return()=>io.disconnect();
  },[]);

  useEffect(()=>{
    if(!shown)return;
    if(reduce){setVals(finals);return;}
    const start=performance.now(),dur=760;
    let raf=0;
    const tick=(now)=>{
      const p=Math.min(1,(now-start)/dur);
      const eased=1-Math.pow(1-p,3);
      setVals(finals.map(v=>Math.round(v*eased)));
      if(p<1)raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[shown,reduce]);

  return <dl ref={ref} className="profileStats premiumStats">{vals.map((v,i)=><div className="profileStat" key={labels[i]}><dt>{i===0?`${v}+`:v}</dt><dd>{labels[i]}</dd></div>)}</dl>;
}
