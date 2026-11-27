import Universe from './Universe';
import './univers.css';

export const metadata = {
  title: 'Mon univers d’ingénierie',
  description: 'Explore three engineering studies by Birane DIAW: industrial sensing, smart-grid protection and 25 kV railway traction.',
  alternates: { canonical: '/univers' },
  openGraph: { title: 'Birane DIAW — Engineering, from signal to power', url: '/univers', description: 'An illustrated journey through sensing, protection and energy conversion.' },
};

export default function UniversePage() { return <Universe />; }
