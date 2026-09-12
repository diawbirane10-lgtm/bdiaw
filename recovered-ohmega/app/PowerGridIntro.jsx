"use client";

import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";

export default function PowerGridIntro(){
  const pathname=usePathname();
  const [visible,setVisible]=useState(true);

  useEffect(()=>{
    if(pathname!=="/") return;
    setVisible(true);
    const timer=window.setTimeout(()=>setVisible(false),3400);
    return()=>window.clearTimeout(timer);
  },[pathname]);

  if(pathname!=="/"||!visible) return null;

  return(
    <div className="gridIntro" role="presentation" aria-hidden="true">
      <button className="gridIntroSkip" type="button" onClick={()=>setVisible(false)} aria-label="Skip intro">Skip</button>
      <div className="gridIntroAmbient gridIntroAmbientA"/>
      <div className="gridIntroAmbient gridIntroAmbientB"/>
      <div className="gridIntroStage">
        <div className="gridIntroEyebrow">ELECTRICAL ENGINEERING · POWER SYSTEMS</div>
        <svg className="gridIntroSvg" viewBox="0 0 1200 610" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="towerMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f8fafc"/>
              <stop offset="0.45" stopColor="#8fa4ba"/>
              <stop offset="1" stopColor="#334155"/>
            </linearGradient>
            <linearGradient id="groundGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2563eb" stopOpacity=".2"/>
              <stop offset="1" stopColor="#2563eb" stopOpacity="0"/>
            </linearGradient>
            <filter id="towerShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="12" dy="18" stdDeviation="10" floodColor="#000" floodOpacity=".5"/>
            </filter>
            <filter id="blueGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <ellipse cx="600" cy="520" rx="510" ry="68" fill="url(#groundGlow)" opacity=".65"/>
          <path className="gridHorizon" d="M40 514 C290 492 910 492 1160 514"/>

          <g className="tower towerLeft" filter="url(#towerShadow)" transform="translate(120 86)">
            <path d="M145 408 L245 408 L218 145 L172 145 Z"/>
            <path d="M172 145 L195 48 L218 145"/>
            <path d="M126 184 H264 M112 225 H278 M99 270 H291"/>
            <path d="M145 408 L218 145 M245 408 L172 145 M126 184 L278 225 M264 184 L112 225 M112 225 L291 270 M278 225 L99 270 M99 270 L245 408 M291 270 L145 408"/>
            <path d="M145 408 H245 M132 430 H258"/>
            <path d="M112 225 L76 245 M278 225 L314 245 M99 270 L60 292 M291 270 L330 292"/>
            <circle cx="76" cy="245" r="5"/><circle cx="314" cy="245" r="5"/><circle cx="60" cy="292" r="5"/><circle cx="330" cy="292" r="5"/>
          </g>

          <g className="tower towerRight" filter="url(#towerShadow)" transform="translate(790 86)">
            <path d="M145 408 L245 408 L218 145 L172 145 Z"/>
            <path d="M172 145 L195 48 L218 145"/>
            <path d="M126 184 H264 M112 225 H278 M99 270 H291"/>
            <path d="M145 408 L218 145 M245 408 L172 145 M126 184 L278 225 M264 184 L112 225 M112 225 L291 270 M278 225 L99 270 M99 270 L245 408 M291 270 L145 408"/>
            <path d="M145 408 H245 M132 430 H258"/>
            <path d="M112 225 L76 245 M278 225 L314 245 M99 270 L60 292 M291 270 L330 292"/>
            <circle cx="76" cy="245" r="5"/><circle cx="314" cy="245" r="5"/><circle cx="60" cy="292" r="5"/><circle cx="330" cy="292" r="5"/>
          </g>

          <path className="conductor conductorBase" d="M434 331 C560 388 642 388 766 331"/>
          <path className="conductor conductorBase" d="M450 284 C565 335 637 335 750 284"/>
          <path className="conductor conductorBase" d="M432 237 C558 283 644 283 768 237"/>

          <path className="conductor conductorFlow flowOne" d="M434 331 C560 388 642 388 766 331"/>
          <path className="conductor conductorFlow flowTwo" d="M450 284 C565 335 637 335 750 284"/>
          <path className="conductor conductorFlow flowThree" d="M432 237 C558 283 644 283 768 237"/>

          <g className="gridTelemetry telemetryA">
            <rect x="512" y="126" width="176" height="54" rx="16"/>
            <text x="536" y="149">TRANSMISSION</text>
            <text className="telemetryValue" x="536" y="168">225 kV</text>
          </g>
          <g className="gridTelemetry telemetryB">
            <rect x="465" y="430" width="132" height="46" rx="14"/>
            <text x="487" y="451">POWER FLOW</text>
            <circle className="statusDot" cx="568" cy="449" r="4"/>
            <text className="telemetryValue small" x="487" y="467">STABLE</text>
          </g>
          <g className="gridTelemetry telemetryC">
            <rect x="615" y="430" width="144" height="46" rx="14"/>
            <text x="637" y="451">PROTECTION</text>
            <circle className="statusDot" cx="726" cy="449" r="4"/>
            <text className="telemetryValue small" x="637" y="467">SYNCED</text>
          </g>
        </svg>

        <div className="gridIntroProfile">
          <span>HIGH-POWER ELECTRICAL SYSTEMS</span>
          <span>CONTROL &amp; AUTOMATION</span>
          <span>CRITICAL ELECTRICAL ARCHITECTURES</span>
        </div>
      </div>
      <div className="gridIntroSignature">
        <strong>Birane DIAW</strong>
        <span>Electrical Engineering &amp; Intelligent Systems</span>
      </div>
    </div>
  );
}
