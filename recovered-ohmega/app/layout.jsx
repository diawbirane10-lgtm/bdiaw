import './globals.css';
import './navigation-polish.css';
import './premium-engineer.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import SiteAnalytics from './SiteAnalytics';
import NavDock from './NavDock';
import MotionEngine from './MotionEngine';

const siteUrl = 'https://b-diaw.com';
const orcidUrl = 'https://orcid.org/0009-0003-4015-7854';
const publicName = 'Birane I. DIAW';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${publicName} — Electrical Engineering & Intelligent Systems`,
    template: `%s | ${publicName}`,
  },
  description:
    `Electrical engineering portfolio of ${publicName}: power systems, smart grids, HVDC/HVAC, grid-forming control, renewable energy, industrial automation, digital twins and embedded systems.`,
  authors: [{ name: 'Birane DIAW', url: siteUrl }],
  creator: 'Birane DIAW',
  publisher: 'Birane DIAW',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    siteName: `${publicName} — OHMEGA`,
    title: `${publicName} — Electrical Engineering & Intelligent Systems`,
    description:
      'Power systems, HVDC/HVAC, smart grids, control, automation, digital twins and embedded electronics.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `OHMEGA — ${publicName}` }],
  },
  twitter: {
    card: 'summary',
    title: `${publicName} — Electrical Engineering & Intelligent Systems`,
    description:
      'Power systems, HVDC/HVAC, smart grids, control, automation, digital twins and embedded electronics.',
    images: ['/opengraph-image'],
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
      'Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems',
    author: {
      '@type': 'Person',
      '@id': siteUrl + '/#birane-diaw',
      name: 'Birane DIAW',
      sameAs: [orcidUrl],
    },
    isPartOf: {
      '@type': 'Periodical',
      name: 'Journal of Undergraduate Research International',
    },
    identifier: 'JURI-00314-2026-02',
    creativeWorkStatus: 'Accepted for publication; DOI pending',
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
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'ORCID',
        value: '0009-0003-4015-7854',
        url: orcidUrl,
      },
      jobTitle: 'State Engineering Student — Electrical Engineering & Intelligent Systems',
      sameAs: [
        orcidUrl,
        'https://github.com/diawbirane10-lgtm',
        'https://www.linkedin.com/in/birane-diaw-b83b47374',
        'https://x.com/epsilonp0',
      ],
      knowsAbout: [
        'Electrical engineering',
        'Power systems',
        'Smart grids',
        'HVDC',
        'HVAC',
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
        <NavDock />
        <MotionEngine />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
