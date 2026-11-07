'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  Layers,
  Lock,
  Minus,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useSite } from './SiteProvider';
import { BucketListWizard } from './BucketListWizard';

const pexels = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const ARCH_IMAGES = [
  {
    src: pexels('2923591', 900),
    alt: 'Desert dunes unfolding toward the horizon',
  },
  {
    src: pexels('1268855', 900),
    alt: 'A lantern-lit courtyard in Morocco',
  },
];

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'Dreamstorm Without Limits',
    copy:
      'Plan fearlessly. Spend fifteen minutes writing down every destination, feeling or experience that excites you — no budgets, no logistics, just the wow.',
    tone: 'bg-[#f1f3e6] border-[#dde3c8]',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Categorize Your Ideas',
    copy:
      'Shape the list into themes: adventure, culture, nature, food. Tag each idea with the best time to visit so the dream begins to take form.',
    tone: 'bg-[#f7efe9] border-[#ead9cd]',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Prioritize by Excitement & Ease',
    copy:
      'Rank each item by the joy it brings and how easily it can happen. Some become quick wins; others are worth years of anticipation.',
    tone: 'bg-[#efeff7] border-[#dcdce9]',
  },
  {
    number: '04',
    icon: CalendarDays,
    title: 'Set a Timeline & Budget',
    copy:
      'Choose one major journey every year or two, then slot smaller weekends in between. A dedicated travel fund turns intentions into departures.',
    tone: 'bg-[#eaf2ec] border-[#d3e3d7]',
  },
];

const INSPIRING_IDEAS = [
  {
    title: 'Natural Wonders',
    copy: 'Marvel at the Northern Lights in Iceland or Victoria Falls in Africa.',
  },
  {
    title: 'Cultural Icons',
    copy: 'Explore the ruins of Machu Picchu in Peru or the Taj Mahal in India.',
  },
  {
    title: 'Bucket List Experiences',
    copy:
      'Go on a safari in South Africa, stay in an overwater villa in the Maldives, or drive the Scottish Highlands.',
  },
];

const FAQS = [
  {
    id: 'where-to-go',
    question: "I'm not sure where to go yet, can you help me decide?",
    answer:
      'Yes. We match each guest’s tastes to the world through a personal consultation, not automated algorithms or pre-packaged itineraries. We discuss how you want to feel, suggest destinations that fit, and align your dates with the best weather, cultural highlights and entry requirements.',
  },
  {
    id: 'planning-process',
    question: 'How does the custom travel planning process work?',
    answer:
      'You are paired with a travel consultant who specialises in your destination. Every itinerary starts from scratch: you share your vision, your consultant curates a draft, and together you refine the pace, stays and experiences until it feels right.',
  },
  {
    id: 'planning-timeline',
    question: 'How long does it take to design and finalise an itinerary?',
    answer:
      'Timing depends on the complexity of the trip. An initial draft follows your consultation; refinements can take a few days to a few weeks. We recommend planning six to nine months ahead, or ten to twelve months for peak seasons and exclusive stays.',
  },
  {
    id: 'modify-packages',
    question: 'Can the vacation and itinerary packages on your website be modified?',
    answer:
      'Yes. Every sample itinerary on our website is a starting point. Your consultant can adjust pacing, upgrade accommodation, add private experiences, or reshape the journey entirely around you.',
  },
];

export const BucketListPage: React.FC = () => {
  const { data: session, status } = useSession();
  const { openLogin } = useSite();
  const [openFaq, setOpenFaq] = useState<string | null>('where-to-go');

  const isAuthenticated = status === 'authenticated';
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] ?? '';

  return (
    <div className="bg-[#FBFAF7]">
      <section className="relative overflow-hidden bg-[#05131f] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/75 to-[#04101b]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                The Art of Dreaming
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] max-w-3xl">
              Create <span className="italic text-[#e8c697]">Bucket List</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base font-sans text-stone-200 font-light leading-relaxed">
              A travel bucket list begins with dreamstorming — the places, feelings and
              experiences you want to collect in this lifetime. The finest lists balance epic,
              once-in-a-lifetime dreams with smaller, more accessible adventures.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FBFAF7] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c59b67]/30 to-transparent"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="flex items-end justify-center gap-3 sm:gap-5">
              {ARCH_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden rounded-t-full bg-stone-200 shadow-[0_20px_50px_-24px_rgba(8,23,38,0.35)] ${
                    index === 0
                      ? 'w-1/2 h-[260px] sm:h-[360px] lg:h-[420px]'
                      : 'w-1/2 h-[220px] sm:h-[310px] lg:h-[360px] mb-6 sm:mb-10'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/25 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                  A Life Well Lived
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
                What are you <span className="italic text-[#c59b67]">waiting for?</span>
              </h2>

              <p className="mt-6 text-sm sm:text-[15px] text-stone-600 leading-[1.9] font-light">
                We want to help you create your travel bucket list and start executing the
                places you have been dreaming of. A bucket list is a record of the experiences
                you want to try in this lifetime — and everyone deserves one.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  'A bucket list makes you stop and consider what you actually want to experience in this precious life.',
                  'A bucket list reminds you that this life is to be lived to its fullest.',
                  'A bucket list brings joy and satisfaction because it gives plan, purpose and clarity to life.',
                ].map((item) => (
                  <li key={item} className="flex gap-4">
                    <span className="mt-1.5 w-2 h-2 shrink-0 rotate-45 bg-[#c59b67]" />
                    <span className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 sm:py-24 lg:py-28 bg-[#f7f1e7] ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
                A Simple Practice
              </span>
              <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
              Here&rsquo;s how to <span className="italic text-[#c59b67]">create your list</span>
            </h2>
            <p className="mt-5 text-sm sm:text-[15px] text-stone-500 leading-relaxed font-light">
              Use this gentle framework to turn a vague longing into a list you can actually
              travel.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className={`group relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(8,23,38,0.35)] ${step.tone}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="w-10 h-10 rounded-full border border-[#081726]/10 bg-white/60 flex items-center justify-center text-[#081726]">
                      <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                    </span>
                    <span className="font-serif italic text-2xl text-[#081726]/25">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-[#081726] leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] text-stone-600 leading-relaxed font-light">
                    {step.copy}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 rounded-2xl border border-stone-200/80 bg-white/70 p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-14">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight leading-snug">
                  Create with year &amp; month specifications — a mini list of ten.
                </h3>
                <p className="mt-4 text-sm text-stone-600 leading-[1.85] font-light">
                  Share and get a partner in joy. With a bucket list and a few possible time
                  brackets in place, the next step is to share it with the people who matter.
                  You can even share your list with your partner, best friend, roommate or
                  siblings — anyone who might want to help or join you on your quest. They may
                  contribute ideas, encourage you, or turn an idea into a shared journey.
                </p>
              </div>

              <div>
                <p className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                  Inspiring Ideas to Get Started
                </p>
                <ul className="mt-5 space-y-4">
                  {INSPIRING_IDEAS.map((idea) => (
                    <li key={idea.title} className="flex gap-3">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#c59b67]" />
                      <p className="text-sm text-stone-600 leading-relaxed font-light">
                        <span className="font-medium text-[#081726]">{idea.title}.</span>{' '}
                        {idea.copy}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 pt-6 border-t border-stone-200/70 text-sm text-stone-500 leading-relaxed font-light">
              Use this space to curate a list of outrageous travels for the future — then let us
              design the first one around you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28 bg-[#FBFAF7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
              Travel Wishlist
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tight text-[#081726] leading-[1.08]">
              Create Your <span className="italic text-[#c59b67]">Bucket List</span>
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-stone-500 leading-relaxed font-light">
              Plan your dream journey and save it for later.
            </p>
          </div>

          <div className="mt-12">
            {isAuthenticated ? (
              <div>
                <BucketListWizard userName={firstName} />
                <p className="mt-6 text-center text-xs text-stone-400 font-light">
                  Already saved a journey?{' '}
                  <Link
                    href="/account"
                    className="text-[#b68b55] hover:text-[#081726] underline-offset-4 hover:underline transition-colors"
                  >
                    View your bucket lists
                  </Link>
                </p>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className="rounded-2xl border border-stone-200/80 bg-white/80 shadow-[0_24px_60px_-40px_rgba(8,23,38,0.4)] px-6 sm:px-10 py-10 sm:py-12 text-center">
                  <div className="w-12 h-12 rounded-full border border-stone-300 bg-[#FAF8F5] flex items-center justify-center mx-auto">
                    <Lock className="w-5 h-5 text-[#c59b67]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
                    Login Required
                  </h3>
                  <p className="mt-3 text-sm text-stone-500 leading-relaxed font-light max-w-sm mx-auto">
                    Please login first to create your bucket list, add wishlist items or send a
                    travel enquiry.
                  </p>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="mt-7 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#081726] text-[#e8c697] hover:text-[#f3e2c0] border border-[#081726] hover:border-[#c59b67]/50 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer"
                  >
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

         
        </div>
      </section>

 
    </div>
  );
};
