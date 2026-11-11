'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export const Faq: React.FC<{ items: { question: string; answer: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState<number[]>([]);
  const allOpen = open.length === items.length;

  const toggle = (index: number) =>
    setOpen((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : items.map((_, i) => i))}
          className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-500 transition-colors hover:text-[#8a6a35] cursor-pointer"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = open.includes(index);
          return (
            <div
              key={item.question}
              className={`overflow-hidden rounded-2xl border bg-white/90 transition-colors ${
                isOpen ? 'border-[#c59b67]/50' : 'border-stone-200/90'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left cursor-pointer focus-visible:outline-none sm:px-7 sm:py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-serif text-[11px] italic text-[#b68b55]/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg leading-snug tracking-tight text-[#081726] sm:text-xl">
                    {item.question}
                  </span>
                </span>
                <span className="mt-1 shrink-0 text-[#b68b55]">
                  {isOpen ? (
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </button>

              {isOpen && (
                <p className="max-w-3xl px-5 pb-6 pl-[3.4rem] text-[13px] font-light leading-[1.85] text-stone-600 sm:px-7 sm:pl-[4.1rem] sm:text-sm">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
