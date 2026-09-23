export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://b-diaw.com/sitemap.xml',
    host: 'https://b-diaw.com',
  };
}
