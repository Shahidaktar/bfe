import type { Metadata } from 'next';
import { AboutPage } from '../../components/AboutPage';

export const metadata: Metadata = {
  title: 'About Us - Beyond Forever Earth',
  description:
    'Bespoke travel experiences curated by seasoned travellers. Fully financially protected through The Independent Travel Consultants — plan, book and travel with clarity.',
  openGraph: {
    title: 'About Us — Beyond Forever Earth',
    description:
      'Bespoke travel experiences curated by seasoned travellers, with full financial protection on every booking.',
  },
};

export default function AboutUsPage() {
  return <AboutPage />;
}
