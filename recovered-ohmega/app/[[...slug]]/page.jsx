"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { projects, researchPublications } from "../portfolio-data";
import { Header, Footer } from "../components/PortfolioShell";
import {
  HomePage,
  ProjectsPage,
  ProjectPage,
  ResearchPage,
  ExperiencePage,
  AboutPage,
  ContactPage,
} from "../components/PortfolioPages";
export default function Portfolio() {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState("en");
  useEffect(() => {
    const saved = localStorage.getItem("ohmega-lang");
    if (saved === "fr" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("ohmega-lang", lang);
  }, [lang]);
  useEffect(() => {
    const targets = {
      about: "/about",
      projects: "/projects",
      research: "/research",
      experience: "/experience",
      contact: "/contact",
      software: "/about",
      engagement: "/experience#engagement",
    };
    const target = targets[window.location.hash.slice(1)];
    if (pathname === "/" && target) router.replace(target);
  }, [pathname, router]);
  const project = projects.find((p) => pathname === "/projects/" + p.slug);
  const publication = pathname?.startsWith("/research/")
    ? researchPublications[pathname.split("/")[2]]
    : null;
  let page = <HomePage lang={lang} />;
  if (project) page = <ProjectPage project={project} lang={lang} />;
  else if (publication || pathname === "/research")
    page = <ResearchPage lang={lang} publication={publication} />;
  else if (pathname === "/projects")
    page = <ProjectsPage key={pathname} lang={lang} />;
  else if (pathname === "/experience") page = <ExperiencePage lang={lang} />;
  else if (pathname === "/about") page = <AboutPage lang={lang} />;
  else if (pathname === "/contact") page = <ContactPage lang={lang} />;
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main id="main" tabIndex={-1}>
        {page}
      </main>
      <Footer lang={lang} />
    </>
  );
}
