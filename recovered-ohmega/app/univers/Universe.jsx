'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { scenes } from './catalog.mjs';
import { readLanguage, saveLanguage } from '../browser-preferences.mjs';

const LiveScene = dynamic(() => import('./LiveScene'), { ssr: false, loading: () => <div className="u-live-loading" role="status">3D…</div> });



export default function Universe() {
  const [lang, setLang] = useState('en');
  const [active, setActive] = useState(0);
  const wrapper = useRef(null);
  const sectionRefs = useRef([]);
  const reduced = useRef(false);
  const initialAnchorAligned = useRef(false);
  const fr = lang === 'fr';

  useEffect(() => { setLang(readLanguage()); const id = decodeURIComponent(window.location.hash.slice(1)); const index = scenes.findIndex(scene => scene.id === id); if (index >= 0) { requestAnimationFrame(() => sectionRefs.current[index]?.scrollIntoView({ block: 'start', behavior: 'instant' })); } }, []);
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
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); go(Math.min(scenes.length - 1, current + 1)); }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); go(Math.max(0, current - 1)); }
    }}>
      <div className="u-intro"><p className="u-kicker">Birane DIAW · {fr ? 'Génie électrique & systèmes intelligents' : 'Electrical engineering & intelligent systems'}</p><h1>{fr ? <>Du signal.<br/>À la puissance.</> : <>From signal.<br/>To power.</>}</h1><div className="u-intro-aside"><p>{fr ? 'Six projets. Explorer la mesure, la protection, la conversion, les énergies marines, le stockage et les entraînements électriques.' : 'Six projects. Explore sensing, protection, conversion, marine energy, storage and electric drives.'}</p><button className="u-text-button" type="button" onClick={() => go(0)}>{fr ? 'Commencer l’exploration' : 'Begin the journey'} <span aria-hidden="true">↓</span></button></div></div>
      {scenes.map((scene, index) => { const copy = scene[lang]; return <section className={`u-chapter u-chapter-${index}`} id={scene.id} key={scene.id} ref={node => { sectionRefs.current[index] = node; }} aria-labelledby={`u-title-${index}`}>
        <div className="u-scene-frame">
          <div className="u-scene-copy"><p className="u-kicker">{copy.eyebrow}</p><h2 tabIndex={-1} id={`u-title-${index}`}>{copy.verb}</h2><h3>{copy.title}</h3><p className="u-description">{copy.text}</p><a className="u-study" href={scene.href}>{fr ? 'Voir l’étude' : 'Open the case study'}<span aria-hidden="true">↗</span></a><p className="u-tools">{scene.tag}</p></div>
          <figure className={`u-scene-visual u-visual-${index}`}>
            <div className="u-visual-meta"><span>{scene.project}</span><span className="u-visual-label">{fr ? '3D interactive · vue de principe' : 'Interactive 3D · concept view'}</span></div>
            <LiveScene index={index} lang={lang} onReady={() => {
              if (!initialAnchorAligned.current && window.location.hash === `#${scene.id}`) {
                initialAnchorAligned.current = true;
                requestAnimationFrame(() => sectionRefs.current[index]?.scrollIntoView({ block: 'start', behavior: 'instant' }));
              }
            }}/>
            <figcaption>{copy.caption}</figcaption>
          </figure>
          <div className="u-scene-footer"><span>{copy.status}</span><span>{fr ? 'Défiler pour explorer' : 'Scroll to explore'} <span aria-hidden="true">↓</span></span></div>
        </div>
      </section>; })}
      <footer className="u-outro"><p className="u-kicker">{fr ? 'L’exploration continue' : 'Keep exploring'}</p><h2>{fr ? 'Derrière chaque visuel, une étude.' : 'Behind each scene, an engineering study.'}</h2><p>{fr ? 'Ce parcours relie des compétences. Chaque projet conserve ses propres hypothèses, modèles et résultats dans son dossier technique.' : 'This journey connects skills. Each project has its own assumptions, models and results, documented in its case study.'}</p><a className="u-study" href="/#projects">{fr ? 'Retrouver tous les projets' : 'Explore all projects'}</a><a className="u-contact" href="mailto:diawbirane10@gmail.com">{fr ? 'Parlons ingénierie' : 'Let’s talk engineering'}</a></footer>
    </main>

    <nav className="u-chapter-nav" aria-label={fr ? 'Chapitres du parcours' : 'Journey chapters'}><button className="u-step" type="button" onClick={() => go(Math.max(0, active - 1))} disabled={active === 0} aria-label={fr ? 'Chapitre précédent' : 'Previous chapter'}>←</button><select className="u-project-select" aria-label={fr ? 'Choisir un projet' : 'Choose a project'} value={active} onChange={event => go(Number(event.target.value))}>{scenes.map((scene, index) => <option value={index} key={scene.id}>{scene.project}</option>)}</select><div className="u-chapter-links">{scenes.map((scene, index) => <button type="button" key={scene.id} onClick={() => go(index)} aria-current={active === index ? 'step' : undefined}><span className="u-chapter-dot"/>{scene[lang].verb.replace('.', '')}</button>)}</div><button className="u-step" type="button" onClick={() => go(Math.min(scenes.length - 1, active + 1))} disabled={active === scenes.length - 1} aria-label={fr ? 'Chapitre suivant' : 'Next chapter'}>→</button><div className="u-nav-progress" style={{ width: `${(active + 1) / scenes.length * 100}%` }} aria-hidden="true"/></nav>
  </div>;
}
