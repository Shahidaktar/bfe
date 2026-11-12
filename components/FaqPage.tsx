'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
} from 'lucide-react';
import type { FaqCategoryId, FaqItem } from '../lib/faq';

const HERO_IMAGE = '/destinations/europe-hero.jpg';

interface FaqPageProps {
  items: FaqItem[];
}

const ListEntry: React.FC<{ text: string }> = ({ text }) => {
  const separator = text.indexOf(': ');
  const hasLabel = separator > 0 && separator < 80;

  return (
    <>
      {hasLabel ? (
        <>
          <span className="font-semibold text-[#081726]">{text.slice(0, separator)}:</span>{' '}
          {text.slice(separator + 2)}
        </>
      ) : (
        text
      )}
    </>
  );
};

export const FaqPage: React.FC<FaqPageProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | FaqCategoryId>('all');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    items[0] ? { [items[0].id]: true } : {}
  );
  const categorySliderRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 1 | -1) => {
    categorySliderRef.current?.scrollBy({
      left: direction * 260,
      behavior: 'smooth',
    });
  };

  const categories = useMemo(() => {
    const seen = new Map<FaqCategoryId, { id: FaqCategoryId; label: string; count: number }>();
    for (const item of items) {
      const existing = seen.get(item.category);
      if (existing) {
        existing.count += 1;
      } else {
        seen.set(item.category, {
          id: item.category,
          label: item.categoryLabel,
          count: 1,
        });
      }
    }
    return [...seen.values()];
  }, [items]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      if (!query) return true;

      const answer = item.blocks
        .map((block) => (block.type === 'paragraph' ? block.text : block.items.join(' ')))
        .join(' ');

      return `${item.question} ${item.categoryLabel} ${answer}`
        .toLowerCase()
        .includes(query);
    });
  }, [items, activeCategory, search]);

  useEffect(() => {
    if (visible.length === 0) return;
    setOpenIds((previous) => {
      if (visible.some((item) => previous[item.id])) return previous;
      return { ...previous, [visible[0].id]: true };
    });
  }, [visible]);

  const selectCategory = (category: 'all' | FaqCategoryId) => {
    setActiveCategory(category);
    const first = items.find(
      (item) => category === 'all' || item.category === category
    );
    setOpenIds(first ? { [first.id]: true } : {});
  };

  const toggle = (id: string) =>
    setOpenIds((previous) => ({ ...previous, [id]: !previous[id] }));

  return (
    <div className="bg-[#FAF8F5]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#05131f] pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={`https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg`} alt="" className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c59b67] sm:text-[11px]">
                Ask &amp; Question
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Questions, <span className="italic text-[#e8c697]">answered.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              Everything you need to know about our custom planning process, financial
              security and 24/7 global support — answered by the people who design your
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#c59b67]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3.5 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67] sm:text-[11px]">
                  Frequently Asked Questions
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-[1.08] tracking-tight text-[#081726] sm:text-5xl lg:text-6xl">
                Planning Your{' '}
                <span className="italic font-normal text-[#c59b67]">Luxury Journey</span>
              </h2>
            </div>

            <div className="max-w-sm md:text-right">
              <p className="font-sans text-xs font-light leading-relaxed text-stone-500 sm:text-[13px]">
                At Beyond Forever Earth, we design 100% custom luxury journeys tailored to
                your exact desires — from the first conversation to the final transfer.
              </p>
            </div>
          </div> */}

          <div className="">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="order-2 flex min-w-0 items-center gap-2 lg:order-1 lg:flex-1">
                <button
                  type="button"
                  onClick={() => scrollCategories(-1)}
                  aria-label="Scroll categories left"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:border-[#c59b67] hover:text-[#c59b67]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div
                  ref={categorySliderRef}
                  className="flex min-w-0 flex-1 items-center gap-2.5 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
                >
                  <button
                    type="button"
                    onClick={() => selectCategory('all')}
                    aria-pressed={activeCategory === 'all'}
                    className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest transition-all sm:text-xs ${
                      activeCategory === 'all'
                        ? 'border-[#c59b67] bg-[#c59b67] text-white shadow-md'
                        : 'border-stone-200 bg-white/60 text-stone-500 hover:border-[#c59b67]/60 hover:text-[#c59b67]'
                    }`}
                  >
                    <span>All Questions</span>
                    <span
                      className={`text-[9px] ${
                        activeCategory === 'all' ? 'text-white/80' : 'text-stone-400'
                      }`}
                    >
                      {items.length}
                    </span>
                  </button>

                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => selectCategory(category.id)}
                        aria-pressed={isActive}
                        className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest transition-all sm:text-xs ${
                          isActive
                            ? 'border-[#c59b67] bg-[#c59b67] text-white shadow-md'
                            : 'border-stone-200 bg-white/60 text-stone-500 hover:border-[#c59b67]/60 hover:text-[#c59b67]'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span
                          className={`text-[9px] ${
                            isActive ? 'text-white/80' : 'text-stone-400'
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => scrollCategories(1)}
                  aria-label="Scroll categories right"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:border-[#c59b67] hover:text-[#c59b67]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="relative order-1 w-full lg:order-2 lg:w-72 lg:shrink-0">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search the questions…"
                  aria-label="Search frequently asked questions"
                  className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-4 font-sans text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#c59b67] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-7xl">
              {visible.length === 0 ? (
                <div className="rounded-2xl border border-stone-200 bg-white px-6 py-14 text-center">
                  <p className="font-serif text-2xl tracking-tight text-[#081726]">
                    No questions match that search.
                  </p>
                  <p className="mt-2 text-sm font-light text-stone-500">
                    Try another phrase, or talk to a specialist and ask us directly.
                  </p>
                  <Link
                    href="/enquiry"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#c59b67] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] transition-colors hover:bg-[#d6aa75]"
                  >
                    <span>Ask a Specialist</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {visible.map((item) => {
                    const isOpen = Boolean(openIds[item.id]);
                    const index = items.indexOf(item) + 1;
                    const itemNumber = String(index).padStart(2, '0');

                    return (
                      <div
                        key={item.id}
                        className={`overflow-hidden rounded-2xl border bg-white/90 transition-all duration-300 ${
                          isOpen
                            ? 'border-[#c59b67]/60 shadow-[0_10px_30px_rgba(197,155,103,0.12)] ring-1 ring-[#c59b67]/20'
                            : 'border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-stone-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`${item.id}-answer`}
                          className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                            <span className="shrink-0 select-none font-serif text-xs font-medium tracking-wider text-[#c59b67] sm:text-sm">
                              {itemNumber}
                            </span>
                            <span className="font-serif text-lg leading-snug tracking-tight text-[#081726] transition-colors group-hover:text-[#c59b67] sm:text-xl lg:text-2xl">
                              {item.question}
                            </span>
                          </div>

                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${
                              isOpen
                                ? 'border-[#c59b67] bg-[#c59b67] text-white'
                                : 'border-stone-200 bg-[#FAF8F5] text-stone-400 group-hover:border-[#c59b67] group-hover:text-[#c59b67]'
                            }`}
                          >
                            {isOpen ? (
                              <Minus className="h-4 w-4 stroke-[2]" />
                            ) : (
                              <Plus className="h-4 w-4 stroke-[2]" />
                            )}
                          </span>
                        </button>

                        {isOpen && (
                          <div
                            id={`${item.id}-answer`}
                            className="border-t border-stone-100/80 px-6 pb-6 pt-1 sm:px-8 sm:pb-8 sm:pt-2"
                          >
                            <div className="space-y-4 sm:pl-10 lg:pl-12">
                              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b68b55]">
                                {item.categoryLabel}
                              </p>

                              {item.blocks.map((block, blockIndex) =>
                                block.type === 'paragraph' ? (
                                  <p
                                    key={blockIndex}
                                    className="font-sans text-sm font-light leading-relaxed text-stone-600 sm:text-base lg:text-[17px]"
                                  >
                                    {block.text}
                                  </p>
                                ) : (
                                  <ul key={blockIndex} className="space-y-2.5">
                                    {block.items.map((entry, entryIndex) => (
                                      <li
                                        key={entryIndex}
                                        className="flex gap-3 font-sans text-sm font-light leading-relaxed text-stone-600 sm:text-[15px]"
                                      >
                                        <span
                                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c59b67]"
                                          aria-hidden="true"
                                        />
                                        <span>
                                          <ListEntry text={entry} />
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
};
