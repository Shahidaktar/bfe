'use client';

import React from 'react';
import { useSite } from '../components/SiteProvider';
import { HeroSection } from '../components/HeroSection';
import { TravelInspirationSection } from '../components/TravelInspirationSection';
import { PackagesSection } from '../components/PackagesSection';
import { ExpertPicksSection } from '../components/ExpertPicksSection';
import { DestinationStoriesSection } from '../components/DestinationStoriesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FavoritesSection } from '../components/FavoritesSection';
import { FaqSection } from '../components/FaqSection';
import { JourneyInspirationSection } from '../components/JourneyInspirationSection';
import { CuratedBannerSection } from '../components/CuratedBannerSection';
import { scrollTo } from '../lib/lenis';

export default function HomePage() {
  const { goPlan, openPackage } = useSite();

  const handleScrollToNext = () => {
    const target = document.getElementById('inspiration');
    if (target) scrollTo(target, { offset: -80 });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection onScrollToNext={handleScrollToNext} />

      {/* 2. More Travel Inspiration — travel experiences */}
      <TravelInspirationSection onDiscover={goPlan} />

      {/* 3. Continue Exploring — sample journeys */}
      <PackagesSection onSelectPackage={openPackage} />

      {/* 4. Expert Picks to Inspire You — destination tiles */}
      <ExpertPicksSection onExplore={goPlan} />

      {/* 5. More Travel Inspiration — editor's notebook */}
      <DestinationStoriesSection onRead={goPlan} />

      {/* 6. What Our Guests Say */}
      <TestimonialsSection />

      {/* 7. Some of Our Favorites */}
      <FavoritesSection onSelectPackage={openPackage} />

      {/* 8. Travel Planning FAQs with category tabs */}
      <div id="faqs">
        <FaqSection />
      </div>

      {/* 9. Your Journey Inspiration — image gallery */}
      <JourneyInspirationSection onViewMore={goPlan} />

      {/* 10. Final Consultation CTA */}
      <CuratedBannerSection onStartPlanning={goPlan} />
    </>
  );
}
