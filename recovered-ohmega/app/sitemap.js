const pages = [
  ...["projects", "research", "experience", "about", "contact"].map((page) => ({
    path: `/${page}`,
    changeFrequency: "monthly",
    priority: 0.8,
  })),
  {
    path: "/research/grid-forming-vsm-hvdc-bess",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/", changeFrequency: "weekly", priority: 1 },
  {
    path: "/projects/ufls-smartgrid",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects/wave-energy-conversion",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects/railway-traction-25kv",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects/digital-twin-liion-battery",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects/digital-twin-electric-drive",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default function sitemap() {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `https://b-diaw.com${path}`,
    changeFrequency,
    priority,
  }));
}
