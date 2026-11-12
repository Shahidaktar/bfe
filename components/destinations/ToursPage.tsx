'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { DestinationContent } from '../../lib/destinations';
import {
  BUDGET_BANDS,
  DURATION_BANDS,
  TOUR_INTERESTS,
  filterTours,
  type BudgetBand,
  type DurationBand,
  type Tour,
  type TourInterest,
} from '../../lib/tours';
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
  </div>
);

type Filters = {
  interest: TourInterest | 'all';
  duration: DurationBand;
  budget: BudgetBand;
};

const EMPTY_FILTERS: Filters = { interest: 'all', duration: 'any', budget: 'any' };

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

export const ToursPage: React.FC<{ content: DestinationContent; tours: Tour[] }> = ({
  content,
  tours,
}) => {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);

  const filtered = useMemo(() => filterTours(tours, applied), [tours, applied]);
  const apply = () => setApplied(draft);
  const reset = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
  };

  const toursHref = `/destinations/${
    content.kind === 'region' ? content.slug : `${content.parent}/${content.slug}`
  }`;

  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden bg-[#05131f]"
        style={{ minHeight: 'clamp(360px, 46vw, 520px)' }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={content.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-[#05131f]/50 to-[#04101b]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/55 via-transparent to-[#04101b]/55" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c59b67] sm:text-[11px]">
              {content.heroKicker}
            </span>
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
          </div>

          <h1 className="font-serif text-4xl font-normal leading-[1.06] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {content.name} <span className="italic text-[#e8c697]">Tours</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[13px] font-light leading-[1.9] text-stone-300 sm:text-sm">
            {tours.length} curated journeys — each one private, and each one a starting point
            rather than a fixed departure.
          </p>
        </div>
      </section>

      {/* Itineraries + filters */}
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <div className="mt-2">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
              <p className="shrink-0 font-sans text-[15px] text-[#081726] sm:text-base">Filter by:</p>

              <div className="grid flex-1 gap-3 sm:grid-cols-3">
                <Select
                  label="Select your interests"
                  value={draft.interest}
                  onChange={(value) =>
                    setDraft((prev) => ({ ...prev, interest: value as Filters['interest'] }))
                  }
                  options={[
                    { value: 'all', label: 'Select your interests' },
                    ...TOUR_INTERESTS.map((interest) => ({ value: interest, label: interest })),
                  ]}
                />

                <Select
                  label="Duration (days)"
                  value={draft.duration}
                  onChange={(value) =>
                    setDraft((prev) => ({ ...prev, duration: value as DurationBand }))
                  }
                  options={DURATION_BANDS.map((band) => ({
                    value: band.id,
                    label: band.id === 'any' ? 'Duration (days)' : band.label,
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
                    label: band.id === 'any' ? 'Budget Per Person' : band.label,
                  }))}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={apply}
                  className="h-12 flex-1 rounded-md bg-[#8a6a35] px-9 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#7a5c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:flex-none"
                >
                  Filter
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="h-12 flex-1 rounded-md border border-stone-500/70 bg-white px-9 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#081726] transition-colors hover:border-[#8a6a35] hover:text-[#8a6a35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:flex-none"
                >
                  Reset
                </button>
              </div>
            </div>

          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {filtered.map((tour) => (
                <Link
                  key={tour.slug}
                  href="/enquiry"
                  aria-label={`Enquire about ${tour.title}`}
                  className="group relative block h-[460px] overflow-hidden rounded-3xl bg-stone-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/5" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  {/* <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md sm:text-[10px]">
                    {tour.days} days · {tour.interests[0]}
                  </span> */}

                  {/* <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e8c697] backdrop-blur-md sm:text-[10px]">
                    From ₹{tour.priceFrom.toLocaleString('en-IN')}
                  </span> */}

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <h3 className="mb-3 font-serif text-2xl leading-snug tracking-tight text-white sm:text-[28px]">
                      {tour.title}
                    </h3>
                    <p className="mb-5 line-clamp-2 max-w-xs text-sm font-light leading-relaxed text-stone-200/90">
                      {tour.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#e8c697]">
                      View journey
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
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

          {/* <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <Link
              href={toursHref}
              className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8a6a35] transition-colors hover:text-[#081726]"
            >
              Back to {content.name}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div> */}
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
                <span className="italic text-[#c59b67]">{content.name}</span> Tours
              </h2>
            </div>

            {/* <p className="max-w-sm text-xs font-light leading-relaxed text-stone-500 sm:text-[13px] md:text-right">
              Planning, inclusions, protection and what happens while you travel.
            </p> */}
          </div>

          <div className="mt-10">
            <Faq items={content.faqs} />
          </div>
        </div>
      </section>
    </div>
  );
};
