import { notFound } from 'next/navigation';

const siteUrl = 'https://b-diaw.com';

const projects = {
  'ufls-smartgrid': {
    title: 'Smart-Grid UFLS Relay — ONEE & SENELEC',
    description:
      'UFLS smart-grid relay case study for ONEE and SENELEC contexts, using staged frequency shedding, restoration logic and a six-state Stateflow automaton.',
    keywords: ['UFLS', 'smart grid', 'ONEE', 'SENELEC', 'Stateflow', 'power system protection'],
  },
  'wave-energy-conversion': {
    title: 'Wave-Energy Conversion Chain — PMSG, FOC & Grid Injection',
    description:
      'Wave-energy conversion case study using a PMSG, field-oriented control and grid-side injection for renewable-energy system simulation.',
    keywords: ['wave energy', 'PMSG', 'FOC', 'renewable energy', 'grid injection'],
  },
  'railway-traction-25kv': {
    title: '25 kV AC Railway Traction System',
    description:
      '25 kV AC railway traction case study connecting supply, train dynamics, catenary behaviour, converter control and regenerative braking.',
    keywords: ['25 kV railway traction', 'regenerative braking', 'power electronics', 'railway electrification'],
  },
  'digital-twin-liion-battery': {
    title: 'Digital Twin — Li-ion Battery Packs',
    description:
      'Li-ion battery-pack digital twin using a Thevenin 2RC model, SOC, SOH/RUL and thermal behaviour for engineering analysis.',
    keywords: ['battery digital twin', 'Li-ion battery', 'Thevenin 2RC', 'SOC', 'SOH', 'RUL'],
  },
  'digital-twin-electric-drive': {
    title: 'Digital Twin — Variable-Speed Electric Drive',
    description:
      'Electric-drive digital twin using state-space modelling, H-bridge representation, cascade PI control and signal analysis.',
    keywords: ['electric drive digital twin', 'state-space', 'H-bridge', 'PI control', 'motor control'],
  },
};

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slugParts = resolved?.slug || [];
  const slug = Array.isArray(slugParts) ? slugParts[slugParts.length - 1] : slugParts;
  const project = projects[slug];

  if (!project) {
    return {
      alternates: { canonical: '/' },
    };
  }

  const path = `/projects/${slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: siteUrl + path,
      title: project.title,
      description: project.description,
      images: [{ url: '/icon.svg', alt: 'OHMEGA — Birane DIAW' }],
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.description,
      images: ['/icon.svg'],
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
    slugParts[0] === 'projects' &&
    Boolean(projects[slugParts[1]]);

  if (!isHome && !isProjectPath) {
    notFound();
  }

  const slug = isProjectPath ? slugParts[1] : null;
  const project = slug ? projects[slug] : null;

  const jsonLd = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: `${siteUrl}/projects/${slug}`,
        author: {
          '@type': 'Person',
          '@id': siteUrl + '/#birane-diaw',
          name: 'Birane DIAW',
        },
        keywords: project.keywords.join(', '),
      }
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
