import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DestinationPage } from '../../../components/destinations/DestinationPage';
import { destinationSlugs, findDestination } from '../../../lib/destinations';

export function generateStaticParams() {
  return destinationSlugs()
    .filter((slug) => findDestination(slug)?.kind === 'region')
    .map((slug1) => ({ slug1 }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug1: string }>;
}): Promise<Metadata> {
  const { slug1 } = await params;
  const destination = findDestination(slug1);

  if (!destination || destination.kind !== 'region') {
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

export default async function RegionPage({ params }: { params: Promise<{ slug1: string }> }) {
  const { slug1 } = await params;
  const destination = findDestination(slug1);

  if (!destination || destination.kind !== 'region') notFound();

  return <DestinationPage key={destination.slug} content={destination} />;
}
