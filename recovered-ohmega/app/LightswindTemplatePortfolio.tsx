"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import {
  Award,
  BookOpenCheck,
  Briefcase,
  ExternalLink,
  FolderKanban,
  Github,
  Globe2,
  GripVertical,
  Home,
  Linkedin,
  Menu,
  Moon,
  Network,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useTheme() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = localStorage.getItem("lightswind-template-theme");
    setTheme(saved === "dark" ? "dark" : "light");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("lightswind-template-theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

function BorderBeam() {
  return <span className="lw-border-beam" aria-hidden="true" />;
}

function TemplateHeader({ lang, setLang }: any) {
  const { theme, setTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  const nav = lang === "fr"
    ? [
        ["Accueil", "home"],
        ["À propos", "about"],
        ["Formation", "education"],
        ["Expérience", "career"],
        ["Projets", "projects"],
        ["Recherche", "research"],
        ["Contact", "contact"],
      ]
    : [
        ["Home", "home"],
        ["About", "about"],
        ["Education", "education"],
        ["Career", "career"],
        ["Projects", "projects"],
        ["Research", "research"],
        ["Contact", "contact"],
      ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowHeader(!(y > lastY.current && y > 80));
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToId(id);
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          className="lw-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="lw-header-inner">
            <BorderBeam />
            <button className="lw-brand" type="button" onClick={() => go("home")} aria-label="Home">
              <BookOpenCheck size={22} />
            </button>

            <nav className="lw-nav-desktop" aria-label="Portfolio navigation">
              {nav.map(([label, id]) => (
                <button key={id} type="button" onClick={() => go(id)}>{label}</button>
              ))}
            </nav>

            <div className="lw-header-actions">
              <button className="lw-lang" type="button" onClick={() => setLang(lang === "en" ? "fr" : "en")}>
                {lang === "en" ? "FR" : "EN"}
              </button>
              <motion.button
                className="lw-theme"
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span key="moon" initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }}>
                      <Moon size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="sun" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                      <Sun size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button className="lw-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu size={24} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="lw-mobile-menu"
                initial={{ clipPath: "circle(20px at 90% 5%)" }}
                animate={{ clipPath: "circle(1200px at 90% 5%)" }}
                exit={{ clipPath: "circle(20px at 90% 5%)" }}
                transition={{ type: "spring", stiffness: 28, damping: 22 }}
              >
                <motion.button
                  className="lw-mobile-close"
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <X size={32} />
                </motion.button>
                <motion.div
                  className="lw-mobile-links"
                  initial="closed"
                  animate="open"
                  variants={{ open: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } } }}
                >
                  {nav.map(([label, id]) => (
                    <motion.button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      variants={{ closed: { y: 45, opacity: 0 }, open: { y: 0, opacity: 1 } }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function Badge({ children }: any) {
  return <span className="lw-badge">{children}</span>;
}

function SectionReveal({ id, children, className = "" }: any) {
  return (
    <motion.section
      id={id}
      className={"lw-section " + className}
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.section>
  );
}

function Hero({ lang }: any) {
  const copy = lang === "fr"
    ? {
        role: "Élève ingénieur d'État — Génie électrique & systèmes intelligents",
        body: "Conception et étude de systèmes de puissance, de commande et d'automatisation par la modélisation, la simulation et l'ingénierie système.",
        tags: ["Systèmes de puissance", "Automatisme & commande", "Infrastructures critiques"],
      }
    : {
        role: "State Engineering Student — Electrical Engineering & Intelligent Systems",
        body: "Engineering power, control and automation systems through modelling, simulation and system-level design.",
        tags: ["Power Systems", "Automation & Control", "Critical Infrastructure"],
      };

  return (
    <motion.div
      id="home"
      className="lw-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delayChildren: 0.25, staggerChildren: 0.18 }}
    >
      <motion.div className="lw-hero-copy">
        <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }}>
          Birane DIAW
          <span>OHMEGA · Electrical Engineering</span>
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.1 }}>
          {copy.role}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.18 }}>
          {copy.body}
        </motion.p>
        <motion.div className="lw-badges" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
          {copy.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </motion.div>
      </motion.div>

      <motion.div
        className="lw-hero-visual"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 1.1, ease: "easeOut" }}
      >
        <div className="lw-avatar">
          <img src="/intro-grid.svg" alt="" />
          <div className="lw-avatar-mark">Ω</div>
          <div className="lw-avatar-name">B · DIAW</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function About({ lang }: any) {
  const text = lang === "fr"
    ? "Élève-ingénieur en génie électrique et systèmes intelligents, avec un intérêt particulier pour les systèmes électriques de forte puissance, les smart grids, l'électronique de puissance, la commande, l'automatisation et les architectures critiques. Mon travail relie modélisation, simulation et ingénierie système afin de rendre les systèmes complexes compréhensibles, traçables et robustes."
    : "State engineering student in Electrical Engineering & Intelligent Systems, focused on high-power electrical systems, smart grids, power electronics, control, automation and critical architectures. My work connects modelling, simulation and system-level engineering so complex systems remain understandable, traceable and robust.";

  return (
    <SectionReveal id="about">
      <h2 className="lw-section-title">{lang === "fr" ? "À propos" : "About Me"}</h2>
      <p className="lw-about-text">{text}</p>
      <div className="lw-separator" />
    </SectionReveal>
  );
}

function Education({ lang, t, softwareGroups }: any) {
  return (
    <SectionReveal id="education">
      <h2 className="lw-section-title">{lang === "fr" ? "Formation" : "Education"}</h2>
      <div className="lw-card-grid">
        {t.path.items.map((item: any, i: number) => (
          <motion.a
            className="lw-card lw-education-card"
            key={item[0]}
            href={item[5]}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="lw-card-header">
              <h3>{item[0]}</h3>
              <p>{item[1]} — {item[2]}</p>
            </div>
            <div className="lw-card-content">
              <p>{item[3]}</p>
              <span className="lw-card-link">{t.path.site} <ExternalLink size={14} /></span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="lw-skills-block">
        <h2 className="lw-section-title lw-section-title-small">{lang === "fr" ? "Compétences clés" : "Core Skills"}</h2>
        <div className="lw-card-grid lw-skills-grid">
          <div className="lw-card">
            <div className="lw-card-header"><h3>{lang === "fr" ? "Domaines techniques" : "Technical domains"}</h3></div>
            <div className="lw-card-content lw-domain-list">
              {t.skills.groups.map((group: any, i: number) => (
                <motion.div key={group[0]} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
                  <strong>{group[0]}</strong>
                  <p>{group[1]}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lw-card">
            <div className="lw-card-header"><h3>{lang === "fr" ? "Logiciels d'ingénierie" : "Engineering software"}</h3></div>
            <div className="lw-card-content lw-software-grid">
              {softwareGroups.flatMap((group: any) => group.items).map((item: any) => (
                <div className="lw-software-pill" key={item.name}>
                  <img src={item.logo} alt="" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function CareerTimeline({ lang, items }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const glowTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="career" className="lw-timeline-section" ref={ref}>
      <div className="lw-timeline-heading">
        <h2>{lang === "fr" ? "Parcours professionnel" : "Career Journey"}</h2>
        <p>{lang === "fr" ? "Stages, terrain et ingénierie appliquée" : "Engineering internships, field work and applied systems"}</p>
      </div>
      <div className="lw-timeline-wrap">
        <div className="lw-timeline-line" />
        <motion.div className="lw-timeline-progress" style={{ height }} />
        <motion.div className="lw-timeline-glow" style={{ top: glowTop }} />
        {items.map((item: any, i: number) => (
          <div className={"lw-timeline-row " + (i % 2 ? "is-right" : "is-left")} key={item[0]}>
            <span className="lw-timeline-dot" />
            <motion.article
              className="lw-card lw-timeline-card"
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <div className="lw-timeline-date"><Briefcase size={15} /> {item[2]}</div>
              <h3>{item[0]}</h3>
              <h4>{item[1]}</h4>
              <p>{item[3]}</p>
              <div className="lw-badges lw-badges-compact">
                {String(item[4] || "").split(" · ").map((tag: string) => tag && <Badge key={tag}>{tag}</Badge>)}
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects({ lang, projects }: any) {
  const [list, setList] = useState(projects);

  useEffect(() => setList(projects), [projects]);

  return (
    <SectionReveal id="projects">
      <h2 className="lw-section-title lw-center">{lang === "fr" ? "Projets" : "Projects"}</h2>
      <p className="lw-section-subtitle lw-center">{lang === "fr" ? "Glissez les cartes pour réorganiser la sélection" : "Drag the cards to reorder the selected work"}</p>
      <Reorder.Group axis="y" values={list} onReorder={setList} className="lw-project-list">
        {list.map((project: any) => (
          <Reorder.Item key={project.slug} value={project} className="lw-project-item">
            <div className="lw-project-main">
              <span className="lw-project-number">{project.no}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.body[lang]}</p>
                <span className="lw-project-field">{project.field[lang]}</span>
                <a href={"/projects/" + project.slug}>{lang === "fr" ? "Plus d'informations" : "More Info"} <ExternalLink size={13} /></a>
              </div>
            </div>
            <div className="lw-project-grip" aria-label="Drag project"><GripVertical /></div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </SectionReveal>
  );
}

function Research({ lang, t, publication, orcid }: any) {
  return (
    <SectionReveal id="research">
      <h2 className="lw-section-title">{lang === "fr" ? "Recherche" : "Research"}</h2>
      <div className="lw-card lw-research-card">
        <div className="lw-research-icon"><Network size={28} /></div>
        <div>
          <span className="lw-eyebrow">{t.research.eyebrow}</span>
          <h3>{publication?.title || "Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems"}</h3>
          <p>{t.research.summary}</p>
          <div className="lw-research-meta">{t.research.meta}</div>
          <div className="lw-link-row">
            <a href="/research/grid-forming-vsm-hvdc-bess">{lang === "fr" ? "Voir l'abstract" : "View abstract"} <ExternalLink size={14} /></a>
            <a href={orcid} target="_blank" rel="noreferrer">ORCID <ExternalLink size={14} /></a>
          </div>
        </div>
      </div>

      <div className="lw-card lw-engagement-card">
        <div className="lw-research-icon"><Globe2 size={28} /></div>
        <div>
          <span className="lw-eyebrow">{lang === "fr" ? "ENGAGEMENT INSTITUTIONNEL · 7–11 SEPT. 2026" : "INSTITUTIONAL ENGAGEMENT · 7–11 SEP 2026"}</span>
          <h3>{lang === "fr" ? "Atelier AIEA / NEPIO — Programme électronucléaire du Sénégal" : "IAEA / NEPIO Workshop — Senegal Nuclear Power Programme"}</h3>
          <p>{lang === "fr"
            ? "Cinq jours de travaux consacrés à la préparation institutionnelle et technique du programme électronucléaire sénégalais selon l'approche par jalons de l'AIEA."
            : "Five days of work on the institutional and technical preparation of Senegal's nuclear power programme under the IAEA Milestones Approach."}</p>
          <div className="lw-link-row">
            <a href="https://energie-mines.gouv.sn/atelier-sur-la-preparation-du-programme-electronucleaire-nepio/" target="_blank" rel="noreferrer">{lang === "fr" ? "Note officielle" : "Official workshop note"} <ExternalLink size={14} /></a>
            <a href="https://nucleus.iaea.org/sites/nids/capacity/milestones/SitePages/Home.aspx" target="_blank" rel="noreferrer">IAEA Milestones <ExternalLink size={14} /></a>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function Contact({ lang, t, links }: any) {
  return (
    <SectionReveal id="contact" className="lw-contact-section">
      <div className="lw-card lw-contact-card">
        <div>
          <span className="lw-eyebrow">CONTACT</span>
          <h2>{t.contact.heading}</h2>
          <p>{t.contact.body}</p>
        </div>
        <div className="lw-contact-actions">
          <a href={links.mail}>diawbirane10@gmail.com</a>
          <div className="lw-socials">
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={links.orcid} target="_blank" rel="noreferrer" aria-label="ORCID"><Award /></a>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function DockItem({ item, mouseX }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (value: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return value - rect.x - rect.width / 2;
  });
  const width = useSpring(useTransform(distance, [-180, 0, 180], [48, 68, 48]), { mass: 0.1, stiffness: 150, damping: 12 });
  return (
    <motion.button ref={ref} className="lw-dock-item" style={{ width, height: width }} type="button" onClick={item.onClick} whileHover={{ y: -8 }}>
      {item.icon}
      <span>{item.label}</span>
    </motion.button>
  );
}

function FloatingDock({ lang }: any) {
  const [show, setShow] = useState(false);
  const lastY = useRef(0);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y > lastY.current && y > 180);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { icon: <Home size={22} />, label: lang === "fr" ? "Accueil" : "Home", onClick: () => scrollToId("home") },
    { icon: <User size={22} />, label: lang === "fr" ? "À propos" : "About", onClick: () => scrollToId("about") },
    { icon: <BookOpenCheck size={22} />, label: lang === "fr" ? "Formation" : "Education", onClick: () => scrollToId("education") },
    { icon: <Briefcase size={22} />, label: lang === "fr" ? "Expérience" : "Career", onClick: () => scrollToId("career") },
    { icon: <FolderKanban size={22} />, label: lang === "fr" ? "Projets" : "Projects", onClick: () => scrollToId("projects") },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="lw-dock-wrap" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
          <motion.div className="lw-dock" onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)}>
            {items.map((item) => <DockItem key={item.label} item={item} mouseX={mouseX} />)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LightswindTemplateHome({ lang, setLang, t, projects, softwareGroups, publication, links }: any) {
  return (
    <div className="lw-shell">
      <div className="lw-striped-background" aria-hidden="true" />
      <ReactLenis root>
        <TemplateHeader lang={lang} setLang={setLang} />
        <main className="lw-panel">
          <Hero lang={lang} />
          <About lang={lang} />
          <Education lang={lang} t={t} softwareGroups={softwareGroups} />
          <CareerTimeline lang={lang} items={t.experience.items} />
          <Projects lang={lang} projects={projects} />
          <Research lang={lang} t={t} publication={publication} orcid={links.orcid} />
          <Contact lang={lang} t={t} links={links} />
        </main>
        <FloatingDock lang={lang} />
      </ReactLenis>
    </div>
  );
}

function DetailHeader({ lang, setLang, backLabel }: any) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="lw-detail-nav">
      <a href="/">{backLabel}</a>
      <div>
        <button type="button" onClick={() => setLang(lang === "en" ? "fr" : "en")}>{lang === "en" ? "FR" : "EN"}</button>
        <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}</button>
      </div>
    </div>
  );
}

export function LightswindProjectDetail({ project, t, lang, setLang, resourceLabel }: any) {
  return (
    <div className="lw-shell lw-detail-shell">
      <div className="lw-striped-background" aria-hidden="true" />
      <ReactLenis root>
        <DetailHeader lang={lang} setLang={setLang} backLabel={t.detail[0]} />
        <main className="lw-detail-panel">
          <motion.header className="lw-detail-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="lw-eyebrow">{project.no} · {project.field[lang]}</span>
            <h1>{project.title}</h1>
            <p>{project.body[lang]}</p>
          </motion.header>
          {project.image && <motion.figure className="lw-detail-visual" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}><img src={project.image} alt={project.title} /></motion.figure>}
          <section className="lw-detail-grid">
            {[
              [t.detail[1], project.problem[lang]],
              [t.detail[2], project.solution[lang]],
              [t.detail[3], project.steps[lang]],
              [t.detail[4], project.discussion[lang]],
            ].map(([label, body]: any, i: number) => (
              <motion.article className="lw-card lw-detail-card" key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <span className="lw-eyebrow">{label}</span>
                {Array.isArray(body) ? <ol>{body.map((step: string) => <li key={step}>{step}</li>)}</ol> : <h2>{body}</h2>}
              </motion.article>
            ))}
            <article className="lw-card lw-detail-card lw-detail-wide">
              <span className="lw-eyebrow">{t.detail[5]}</span>
              <div className="lw-link-row">
                {project.links.map(([label, href]: any) => <a key={label} href={href} target="_blank" rel="noreferrer">{resourceLabel(label, lang)} <ExternalLink size={14} /></a>)}
              </div>
            </article>
          </section>
        </main>
      </ReactLenis>
    </div>
  );
}

export function LightswindResearchDetail({ publication, lang, setLang }: any) {
  return (
    <div className="lw-shell lw-detail-shell">
      <div className="lw-striped-background" aria-hidden="true" />
      <ReactLenis root>
        <DetailHeader lang={lang} setLang={setLang} backLabel={lang === "fr" ? "← Retour au portfolio" : "← Back to portfolio"} />
        <main className="lw-detail-panel">
          <motion.header className="lw-detail-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="lw-eyebrow">{publication.type[lang]} · {publication.status[lang]}</span>
            <h1>{publication.title}</h1>
            <p>{publication.venue[lang]}</p>
          </motion.header>
          <section className="lw-detail-grid">
            <article className="lw-card lw-detail-card lw-detail-wide">
              <span className="lw-eyebrow">{lang === "fr" ? "Résumé" : "Abstract"}</span>
              <div className="lw-abstract">{publication.abstract[lang]}</div>
            </article>
            <article className="lw-card lw-detail-card lw-detail-wide">
              <span className="lw-eyebrow">{lang === "fr" ? "Publication & profils" : "Publication & profiles"}</span>
              <div className="lw-link-row">
                <a href={publication.publisherUrl} target="_blank" rel="noreferrer">{publication.publisherLabel[lang]} <ExternalLink size={14} /></a>
                <a href="https://orcid.org/0009-0003-4015-7854" target="_blank" rel="noreferrer">ORCID <ExternalLink size={14} /></a>
              </div>
            </article>
          </section>
        </main>
      </ReactLenis>
    </div>
  );
}
