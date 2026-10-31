import React from 'react';
import {
  Sparkles,
  Heart,
  Users,
  Binoculars,
  Ship,
  Cake,
  ArrowRight,
} from 'lucide-react';

interface TravelStylesSectionProps {
  onSelectStyle: (travelType: string) => void;
}

export const TRAVEL_STYLES = [
  {
    icon: Sparkles,
    title: 'Luxury Escapes',
    description:
      'Private villas, five-star resorts and seamless journeys designed entirely around your pace.',
  },
  {
    icon: Heart,
    title: 'Honeymoons',
    description:
      'Romantic, once-in-a-lifetime journeys crafted for the start of your forever story.',
  },
  {
    icon: Users,
    title: 'Family Journeys',
    description:
      'Multigenerational travel with private guides, shared adventures and effortless logistics.',
  },
  {
    icon: Binoculars,
    title: 'Safari & Wildlife',
    description:
      'Private conservancies, expert rangers and front-row seats to the natural world.',
  },
  {
    icon: Ship,
    title: 'Luxury Cruises',
    description:
      'Expedition ships, private yachts and small-ship voyages to extraordinary coastlines.',
  },
  {
    icon: Cake,
    title: 'Celebrations & Milestones',
    description:
      'Anniversaries, birthdays and private occasions marked in unforgettable settings.',
  },
];

export const TravelStylesSection: React.FC<TravelStylesSectionProps> = ({
  onSelectStyle,
}) => {
  return (
    <section
      id="travel-styles"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Travel Styles
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Journeys Shaped{' '}
              <span className="italic font-normal text-[#c59b67]">Around You</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              However you travel, every style below becomes a private, tailor-made
              itinerary designed by your dedicated travel specialist.
            </p>
          </div>
        </div>

        {/* Style Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TRAVEL_STYLES.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.title}
                type="button"
                onClick={() => onSelectStyle(style.title)}
                className="group text-left bg-white rounded-2xl border border-stone-200/80 p-7 sm:p-8 transition-all duration-300 hover:border-[#c59b67]/60 hover:shadow-xl hover:shadow-stone-900/5 hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
                aria-label={`Plan a ${style.title} journey`}
              >
                <div className="w-12 h-12 rounded-full bg-[#081726] text-[#c59b67] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#c59b67] group-hover:text-[#081726]">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#081726] tracking-tight mb-2.5 group-hover:text-[#b68b55] transition-colors">
                  {style.title}
                </h3>

                <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">
                  {style.description}
                </p>

                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#c59b67] font-sans">
                  Plan This Journey
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
