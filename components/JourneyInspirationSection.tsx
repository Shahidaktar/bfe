import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

interface JourneyInspirationSectionProps {
  onViewMore: () => void;
}

// Image-only inspiration gallery; placeholder photography — swap images manually.
const GALLERY = [
  {
    image: pexels('3159383'),
    alt: 'A journey inspiration — evening shores',
  },
  {
    image: pexels('2166456'),
    alt: 'A journey inspiration — handmade moments',
  },
  {
    image: pexels('2923591'),
    alt: 'A journey inspiration — desert dusk',
  },
];

export const JourneyInspirationSection: React.FC<JourneyInspirationSectionProps> = ({
  onViewMore,
}) => {
  return (
    <section
      id="journey-inspiration"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Your Journey Inspiration
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Where Your{' '}
              <span className="italic font-normal text-[#c59b67]">Story Begins</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Three frames from journeys we have designed — where yours begins is up to you.
            </p>
          </div>
        </div>

        {/* Staggered arch gallery — image only, no card content */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* Left — pushed down */}
          <button
            type="button"
            onClick={onViewMore}
            aria-label="View more journey inspiration"
            className="group cursor-pointer focus-visible:outline-none mt-10 sm:mt-16"
          >
            <div className="relative h-[240px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-t-full rounded-b-2xl bg-stone-200">
              <img
                src={GALLERY[0].image}
                alt={GALLERY[0].alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </button>

          {/* Center — arch, larger, raised */}
          <button
            type="button"
            onClick={onViewMore}
            aria-label="View more journey inspiration"
            className="group cursor-pointer focus-visible:outline-none"
          >
            <div className="relative h-[300px] sm:h-[420px] lg:h-[500px] overflow-hidden rounded-t-full rounded-b-2xl bg-stone-200 shadow-xl shadow-stone-900/10">
              <img
                src={GALLERY[1].image}
                alt={GALLERY[1].alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </button>

          {/* Right — pushed down */}
          <button
            type="button"
            onClick={onViewMore}
            aria-label="View more journey inspiration"
            className="group cursor-pointer focus-visible:outline-none mt-10 sm:mt-16"
          >
            <div className="relative h-[240px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-t-full rounded-b-2xl bg-stone-200">
              <img
                src={GALLERY[2].image}
                alt={GALLERY[2].alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </button>
        </div>

        {/* View More */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
           href={`/destinations`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#c59b67] hover:bg-[#d6aa75] active:scale-[0.98] text-[#081726] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md transition-all shadow-lg shadow-stone-900/10 group cursor-pointer whitespace-nowrap"
          >
            <span>View More</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
