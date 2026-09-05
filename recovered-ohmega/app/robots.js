export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://b-diaw.com/sitemap.xml',
    host: 'https://b-diaw.com',
  };
}
