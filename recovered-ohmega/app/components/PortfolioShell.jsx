"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { github, linkedin, orcid, mail, projects } from "../portfolio-data";

export function Arrow({ back = false }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export function External({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
      <Arrow />
    </a>
  );
}
export const nav = [
  ["/projects", "Projects", "Projets"],
  ["/research", "Research", "Recherche"],
  ["/experience", "Experience", "Expérience"],
  ["/about", "About", "Profil"],
  ["/contact", "Contact", "Contact"],
];
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="OHMEGA — Birane DIAW, home">
      <span className="omega" aria-hidden="true">
        Ω
      </span>
      <span>OHMEGA</span>
    </Link>
  );
}
export function Header({ lang, setLang }) {
  const pathname = usePathname();
  const menu = useRef(null);
  const search = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    menu.current?.close();
    search.current?.close();
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [open]);
  const show = (ref) => {
    ref.current?.showModal();
    setOpen(true);
  };
  const close = (ref) => {
    ref.current?.close();
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <>
      <a className="skip-link" href="#main">
        {lang === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <header
        className={`site-header ${pathname === "/" && !scrolled ? "on-hero" : ""}`}
      >
        <button
          ref={trigger}
          className="menu-trigger"
          onClick={() => show(menu)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={lang === "fr" ? "Ouvrir le menu" : "Open menu"}
        >
          <span className="hamburger">
            <i />
            <i />
            <i />
          </span>
          <span>Menu</span>
        </button>
        <Brand />
        <nav
          className="desktop-nav"
          aria-label={
            lang === "fr" ? "Navigation principale" : "Main navigation"
          }
        >
          {nav.slice(0, 4).map(([href, en, fr]) => (
            <Link
              aria-current={pathname === href ? "page" : undefined}
              key={href}
              href={href}
            >
              {lang === "fr" ? fr : en}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="search-trigger"
            onClick={() => show(search)}
            aria-label={
              lang === "fr" ? "Rechercher un projet" : "Search projects"
            }
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
          <Link className="header-contact" href="/contact">
            Contact
          </Link>
          <button
            className="language-button"
            aria-label={
              lang === "fr" ? "Switch to English" : "Passer en français"
            }
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
          >
            {lang.toUpperCase()}
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        id="site-menu"
        aria-label={lang === "fr" ? "Menu du portfolio" : "Portfolio menu"}
        className="menu-dialog"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === menu.current) close(menu);
        }}
      >
        <div className="dialog-top">
          <Brand />
          <button
            className="close-button"
            onClick={() => close(menu)}
            aria-label={lang === "fr" ? "Fermer le menu" : "Close menu"}
          >
            ×
          </button>
        </div>
        <div className="menu-inner">
          <nav aria-label={lang === "fr" ? "Toutes les pages" : "All pages"}>
            <Link href="/" onClick={() => close(menu)}>
              {lang === "fr" ? "Accueil" : "Home"}
            </Link>
            {nav.map(([href, en, fr]) => (
              <Link href={href} key={href} onClick={() => close(menu)}>
                {lang === "fr" ? fr : en}
                <Arrow />
              </Link>
            ))}
          </nav>
          <aside>
            <p>BIRANE DIAW</p>
            <p>
              {lang === "fr"
                ? "Génie électrique & systèmes intelligents"
                : "Electrical engineering & intelligent systems"}
            </p>
            <div className="menu-social">
              <External href={github}>GitHub</External>
              <External href={linkedin}>LinkedIn</External>
              <External href={orcid}>ORCID</External>
            </div>
            <span>Dakar, Senegal · Rabat, Morocco</span>
          </aside>
        </div>
      </dialog>
      <dialog
        ref={search}
        className="search-dialog"
        aria-label={lang === "fr" ? "Recherche de projets" : "Project search"}
        onClose={() => setOpen(false)}
      >
        <div className="dialog-top">
          <h2>{lang === "fr" ? "Rechercher" : "Search projects"}</h2>
          <button
            className="close-button"
            onClick={() => close(search)}
            aria-label={lang === "fr" ? "Fermer la recherche" : "Close search"}
          >
            ×
          </button>
        </div>
        <label htmlFor="project-search">
          {lang === "fr"
            ? "Nom, domaine ou technologie"
            : "Name, field or technology"}
        </label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="MATLAB, battery, grid…"
        />
        <div aria-live="polite" className="search-results">
          {projects
            .filter((p) =>
              (p.title + " " + p.body[lang] + " " + p.field[lang])
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((p) => (
              <Link
                key={p.slug}
                href={"/projects/" + p.slug}
                onClick={() => close(search)}
              >
                <span>{p.title}</span>
                <Arrow />
              </Link>
            ))}
          {!projects.some((p) =>
            (p.title + " " + p.body[lang] + " " + p.field[lang])
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && (
            <p>
              {lang === "fr"
                ? "Aucun projet trouvé. Essayez « MATLAB » ou « battery »."
                : "No projects found. Try “MATLAB” or “battery”."}
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
export function ContactBand({ lang }) {
  return (
    <section className="contact-band">
      <h2>
        {lang === "fr" ? "CONSTRUISONS LA SUITE." : "LET’S BUILD WHAT’S NEXT."}
      </h2>
      <div>
        <p>
          {lang === "fr"
            ? "Stages, projets d’ingénierie et collaborations de recherche."
            : "Internships, engineering projects and research collaborations."}
        </p>
        <Link className="button red" href="/contact">
          {lang === "fr" ? "Échangeons" : "Get in touch"}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
export function Footer({ lang }) {
  return (
    <footer className="site-footer">
      <div className="footer-social">
        <Brand />
        <nav aria-label="Professional profiles">
          <External href={github}>GitHub</External>
          <External href={linkedin}>LinkedIn</External>
          <External href={orcid}>ORCID</External>
        </nav>
      </div>
      <div className="footer-grid">
        <div>
          <h3>BIRANE DIAW</h3>
          <p>
            {lang === "fr"
              ? "Élève ingénieur d’État"
              : "State Engineering Student"}
            <br />
            {lang === "fr"
              ? "Génie électrique & systèmes intelligents"
              : "Electrical Engineering & Intelligent Systems"}
          </p>
          <p>EMSI Rabat</p>
        </div>
        <nav aria-label="Portfolio">
          <h3>PORTFOLIO</h3>
          {nav.slice(0, 4).map(([href, en, fr]) => (
            <Link key={href} href={href}>
              {lang === "fr" ? fr : en}
            </Link>
          ))}
        </nav>
        <div>
          <h3>CONTACT</h3>
          <a href={mail}>diawbirane10@gmail.com</a>
          <p>
            Rabat, Morocco
            <br />
            Dakar, Senegal
          </p>
          <Link href="/contact">
            {lang === "fr"
              ? "Disponible à l’international"
              : "Available worldwide"}
            <Arrow />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Birane DIAW · OHMEGA</span>
        <span>
          {lang === "fr"
            ? "Modéliser. Comprendre. Concevoir."
            : "Model. Understand. Engineer."}
        </span>
      </div>
    </footer>
  );
}
