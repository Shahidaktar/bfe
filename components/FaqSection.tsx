'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, type FaqCategoryId, type FaqItem } from '../lib/faq';

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

export const FaqSection: React.FC = () => {
  // Extract unique categories from FAQ_ITEMS
  const categories = useMemo(() => {
    const map = new Map<FaqCategoryId, { id: FaqCategoryId; label: string; count: number }>();
    for (const item of FAQ_ITEMS) {
      const existing = map.get(item.category);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(item.category, {
          id: item.category,
          label: item.categoryLabel,
          count: 1,
        });
      }
    }
    return [...map.values()];
  }, []);

  const [activeTab, setActiveTab] = useState<FaqCategoryId>(
    categories[0]?.id || 'planning'
  );

  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    FAQ_ITEMS[0] ? { [FAQ_ITEMS[0].id]: true } : {}
  );

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Limit FAQs displayed in the home section (e.g. up to 5 per category)
  const visibleFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => item.category === activeTab).slice(0, 5);
  }, [activeTab]);

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-t border-stone-200/80 relative overflow-hidden">
      {/* Delicate ambient gold & warm glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c59b67]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-stone-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            {/* Gold Kicker */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Travel Planning FAQs
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Frequently Asked <span className="italic font-normal text-[#c59b67]">Questions</span>
            </h2>
          </div>

          {/* Right Description */}
          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Clear answers, bespoke arrangements, and transparent guidance to help you plan your journey with effortless confidence.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 sm:mb-14">
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenIds({});
                }}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[11px] sm:text-xs font-semibold tracking-widest uppercase font-sans transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c59b67] border-[#c59b67] text-white shadow-md'
                    : 'border-stone-200 text-stone-500 hover:border-[#c59b67]/60 hover:text-[#c59b67] bg-white/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] ${isActive ? 'text-white/80' : 'text-stone-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
          {visibleFaqs.map((item, index) => {
            const isOpen = !!openIds[item.id];
            const itemNumber = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={item.id}
                className={`bg-white/90 border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#c59b67]/60 shadow-[0_10px_30px_rgba(197,155,103,0.12)] ring-1 ring-[#c59b67]/20'
                    : 'border-stone-200/80 hover:border-stone-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-6 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <span className="font-serif text-xs sm:text-sm tracking-wider text-[#c59b67] font-medium shrink-0 select-none">
                      {itemNumber}
                    </span>
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl text-[#081726] group-hover:text-[#c59b67] transition-colors leading-snug tracking-tight">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#c59b67] bg-[#c59b67] text-white'
                        : 'border-stone-200 text-stone-400 group-hover:border-[#c59b67] group-hover:text-[#c59b67] bg-[#FAF8F5]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-8 sm:pt-2 border-t border-stone-100/80">
                    <div className="pl-0 sm:pl-10 lg:pl-12 space-y-4">
                      {item.blocks.map((block, bIdx) => {
                        if (block.type === 'paragraph') {
                          return (
                            <p
                              key={bIdx}
                              className="font-sans text-sm sm:text-base lg:text-[17px] text-stone-600 font-light leading-relaxed"
                            >
                              {block.text}
                            </p>
                          );
                        }
                        if (block.type === 'list') {
                          return (
                            <ul key={bIdx} className="space-y-2 text-stone-600 font-light pl-4 sm:pl-5">
                              {block.items.map((line, lIdx) => (
                                <li
                                  key={lIdx}
                                  className="list-disc font-sans text-sm sm:text-base lg:text-[17px] leading-relaxed marker:text-[#c59b67]"
                                >
                                  <ListEntry text={line} />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Show More Button Redirecting to /faq */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center justify-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[#8a6a35] bg-white text-[#8a6a35] hover:bg-[#8a6a35] hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Show More FAQs</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 font-sans text-[11px] sm:text-xs text-stone-400 font-light">
            Explore all {FAQ_ITEMS.length} detailed questions and guidance
          </p>
        </div>
      </div>
    </section>
  );
};
