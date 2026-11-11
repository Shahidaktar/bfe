import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToursPage } from '../../../../../components/destinations/ToursPage';
import { countryParams, findCountry } from '../../../../../lib/destinations';
import { toursFor } from '../../../../../lib/tours';

export function generateStaticParams() {
  return countryParams().map(({ slug1, slug2 }) => ({
    slug1,
    slug2,
    slug3: `${slug2}-tours`,
  }));
}

const isToursSegment = (slug2: string, slug3: string) => slug3 === `${slug2}-tours`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string; slug3: string }>;
}): Promise<Metadata> {
  const { slug1, slug2, slug3 } = await params;

  if (!isToursSegment(slug2, slug3)) {
    return { title: 'Tours not found — Beyond Forever Earth' };
  }

  const destination = findCountry(slug1, slug2);
  if (!destination) {
    return { title: 'Tours not found — Beyond Forever Earth' };
  }

  return {
    title: `${destination.name} Tours — Beyond Forever Earth`,
    description: `Browse our ${destination.name} journeys with filters for interest, duration and budget. Every itinerary is private and built from scratch.`,
    openGraph: {
      title: `${destination.name} Tours — Beyond Forever Earth`,
      description: `Private, tailor-made ${destination.name} journeys.`,
      images: [destination.heroImage],
    },
  };
}

export default async function CountryToursPage({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string; slug3: string }>;
}) {
  const { slug1, slug2, slug3 } = await params;

  if (!isToursSegment(slug2, slug3)) notFound();

  const destination = findCountry(slug1, slug2);
  if (!destination) notFound();

  return (
    <ToursPage content={destination} tours={toursFor(`${slug1}/${slug2}`)} />
  );
}
