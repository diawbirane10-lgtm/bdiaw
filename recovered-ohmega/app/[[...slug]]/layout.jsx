import { notFound } from 'next/navigation';
import { projects as projectCatalog, projectTags } from '../portfolio-data';

const siteUrl = 'https://b-diaw.com';

// Routes and SEO metadata use the same catalogue as the visible project list.
// This prevents newly added projects from returning 404 at their detail URLs.
const projects = Object.fromEntries(
  projectCatalog.map(project => [
    project.slug,
    {
      title: project.title,
      description: project.body.en,
      keywords: [
        ...(projectTags[project.slug]?.skills?.en || []),
        ...(projectTags[project.slug]?.tools || []),
      ].slice(0, 15),
    },
  ])
);

// Public content is generated once per deployment, without a server invocation
// on each visit. Analytics continue through their separate, dynamic API routes.
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { slug: [] },
    ...Object.keys(projects).map(slug => ({ slug: ['projects', slug] })),
  ];
}

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
    keywords: project.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: siteUrl + path,
      title: project.title,
      description: project.description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'OHMEGA — Birane DIAW' }],
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.description,
      images: ['/opengraph-image'],
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
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          '@id': `${siteUrl}/projects/${slug}#article`,
          headline: project.title,
          name: project.title,
          description: project.description,
          url: `${siteUrl}/projects/${slug}`,
          mainEntityOfPage: `${siteUrl}/projects/${slug}`,
          isPartOf: { '@id': siteUrl + '/#website' },
          inLanguage: 'en',
          author: {
            '@type': 'Person',
            '@id': siteUrl + '/#birane-diaw',
            name: 'Birane DIAW',
          },
          keywords: project.keywords.join(', '),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Birane DIAW — OHMEGA',
              item: siteUrl + '/',
            },
            {
              '@type': 'ListItem',
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
