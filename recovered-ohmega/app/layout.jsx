import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata = {
  metadataBase: new URL('https://ohmegadx.vercel.app'),
  title: 'Birane DIAW — OHMEGA',
  description: 'Selected engineering work, research and academic path by Birane DIAW.',
  openGraph: { title: 'Birane DIAW — OHMEGA', description: 'Power systems, renewable energy, control, automation and embedded electronics.', images: ['/icon.svg'] },
  twitter: { card: 'summary', title: 'Birane DIAW — OHMEGA', description: 'Power systems, renewable energy, control, automation and embedded electronics.', images: ['/icon.svg'] },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body>{children}</body></html>;
}
