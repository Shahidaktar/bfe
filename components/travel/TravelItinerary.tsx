'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  BedDouble,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Route,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import type { TravelItinerary as Itinerary } from '../../lib/travel';

// Dummy hotel data generator for rich accommodation display
const DUMMY_HOTELS = [
  {
    name: 'The Grand Silk Road Heritage Hotel',
    type: 'Luxury Boutique',
    rating: 5,
    location: 'City Centre',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    description: 'Heritage-inspired suites with ornate carved wood and private courtyard views.',
  },
  {
    name: 'Oasis Palace & Spa Resort',
    type: 'Premium Collection',
    rating: 4,
    location: 'Old Town Quarter',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    description: 'Boutique stay blending traditional architecture with modern wellness facilities.',
  },
];

export const TravelItinerary: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
  const [active, setActive] = useState(0);
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({});
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const chapter = itinerary.chapters[active];
  const total = itinerary.chapters.length;

  // Keep the selected tab centred inside the strip.
  useEffect(() => {
    const tab = tabRefs.current[active];
    const scroller = scrollerRef.current;
    if (!tab || !scroller) return;

    const target = tab.offsetLeft - scroller.clientWidth / 2 + tab.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const selectChapter = (index: number) => {
    setActive((index + total) % total);
  };

  const toggleDay = (day: number) =>
    setOpenDays((prev) => ({ ...prev, [day]: !prev[day] }));

  if (!chapter) return null;

  return (
    <section id="itinerary" className="scroll-mt-[132px] bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
              Sample Itinerary
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] tracking-tight text-[#081726] leading-[1.08]">
            Twenty-two days, <span className="italic text-[#c59b67]">one route</span>
          </h2>

          {/* <p className="mt-5 text-sm sm:text-[15px] text-stone-500 leading-[1.9] font-light">
            Every day below is written the way we would travel it — where you sleep, what
            is included and how far you move. Choose a country to open its days.
          </p> */}
        </div>

        {/* At a glance */}
        {/* <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_18px_40px_-36px_rgba(8,23,38,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
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
                  <tr key={row.country} className="border-b border-stone-100 align-top last:border-0">
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
        </div> */}

        {/* Unified country card + days accordion */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_24px_60px_-48px_rgba(8,23,38,0.5)]">
          {/* Header Image */}
          <div className="relative h-56 sm:h-64 lg:h-72 bg-stone-900">
            <img
              key={chapter.image}
              src={chapter.image}
              alt={chapter.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/90 via-[#081726]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-6 sm:p-8">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#e8c697] font-semibold font-sans">
                  Part {String(active + 1).padStart(2, '0')} · Central Asia
                </span>
                <h3 className="mt-1 font-serif text-3xl sm:text-4xl text-white tracking-tight">
                  {chapter.country}
                </h3>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-white/95 backdrop-blur-md font-sans">
                {chapter.dayRange}
              </span>
            </div>
          </div>

          {/* Continuous Timeline Strip */}
          <div className="relative flex items-center border-t border-b border-stone-200/80 bg-[#FCFBF9] px-2 sm:px-4 py-3">
            <button
              type="button"
              onClick={() => selectChapter(active - 1)}
              aria-label="Previous country"
              className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-600 shadow-sm transition hover:border-[#c59b67] hover:text-[#8a6a35] hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={scrollerRef}
              role="tablist"
              aria-label="Country chapters"
              className="relative flex flex-1 items-center overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {itinerary.chapters.map((item, index) => {
                const isActive = index === active;
                const isPassed = index < active;

                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`chapter-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls="chapter-panel"
                    onClick={() => setActive(index)}
                    className="group relative flex min-w-[140px] flex-1 flex-col items-center py-2 text-center cursor-pointer focus-visible:outline-none"
                  >
                    {/* Continuous Connecting Line Segment */}
                    <div className="relative flex w-full items-center justify-center my-3">
                      <span
                        className={`absolute top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-300 ${
                          index === 0
                            ? 'left-1/2 right-0'
                            : index === total - 1
                            ? 'left-0 right-1/2'
                            : 'left-0 right-0'
                        } ${isPassed || isActive ? 'bg-[#c59b67]' : 'bg-stone-300'}`}
                      />

                      {index > 0 && (
                        <span
                          className={`absolute left-0 right-1/2 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-300 ${
                            isPassed || isActive ? 'bg-[#c59b67]' : 'bg-stone-300'
                          }`}
                        />
                      )}

                      {index < total - 1 && (
                        <span
                          className={`absolute left-1/2 right-0 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-300 ${
                            isPassed ? 'bg-[#c59b67]' : 'bg-stone-300'
                          }`}
                        />
                      )}

                      <span
                        className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? 'h-6 w-6 bg-white ring-4 ring-[#c59b67]/20 border-2 border-[#c59b67]'
                            : 'h-3.5 w-3.5 bg-[#c59b67]'
                        }`}
                      >
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-[#8a6a35]" />
                        )}
                      </span>
                    </div>

                    <span
                      className={`font-serif text-sm sm:text-[15px] transition-colors leading-tight ${
                        isActive
                          ? 'font-bold text-[#081726]'
                          : 'font-normal text-stone-600 group-hover:text-stone-900'
                      }`}
                    >
                      Days {item.dayRange.replace(/^Days\s*/i, '')}
                    </span>

                    <span
                      className={`mt-1.5 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase transition-colors ${
                        isActive
                          ? 'font-bold text-[#8a6a35]'
                          : 'font-semibold text-stone-400 group-hover:text-stone-600'
                      }`}
                    >
                      {item.country}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => selectChapter(active + 1)}
              aria-label="Next country"
              className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-600 shadow-sm transition hover:border-[#c59b67] hover:text-[#8a6a35] hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days Accordion */}
          <div
            id="chapter-panel"
            role="tabpanel"
            aria-labelledby={`chapter-tab-${chapter.id}`}
            key={chapter.id}
            className="px-5 sm:px-8 py-2 divide-y divide-stone-200/60"
          >
            {chapter.days.map((day) => {
              const isOpen = Boolean(openDays[day.day]);
              return (
                <div key={day.day} className="py-2 first:pt-0 last:pb-3">
                  <button
                    type="button"
                    onClick={() => toggleDay(day.day)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-4 text-left cursor-pointer focus-visible:outline-none sm:gap-6"
                  >
                    <span className="w-14 shrink-0 font-serif italic text-base text-[#c59b67] sm:w-16 sm:text-lg">
                      Day {day.day}
                    </span>
                    <span className="flex-1 font-serif text-lg tracking-tight text-[#081726] transition-colors group-hover:text-[#b68b55] sm:text-[20px]">
                      {day.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#c59b67] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-8 sm:pl-[88px]">
                      {/* 1. ABOVE PARAGRAPH: Info Highlights (Meals, Travel, Overnight Stay) */}
                   {/* 1. ABOVE PARAGRAPH: Info Highlights (Stacked Vertically) */}
<dl className="mb-6 flex flex-col divide-y divide-stone-200/80 rounded-2xl border border-stone-200/80 bg-[#FAF8F5]">
  {/* Meals */}
  <div className="flex items-center gap-3.5 p-3.5 sm:px-5 sm:py-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 shadow-xs">
      <UtensilsCrossed className="w-4 h-4 text-[#c59b67]" aria-hidden="true" />
    </div>
    <div className="flex flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
      <dt className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-400">
        Meals
      </dt>
      <dd className="text-[13px] font-medium text-[#081726]">
        {day.meals || 'Breakfast included'}
      </dd>
    </div>
  </div>

  {/* Travel */}
  <div className="flex items-center gap-3.5 p-3.5 sm:px-5 sm:py-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 shadow-xs">
      <Route className="w-4 h-4 text-[#c59b67]" aria-hidden="true" />
    </div>
    <div className="flex flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
      <dt className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-400">
        Travel
      </dt>
      <dd className="text-[13px] font-medium text-[#081726]">
        {day.travel || 'Private vehicle & walking'}
      </dd>
    </div>
  </div>

  {/* Overnight */}
  <div className="flex items-center gap-3.5 p-3.5 sm:px-5 sm:py-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 shadow-xs">
      <BedDouble className="w-4 h-4 text-[#c59b67]" aria-hidden="true" />
    </div>
    <div className="flex flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
      <dt className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-400">
        Overnight
      </dt>
      <dd className="text-[13px] font-medium text-[#081726]">
        {day.accommodation || 'Handpicked Boutique Stay'}
      </dd>
    </div>
  </div>
</dl>

                      {/* 2. PARAGRAPHS */}
                      <div className="space-y-4">
                        {day.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 32)}
                            className="text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* 3. BELOW PARAGRAPH: Hotel Options */}
                      <div className="mt-8 pt-6 border-t border-stone-200/70">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c59b67]">
                              Where You Stay
                            </span>
                            <h4 className="font-serif text-lg sm:text-xl text-[#081726] tracking-tight">
                              Featured Hotel Options
                            </h4>
                          </div>
                          <span className="text-xs text-stone-400 font-light hidden sm:inline">
                            Subject to availability or equivalent standard
                          </span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {DUMMY_HOTELS.map((hotel, idx) => (
                            <div
                              key={idx}
                              className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition duration-200 hover:border-stone-300 hover:shadow-md"
                            >
                              <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                                <img
                                  src={hotel.image}
                                  alt={hotel.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-stone-800 backdrop-blur-xs">
                                  <Star className="h-3 w-3 fill-[#c59b67] text-[#c59b67]" />
                                  <span>{hotel.rating}-Star</span>
                                </div>
                                <span className="absolute bottom-2.5 left-2.5 rounded-md bg-[#081726]/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-xs">
                                  {hotel.type}
                                </span>
                              </div>

                              <div className="flex flex-1 flex-col p-4">
                                <div className="flex items-center gap-1 text-[11px] text-stone-400">
                                  <MapPin className="h-3 w-3 text-[#c59b67]" />
                                  <span>{hotel.location}</span>
                                </div>
                                <h5 className="mt-1 font-serif text-[16px] font-medium leading-snug text-[#081726]">
                                  {hotel.name}
                                </h5>
                                <p className="mt-2 text-xs text-stone-500 font-light leading-relaxed">
                                  {hotel.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};