import Universe from './Universe';
import './univers.css';

export const metadata = {
  title: 'Mon univers d’ingénierie',
  description: 'Explore six engineering studies by Birane DIAW: industrial sensing, smart-grid protection, 25 kV railway traction, wave energy, battery storage and electric drives.',
  alternates: { canonical: '/univers' },
  openGraph: { title: 'Birane DIAW — Engineering, from signal to power', url: '/univers', description: 'An illustrated journey through sensing, protection and energy conversion.' },
};

export default function UniversePage() { return <Universe />; }
