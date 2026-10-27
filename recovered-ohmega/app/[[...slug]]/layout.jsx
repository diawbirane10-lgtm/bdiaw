import { notFound } from "next/navigation";

const siteUrl = "https://b-diaw.com";

const projects = {
  "ufls-smartgrid": {
    title: "Smart-Grid UFLS Relay — ONEE & SENELEC",
    description:
      "UFLS smart-grid relay case study for ONEE and SENELEC contexts, using staged frequency shedding, restoration logic and a six-state Stateflow automaton.",
    keywords: [
      "UFLS",
      "smart grid",
      "ONEE",
      "SENELEC",
      "Stateflow",
      "power system protection",
    ],
  },
  "wave-energy-conversion": {
    title: "Wave-Energy Conversion Chain — FOC & Grid Injection",
    description:
      "Wave-energy conversion case study using a PMSG, field-oriented control and grid-side injection for renewable-energy system simulation.",
    keywords: [
      "wave energy",
      "PMSG",
      "FOC",
      "renewable energy",
      "grid injection",
    ],
  },
  "railway-traction-25kv": {
    title: "25 kV AC Railway Traction System",
    description:
      "25 kV AC railway traction case study connecting supply, train dynamics, catenary behaviour, converter control and regenerative braking.",
    keywords: [
      "25 kV railway traction",
      "regenerative braking",
      "power electronics",
      "railway electrification",
    ],
  },
  "digital-twin-liion-battery": {
    title: "Digital Twin — Li-ion Battery Packs",
    description:
      "Battery Twin: Li-ion pack simulation, EKF SOC estimation and CSV telemetry diagnostics. Primary Streamlit app, alternative Vercel dashboard and NASA validation evidence.",
    keywords: [
      "battery digital twin",
      "Li-ion battery",
      "Thevenin 2RC",
      "SOC",
      "SOH",
      "RUL",
    ],
  },
  "digital-twin-electric-drive": {
    title: "Digital Twin — Variable-Speed Electric Drive",
    description:
      "Electric-drive digital twin using state-space modelling, H-bridge representation, cascade PI control and signal analysis.",
    keywords: [
      "electric drive digital twin",
      "state-space",
      "H-bridge",
      "PI control",
      "motor control",
    ],
  },
};

const sectionPages = {
  projects: {
    title: "Engineering Projects",
    description:
      "Selected engineering projects: smart grids, wave energy, railway traction, battery digital twins and electric drives.",
  },
  research: {
    title: "Research & Publications",
    description:
      "Research by Birane DIAW in grid-forming control, HVDC networks and battery energy storage.",
  },
  experience: {
    title: "Engineering Experience",
    description:
      "Industrial automation, electrical engineering internships, field work and institutional engagement.",
  },
  about: {
    title: "About Birane DIAW",
    description:
      "State Engineering student at EMSI Rabat, focused on electrical engineering and intelligent systems. Education, tools and methods.",
  },
  contact: {
    title: "Contact Birane DIAW",
    description:
      "Available worldwide for internships, engineering collaboration, research and fellowships. Based in Rabat, originally from Dakar.",
  },
};

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slugParts = resolved?.slug || [];
  const slug = Array.isArray(slugParts)
    ? slugParts[slugParts.length - 1]
    : slugParts;
  const project = projects[slug];

  if (sectionPages[slug] && slugParts.length === 1) {
    const section = sectionPages[slug];
    return {
      title: section.title,
      description: section.description,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        url: `${siteUrl}/${slug}`,
        title: section.title,
        description: section.description,
      },
    };
  }

  if (!project) {
    return {
      alternates: { canonical: "/" },
    };
  }

  const path = `/projects/${slug}`;
  return {
    title: project.title,
    description: project.description,
    keywords: project.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: siteUrl + path,
      title: project.title,
      description: project.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "OHMEGA — Birane DIAW",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectSeoLayout({ children, params }) {
  const resolved = await params;
  const slugParts = Array.isArray(resolved?.slug)
    ? resolved.slug
    : resolved?.slug
      ? [resolved.slug]
      : [];

  const isHome = slugParts.length === 0;
  const isProjectPath =
    slugParts.length === 2 &&
    slugParts[0] === "projects" &&
    Boolean(projects[slugParts[1]]);

  const isSection =
    slugParts.length === 1 && Boolean(sectionPages[slugParts[0]]);
  if (!isHome && !isProjectPath && !isSection) {
    notFound();
  }

  const slug = isProjectPath ? slugParts[1] : null;
  const project = slug ? projects[slug] : null;

  const jsonLd = project
    ? [
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "@id": `${siteUrl}/projects/${slug}#article`,
          headline: project.title,
          name: project.title,
          description: project.description,
          url: `${siteUrl}/projects/${slug}`,
          mainEntityOfPage: `${siteUrl}/projects/${slug}`,
          isPartOf: { "@id": siteUrl + "/#website" },
          inLanguage: "en",
          author: {
            "@type": "Person",
            "@id": siteUrl + "/#birane-diaw",
            name: "Birane DIAW",
          },
          keywords: project.keywords.join(", "),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Birane DIAW — OHMEGA",
              item: siteUrl + "/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: project.title,
              item: `${siteUrl}/projects/${slug}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      {children}
    </>
  );
}
