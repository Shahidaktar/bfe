import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DestinationPage } from '../../../../components/destinations/DestinationPage';
import { ToursPage } from '../../../../components/destinations/ToursPage';
import { countryParams, findCountry, findDestination } from '../../../../lib/destinations';
import { toursFor } from '../../../../lib/tours';

export function generateStaticParams() {
  const countries = countryParams();
  return [
    ...countries,
    ...countries
      .map(({ slug1 }) => slug1)
      .filter((slug1, index, all) => all.indexOf(slug1) === index)
      .map((slug1) => ({ slug1, slug2: `${slug1}-tours` })),
  ];
}

const isToursSegment = (slug1: string, slug2: string) => slug2 === `${slug1}-tours`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string }>;
}): Promise<Metadata> {
  const { slug1, slug2 } = await params;

  if (isToursSegment(slug1, slug2)) {
    const region = findDestination(slug1);
    if (!region || region.kind !== 'region') {
      return { title: 'Tours not found — Beyond Forever Earth' };
    }
    return {
      title: `${region.name} Tours — Beyond Forever Earth`,
      description: `Browse our ${region.name} journeys with filters for interest, duration and budget. Every itinerary is private and built from scratch.`,
    };
  }

  const destination = findCountry(slug1, slug2);
  if (!destination) {
    return { title: 'Destination not found — Beyond Forever Earth' };
  }

  return {
    title: `${destination.heroTitle} — Beyond Forever Earth`,
    description: destination.overview[0].slice(0, 200),
    openGraph: {
      title: `${destination.heroTitle} — Beyond Forever Earth`,
      description: destination.overview[0].slice(0, 200),
      images: [destination.heroImage],
    },
  };
}

export default async function DestinationSegmentPage({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string }>;
}) {
  const { slug1, slug2 } = await params;

  // /destinations/europe/europe-tours
  if (isToursSegment(slug1, slug2)) {
    const region = findDestination(slug1);
    if (!region || region.kind !== 'region') notFound();

    return <ToursPage content={region} tours={toursFor(region.slug)} />;
  }

  // /destinations/europe/italy
  const destination = findCountry(slug1, slug2);
  if (!destination) notFound();

  return <DestinationPage key={destination.slug} content={destination} />;
}
