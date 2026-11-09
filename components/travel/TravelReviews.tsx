'use client';

import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../lib/testimonials';

export const TravelReviews: React.FC = () => {
  const reviews = useMemo(() => {
    const centralAsia = TESTIMONIALS_DATA.findIndex((item) =>
      item.role.toLowerCase().includes('central asia')
    );
    if (centralAsia <= 0) return TESTIMONIALS_DATA;
    return [
      TESTIMONIALS_DATA[centralAsia],
      ...TESTIMONIALS_DATA.filter((_, index) => index !== centralAsia),
    ];
  }, []);

  const [index, setIndex] = useState(0);
  const total = reviews.length;
  const active = reviews[index] ?? reviews[0];

  const go = (direction: number) => {
    setIndex((current) => (current + direction + total) % total);
  };

  if (!active) return null;

  return (
    <section id="reviews" className="scroll-mt-[132px] relative overflow-hidden bg-[#081726] py-20 sm:py-24 lg:py-28">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-[#c59b67]/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
            Guest Reviews
          </span>
          <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.12]">
          What Our <span className="italic text-[#e8c697]">Guests Say</span>
        </h2>

        <div key={active.id} className="mt-10">
          <span
            aria-hidden="true"
            className="block font-serif text-5xl leading-none text-[#c59b67]/60 select-none"
          >
            &ldquo;
          </span>

          <blockquote className="mt-2 font-serif text-xl sm:text-2xl lg:text-[30px] leading-[1.55] text-stone-100 font-light">
            {active.quote}
          </blockquote>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#e8c697]">
              {active.name}
            </p>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-stone-400">
              {active.role}
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          {/* <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-white/25 text-stone-300 flex items-center justify-center transition-colors hover:border-[#c59b67] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button> */}

          <div className="flex items-center gap-2">
            {reviews.map((review, reviewIndex) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setIndex(reviewIndex)}
                aria-label={`View review by ${review.name}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  reviewIndex === index ? 'w-6 bg-[#c59b67]' : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-white/25 text-stone-300 flex items-center justify-center transition-colors hover:border-[#c59b67] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
          >
            <ChevronRight className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </section>
  );
};
