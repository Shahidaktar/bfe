'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSite } from './SiteProvider';
import { CONTACT, mailtoLink, whatsappLink } from '../lib/contact';
import Link from 'next/link';

const HERO_IMAGE =
  'https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg';

const WHAT_WE_DO = [
  {
    number: '01',
    title: 'No more “did I miss something?”',
    copy: 'You arrive knowing exactly where to be, when, and why it is the right call.',
  },
  {
    number: '02',
    title: 'A structure built around your trip',
    copy: 'Not someone else’s template. Every day flows into the next — no dead time, no last-minute replanning.',
  },
  {
    number: '03',
    title: 'Expertise, suppliers, one point of contact',
    copy: 'Destination knowledge, trusted supplier relationships and personalised service, held together by one person who knows your trip.',
  },
];

const FOR_YOU_IF = [
  'You’re not looking for inspiration — you already know where you want to go.',
  'You’re planning a 10+ day trip across multiple destinations, and the structure feels overwhelming.',
  'You’ve been on trips that didn’t flow the way you imagined, and you’re not doing that again.',
  'You’re investing seriously in this trip and want every decision to be the right one.',
  'You want to arrive knowing exactly what to do — not figure it out as you go.',
];

const TO_EXPECT = [
  {
    number: '01',
    title: 'Day-by-Day Architecture',
    copy: 'Exactly where to be, when, and in what sequence.',
  },
  {
    number: '02',
    title: 'Decision Support Tools',
    copy: 'So every booking you make is informed, not guessed.',
  },
  {
    number: '03',
    title: 'Booking Sequence',
    copy: 'What to confirm first, and why the order matters.',
  },
  {
    number: '04',
    title: 'Budget Allocation',
    copy: 'Where your money works hardest across the whole trip.',
  },
  {
    number: '05',
    title: 'Pre-departure Checklist',
    copy: 'Nothing falls through the cracks before you leave.',
  },
];

const HOW_WE_WORK = [
  {
    number: '01',
    title: 'Let’s Chat',
    copy: 'A complimentary consultation — text, call or email — to understand your travel style and what you expect from the trip.',
  },
  {
    number: '02',
    title: 'Trip Design Begins',
    copy: 'We research and craft a personalised itinerary, tailored to your preferences, budget and travel goals.',
  },
  {
    number: '03',
    title: 'Booking & Reservations',
    copy: 'Once the plan is approved with advance payment, we take care of every booking — flights, hotels, tours, logistics and visas.',
  },
  {
    number: '04',
    title: 'Final Details & Travel Docs',
    copy: 'You receive a detailed itinerary with everything you need, plus helpful tips and documents, neatly organised.',
  },
  {
    number: '05',
    title: 'Final Payment & Countdown',
    copy: 'We send your final invoice and make sure every payment lands on time — then it is time to get excited.',
  },
  {
    number: '06',
    title: 'Bon Voyage & Support',
    copy: 'You’re off. We’re here before, during and after your trip if anything comes up.',
  },
];

const Kicker: React.FC<{ children: React.ReactNode; center?: boolean; onDark?: boolean }> = ({
  children,
  center = false,
  onDark = false,
}) => (
  <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
    <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
    <span
      className={`font-sans text-[10px] uppercase tracking-[0.32em] font-semibold sm:text-[11px] ${
        onDark ? 'text-[#e8c697]' : 'text-[#c59b67]'
      }`}
    >
      {children}
    </span>
  </div>
);

const SectionHeading: React.FC<{
  kicker: string;
  children: React.ReactNode;
  onDark?: boolean;
}> = ({ kicker, children, onDark = false }) => (
  <>
    <Kicker onDark={onDark}>{kicker}</Kicker>
    <h2
      className={`mt-5 font-serif text-3xl leading-[1.14] tracking-tight sm:text-4xl lg:text-[46px] ${
        onDark ? 'text-white' : 'text-[#081726]'
      }`}
    >
      {children}
    </h2>
  </>
);

export const AboutPage: React.FC = () => {
  const { openPlanner } = useSite();

  return (
    <div className="bg-[#FBFAF7]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#05131f] pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <Kicker onDark>About Beyond Forever Earth</Kicker>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Travel, <span className="italic text-[#e8c697]">considered.</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              Bespoke journeys for travellers who would rather arrive prepared than simply
              inspired — crafted with passion, and curated by people who have been there.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 · Who we are ──────────────────────────────────────────────── */}
      <section id="who-we-are" className="scroll-mt-[120px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 sm:aspect-[16/10] lg:aspect-[4/5] lg:rounded-3xl">
                <img
                  src="/travel/tajikistan.jpg"
                  alt="An alpine lake beneath the Fann Mountains at first light"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/35 via-transparent to-transparent" />
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <SectionHeading kicker="Who We Are">
                Curated by <span className="italic text-[#c59b67]">seasoned</span> travellers
              </SectionHeading>

              <p className="mt-7 text-[15px] font-light leading-[1.95] text-stone-700 sm:text-[17px]">
                We curate bespoke travel experiences, to help travellers create unforgettable
                holidays. Itineraries crafted with passion, curated by seasoned travellers —
                making sure your every trip feels personal and memorable.
              </p>

              <p className="mt-5 text-sm font-light leading-[1.95] text-stone-600 sm:text-[15px]">
                As part of The Independent Travel Consultants, we provide full financial
                protection on every booking, giving our clients complete peace of mind. Our
                one-of-a-kind collaboration with travel-preneurs and influencers alters the
                experience of a vacation for you.
              </p>

              <dl className="mt-9 divide-y divide-stone-200/90 border-t border-stone-200/90">
                <div className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#b68b55]">
                    Protection
                  </dt>
                  <dd className="text-[13px] font-light leading-relaxed text-stone-600">
                    Full financial protection on every booking, through The Independent Travel
                    Consultants.
                  </dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#b68b55]">
                    Collaborations
                  </dt>
                  <dd className="text-[13px] font-light leading-relaxed text-stone-600">
                    Selected partnerships with travel-preneurs and creators who open doors a
                    standard itinerary cannot.
                  </dd>
                </div>
              </dl>

              <p className="mt-7 text-[13px] font-light leading-[1.9] text-stone-500">
                Let’s chat about your next holiday — WhatsApp us at{' '}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#081726] underline decoration-[#c59b67]/60 underline-offset-4 transition-colors hover:text-[#8a6a35]"
                >
                  {CONTACT.phoneDisplay}
                </a>
                , or write to{' '}
                <a
                  href={mailtoLink(
                    'A conversation about my next journey',
                    'Hello Beyond Forever Earth, I would like to talk about my next holiday.'
                  )}
                  className="text-[#081726] underline decoration-[#c59b67]/60 underline-offset-4 transition-colors hover:text-[#8a6a35]"
                >
                  {CONTACT.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · What we do ────────────────────────────────────────── */}
      <section
        id="what-we-do"
        className="relative scroll-mt-[120px] overflow-hidden bg-[#081726] py-20 sm:py-24 lg:py-28"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/travel/uzbekistan.jpg"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#081726]/75" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#081726] via-[#081726]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081726] via-[#081726]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <SectionHeading kicker="What We Do" onDark>
              The internet has unlimited itineraries. It has{' '}
              <span className="italic text-[#e8c697]">zero information about yours.</span>
            </SectionHeading>

            <p className="mt-6 text-sm font-light leading-[1.9] text-stone-300 sm:text-base">
              We design your trip strategy. You book with{' '}
              <span className="font-medium tracking-[0.08em] text-[#e8c697]">CLARITY</span>.
            </p>
          </div>

          <div className="mt-12 divide-y divide-white/15 border-y border-white/15 sm:mt-14">
            {WHAT_WE_DO.map((item) => (
              <div
                key={item.number}
                className="grid gap-2 py-7 sm:grid-cols-[48px_minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-8"
              >
                <span className="font-serif text-sm italic text-[#c59b67]">{item.number}</span>
                <h3 className="font-serif text-xl leading-snug tracking-tight text-white sm:text-[22px]">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-[1.8] text-stone-300">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-12">
            <p className="text-sm font-light leading-[1.9] text-stone-300">
              As travel advisors we help clients plan, book and manage travel by combining
              destination expertise, supplier relationships and personalised service. We act as
              consultants, planners and advocates throughout the journey.
            </p>
            <p className="text-sm font-light leading-[1.9] text-stone-300">
              Which saves your time and reduces the complexity of planning. Most importantly, we
              manage the unexpected — a delay, a supplier issue — and coordinate the solution, so
              you can focus on the trip itself.
            </p>
          </div>
        </div>
      </section>

      {/* ── 04 · Who it’s for ────────────────────────────────────────────── */}
      <section id="who-are-we-for" className="scroll-mt-[120px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHeading kicker="Who It’s For">
                AI gives you information. We give you{' '}
                <span className="italic text-[#c59b67]">decisions.</span>
              </SectionHeading>
              <p className="mt-6 max-w-sm text-sm font-light leading-[1.9] text-stone-600">
                There’s a difference between knowing a place exists and knowing whether it
                belongs on your trip, in your sequence, at your pace — before you waste money
                booking it in the wrong order.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#b68b55] sm:text-[11px]">
                This is for you if…
              </p>

              <ul className="mt-4 divide-y divide-stone-200/90 border-t border-stone-200/90">
                {FOR_YOU_IF.map((item, index) => (
                  <li key={item} className="flex gap-5 py-5">
                    <span className="mt-0.5 font-serif text-xs italic text-[#b68b55]/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-light leading-[1.8] text-stone-600 sm:text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · What to expect ──────────────────────────────────────────── */}
      <section
        id="what-to-expect"
        className="scroll-mt-[120px] bg-[#f6f1e8] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionHeading kicker="What To Expect">
              What you receive, <span className="italic text-[#c59b67]">before you go</span>
            </SectionHeading>
            <p className="mt-5 text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]">
              Five deliverables, prepared for your trip specifically — the architecture behind the
              itinerary, not decoration around it.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="divide-y divide-stone-300/60 border-y border-stone-300/60">
                {TO_EXPECT.map((item) => (
                  <div key={item.number} className="grid gap-1 py-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-6">
                    <span className="font-serif text-sm italic text-[#b68b55]">{item.number}</span>
                    <div>
                      <h3 className="font-serif text-lg leading-snug tracking-tight text-[#081726] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[13px] font-light leading-relaxed text-stone-600 sm:text-sm">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-xs font-light italic leading-relaxed text-stone-500">
                Please note, there is no fee to submit a travel query. We shall reach out after
                reviewing your travel query.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="relative h-[260px] overflow-hidden rounded-2xl bg-stone-200 sm:h-[340px] lg:h-full lg:min-h-[420px] lg:rounded-3xl">
                <img
                  src="/travel/kyrgyzstan.jpg"
                  alt="Yurts on a lakeside meadow beneath snow-covered peaks"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · How we work ─────────────────────────────────────────────── */}
      <section id="how-we-work" className="scroll-mt-[120px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionHeading kicker="How We Work">
              Six steps, <span className="italic text-[#c59b67]">one considered journey</span>
            </SectionHeading>
            <p className="mt-5 text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]">
              From the first conversation to the flight home — exactly how the work moves.
            </p>
          </div>

          <ol className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {HOW_WE_WORK.map((step) => (
              <li key={step.number} className="border-t border-stone-200/90 pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs italic text-[#b68b55]/80">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-xl leading-snug tracking-tight text-[#081726] sm:text-[22px]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-[13px] font-light leading-[1.8] text-stone-600 sm:text-sm">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Closing — the single call to action ──────────────────────────── */}
      <section className="relative overflow-hidden bg-[#081726] py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-[#c59b67]/10 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          {/* <Kicker center onDark>Begin</Kicker> */}

          <h2 className="mt-5 font-serif text-3xl leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[48px]">
            Tell us where you’re going.{' '}
            <span className="italic text-[#e8c697]">We’ll design the rest.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-[1.9] text-stone-300 sm:text-[15px]">
            One conversation is enough to start. Share your dates, your pace and how you like to
            travel — we’ll take it from there.
          </p>

          <div className="mt-9">
            <Link
              type="button"
           href={`/enquiry`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] shadow-[0_8px_20px_-10px_rgba(197,155,103,0.7)] transition-all hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c697] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081726] sm:text-xs"
            >
              <span>Travel Quote</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.18em] text-stone-400">
            Or write to{' '}
            <a
              href={mailtoLink('Travel query', 'Hello Beyond Forever Earth, I would like to plan a journey.')}
              className="text-stone-300 underline decoration-[#c59b67]/50 underline-offset-4 transition-colors hover:text-[#e8c697]"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};
