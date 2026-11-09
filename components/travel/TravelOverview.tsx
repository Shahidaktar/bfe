import React from 'react';
import {
  CalendarDays,
  Globe,
  Landmark,
  MapPin,
  Mountain,
  Tent,
  type LucideIcon,
} from 'lucide-react';
import type { TravelHighlightIcon, TravelItinerary } from '../../lib/travel';
import { PlanTripCard } from './PlanTripCard';
import { TravelMap } from './TravelMap';

const HIGHLIGHT_ICONS: Record<TravelHighlightIcon, LucideIcon> = {
  days: CalendarDays,
  countries: Globe,
  cities: MapPin,
  mountain: Mountain,
  heritage: Landmark,
  yurt: Tent,
};

export const TravelOverview: React.FC<{ itinerary: TravelItinerary }> = ({ itinerary }) => {
  return (
    <section id="overview" className="scroll-mt-[132px] bg-[#FAF8F5] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] lg:gap-14 xl:gap-20 items-start">
          {/* Right rail first on mobile, beside the copy on desktop */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-[140px]">
            <PlanTripCard itinerary={itinerary} />
          </aside>

          <div className="order-2 lg:order-1">
            {/* <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                Itinerary Summary
              </span>
            </div> */}

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] tracking-tight text-[#081726] leading-[1.08]">
              {itinerary.headingBefore}{' '}
              <span className="italic text-[#c59b67]">{itinerary.headingAccent}</span>
            </h2>

            <div className="mt-7 space-y-5">
              {itinerary.overview.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`font-light leading-[1.9] text-stone-600 ${
                    index === 0 ? 'text-[15px] sm:text-[17px] text-stone-700' : 'text-sm sm:text-[15px]'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-[#e7e0d2] bg-[#f5f2eb] p-7 sm:p-9">
              <h3 className="font-serif text-2xl sm:text-[28px] tracking-tight text-[#081726] leading-tight">
                Luxury Travel. <span className="italic text-[#b68b55]">Your Way.</span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light">
                This itinerary is a starting point. Tell us your dates, your pace and the
                way you like to travel, and our specialists will shape every day of it
                around you — privately, from first idea to final transfer.
              </p>
            </div>

            {/* Tour Highlights */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                  Tour Highlights
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#081726] leading-tight">
                What this journey <span className="italic text-[#c59b67]">holds</span>
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-200/70 sm:grid-cols-3">
                {itinerary.highlights.map((highlight) => {
                  const Icon = HIGHLIGHT_ICONS[highlight.icon];
                  return (
                    <div key={highlight.value} className="bg-white p-5 sm:p-6">
                      <Icon className="w-4 h-4 text-[#c59b67]" strokeWidth={1.5} aria-hidden="true" />
                      <p className="mt-3 font-serif text-[17px] sm:text-lg text-[#081726] leading-tight tracking-tight">
                        {highlight.value}
                      </p>
                      <p className="mt-2 text-[9px] uppercase tracking-[0.18em] font-semibold text-[#b68b55]">
                        {highlight.label}
                      </p>
                      <p className="mt-2 text-[11px] sm:text-xs text-stone-500 leading-relaxed font-light">
                        {highlight.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Route At a Glance / Summary Table */}
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                  Route Breakdown
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#081726] leading-tight">
               The Expedition  <span className="italic text-[#c59b67]">At a Glance</span>
              </h3>

            
              <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_18px_40px_-36px_rgba(8,23,38,0.35)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF8F5]">
                        <th scope="col" className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">
                          Days
                        </th>
                        <th scope="col" className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">
                          Country &amp; places
                        </th>
                        <th scope="col" className="px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">
                          Overnights
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itinerary.summary.map((row) => (
                        <tr key={row.country} className="border-b border-stone-100 align-top last:border-0 hover:bg-stone-50/50 transition-colors">
                          <td className="px-5 py-5 whitespace-nowrap">
                            <span className="font-serif italic text-lg text-[#c59b67]">{row.days}</span>
                          </td>
                          <td className="px-5 py-5">
                            <p className="font-serif text-[17px] text-[#081726] leading-snug">{row.country}</p>
                            <p className="mt-1.5 text-xs text-stone-500 leading-relaxed font-light">{row.places}</p>
                          </td>
                          <td className="px-5 py-5 text-xs text-stone-600 leading-relaxed font-light">{row.stay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tour Route Map */}
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                  Tour Route Map
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#081726] leading-tight">
                {itinerary.routeTitle}
              </h3>

              {/* <p className="mt-3 text-sm sm:text-[15px] text-stone-500 leading-[1.8] font-light max-w-2xl">
                {itinerary.routeDescription}
              </p> */}

              <div className="mt-7 overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_24px_60px_-48px_rgba(8,23,38,0.5)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b68b55]">
                      {itinerary.routeStops.length} stops · {itinerary.countries} countries
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-stone-400">
                    Drag to explore · Ctrl + scroll to zoom
                  </p>
                </div>

                <div className="travel-map">
                  <TravelMap stops={itinerary.routeStops} />
                </div>
              </div>
              {/* {itinerary.routeNote && (
                <p className="mt-4 max-w-3xl text-xs text-stone-500 leading-relaxed font-light">
                  {itinerary.routeNote}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};