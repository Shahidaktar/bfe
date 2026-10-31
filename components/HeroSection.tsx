import React from 'react';
import { ArrowDown } from 'lucide-react';
import { scrollTo } from '../lib/lenis';

interface HeroSectionProps {
  onScrollToNext?: () => void;
  onOpenPlanner?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToNext,
}) => {
  const handleScrollDown = () => {
    if (onScrollToNext) {
      onScrollToNext();
      return;
    }
    const nextSection = document.getElementById('inspiration') || document.getElementById('destinations');
    if (nextSection) {
      scrollTo(nextSection, { offset: -80 });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[72vh] h-[72dvh] min-h-[480px] sm:h-screen sm:h-[100dvh] sm:min-h-[640px] bg-[#05131f]"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover pointer-events-none"
          src="https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/beyond/4010511-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Scrims for heading readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content column pinned to the hero's flex flow */}
      <div className="relative z-10 h-full flex flex-col justify-end pt-24 sm:pt-28 pb-8 sm:pb-10 lg:pb-12 px-5 sm:px-8 lg:px-14 select-none">
        {/* Heading only */}
        <div className="max-w-7xl w-full mx-auto">
          <h1 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] text-white tracking-tight leading-[1.06] drop-shadow-lg">
            Bespoke Journeys.<br />
            <span className="italic text-[#e8c697]">Beyond Expectations.</span>
          </h1>
        </div>

        {/* Bottom Row with Circular Scroll Down Button on Right */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-end shrink-0 mt-10 sm:mt-14">
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down to explore"
            className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-white cursor-pointer group animate-scroll-box"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/35 backdrop-blur-md border border-white/40 shadow-xl transition-colors duration-300 pointer-events-none"
            />
            <ArrowDown className="relative z-10 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
