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
    <section className="bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                Other Itineraries
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
              You might also <span className="italic text-[#c59b67]">like</span>
            </h2>
          </div>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8a6a35] transition-colors hover:text-[#081726]"
          >
            <span>Explore all journeys</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {journeys.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => openPackage(pkg)}
              aria-label={`View ${pkg.title}`}
              className="group text-left cursor-pointer focus-visible:outline-none"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl bg-stone-200 sm:h-60">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <p className="mt-5 text-[9px] uppercase tracking-[0.24em] font-semibold text-[#b68b55]">
                {pkg.categoryTag}
              </p>

              <h3 className="mt-2 font-serif text-2xl tracking-tight text-[#081726] leading-snug transition-colors group-hover:text-[#b68b55]">
                {pkg.title}
              </h3>

              <p className="mt-2 text-sm text-stone-500 leading-relaxed font-light line-clamp-2">
                {pkg.tagline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c59b67]" aria-hidden="true" />
                  {pkg.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b67]" aria-hidden="true" />
                  {pkg.locations[0]}
                </span>
              </div>

              <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#081726]">
                <span>View journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b67] transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
