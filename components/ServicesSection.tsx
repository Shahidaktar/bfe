import React from 'react';
import {
  MessageSquare,
  Search,
  HeartHandshake,
  Calendar,
  Ticket,
  Headphones,
} from 'lucide-react';

const SERVICES = [
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'Understand your travel goals & preferences.',
  },
  {
    icon: Search,
    title: 'Research & Pricing',
    description: 'Find the best options for your journey.',
  },
  {
    icon: HeartHandshake,
    title: 'Vendor Negotiation',
    description: 'Get exclusive access & better value.',
  },
  {
    icon: Calendar,
    title: 'Itinerary Planning',
    description: 'A seamless, well-crafted travel plan.',
  },
  {
    icon: Ticket,
    title: 'Booking Support',
    description: 'Flights, stays, transfers & more.',
  },
  {
    icon: Headphones,
    title: 'Local Travel Support',
    description: 'On-ground assistance wherever you go.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#c59b67]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#c59b67] uppercase font-sans">
              OUR SERVICES
            </span>
            <span className="w-5 h-[1.5px] bg-[#c59b67]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-stone-900 font-normal tracking-tight mb-3">
            End-to-End Travel Planning
          </h2>

          <p className="text-stone-500 text-sm sm:text-base font-sans font-light">
            From the first idea to your final destination, we handle it all.
          </p>
        </div>

        {/* 6 Services Horizontal Strip / Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-stone-200/80">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="px-4 sm:px-5 py-6 sm:py-4 flex flex-col items-center text-center group hover:bg-white/60 transition-colors rounded-xl"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-stone-800 mb-4 group-hover:text-[#c59b67] group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5 stroke-[1.4]" />
                </div>
                <h3 className="font-sans font-semibold text-xs sm:text-[13px] text-stone-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 font-sans leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
