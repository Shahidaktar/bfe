import React from 'react';
import { ArrowRight } from 'lucide-react';

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

interface DestinationPick {
  name: string;
  image: string;
}

// Placeholder photography — swap images manually when final assets are ready.
const PICKS: DestinationPick[] = [
  { name: 'Japan', image: pexels('1829980') },
  { name: 'Italy', image: pexels('2064827') },
  { name: 'Kenya', image: pexels('2416653') },
  { name: 'Morocco', image: pexels('1268855') },
  { name: 'India', image: pexels('753339') },
  { name: 'Peru', image: pexels('1653877') },
];

interface ExpertPicksSectionProps {
  onExplore: () => void;
}

export const ExpertPicksSection: React.FC<ExpertPicksSectionProps> = ({
  onExplore,
}) => {
  return (
    <section
      id="picks"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Expert Picks
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Destinations to <span className="italic font-normal text-[#c59b67]">Inspire You</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Handpicked by our destination specialists — each one becomes a private journey shaped around you.
            </p>
          </div>
        </div>

        {/* Tall image tiles, name beneath */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
          {PICKS.map((pick) => (
            <button
              key={pick.name}
              type="button"
              onClick={onExplore}
              className="group text-left cursor-pointer focus-visible:outline-none"
              aria-label={`Explore journeys in ${pick.name}`}
            >
              <div className="relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden bg-stone-200">
                <img
                  src={pick.image}
                  alt={pick.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Soft bottom scrim so the tile keeps depth without text on it */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Name only */}
              <div className="flex items-center justify-center gap-2.5 mt-5">
                <h3 className="font-serif text-2xl sm:text-[28px] text-[#081726] tracking-tight group-hover:text-[#b68b55] transition-colors">
                  {pick.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-[#c59b67] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
