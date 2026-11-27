'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { readLanguage, saveLanguage } from '../browser-preferences.mjs';

const LiveScene = dynamic(() => import('./LiveScene'), { ssr: false, loading: () => <div className="u-live-loading" role="status">3D…</div> });

const scenes = [
  { id: 'mesurer', project: 'SmartSense', href: '/projects/smartsense', tag: 'KiCad · Fusion · Instrumentation',
    fr: { verb: 'Mesurer.', eyebrow: 'Du monde physique au signal', title: 'Comprendre ce que le capteur voit.', text: 'Entrer dans le boîtier, suivre la chaîne de mesure et distinguer une perturbation réelle d’un défaut de capteur.', caption: 'Vue 3D interactive de principe. Les vues CAO originales sont disponibles dans l’étude.', status: 'Conception CAO · validation logicielle ; caractérisation physique à venir', points: ['Capteurs IR / ultrasons', 'Conditionnement du signal', 'Diagnostic de la chaîne de mesure'] },
    en: { verb: 'Sense.', eyebrow: 'From the physical world to a signal', title: 'Understand what the sensor sees.', text: 'Step inside the enclosure, follow the measurement chain and distinguish a real disturbance from a sensor fault.', caption: 'Interactive conceptual 3D view. Original CAD views are available in the case study.', status: 'CAD design · software validation; physical characterisation pending', points: ['IR / ultrasonic sensors', 'Signal conditioning', 'Measurement-chain diagnostics'] } },
  { id: 'proteger', project: 'Smart-grid UFLS', href: '/projects/ufls-smartgrid', tag: 'MATLAB · Simulink · Stateflow',
    fr: { verb: 'Protéger.', eyebrow: 'Du signal à la décision', title: 'Préserver l’équilibre du réseau.', text: 'Observer la fréquence, décider d’un délestage par étapes, puis organiser la restauration : la logique de protection devient lisible.', caption: 'Évocation du réseau et de ses départs : schéma de principe illustratif.', status: 'Modèle UFLS · automate Stateflow à six états', points: ['Surveillance de fréquence', 'Délestage sélectif', 'Restauration supervisée'] },
    en: { verb: 'Protect.', eyebrow: 'From a signal to a decision', title: 'Preserve the balance of the grid.', text: 'Monitor frequency, decide on staged load shedding, then organise restoration: make the protection logic understandable.', caption: 'An illustrative view of the grid and its feeders, not live telemetry.', status: 'UFLS model · six-state Stateflow automaton', points: ['Frequency monitoring', 'Selective load shedding', 'Supervised restoration'] } },
  { id: 'convertir', project: 'Railway traction · 25 kV AC', href: '/projects/railway-traction-25kv', tag: 'MATLAB · Power electronics · Control',
    fr: { verb: 'Convertir.', eyebrow: 'De l’énergie au mouvement', title: 'Faire circuler l’énergie dans les deux sens.', text: 'De la caténaire au moteur, explorer la conversion et la commande. Au freinage, étudier le retour d’énergie quand le réseau peut l’absorber.', caption: 'Évocation de la chaîne de traction ; les flux représentés sont illustratifs.', status: 'Modèle de traction 25 kV AC · freinage régénératif', points: ['Alimentation par caténaire', 'Conversion et commande', 'Récupération au freinage'] },
    en: { verb: 'Convert.', eyebrow: 'From energy to motion', title: 'Let energy flow in both directions.', text: 'From the overhead line to the motor, explore conversion and control. Under braking, study energy return when the network can absorb it.', caption: 'An illustrative traction chain; the depicted energy flows are conceptual.', status: '25 kV AC traction model · regenerative braking', points: ['Overhead-line supply', 'Conversion and control', 'Regenerative braking'] } },
];

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
            <div className="u-visual-meta"><span>{scene.project}</span><span className="u-visual-label">{fr ? '3D interactive · vue de principe' : 'Interactive 3D · concept view'}</span></div>
            <LiveScene index={index} lang={lang}/>
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
