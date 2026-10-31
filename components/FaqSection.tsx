import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type FaqCategory = 'general' | 'itineraries' | 'support';

const FAQ_TABS: { id: FaqCategory; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'itineraries', label: 'Itineraries' },
  { id: 'support', label: 'Support' },
];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

const ALL_FAQS: FaqItem[] = [
  {
    id: 'where-to-go',
    category: 'general',
    question: "I'm not sure where to go yet, can you help me decide?",
    answer:
      'Yes. We match each guest’s tastes to the world through a personal consultation, not automated algorithms or pre-packaged itineraries. We discuss how you want to feel, suggest destinations that fit, and align your dates with the best weather, cultural highlights and entry requirements.',
  },
  {
    id: 'planning-process',
    category: 'general',
    question: 'How does the custom travel planning process work?',
    answer:
      'You are paired with a travel consultant who specialises in your destination. Every itinerary starts from scratch: you share your vision, your consultant curates a draft, and together you refine the pace, stays and experiences until it feels right.',
  },
  {
    id: 'planning-timeline',
    category: 'general',
    question: 'How long does it take to design and finalise an itinerary?',
    answer:
      'Timing depends on the complexity of the trip. An initial draft follows your consultation; refinements can take a few days to a few weeks; the final proposal is usually valid for seven days and is secured with booking forms and a deposit. We recommend planning 6–9 months ahead, or 10–12 months for peak seasons and exclusive stays.',
  },
  {
    id: 'modify-packages',
    category: 'itineraries',
    question: 'Can the vacation and itinerary packages on your website be modified?',
    answer:
      'Yes. Every sample itinerary on our website is a starting point. Your consultant can adjust pacing, upgrade accommodation, add private experiences, or reshape the journey entirely around you.',
  },
  {
    id: 'changes-after-booking',
    category: 'itineraries',
    question: 'Can I make changes to my itinerary after I have booked?',
    answer:
      'Yes. Contact your dedicated trip coordinator to integrate changes. Post-booking adjustments depend on supplier availability and may incur supplier costs or an administrative amendment fee, so we recommend finalising your core dates and destinations early.',
  },
  {
    id: 'pricing',
    category: 'general',
    question: 'How does the pricing on your website work?',
    answer:
      'Prices shown are indicative starting points because every journey is bespoke. Your final quote reflects travel dates, accommodation style, route complexity, internal flights and private experiences. Your consultant provides a transparent custom quote before booking.',
  },
  {
    id: 'whats-included',
    category: 'itineraries',
    question: 'What is included in the cost of my private custom vacation?',
    answer:
      'Inclusions are tailored to each itinerary, but typically cover VIP airport meet-and-greet and private transfers, hand-selected accommodation, internal flights, private tours and guides, and daily breakfast. Lunches and dinners are left flexible unless your itinerary specifies otherwise.',
  },
  {
    id: 'emergency-support',
    category: 'support',
    question: 'What happens if I have an emergency or need assistance while traveling?',
    answer:
      'You have 24/7 local support in your time zone, a global crisis management team for major disruptions such as severe weather or flight cancellations, and proactive monitoring of internal flights and local conditions. Your safety and seamless logistics are the priority.',
  },
];

export const FaqSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FaqCategory>('general');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'where-to-go': true,
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const visibleFaqs = ALL_FAQS.filter((item) => item.category === activeTab);

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] border-t border-stone-200/80 relative overflow-hidden">
      {/* Delicate ambient gold & warm glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c59b67]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-stone-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header - Exactly matched to PackagesSection header structure */}
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

        {/* Category Tabs (like the reference site) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 sm:mb-14">
          {FAQ_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = ALL_FAQS.filter((item) => item.category === tab.id).length;
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
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Single Column Layout on Desktop & Mobile with Bigger Editorial Font Size */}
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
                    <div className="pl-0 sm:pl-10 lg:pl-12">
                      <p className="font-sans text-sm sm:text-base lg:text-[17px] text-stone-600 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
