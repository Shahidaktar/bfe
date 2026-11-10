'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { useSite } from '../SiteProvider';
import { PACKAGES_DATA, type TravelPackage } from '../PackagesSection';

export const TravelRelated: React.FC<{ packageIds: string[] }> = ({ packageIds }) => {
  const { openPackage } = useSite();

  const journeys = packageIds
    .map((id) => PACKAGES_DATA.find((pkg) => pkg.id === id))
    .filter((pkg): pkg is TravelPackage => Boolean(pkg));

  if (journeys.length === 0) return null;

  return (
    <section
      id="related"
      className="scroll-mt-[132px] relative overflow-hidden bg-[#FAF8F5] py-20 sm:py-24 lg:py-28 border-t border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section header — mirrors the Signature Experiences header rhythm */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Other Itineraries
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              You might also{' '}
              <span className="italic font-normal text-[#c59b67]">like</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:items-end md:text-right">
            {/* <p className="max-w-sm text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Further journeys our specialists pair with this one — same pace, same care, a different horizon.
            </p> */}

            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8a6a35] transition-colors hover:text-[#081726]"
            >
              <span>Explore all journeys</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Tall full-image cards with overlay copy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {journeys.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => openPackage(pkg)}
              aria-label={`View ${pkg.title}`}
              className="group relative text-left rounded-3xl overflow-hidden h-[440px] sm:h-[480px] bg-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

              {/* Top tag */}
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/25 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white font-semibold font-sans">
                {pkg.categoryTag ?? 'Signature Journey'}
              </span>

              {/* Bottom overlay copy */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                {/* <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#e8c697] font-sans">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {pkg.duration}
                  </span>
                  <span className="w-3 h-[1px] bg-white/40" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {pkg.locations[0]}
                  </span>
                </div> */}

                <h3 className="font-serif text-2xl sm:text-[28px] text-white tracking-tight leading-snug mb-3">
                  {pkg.title}
                </h3>

                <p className="text-sm text-stone-200/90 font-light leading-relaxed mb-5 max-w-xs line-clamp-2">
                  {pkg.tagline}
                </p>

                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#e8c697] font-sans">
                  View journey
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
