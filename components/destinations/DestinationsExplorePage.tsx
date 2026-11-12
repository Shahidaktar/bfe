'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  DESTINATIONS_DATA,
  DESTINATIONS_FAQS,
  type DestinationCategory,
  type DestinationPlace,
} from '../../lib/destinationsPageData';
import { Faq } from './Faq';

const Kicker: React.FC<{ children: React.ReactNode; center?: boolean }> = ({
  children,
  center = false,
}) => (
  <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
    <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
    <span className="font-sans text-[10px] uppercase tracking-[0.28em] font-semibold text-[#c59b67] sm:text-[11px]">
      {children}
    </span>
    {center && <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />}
  </div>
);

type DurationBand = 'any' | 'short' | 'medium' | 'long';
type BudgetBand = 'any' | 'under-350k' | '350k-500k' | 'over-500k';

interface Filters {
  category: string;
  duration: DurationBand;
  budget: BudgetBand;
}

const EMPTY_FILTERS: Filters = { category: 'all', duration: 'any', budget: 'any' };

const DURATION_BANDS = [
  { id: 'any', label: 'Duration (days)' },
  { id: 'short', label: '1–6 days' },
  { id: 'medium', label: '7–10 days' },
  { id: 'long', label: '11+ days' },
];

const BUDGET_BANDS = [
  { id: 'any', label: 'Budget Per Person' },
  { id: 'under-350k', label: 'Under ₹3,50,000' },
  { id: '350k-500k', label: '₹3,50,000–₹5,00,000' },
  { id: 'over-500k', label: '₹5,00,000+' },
];

const Select: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <div className="relative">
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full appearance-none rounded-md border border-stone-300 bg-white pl-4 pr-10 font-sans text-sm text-[#081726] transition-colors focus:border-[#c59b67] focus:outline-none focus:ring-1 focus:ring-[#c59b67]/40"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
      aria-hidden="true"
    />
  </div>
);

interface DestinationItemWithCategory extends DestinationPlace {
  categoryId: string;
  categoryName: string;
}

export const DestinationsExplorePage: React.FC = () => {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Flatten all destinations with their category info
  const allDestinations = useMemo(() => {
    const list: DestinationItemWithCategory[] = [];
    DESTINATIONS_DATA.forEach((cat) => {
      cat.destinations.forEach((dest) => {
        list.push({
          ...dest,
          categoryId: cat.id,
          categoryName: cat.name,
        });
      });
    });
    return list;
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return allDestinations.filter((item) => {
      if (applied.category !== 'all' && item.categoryId !== applied.category) {
        return false;
      }
      if (applied.duration !== 'any' && item.days !== undefined) {
        if (applied.duration === 'short' && item.days > 6) return false;
        if (applied.duration === 'medium' && (item.days < 7 || item.days > 10)) return false;
        if (applied.duration === 'long' && item.days < 11) return false;
      }
      if (applied.budget !== 'any' && item.priceFrom !== undefined) {
        if (applied.budget === 'under-350k' && item.priceFrom >= 350000) return false;
        if (applied.budget === '350k-500k' && (item.priceFrom < 350000 || item.priceFrom > 500000)) return false;
        if (applied.budget === 'over-500k' && item.priceFrom <= 500000) return false;
      }
      return true;
    });
  }, [allDestinations, applied]);

  const apply = () => {
    setApplied(draft);
    setVisibleCount(9);
  };
  const reset = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setVisibleCount(9);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Destinations & Collections' },
    ...DESTINATIONS_DATA.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden bg-[#05131f]"
        style={{ minHeight: 'clamp(360px, 46vw, 520px)' }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg`}
            alt="Worldwide Destinations"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-[#05131f]/50 to-[#04101b]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/55 via-transparent to-[#04101b]/55" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c59b67] sm:text-[11px]">
              Explore The World
            </span>
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
          </div>

          <h1 className="font-serif text-4xl font-normal leading-[1.06] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Our Handpicked <span className="italic text-[#e8c697]">Destinations</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[13px] font-light leading-[1.9] text-stone-300 sm:text-sm">
            {allDestinations.length} curated journeys across extraordinary landscapes, ancient
            monuments and untamed wilderness — each one completely tailored to you.
          </p>
        </div>
      </section>

      {/* Collections Category Quick Navigation */}
      {/* <section className="border-b border-stone-200/80 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
            <button
              type="button"
              onClick={() => {
                setDraft((p) => ({ ...p, category: 'all' }));
                setApplied((p) => ({ ...p, category: 'all' }));
                setVisibleCount(9);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                applied.category === 'all'
                  ? 'bg-[#8a6a35] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              All Collections
            </button>
            {DESTINATIONS_DATA.map((cat) => {
              const active = applied.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setDraft((p) => ({ ...p, category: cat.id }));
                    setApplied((p) => ({ ...p, category: cat.id }));
                    setVisibleCount(9);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#8a6a35] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Itineraries + filters */}
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <div className="mt-2">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
              <p className="shrink-0 font-sans text-[15px] text-[#081726] sm:text-base">Filter by:</p>

              <div className="grid flex-1 gap-3 sm:grid-cols-3">
                <Select
                  label="Select Collection"
                  value={draft.category}
                  onChange={(value) => setDraft((prev) => ({ ...prev, category: value }))}
                  options={categoryOptions}
                />

                <Select
                  label="Duration (days)"
                  value={draft.duration}
                  onChange={(value) =>
                    setDraft((prev) => ({ ...prev, duration: value as DurationBand }))
                  }
                  options={DURATION_BANDS.map((band) => ({
                    value: band.id,
                    label: band.label,
                  }))}
                />

                <Select
                  label="Budget Per Person"
                  value={draft.budget}
                  onChange={(value) =>
                    setDraft((prev) => ({ ...prev, budget: value as BudgetBand }))
                  }
                  options={BUDGET_BANDS.map((band) => ({
                    value: band.id,
                    label: band.label,
                  }))}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={apply}
                  className="h-12 flex-1 rounded-md bg-[#8a6a35] px-9 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#7a5c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:flex-none cursor-pointer"
                >
                  Filter
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="h-12 flex-1 rounded-md border border-stone-500/70 bg-white px-9 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#081726] transition-colors hover:border-[#8a6a35] hover:text-[#8a6a35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:flex-none cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Active Collection Tagline when single category selected */}
          {applied.category !== 'all' && (
            <div className="mt-8 rounded-xl border border-[#c59b67]/20 bg-[#f9f6f0] p-5">
              {(() => {
                const activeCat = DESTINATIONS_DATA.find((c) => c.id === applied.category);
                if (!activeCat) return null;
                return (
                  <div>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#8a6a35]">
                      Featured Collection
                    </span>
                    <h2 className="mt-1 font-serif text-2xl text-[#081726]">{activeCat.name}</h2>
                    <p className="mt-1 text-sm font-light text-stone-600">{activeCat.tagline}</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Cards Grid */}
          {filtered.length > 0 ? (
            <>
              <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                {filtered.slice(0, visibleCount).map((dest) => (
                  <Link
                    key={`${dest.categoryId}-${dest.id}`}
                    href="/enquiry"
                    aria-label={`Enquire about ${dest.name}`}
                    className="group relative block h-[480px] overflow-hidden rounded-3xl bg-stone-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
                  >
                    {dest.image && (
                      <img
                        src={dest.image}
                        alt={dest.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                    {/* Top Badges for days and price */}
                    {/* {dest.days && (
                      <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md sm:text-[10px]">
                        {dest.days} days · {dest.location}
                      </span>
                    )} */}

                    {/* {dest.priceFrom && (
                      <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e8c697] backdrop-blur-md sm:text-[10px]">
                        From ₹{dest.priceFrom.toLocaleString('en-IN')}
                      </span>
                    )} */}

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="mb-1 font-sans text-[11px] font-medium uppercase tracking-wider text-[#e8c697]">
                        {dest.location}
                      </p>
                      <h3 className="mb-3 font-serif text-2xl leading-snug tracking-tight text-white sm:text-[28px]">
                        {dest.name}
                      </h3>
                      <p className="mb-5 line-clamp-2 max-w-xs text-sm font-light leading-relaxed text-stone-200/90">
                        {dest.description}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#e8c697]">
                        Plan journey
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filtered.length && (
                <div className="mt-14 flex flex-col items-center justify-center">
                  <p className="mb-4 font-sans text-xs text-stone-500">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} destinations
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                    className="inline-flex items-center gap-3 rounded-full border border-[#8a6a35] bg-white px-9 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a35] shadow-sm transition-all hover:bg-[#8a6a35] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] cursor-pointer"
                  >
                    Load More Destinations
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
              <p className="font-serif text-2xl tracking-tight text-[#081726]">
                Nothing matches that combination — yet.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-stone-600">
                Every journey we run is built from scratch, so tell us what you had in mind and we
                will design it.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8a6a35] underline decoration-[#c59b67]/60 underline-offset-4 transition-colors hover:text-[#081726] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#f6f1e8] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3.5">
                <Kicker>FAQs</Kicker>
              </div>
              <h2 className="max-w-7xl font-serif text-3xl leading-[1.12] tracking-tight text-[#081726] sm:text-4xl">
                Frequently Asked Questions about{' '}
                <span className="italic text-[#c59b67]">Our Destinations</span>
              </h2>
            </div>
          </div>

          <div className="mt-10">
            <Faq items={DESTINATIONS_FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
};

