import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const siteUrl = 'https://b-diaw.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Birane DIAW — Electrical Engineering & Intelligent Systems',
    template: '%s | Birane DIAW',
  },
  description:
    'Engineering portfolio of Birane DIAW: power systems, smart grids, VSC-HVDC, grid-forming control, renewable energy, industrial automation, digital twins and embedded systems.',
  authors: [{ name: 'Birane DIAW', url: siteUrl }],
  creator: 'Birane DIAW',
  publisher: 'Birane DIAW',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    siteName: 'Birane DIAW — OHMEGA',
    title: 'Birane DIAW — Electrical Engineering & Intelligent Systems',
    description:
      'Power systems, renewable energy, smart grids, control, automation, digital twins and embedded electronics.',
    images: [{ url: '/icon.svg', alt: 'OHMEGA — Birane DIAW' }],
  },
  twitter: {
    card: 'summary',
    title: 'Birane DIAW — Electrical Engineering & Intelligent Systems',
    description:
      'Power systems, renewable energy, smart grids, control, automation, digital twins and embedded electronics.',
    images: ['/icon.svg'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const profileJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteUrl + '/#website',
    url: siteUrl,
    name: 'Birane DIAW — OHMEGA',
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      '@id': siteUrl + '/#birane-diaw',
      name: 'Birane DIAW',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': siteUrl + '/#grid-forming-vsm-vsc-hvdc-paper',
    url: siteUrl + '/#research',
    headline:
      'Grid-Forming Virtual Synchronous Machine Control with DC-Coupled Battery Storage for Frequency Stability in a Multi-Terminal VSC-HVDC Renewable Power System',
    author: {
      '@type': 'Person',
      '@id': siteUrl + '/#birane-diaw',
      name: 'Birane DIAW',
    },
    isPartOf: {
      '@type': 'Periodical',
      name: 'Journal of Undergraduate Research International',
    },
    identifier: 'JURI-00314-2026-02',
    creativeWorkStatus: 'Accepted for publication; DOI forthcoming',
    about: [
      'Grid-forming control',
      'Virtual synchronous machine',
      'VSC-HVDC',
      'Battery energy storage',
      'Frequency stability',
      'Renewable power systems',
    ],
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': siteUrl + '/#profile',
    url: siteUrl,
    name: 'Birane DIAW — Electrical Engineering Portfolio',
    isPartOf: { '@id': siteUrl + '/#website' },
    mainEntity: {
      '@type': 'Person',
      '@id': siteUrl + '/#birane-diaw',
      name: 'Birane DIAW',
      url: siteUrl,
      jobTitle: 'State Engineering Student — Electrical Engineering & Intelligent Systems',
      sameAs: [
        'https://github.com/diawbirane10-lgtm',
        'https://www.linkedin.com/in/birane-diaw-b83b47374',
        'https://x.com/epsilonp0',
      ],
      knowsAbout: [
        'Electrical engineering',
        'Power systems',
        'Smart grids',
        'VSC-HVDC',
        'Grid-forming control',
        'Renewable energy',
        'Industrial automation',
        'MATLAB/Simulink',
        'Digital twins',
        'Embedded systems',
      ],
    },
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
