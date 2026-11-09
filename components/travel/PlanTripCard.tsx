'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { useSite } from '../SiteProvider';
import { CONTACT } from '../../lib/contact';
import { formatTravelPrice, type TravelItinerary } from '../../lib/travel';

export const PlanTripCard: React.FC<{ itinerary: TravelItinerary }> = ({ itinerary }) => {
  const { openPlanner } = useSite();

  return (
    <div>
      <Link
        href="/create-the-bucketlist"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#081726] transition-colors hover:border-[#c59b67] hover:text-[#8a6a35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
      >
        <Star className="w-3.5 h-3.5 text-[#c59b67]" />
        <span>Add to Bucket List</span>
      </Link>

      <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#081726] p-6 sm:p-7 text-white shadow-[0_30px_60px_-40px_rgba(8,23,38,0.85)]">
        <div
          className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-[#c59b67]/20 blur-[70px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="text-[9px] sm:text-[10px] tracking-[0.28em] font-semibold uppercase text-[#c59b67] font-sans">
            Private Advisory
          </span>
          <h3 className="mt-2 font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-white">
            Plan My Trip
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-stone-400 leading-relaxed">
            {itinerary.title}
          </p>

          <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-xs font-light">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-400">Duration</dt>
              <dd className="text-stone-200">
                {itinerary.durationDays} days · {itinerary.nights} nights
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-400">From</dt>
              <dd className="text-[#e8c697]">{formatTravelPrice(itinerary.price)} / person</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-stone-400">Best time</dt>
              <dd className="text-stone-200">{itinerary.bestTime}</dd>
            </div>
          </dl>

          <Link
            href={'/enquiry'}
            
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] shadow-[0_6px_16px_-6px_rgba(197,155,103,0.55)] transition-all hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] active:scale-[0.99] cursor-pointer"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <p className="mt-3 text-center text-[10px] text-stone-400">
            or call{' '}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="text-stone-200 underline decoration-[#c59b67]/50 underline-offset-4 transition-colors hover:text-white"
            >
              {CONTACT.phoneDisplay}
            </a>
          </p>

          <a
            href="/#faqs"
            className="mt-3 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#e8c697] transition-colors hover:text-white"
          >
            <span>How does this work?</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
