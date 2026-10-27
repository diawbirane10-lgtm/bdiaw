"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  projects,
  projectTags,
  copy,
  github,
  linkedin,
  orcid,
  mail,
  researchPublications,
  softwareGroups,
  experienceLogos,
} from "../portfolio-data";
import { Arrow, External, ContactBand } from "./PortfolioShell";
import EventsSection from "../EventsSection";

const images = {
  "ufls-smartgrid": "/project-images/ufls-smartgrid.webp",
  "wave-energy-conversion": "/project-images/wave-energy-conversion.webp",
  "railway-traction-25kv": "/project-images/railway-traction-25kv.webp",
  "digital-twin-liion-battery": "/project-images/battery-twin-v2.webp",
  "digital-twin-electric-drive":
    "/project-images/digital-twin-electric-drive.webp",
};
const groups = {
  "ufls-smartgrid": "power",
  "wave-energy-conversion": "power",
  "railway-traction-25kv": "power",
  "digital-twin-liion-battery": "digital",
  "digital-twin-electric-drive": "control",
};
export function PageTitle({ title, intro, lang }) {
  return (
    <header className="page-title wrap">
      <Link className="breadcrumb" href="/">
        {lang === "fr" ? "Accueil" : "Home"}
        <span aria-hidden="true">/</span>
        {title}
      </Link>
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </header>
  );
}
export function SectionHead({ title, href, label }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
function ProjectCard({ project: p, lang, large = false }) {
  return (
    <article className={`project-card ${large ? "large" : ""}`}>
      <Link
        href={"/projects/" + p.slug}
        className="project-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={images[p.slug]}
          alt=""
          width="900"
          height="675"
          loading="lazy"
        />
        <span className="image-arrow">
          <Arrow />
        </span>
      </Link>
      <div className="card-copy">
        <p className="category">{p.field[lang]}</p>
        <h3>
          <Link href={"/projects/" + p.slug}>{p.title}</Link>
        </h3>
        <p>{p.body[lang]}</p>
        <Link href={"/projects/" + p.slug} className="text-link">
          {lang === "fr" ? "Lire le projet" : "Explore project"}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}
export function HomePage({ lang }) {
  const t = copy[lang];
  return (
    <>
      <section className="home-hero">
        <img
          className="hero-image"
          src="/images/power-substation-hero.webp"
          alt=""
          fetchPriority="high"
          width="1536"
          height="1024"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <h1>BIRANE DIAW</h1>
          <p className="hero-role">{t.subtitle}</p>
          <p className="hero-description">{t.intro}</p>
          <Link className="hero-link" href="/projects">
            {lang === "fr" ? "Découvrir mes projets" : "Explore my work"}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="expertise-rail">
        <div className="wrap">
          <div className="rail-top">
            <h2>
              {lang === "fr" ? "TERRAINS D’INGÉNIERIE" : "ENGINEERING FIELDS"}
            </h2>
            <span>
              {lang === "fr"
                ? "Modélisation · Simulation · Conception"
                : "Modelling · Simulation · Design"}
            </span>
          </div>
          <div className="field-grid">
            {[
              [
                "power",
                "POWER SYSTEMS",
                "RÉSEAUX ÉLECTRIQUES",
                images["ufls-smartgrid"],
              ],
              [
                "digital",
                "DIGITAL TWINS",
                "JUMEAUX NUMÉRIQUES",
                images["digital-twin-liion-battery"],
              ],
              [
                "control",
                "CONTROL & AUTOMATION",
                "COMMANDE & AUTOMATISMES",
                images["digital-twin-electric-drive"],
              ],
            ].map(([group, en, fr, image], i) => (
              <Link
                className="field-tile"
                href={"/projects?field=" + group}
                key={group}
              >
                <span className="field-number">
                  0{i + 1}
                  <i />
                </span>
                <h3>{lang === "fr" ? fr : en}</h3>
                <img src={image} width="420" height="180" alt="" />
                <span>
                  {lang === "fr" ? "Explorer les projets" : "Explore projects"}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionHead
          title={lang === "fr" ? "PROJETS À LA UNE" : "SELECTED WORK"}
          href="/projects"
          label={lang === "fr" ? "Tous les projets" : "View all projects"}
        />
        <div className="editorial-grid">
          <ProjectCard project={projects[0]} lang={lang} large />
          <ProjectCard project={projects[3]} lang={lang} />
          <ProjectCard project={projects[2]} lang={lang} />
        </div>
      </section>
      <section className="research-home">
        <div className="wrap research-home-grid">
          <div>
            <p className="category">
              {lang === "fr"
                ? "RECHERCHE · MANUSCRIT ACCEPTÉ"
                : "RESEARCH · ACCEPTED MANUSCRIPT"}
            </p>
            <h2>
              GRID-FORMING.
              <br />
              HVDC.
              <br />
              BATTERY STORAGE.
            </h2>
            <Link className="button light" href="/research">
              {lang === "fr" ? "Explorer la recherche" : "Explore research"}
              <Arrow />
            </Link>
          </div>
          <div>
            <p className="feature-title">
              {researchPublications["grid-forming-vsm-hvdc-bess"].title}
            </p>
            <p>{t.research.summary}</p>
            <span className="research-status">
              {lang === "fr"
                ? "Accepté pour publication · DOI à venir"
                : "Accepted for publication · DOI forthcoming"}
            </span>
          </div>
        </div>
      </section>
      <section id="experience" className="section wrap home-experience" aria-labelledby="home-experience-title">
        <div className="section-head">
          <h2 id="home-experience-title">{lang === "fr" ? "EXPÉRIENCE" : "EXPERIENCE"}</h2>
          <Link className="text-link" href="/experience">
            {lang === "fr" ? "Tout le parcours" : "View all experience"}<Arrow />
          </Link>
        </div>
        <p className="experience-intro">{t.experience.heading}</p>
        <div className="experience-preview-list">
          {t.experience.items.map(([role, company, date, , , logo, , id]) => (
            <Link className="experience-preview" href={"/experience#" + id} key={id}>
              <span className="experience-preview-date">{date}</span>
              <img src={experienceLogos[logo]} alt="" width="120" height="64" loading="lazy" />
              <div><p className="category">{company}</p><h3>{role}</h3></div>
              <span className="experience-preview-arrow"><Arrow /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <SectionHead
          title={lang === "fr" ? "LE PARCOURS" : "BEHIND THE WORK"}
          href="/experience"
          label={lang === "fr" ? "Mon expérience" : "My experience"}
        />
        <div className="story-grid">
          <Link href="/about" className="story story-image">
            <img
              src="/images/power-substation-hero.webp"
              alt=""
              loading="lazy"
              width="900"
              height="600"
            />
            <div>
              <p>{lang === "fr" ? "DAKAR → RABAT" : "DAKAR → RABAT"}</p>
              <h3>
                {lang === "fr"
                  ? "ÉNERGIE, COMMANDE & SYSTÈMES INTELLIGENTS"
                  : "POWER, CONTROL & INTELLIGENT SYSTEMS"}
              </h3>
              <span>
                {lang === "fr" ? "Découvrir le profil" : "Meet Birane"}
                <Arrow />
              </span>
            </div>
          </Link>
          <article className="story story-event">
            <p className="category">
              {lang === "fr"
                ? "ENGAGEMENT · SEPTEMBRE 2026"
                : "ENGAGEMENT · SEPTEMBER 2026"}
            </p>
            <div className="event-marks">
              <img
                src="/mep-logo-official.svg"
                alt="Ministère de l’Énergie du Sénégal"
              />
              <img src="/brand-iaea.svg" alt="IAEA" />
            </div>
            <h3>
              {lang === "fr"
                ? "PROGRAMME ÉLECTRONUCLÉAIRE DU SÉNÉGAL"
                : "SENEGAL’S NUCLEAR POWER PROGRAMME"}
            </h3>
            <p>
              {lang === "fr"
                ? "Participation à l’atelier AIEA / NEPIO, Dakar, du 7 au 11 septembre 2026."
                : "Participation in the IAEA / NEPIO workshop, Dakar, 7–11 September 2026."}
            </p>
            <Link className="text-link" href="/experience#engagement">
              {lang === "fr" ? "Découvrir" : "Discover"}
              <Arrow />
            </Link>
          </article>
        </div>
      </section>
      <div className="identity-strip">
        <span>🇸🇳 SENEGAL, WEST AFRICA</span>
        <span>
          {lang === "fr" ? "BASÉ À RABAT, MAROC" : "BASED IN RABAT, MOROCCO"}
        </span>
        <Link href="/contact">
          {lang === "fr"
            ? "DISPONIBLE À L’INTERNATIONAL"
            : "AVAILABLE WORLDWIDE"}
          <Arrow />
        </Link>
      </div>
      <ContactBand lang={lang} />
    </>
  );
}
export function ProjectsPage({ lang }) {
  const [field, setField] = useState("all");
  useEffect(() => {
    const sync = () =>
      setField(
        new URLSearchParams(window.location.search).get("field") || "all",
      );
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const active = ["all", "power", "digital", "control"].includes(field)
    ? field
    : "all";
  const shown = projects.filter(
    (p) => active === "all" || groups[p.slug] === active,
  );
  return (
    <>
      <PageTitle
        title={lang === "fr" ? "PROJETS" : "PROJECTS"}
        intro={
          lang === "fr"
            ? "Une sélection de projets en réseaux électriques, conversion d’énergie, simulation et commande."
            : "Selected work in power systems, energy conversion, simulation and control."
        }
        lang={lang}
      />
      <section className="wrap project-archive">
        <div
          className="filters"
          aria-label={lang === "fr" ? "Filtrer les projets" : "Filter projects"}
        >
          {[
            ["all", "All projects", "Tous les projets"],
            ["power", "Power systems", "Réseaux électriques"],
            ["digital", "Digital twins", "Jumeaux numériques"],
            ["control", "Control", "Commande"],
          ].map(([key, en, fr]) => (
            <button
              aria-pressed={active === key}
              onClick={() => {
                setField(key);
                window.history.replaceState(
                  null,
                  "",
                  key === "all" ? "/projects" : "/projects?field=" + key,
                );
              }}
              key={key}
            >
              {lang === "fr" ? fr : en}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length}{" "}
          {lang === "fr" ? (shown.length === 1 ? "projet sélectionné" : "projets sélectionnés") : (shown.length === 1 ? "selected project" : "selected projects")}
        </p>
        <div className="projects-grid">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} />
          ))}
        </div>
        <aside className="archive-note">
          <strong>17+</strong>
          <div>
            <h2>
              {lang === "fr" ? "PROJETS D’INGÉNIERIE" : "ENGINEERING PROJECTS"}
            </h2>
            <p>
              {lang === "fr"
                ? "Cette sélection présente cinq études détaillées. D’autres prototypes et dépôts de code sont disponibles sur GitHub."
                : "This selection presents five detailed case studies. More prototypes and code repositories are available on GitHub."}
            </p>
          </div>
          <External href={github} className="text-link">
            GitHub
          </External>
        </aside>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
export function ProjectPage({ project: p, lang }) {
  const t = copy[lang];
  return (
    <>
      <header className="case-hero wrap">
        <Link className="breadcrumb" href="/projects">
          <Arrow back />
          {lang === "fr" ? "Tous les projets" : "All projects"}
        </Link>
        <p className="category">
          {p.no} / {p.field[lang]}
        </p>
        <h1>{p.title}</h1>
        <p className="case-intro">{p.body[lang]}</p>
        <div className="tag-list">
          {projectTags[p.slug]?.tools.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>
      <figure className="case-visual wrap">
        <img
          src={images[p.slug]}
          alt={p.title + " — conceptual illustration"}
          width="1200"
          height="800"
        />
        <figcaption>{p.visualNote?.[lang]}</figcaption>
      </figure>
      <div className="case-body wrap">
        <aside className="case-sidebar">
          <h2>{lang === "fr" ? "DANS CE PROJET" : "IN THIS PROJECT"}</h2>
          {t.detail.slice(1).map((s, i) => (
            <a key={s} href={"#case-" + i}>
              {s}
              <Arrow />
            </a>
          ))}
        </aside>
        <div className="case-sections">
          <section id="case-0">
            <h2>{t.detail[1]}</h2>
            <p>{p.problem[lang]}</p>
          </section>
          <section id="case-1">
            <h2>{t.detail[2]}</h2>
            <p>{p.solution[lang]}</p>
          </section>
          <section id="case-2">
            <h2>{t.detail[3]}</h2>
            <ol>
              {p.steps[lang].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
          <section id="case-3">
            <h2>{t.detail[4]}</h2>
            <p>{p.discussion[lang]}</p>
          </section>
          <section id="case-4">
            <h2>{t.detail[5]}</h2>
            <div className="resource-list">
              {p.links.map(([label, href]) => (
                <External key={label} href={href}>
                  {label}
                </External>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className="section wrap">
        <SectionHead
          title={lang === "fr" ? "À EXPLORER AUSSI" : "MORE TO EXPLORE"}
        />
        <div className="related-grid">
          {projects
            .filter((item) => item.slug !== p.slug)
            .slice(0, 2)
            .map((item) => (
              <ProjectCard key={item.slug} project={item} lang={lang} />
            ))}
        </div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
export function ResearchPage({ lang, publication }) {
  const p = publication || researchPublications["grid-forming-vsm-hvdc-bess"];
  return (
    <>
      <PageTitle
        title={
          publication
            ? lang === "fr"
              ? "PUBLICATION"
              : "PUBLICATION"
            : lang === "fr"
              ? "RECHERCHE"
              : "RESEARCH"
        }
        intro={copy[lang].research.summary}
        lang={lang}
      />
      <section className="wrap publication">
        <div className="publication-meta">
          <span className="status-line">{p.status[lang]}</span>
          <p>{p.venue[lang]}</p>
          <External href={orcid}>ORCID 0009-0003-4015-7854</External>
        </div>
        <article>
          <p className="category">{p.type[lang]}</p>
          <h2>{p.title}</h2>
          {publication ? (
            <>
              <h3>{lang === "fr" ? "RÉSUMÉ" : "ABSTRACT"}</h3>
              <p className="abstract">{p.abstract[lang]}</p>
            </>
          ) : (
            <>
              <p>{copy[lang].research.summary}</p>
              <Link
                className="button navy"
                href="/research/grid-forming-vsm-hvdc-bess"
              >
                {lang === "fr" ? "Lire le résumé" : "Read abstract"}
                <Arrow />
              </Link>
            </>
          )}
          <External className="text-link publisher-link" href={p.publisherUrl}>
            {p.publisherLabel[lang]}
          </External>
        </article>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
export function ExperiencePage({ lang }) {
  const t = copy[lang];
  return (
    <>
      <PageTitle
        title={lang === "fr" ? "EXPÉRIENCE" : "EXPERIENCE"}
        intro={t.experience.heading}
        lang={lang}
      />
      <nav className="wrap experience-index" aria-label={lang === "fr" ? "Accès direct aux expériences" : "Jump to experience"}>
        {t.experience.items.map(([, company, date, , , , , id]) => (
          <a key={id} href={"#" + id}>{company.split(" · ")[0]} · {date}<Arrow /></a>
        ))}
        <a href="#engagement">{lang === "fr" ? "Atelier AIEA / NEPIO" : "IAEA / NEPIO workshop"}<Arrow /></a>
      </nav>
      <section className="wrap experience-timeline">
        {t.experience.items.map(
          ([role, company, date, description, tags, logo, standards, id]) => (
            <article id={id} className="experience-entry" key={id}>
              <div className="experience-date">
                <span>{date}</span>
                <img
                  src={experienceLogos[logo]}
                  alt={company.split(" · ")[0]}
                />
              </div>
              <div>
                <p className="category">{company}</p>
                <h2>{role}</h2>
                {description.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="tag-list">
                  {(tags + (standards ? " · " + standards : ""))
                    .split(" · ")
                    .map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                </div>
              </div>
            </article>
          ),
        )}
      </section>
      <section className="engagement-section">
        <div className="wrap">
          <EventsSection lang={lang} />
        </div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
export function AboutPage({ lang }) {
  const t = copy[lang];
  return (
    <>
      <PageTitle
        title={lang === "fr" ? "BIRANE DIAW, LE PROFIL" : "MEET BIRANE DIAW"}
        intro={t.subtitle}
        lang={lang}
      />
      <section className="wrap about-layout">
        <div className="about-image">
          <img
            src="/images/power-substation-hero.webp"
            width="700"
            height="850"
            alt={
              lang === "fr"
                ? "Illustration conceptuelle d’un poste électrique haute tension"
                : "Conceptual illustration of a high-voltage substation"
            }
          />
          <span>
            DAKAR → RABAT
            <br />
            AVAILABLE WORLDWIDE
          </span>
        </div>
        <div className="about-copy">
          <h2>
            {lang === "fr"
              ? "COMPRENDRE LES SYSTÈMES. CONCEVOIR LEUR RÉPONSE."
              : "UNDERSTAND SYSTEMS. ENGINEER THEIR RESPONSE."}
          </h2>
          <p>
            {lang === "fr"
              ? "Élève ingénieur d’État en Génie Électrique et Systèmes Intelligents à l’EMSI Rabat, je travaille sur la modélisation, la simulation et l’ingénierie système appliquées à l’énergie, à la commande et à l’automatisation."
              : "State Engineering student in Electrical Engineering & Intelligent Systems at EMSI Rabat, I work on modelling, simulation and system-level engineering across power, control and automation."}
          </p>
          <p>
            {lang === "fr"
              ? "Mes centres d’intérêt vont de la stabilité des réseaux, du HVDC et des technologies grid-forming aux entraînements électriques, aux jumeaux numériques et au contrôle industriel. MATLAB/Simulink est mon environnement principal."
              : "My interests span grid stability, HVDC and grid-forming technologies, electric drives, digital twins and industrial control. MATLAB/Simulink is my main engineering environment."}
          </p>
          <Link href="/contact" className="button red">
            {lang === "fr" ? "Entrons en contact" : "Let’s connect"}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="section wrap">
        <SectionHead title={lang === "fr" ? "FORMATION" : "EDUCATION"} />
        <div className="education-list">
          {t.path.items.map(([title, school, date, description, logo, url]) => (
            <article key={school}>
              <span>{date}</span>
              <div>
                <h3>{title}</h3>
                <External href={url}>{school}</External>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="software" className="tools-section">
        <div className="wrap">
          <SectionHead
            title={lang === "fr" ? "OUTILS & MÉTHODES" : "TOOLS & METHODS"}
          />
          <div className="skills-list">
            {t.skills.groups.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="software-strip">
            {softwareGroups[0].items.map((item) => (
              <span key={item.name}>{item.name}</span>
            ))}
          </div>
        </div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
export function ContactPage({ lang }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <PageTitle
        title={lang === "fr" ? "ÉCHANGEONS." : "LET’S CONNECT."}
        intro={copy[lang].contact.body}
        lang={lang}
      />
      <section className="wrap contact-page">
        <div>
          <h2>
            {lang === "fr"
              ? "UN PROJET, UN STAGE, UNE IDÉE ?"
              : "A PROJECT, AN INTERNSHIP, AN IDEA?"}
          </h2>
          <p>
            {lang === "fr"
              ? "Disponible à l’international pour des stages, des collaborations de recherche et des fellowships."
              : "Available worldwide for internships, research collaborations and fellowships."}
          </p>
          <a className="email-link" href={mail}>
            diawbirane10@gmail.com
            <Arrow />
          </a>
          <button
            className="copy-email"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("diawbirane10@gmail.com");
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied
              ? lang === "fr"
                ? "Adresse copiée"
                : "Email copied"
              : lang === "fr"
                ? "Copier l’adresse email"
                : "Copy email address"}
          </button>
          <span className="sr-only" role="status">
            {copied
              ? lang === "fr"
                ? "Adresse email copiée"
                : "Email address copied"
              : ""}
          </span>
        </div>
        <aside>
          <p className="category">
            {lang === "fr" ? "LOCALISATION" : "LOCATION"}
          </p>
          <h3>
            RABAT, MOROCCO
            <br />
            DAKAR, SENEGAL
          </h3>
          <p className="category">
            {lang === "fr" ? "PROFILS PROFESSIONNELS" : "PROFESSIONAL PROFILES"}
          </p>
          <div className="resource-list">
            <External href={linkedin}>LinkedIn</External>
            <External href={github}>GitHub</External>
            <External href={orcid}>ORCID</External>
          </div>
        </aside>
      </section>
    </>
  );
}
