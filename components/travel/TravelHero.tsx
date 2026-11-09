import React from 'react';
import type { TravelItinerary } from '../../lib/travel';
import { formatTravelPrice } from '../../lib/travel';

const Dot: React.FC = () => (
  <span aria-hidden="true" className="w-1 h-1 rotate-45 bg-[#c59b67]/80" />
);

export const TravelHero: React.FC<{ itinerary: TravelItinerary }> = ({ itinerary }) => {
  const [before, after] = itinerary.title.split(itinerary.titleAccent);

  return (
    <section className="relative overflow-hidden bg-[#05131f] flex items-center min-h-[600px] sm:min-h-[760px]">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={itinerary.heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-[#05131f]/45 to-[#04101b]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/60 via-transparent to-[#04101b]/55" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-24 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold uppercase text-[#c59b67] font-sans">
            {itinerary.eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
        </div>

        <h1 className="font-serif font-normal text-white tracking-tight leading-[1.05] text-[38px] sm:text-6xl lg:text-[76px] drop-shadow-lg">
          {before}
          <span className="italic text-[#e8c697]">{itinerary.titleAccent}</span>
          {after}
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-stone-300 font-sans">
          <span>{itinerary.durationDays} Days</span>
          <Dot />
          <span>{itinerary.nights} Nights</span>
          <Dot />
          <span>{itinerary.countries} Countries</span>
        </div>

        <p className="mt-6 text-sm sm:text-[15px] text-stone-300 font-light">
          From{' '}
          <span className="font-serif text-2xl sm:text-3xl text-[#e8c697] align-middle tracking-tight">
            {formatTravelPrice(itinerary.price)}
          </span>{' '}
          <span className="text-stone-400">/ person</span>
        </p>
      </div>
    </section>
  );
};
