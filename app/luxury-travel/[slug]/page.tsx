import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findTravelItinerary, travelSlugs } from '../../../lib/travel';
import { TravelHero } from '../../../components/travel/TravelHero';
import { TravelSectionNav } from '../../../components/travel/TravelSectionNav';
import { TravelOverview } from '../../../components/travel/TravelOverview';
import { TravelItinerary } from '../../../components/travel/TravelItinerary';
import { TravelPrice } from '../../../components/travel/TravelPrice';
import { TravelInfo } from '../../../components/travel/TravelInfo';
import { TravelReviews } from '../../../components/travel/TravelReviews';
import { TravelRelated } from '../../../components/travel/TravelRelated';
import { TravelStickyCta } from '../../../components/travel/TravelStickyCta';
import { StayInspiredSection } from '../../../components/StayInspiredSection';

export function generateStaticParams() {
  return travelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = findTravelItinerary(slug);

  if (!itinerary) {
    return { title: 'Journey not found — Beyond Forever Earth' };
  }

  const title = `${itinerary.title} — Beyond Forever Earth`;
  const description = itinerary.overview[0].slice(0, 200);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`https://beyondforever.earth${itinerary.heroImage}`],
    },
  };
}

export default async function LuxuryTravelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const itinerary = findTravelItinerary(slug);

  if (!itinerary) notFound();

  return (
    <article className="bg-[#FAF8F5]">
      <TravelHero itinerary={itinerary} />
      <TravelSectionNav />
      <TravelOverview itinerary={itinerary} />
      <TravelItinerary itinerary={itinerary} />
      {/* <TravelRouteMap itinerary={itinerary} /> */}
      <TravelPrice itinerary={itinerary} />
      <TravelInfo itinerary={itinerary} />
      <TravelReviews />
      <TravelRelated packageIds={itinerary.relatedPackageIds} />
      <TravelStickyCta />
      {/* <StayInspiredSection /> */}
    </article>
  );
}
