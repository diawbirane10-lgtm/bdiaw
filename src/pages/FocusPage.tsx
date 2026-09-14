import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Linkedin } from "lucide-react";

const LINKEDIN = "https://www.linkedin.com/in/birane-diaw-b83b47374";
const GITHUB = "https://github.com/diawbirane10-lgtm";
const SITE = "https://b-diaw.com";

type FocusContent = {
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  topics: string[];
  applications: string[];
  searchTerms: string[];
};

const pages: Record<string, FocusContent> = {
  "/power-systems": {
    title: "Power Systems & High-Power Electrical Architectures | Birane DIAW",
    eyebrow: "POWER SYSTEMS",
    description:
      "Birane DIAW — State Engineering student working across power systems, power electronics, HVDC, BESS, grid-forming control, protection and critical electrical infrastructure.",
    intro:
      "My core engineering direction is the design, modelling and analysis of reliable high-power electrical systems. I focus on the interaction between power electronics, dynamic control, protection and grid architecture for modern critical infrastructure.",
    topics: [
      "Power-system dynamics and stability",
      "Grid-forming converters and virtual synchronous machines",
      "HVDC transmission and converter-dominated networks",
      "Battery energy storage systems (BESS)",
      "Power electronics and converter control",
      "Load flow, protection and electrical architecture",
      "Smart grids, V2G/G2V and flexible energy systems",
    ],
    applications: [
      "Transmission and distribution grids",
      "Data centres and high-power loads",
      "Renewable-energy integration",
      "Industrial and mission-critical electrical infrastructure",
      "Railway electrical networks",
    ],
    searchTerms: ["power systems", "HVDC", "BESS", "grid forming", "power electronics", "critical electrical infrastructure"],
  },
  "/nuclear-energy": {
    title: "Nuclear Energy & Electrical Grid Integration | Birane DIAW",
    eyebrow: "NUCLEAR ENERGY",
    description:
      "Birane DIAW — electrical engineering profile focused on nuclear-grid integration, electrical distribution, protection, control, stability and digital-twin modelling.",
    intro:
      "My interest in nuclear energy is deliberately electrical: grid integration, plant electrical architecture, protection, distribution, instrumentation and control, and the dynamic interaction between large synchronous generation and modern converter-rich grids.",
    topics: [
      "Nuclear power-plant electrical architecture",
      "Generator, turbine and grid coupling",
      "Frequency and voltage stability",
      "Electrical protection and distribution",
      "Instrumentation, control and automation",
      "Digital twins for power-plant electrical systems",
      "SMR and future-grid integration",
    ],
    applications: [
      "Large nuclear power plants",
      "Small modular reactors (SMRs)",
      "Grid studies and interconnection",
      "Electrical balance of plant",
      "Protection, monitoring and control systems",
    ],
    searchTerms: ["nuclear electrical engineering", "SMR grid integration", "power plant electrical systems", "nuclear grid stability"],
  },
  "/critical-systems": {
    title: "Critical Electrical Systems — Avionics, Rail & Robotics | Birane DIAW",
    eyebrow: "CRITICAL SYSTEMS",
    description:
      "Birane DIAW — engineering work across avionics, railway electrical systems, embedded control, power distribution, robotics and safety-critical electrical architectures.",
    intro:
      "Critical systems are where electrical architecture, control, embedded electronics and reliability meet. I am particularly interested in systems where power distribution, sensing, control and safety have to remain coherent under tight physical and operational constraints.",
    topics: [
      "Aircraft electrical systems and avionics power distribution",
      "Embedded control and flight electronics",
      "Railway electrical grids and onboard energy storage",
      "Robotics control, estimation and distributed autonomy",
      "Fault detection and resilient architecture",
      "Model-based design with MATLAB/Simulink",
      "Hardware-software co-design for electrical systems",
    ],
    applications: [
      "Aerospace and avionics",
      "Rail transportation",
      "Autonomous and robotic systems",
      "Experimental vehicles",
      "Safety- and mission-critical embedded systems",
    ],
    searchTerms: ["avionics electrical systems", "railway electrical systems", "embedded control", "critical systems engineering"],
  },
  "/research": {
    title: "Research — Electrical Engineering, Energy Systems & Control | Birane DIAW",
    eyebrow: "RESEARCH",
    description:
      "Research profile of Birane DIAW in electrical engineering, power systems, converter-dominated grids, control, energy systems and intelligent electrical infrastructure.",
    intro:
      "My research work connects rigorous electrical-engineering modelling with practical system questions: stability, control, protection, energy conversion and the integration of intelligent methods where they improve the engineering system rather than replace engineering judgement.",
    topics: [
      "Grid-forming control and converter-dominated systems",
      "HVDC, BESS and system-level stability",
      "Power-system modelling and simulation",
      "Industrial automation and intelligent electrical systems",
      "Fault diagnosis and resilient control",
      "Digital twins for complex electrical infrastructure",
      "Applied AI for electrical engineering",
    ],
    applications: [
      "Academic and applied R&D",
      "Energy and critical infrastructure",
      "Industrial electrical systems",
      "Nuclear, aerospace and rail applications",
      "Prototype-to-validation engineering workflows",
    ],
    searchTerms: ["electrical engineering research", "power systems research", "grid forming research", "energy systems control"],
  },
};

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    property ? el.setAttribute("property", name) : el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const FocusPage = () => {
  const { pathname } = useLocation();
  const content = pages[pathname] ?? pages["/power-systems"];
  const canonical = `${SITE}${pathname}`;

  useEffect(() => {
    document.title = content.title;
    setMeta("description", content.description);
    setMeta("keywords", ["Birane DIAW", ...content.searchTerms].join(", "));
    setMeta("og:title", content.title, true);
    setMeta("og:description", content.description, true);
    setMeta("og:url", canonical, true);
    setMeta("twitter:title", content.title);
    setMeta("twitter:description", content.description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "focus-page-jsonld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: "Birane DIAW",
        url: SITE,
        sameAs: [LINKEDIN, GITHUB],
        knowsAbout: content.searchTerms,
      },
      name: content.title,
      description: content.description,
      url: canonical,
    });
    document.getElementById("focus-page-jsonld")?.remove();
    document.head.appendChild(ld);
    return () => ld.remove();
  }, [canonical, content]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="section-container h-20 flex items-center justify-between gap-4">
          <Link to="/" className="font-body text-lg font-black uppercase tracking-tight">
            <span className="text-primary">B.</span> DIAW
          </Link>
          <div className="flex items-center gap-4 text-sm font-body">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hidden sm:flex hover:text-primary transition-colors items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section-padding border-b border-border/50">
          <div className="section-container max-w-5xl">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
              <ArrowLeft className="w-4 h-4" /> Back to portfolio
            </Link>
            <p className="section-label mb-4">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mb-8">
              Birane DIAW — {content.eyebrow.replace(" & ", " / ")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {content.intro}
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container max-w-5xl grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black mb-6">Engineering focus</h2>
              <ul className="space-y-3">
                {content.topics.map((topic) => (
                  <li key={topic} className="border-l-2 border-primary/50 pl-4 text-muted-foreground">{topic}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-6">Application domains</h2>
              <ul className="space-y-3">
                {content.applications.map((item) => (
                  <li key={item} className="border-l-2 border-border pl-4 text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="section-container max-w-5xl">
            <div className="card-elegant p-8 md:p-10">
              <h2 className="text-2xl font-black mb-3">Explore the full engineering profile</h2>
              <p className="text-muted-foreground max-w-2xl mb-6">
                Publications, selected engineering projects, academic path, technical skills and current research directions are available on the main portfolio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
                  Open portfolio <ExternalLink className="w-4 h-4" />
                </Link>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-md font-semibold hover:border-primary/60 transition-colors">
                  LinkedIn profile <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="section-container max-w-5xl flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-muted-foreground">
          <span>Birane DIAW · Electrical Engineering & Intelligent Systems</span>
          <span>Rabat, Morocco · Dakar, Senegal</span>
        </div>
      </footer>
    </div>
  );
};

export default FocusPage;
