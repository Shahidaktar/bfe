import type { Metadata } from 'next';
import { DestinationsExplorePage } from '../../components/destinations/DestinationsExplorePage';

export const metadata: Metadata = {
  title: 'Luxury Destinations & Curated Journeys — Beyond Forever Earth',
  description:
    'Explore our curated collection of iconic ancient wonders, jaw-dropping natural landscapes, wildlife expeditions, and exotic family vacations.',
  openGraph: {
    title: 'Luxury Destinations & Curated Journeys — Beyond Forever Earth',
    description:
      'Explore our curated collection of iconic ancient wonders, jaw-dropping natural landscapes, wildlife expeditions, and exotic family vacations.',
    images: ['/destinations/europe-hero.jpg'],
  },
};

export default function DestinationsRoute() {
  return <DestinationsExplorePage />;
}

