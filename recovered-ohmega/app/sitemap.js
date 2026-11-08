import { projects } from './portfolio-data';

// Keep the public sitemap synchronized with the single portfolio catalogue.
const pages = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/research/grid-forming-vsm-hvdc-bess', changeFrequency: 'monthly', priority: 0.8 },
  ...projects.map(project => ({
    path: `/projects/${project.slug}`,
    changeFrequency: project.stage ? 'weekly' : 'monthly',
    priority: 0.8,
  })),
];

export default function sitemap() {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `https://b-diaw.com${path}`,
    changeFrequency,
    priority,
  }));
}
