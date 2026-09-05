const pages = [
  '/',
  '/projects/ufls-smartgrid',
  '/projects/wave-energy-conversion',
  '/projects/railway-traction-25kv',
  '/projects/digital-twin-liion-battery',
  '/projects/digital-twin-electric-drive',
];

export default function sitemap() {
  return pages.map((path) => ({
    url: `https://b-diaw.com${path}`,
  }));
}
