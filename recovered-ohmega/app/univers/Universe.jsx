'use client';

import { useEffect, useRef, useState } from 'react';
import { readLanguage, saveLanguage } from '../browser-preferences.mjs';

const scenes = [
  { id: 'mesurer', project: 'SmartSense', href: '/projects/smartsense', tag: 'KiCad · Fusion · Instrumentation',
    fr: { verb: 'Mesurer.', eyebrow: 'Du monde physique au signal', title: 'Comprendre ce que le capteur voit.', text: 'Entrer dans le boîtier, suivre la chaîne de mesure et distinguer une perturbation réelle d’un défaut de capteur.', caption: 'Vue CAO originale du boîtier M2 et de son intégration électronique.', status: 'Conception CAO · validation logicielle ; caractérisation physique à venir', points: ['Capteurs IR / ultrasons', 'Conditionnement du signal', 'Diagnostic de la chaîne de mesure'] },
    en: { verb: 'Sense.', eyebrow: 'From the physical world to a signal', title: 'Understand what the sensor sees.', text: 'Step inside the enclosure, follow the measurement chain and distinguish a real disturbance from a sensor fault.', caption: 'Original CAD view of the M2 enclosure and its electronics integration.', status: 'CAD design · software validation; physical characterisation pending', points: ['IR / ultrasonic sensors', 'Signal conditioning', 'Measurement-chain diagnostics'] } },
  { id: 'proteger', project: 'Smart-grid UFLS', href: '/projects/ufls-smartgrid', tag: 'MATLAB · Simulink · Stateflow',
    fr: { verb: 'Protéger.', eyebrow: 'Du signal à la décision', title: 'Préserver l’équilibre du réseau.', text: 'Observer la fréquence, décider d’un délestage par étapes, puis organiser la restauration : la logique de protection devient lisible.', caption: 'Évocation du réseau et de ses départs : schéma de principe illustratif.', status: 'Modèle UFLS · automate Stateflow à six états', points: ['Surveillance de fréquence', 'Délestage sélectif', 'Restauration supervisée'] },
    en: { verb: 'Protect.', eyebrow: 'From a signal to a decision', title: 'Preserve the balance of the grid.', text: 'Monitor frequency, decide on staged load shedding, then organise restoration: make the protection logic understandable.', caption: 'An illustrative view of the grid and its feeders, not live telemetry.', status: 'UFLS model · six-state Stateflow automaton', points: ['Frequency monitoring', 'Selective load shedding', 'Supervised restoration'] } },
  { id: 'convertir', project: 'Railway traction · 25 kV AC', href: '/projects/railway-traction-25kv', tag: 'MATLAB · Power electronics · Control',
    fr: { verb: 'Convertir.', eyebrow: 'De l’énergie au mouvement', title: 'Faire circuler l’énergie dans les deux sens.', text: 'De la caténaire au moteur, explorer la conversion et la commande. Au freinage, étudier le retour d’énergie quand le réseau peut l’absorber.', caption: 'Évocation de la chaîne de traction ; les flux représentés sont illustratifs.', status: 'Modèle de traction 25 kV AC · freinage régénératif', points: ['Alimentation par caténaire', 'Conversion et commande', 'Récupération au freinage'] },
    en: { verb: 'Convert.', eyebrow: 'From energy to motion', title: 'Let energy flow in both directions.', text: 'From the overhead line to the motor, explore conversion and control. Under braking, study energy return when the network can absorb it.', caption: 'An illustrative traction chain; the depicted energy flows are conceptual.', status: '25 kV AC traction model · regenerative braking', points: ['Overhead-line supply', 'Conversion and control', 'Regenerative braking'] } },
];

function GridWorld() {
  return <svg className="u-world-drawing" viewBox="0 0 800 570" aria-hidden="true">
    <defs><linearGradient id="u-tower" x2="1" y2="1"><stop stopColor="#e4eef8"/><stop offset="1" stopColor="#a5bdd4"/></linearGradient><linearGradient id="u-relay" x2="1" y2="1"><stop stopColor="#164f84"/><stop offset="1" stopColor="#0c2643"/></linearGradient></defs>
    <path d="M55 367 377 174 752 371 427 560Z" fill="#dae5f0"/><path d="M55 355 377 162 752 359 427 548Z" fill="#f4f8fc" stroke="#bed1e3"/>
    <g fill="none" stroke="#b7cadb" strokeWidth="1">{[0,1,2,3,4,5].map(i=><path key={i} d={`M${100+i*53} ${328-i*32}l370 194M${105+i*60} ${380+i*32}l322-193`}/>)}</g>
    <g stroke="#486983" strokeWidth="4" fill="none"><path d="M164 306 201 138 238 306M177 245h48M185 211h32M191 179h20M168 161h66M158 191h86M151 221h100M177 245l48 40M186 211l39 34M191 179l26 32M185 245l-7 40"/><path d="M161 164Q290 202 370 183M162 194Q291 229 370 213M239 194Q304 223 370 213" strokeWidth="2"/></g>
    <path d="m336 233 71-42 89 48-71 43Z" fill="#427cb2"/><path d="m336 233 89 49v119l-89-49Z" fill="#164875"/><path d="m425 282 71-43v119l-71 43Z" fill="#0c2d4b"/>
    <path d="m350 259 58 33v45l-58-32Z" fill="#d3edf7"/><path d="m360 288 9-6 10 15 11-3 10 9" fill="none" stroke="#15729b" strokeWidth="3"/>
    <g fill="#93b7d4">{[0,1,2].map(i=><path key={i} d={`m350 ${327+i*9} 58 33v3l-58-33Z`}/>)}</g>
    <g stroke="#297db5" strokeWidth="4" fill="none"><path className="u-energy-path" d="m427 401 58 32 124-74M486 433l-50 30M486 433l111 59"/></g>
    <g><path d="m559 318 44-27 55 30-44 27Z" fill="#acc5da"/><path d="m559 318 55 30v55l-55-30Z" fill="#d8e5ef"/><path d="m614 348 44-27v55l-44 27Z" fill="#92b0c9"/><path d="m577 341 19 11v23l-19-11Z" fill="#2e638c"/></g>
    <g><path d="m385 425 44-27 55 30-44 27Z" fill="#acc5da"/><path d="m385 425 55 30v55l-55-30Z" fill="#d8e5ef"/><path d="m440 455 44-27v55l-44 27Z" fill="#92b0c9"/><path d="m402 448 19 11v23l-19-11Z" fill="#2e638c"/></g>
    <g><path d="m574 444 44-27 55 30-44 27Z" fill="#acc5da"/><path d="m574 444 55 30v55l-55-30Z" fill="#d8e5ef"/><path d="m629 474 44-27v55l-44 27Z" fill="#92b0c9"/><path d="m591 467 19 11v23l-19-11Z" fill="#2e638c"/></g>
  </svg>;
}

function TrainWorld() {
  return <svg className="u-world-drawing" viewBox="0 0 800 570" aria-hidden="true">
    <defs><linearGradient id="u-train" x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#c5d7e5"/></linearGradient></defs>
    <path d="m35 385 550-285 182 111-550 285Z" fill="#e2eaf1"/><path d="m35 374 550-285 182 111-550 285Z" fill="#f3f7fa" stroke="#c5d4e0"/>
    <g stroke="#94aabe" strokeWidth="5">{[0,1,2,3,4,5,6,7,8].map(i=><path key={i} d={`m${78+i*59} ${371-i*30} 108 66`}/>)}</g>
    <path d="m65 375 550-285M168 435l550-285" fill="none" stroke="#476079" strokeWidth="5"/>
    <g className="u-train-body"><path d="m192 328 308-161 91 44-305 165Z" fill="#e0eaf1"/><path d="m192 328 94 48v61l-118-59Z" fill="url(#u-train)" stroke="#b1c7d8"/><path d="m286 376 305-165v61L286 437Z" fill="#c5d7e5" stroke="#a3bcd0"/><path d="m192 338 66 33v33l-76-38Z" fill="#173e61"/><path d="m310 372 253-137v24L310 396Z" fill="#17496d"/>
    <g stroke="#b5d0e1" strokeWidth="5"><path d="m348 350v24M387 329v24M426 308v24M465 287v24M504 266v24M543 245v24"/></g><path d="m286 415 305-165v10L286 425Z" fill="#287db8"/><path d="m396 231 21-29 30 8-15 29M410 202l37 8" fill="none" stroke="#385774" strokeWidth="4"/></g>
    <g stroke="#476985" fill="none"><path d="M134 363V132l105-53M134 147l133 61M570 137V26l91 45" strokeWidth="5"/><path d="m199 110 463-48M199 135l463-48" strokeWidth="2"/><path d="m267 208 395-121M267 196l395-121" strokeWidth="2"/></g>
    <path className="u-energy-path" d="m355 401 190 102 158-82" fill="none" stroke="#287db8" strokeWidth="4"/>
    <path d="m641 362 47-26 61 32-47 28Z" fill="#a9c6db"/><path d="m641 362 61 34v69l-61-34Z" fill="#e2edf4" stroke="#abc2d3"/><path d="m702 396 47-28v69l-47 28Z" fill="#7198b7"/><path d="m654 384 34 19v26l-34-19Z" fill="#2c6189"/>
  </svg>;
}

export default function Universe() {
  const [lang, setLang] = useState('en');
  const [active, setActive] = useState(0);
  const wrapper = useRef(null);
  const sectionRefs = useRef([]);
  const reduced = useRef(false);
  const fr = lang === 'fr';

  useEffect(() => { setLang(readLanguage()); }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => { reduced.current = preference.matches; };
    updatePreference();
    preference.addEventListener('change', updatePreference);
    let frame = 0;
    const update = () => {
      frame = 0;
      let closest = 0;
      let distance = Infinity;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (d < distance) { distance = d; closest = index; }
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        section.style.setProperty('--u-travel', reduced.current ? '0' : progress.toFixed(3));
      });
      setActive(closest);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); preference.removeEventListener('change', updatePreference); };
  }, []);

  function changeLanguage() { const next = fr ? 'en' : 'fr'; setLang(next); saveLanguage(next); }
  function go(index) {
    const section = sectionRefs.current[index];
    if (!section) return;
    section.scrollIntoView({ behavior: reduced.current ? 'instant' : 'smooth', block: 'start' });
    section.querySelector('h2')?.focus({ preventScroll: true });
    window.history.replaceState(null, '', `#${scenes[index].id}`);
  }

  return <div className="u-universe" lang={lang} ref={wrapper}>
    <a className="u-skip" href="#u-main">{fr ? 'Aller au parcours' : 'Skip to the journey'}</a>
    <header className="u-header">
      <a className="u-brand" href="/" aria-label={fr ? 'OHMEGA — retour au portfolio' : 'OHMEGA — back to portfolio'}><span aria-hidden="true">Ω</span> OHMEGA</a>
      <span className="u-header-title">{fr ? 'Un univers d’ingénierie' : 'An engineering world'}</span>
      <div className="u-header-actions"><a href="/">Portfolio</a><button onClick={changeLanguage} type="button" aria-label={fr ? 'Switch to English' : 'Passer en français'}>{fr ? 'EN' : 'FR'}</button></div>
    </header>

    <main id="u-main" tabIndex={-1} onKeyDown={event => {
      if (event.target.tagName !== 'MAIN' && event.target.tagName !== 'H2') return;
      const current = event.target.tagName === 'H2' ? Number(event.target.id.replace('u-title-', '')) : active;
      if (!Number.isInteger(current)) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); go(Math.min(2, current + 1)); }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); go(Math.max(0, current - 1)); }
    }}>
      <div className="u-intro"><p className="u-kicker">Birane DIAW · {fr ? 'Génie électrique & systèmes intelligents' : 'Electrical engineering & intelligent systems'}</p><h1>{fr ? <>Du signal.<br/>À la puissance.</> : <>From signal.<br/>To power.</>}</h1><div className="u-intro-aside"><p>{fr ? 'Trois projets. Trois regards sur les systèmes qui mesurent, protègent et mettent en mouvement.' : 'Three projects. Three ways to explore systems that sense, protect and set the world in motion.'}</p><button className="u-text-button" type="button" onClick={() => go(0)}>{fr ? 'Commencer l’exploration' : 'Begin the journey'} <span aria-hidden="true">↓</span></button></div></div>
      {scenes.map((scene, index) => { const copy = scene[lang]; return <section className={`u-chapter u-chapter-${index}`} id={scene.id} key={scene.id} ref={node => { sectionRefs.current[index] = node; }} aria-labelledby={`u-title-${index}`}>
        <div className="u-scene-frame">
          <div className="u-scene-copy"><p className="u-kicker">{copy.eyebrow}</p><h2 tabIndex={-1} id={`u-title-${index}`}>{copy.verb}</h2><h3>{copy.title}</h3><p className="u-description">{copy.text}</p><a className="u-study" href={scene.href}>{fr ? 'Voir l’étude' : 'Open the case study'}<span aria-hidden="true">↗</span></a><p className="u-tools">{scene.tag}</p></div>
          <figure className={`u-scene-visual u-visual-${index}`}>
            <div className="u-visual-meta"><span>{scene.project}</span><span className="u-visual-label">{index === 0 ? 'CAO / CAD' : fr ? 'Vue de principe' : 'Concept view'}</span></div>
            <div className="u-stage"><div className="u-orbit u-orbit-a"/><div className="u-orbit u-orbit-b"/><div className="u-world">{index === 0 ? <div className="u-cad-stack"><img className="u-cad u-cad-closed" src="/project-images/smartsense/assembly-closed.webp" alt="" aria-hidden="true" width="1280" height="880"/><img className="u-cad" src="/project-images/smartsense/assembly-open.webp" alt={fr ? 'CAO du boîtier SmartSense ouvert avec la carte électronique intégrée' : 'CAD of the open SmartSense enclosure with the integrated circuit board'} width="1280" height="880" loading="eager"/></div> : index === 1 ? <GridWorld/> : <TrainWorld/>}</div><span className="u-callout u-callout-a">{copy.points[0]}</span><span className="u-callout u-callout-b">{copy.points[1]}</span><span className="u-callout u-callout-c">{copy.points[2]}</span></div>
            <figcaption>{copy.caption}</figcaption>
          </figure>
          <div className="u-scene-footer"><span>{copy.status}</span><span>{fr ? 'Défiler pour explorer' : 'Scroll to explore'} <span aria-hidden="true">↓</span></span></div>
        </div>
      </section>; })}
      <footer className="u-outro"><p className="u-kicker">{fr ? 'L’exploration continue' : 'Keep exploring'}</p><h2>{fr ? 'Derrière chaque visuel, une étude.' : 'Behind each scene, an engineering study.'}</h2><p>{fr ? 'Ce parcours relie des compétences. Chaque projet conserve ses propres hypothèses, modèles et résultats dans son dossier technique.' : 'This journey connects skills. Each project has its own assumptions, models and results, documented in its case study.'}</p><a className="u-study" href="/#projects">{fr ? 'Retrouver tous les projets' : 'Explore all projects'}</a><a className="u-contact" href="mailto:diawbirane10@gmail.com">{fr ? 'Parlons ingénierie' : 'Let’s talk engineering'}</a></footer>
    </main>

    <nav className="u-chapter-nav" aria-label={fr ? 'Chapitres du parcours' : 'Journey chapters'}><button className="u-step" type="button" onClick={() => go(Math.max(0, active - 1))} disabled={active === 0} aria-label={fr ? 'Chapitre précédent' : 'Previous chapter'}>←</button><div className="u-chapter-links">{scenes.map((scene, index) => <button type="button" key={scene.id} onClick={() => go(index)} aria-current={active === index ? 'step' : undefined}><span className="u-chapter-dot"/>{scene[lang].verb.replace('.', '')}</button>)}</div><button className="u-step" type="button" onClick={() => go(Math.min(2, active + 1))} disabled={active === 2} aria-label={fr ? 'Chapitre suivant' : 'Next chapter'}>→</button><div className="u-nav-progress" style={{ width: `${(active + 1) / 3 * 100}%` }} aria-hidden="true"/></nav>
  </div>;
}
