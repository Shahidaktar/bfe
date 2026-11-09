'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, Minus } from 'lucide-react';
import { formatTravelPrice, type TravelItinerary } from '../../lib/travel';

export const TravelPrice: React.FC<{ itinerary: TravelItinerary }> = ({ itinerary }) => {
  const [open, setOpen] = useState(true);

  return (
    <section id="price" className="scroll-mt-[132px] bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
              Price &amp; Inclusions
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
            What this journey <span className="italic text-[#c59b67]">includes</span>
          </h2>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_18px_40px_-36px_rgba(8,23,38,0.35)]">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left cursor-pointer transition-colors hover:bg-[#FAF8F5]/60 sm:px-8"
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-stone-400">
                From
              </span>
              <p className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-[#081726]">
                {formatTravelPrice(itinerary.price)}
                <span className="ml-2 font-sans text-xs tracking-normal text-stone-400">
                  / person
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-stone-400 sm:block">
                {open ? 'Hide detail' : 'Show detail'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#c59b67] transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </button>

          {open && (
            <div className="border-t border-stone-100 px-6 py-7 sm:px-8 sm:py-9">
              <p className="max-w-3xl text-sm text-stone-600 leading-[1.9] font-light">
                {itinerary.priceNote}
              </p>

              <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-[#081726] pb-4 border-b border-[#c59b67]/30">
                    What&rsquo;s Included
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {itinerary.included.map((item) => (
                      <li key={item} className="flex gap-3 text-[13.5px] text-stone-600 leading-[1.75] font-light">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#c59b67]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-lg border border-[#e7e0d2] bg-[#f5f2eb] px-4 py-3 text-xs text-stone-600 leading-relaxed font-light">
                    {itinerary.includedNote}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-[#081726] pb-4 border-b border-stone-200">
                    What&rsquo;s Not Included
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {itinerary.excluded.map((item) => (
                      <li key={item} className="flex gap-3 text-[13.5px] text-stone-600 leading-[1.75] font-light">
                        <Minus className="w-4 h-4 mt-0.5 shrink-0 text-stone-400" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
