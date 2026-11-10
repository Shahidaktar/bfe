'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  HeartPulse,
  ShieldCheck,
  Stamp,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { TravelInfoIcon, TravelItinerary } from '../../lib/travel';

const INFO_ICONS: Record<TravelInfoIcon, LucideIcon> = {
  wallet: Wallet,
  shield: ShieldCheck,
  stamp: Stamp,
  calendar: CalendarDays,
  heart: HeartPulse,
};

export const TravelInfo: React.FC<{ itinerary: TravelItinerary }> = ({ itinerary }) => {
  const [openCountry, setOpenCountry] = useState<string | null>(
    itinerary.travelInfo[0]?.country ?? null
  );

  return (
    <section id="information" className="scroll-mt-[132px] bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
              Essential Travel Information
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
            Know before <span className="italic text-[#c59b67]">you go</span>
          </h2>

          {/* <p className="mt-4 text-sm sm:text-[15px] text-stone-500 leading-[1.9] font-light">
            Money, safety, visas, seasons and health — country by country, for the five
            countries this journey passes through.
          </p> */}
        </div>

        <div className="mt-9 space-y-3">
          {itinerary.travelInfo.map((country) => {
            const isOpen = openCountry === country.country;
            return (
              <div
                key={country.country}
                className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenCountry(isOpen ? null : country.country)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left cursor-pointer transition-colors hover:bg-[#FAF8F5]/60 sm:px-7"
                >
                  <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#081726]">
                    {country.country}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#c59b67] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-stone-100 px-5 py-6 sm:px-7 sm:py-8">
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
                      {country.blocks.map((block) => {
                        const Icon = INFO_ICONS[block.icon];
                        return (
                          <div key={block.title}>
                            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b68b55]">
                              <Icon className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
                              {block.title}
                            </p>
                            <p className="mt-2.5 text-[13.5px] text-stone-600 leading-[1.85] font-light">
                              {block.body}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* <p className="mt-6 max-w-3xl text-xs text-stone-400 leading-relaxed font-light italic">
          {itinerary.travelInfoNote}
        </p> */}
      </div>
    </section>
  );
};
