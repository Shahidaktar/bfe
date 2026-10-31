import React from 'react';
import { ArrowRight } from 'lucide-react';

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

interface TravelInspirationSectionProps {
  onDiscover: () => void;
}

// Imaginary travel experiences; placeholder photography — swap images manually.
const EXPERIENCES = [
  {
    tag: 'Cultural Journeys',
    title: 'Castle Gardens in Full Bloom',
    excerpt: 'Private viewings when the petals peak — hours before the crowds wake.',
    image: pexels('1440476'),
  },
  {
    tag: 'Arctic Nights',
    title: 'Dinner Under the Northern Sky',
    excerpt: 'Glass roofs, crackling fires and the aurora dancing as your ceiling.',
    image: pexels('3408744'),
  },
  {
    tag: 'Desert Nights',
    title: 'Dinner Under the Sahara Sky',
    excerpt: 'Lantern-lit dunes, live oud music and a tent softer than your suite.',
    image: pexels('2923591'),
  },
];

export const TravelInspirationSection: React.FC<TravelInspirationSectionProps> = ({
  onDiscover,
}) => {
  return (
    <section
      id="inspiration"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Travel Experiences
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              More Travel{' '}
              <span className="italic font-normal text-[#c59b67]">Inspiration</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Signature experiences our specialists craft between the milestones — moments that become the story of the trip.
            </p>
          </div>
        </div>

        {/* Tall full-image experience cards with overlay text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {EXPERIENCES.map((exp) => (
            <button
              key={exp.title}
              type="button"
              onClick={onDiscover}
              className="group relative text-left rounded-3xl overflow-hidden h-[440px] sm:h-[480px] bg-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
              aria-label={`Discover: ${exp.title}`}
            >
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

              {/* Top tag */}
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/25 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white font-semibold font-sans">
                {exp.tag}
              </span>

              {/* Bottom overlay copy */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="font-serif text-2xl sm:text-[28px] text-white tracking-tight leading-snug mb-3">
                  {exp.title}
                </h3>
                <p className="text-sm text-stone-200/90 font-light leading-relaxed mb-5 max-w-xs">
                  {exp.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#e8c697] font-sans">
                  Discover
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
