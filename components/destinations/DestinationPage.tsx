'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Star } from 'lucide-react';
import { useSite } from '../SiteProvider';
import { CONTACT } from '../../lib/contact';
import { DESTINATION_NAV, type DestinationContent } from '../../lib/destinations';
import { scrollTo } from '../../lib/lenis';
import { setHasSectionNav, setNavHidden } from '../../lib/chrome';
import { Faq } from './Faq';

const Dot: React.FC = () => (
  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-[#c59b67]/80" />
);

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

const SectionHeader: React.FC<{
  kicker: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}> = ({ kicker, title, description, className = '' }) => (
  <div className={`flex flex-col justify-between gap-6 md:flex-row md:items-end ${className}`}>
    <div>
      <div className="mb-3.5">
        <Kicker>{kicker}</Kicker>
      </div>
      <h2 className="font-serif text-4xl leading-[1.08] tracking-tight text-[#081726] sm:text-5xl">
        {title}
      </h2>
    </div>

    {description && (
      <div className="max-w-sm md:text-right">
        <p className="font-sans text-xs font-light leading-relaxed text-stone-500 sm:text-[13px]">
          {description}
        </p>
      </div>
    )}
  </div>
);

const SectionNav: React.FC = () => {
  const [active, setActive] = useState<string>(DESTINATION_NAV[0].id);
  const [compact, setCompact] = useState(false);
  // While a tab click is scrolling, don't treat the movement as a reader scroll.
  const lockRef = useRef(0);

  useEffect(() => {
    setHasSectionNav(true);
    return () => {
      setHasSectionNav(false);
      setNavHidden(false);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      let current = DESTINATION_NAV[0].id;
      for (const item of DESTINATION_NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 220) current = item.id;
      }
      setActive(current);

      if (Date.now() < lockRef.current) {
        lastY = y;
        return;
      }

      if (y <= 120) {
        setCompact(false);
        setNavHidden(false);
      } else if (y - lastY > 8 && y > 260) {
        setCompact(true);
        setNavHidden(true);
      } else if (y - lastY < -8) {
        setCompact(false);
        setNavHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (id: string) => {
    lockRef.current = Date.now() + 900;
    setCompact(false);
    setNavHidden(false);
    scrollTo(`#${id}`, { offset: -140 });
  };

  return (
    <nav
      aria-label="Destination sections"
      className={`sticky z-40 border-y transition-colors duration-300 ${
        compact
          ? 'top-0 border-white/10 bg-[#081726]/95 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md'
          : 'top-[60px] border-stone-200/80 bg-[#FBFAF7]/95 backdrop-blur-md sm:top-[64px]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max min-w-full items-stretch justify-around gap-6 sm:gap-8">
            {DESTINATION_NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative shrink-0 py-[18px] font-sans text-[14px] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer focus-visible:outline-none sm:text-[17px] ${
                    compact
                      ? isActive
                        ? 'text-[#e8c697]'
                        : 'text-stone-400 hover:text-white'
                      : isActive
                        ? 'text-[#081726]'
                        : 'text-stone-400 hover:text-[#8a6a35]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-[2px] transition-colors ${
                      isActive ? 'bg-[#c59b67]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const DestinationPage: React.FC<{ content: DestinationContent }> = ({ content }) => {
  const { openPlanner } = useSite();
  const [before, after] = content.heroTitle.split(content.heroAccent);

  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero — mirrors TravelHero */}
      <section
        className="relative flex items-center overflow-hidden bg-[#05131f]"
        style={{ minHeight: 'clamp(560px, 70vh, 760px)' }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={content.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-[#05131f]/45 to-[#04101b]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/55 via-transparent to-[#04101b]/55" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 pt-32 text-center sm:px-8 sm:pb-24 sm:pt-40">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c59b67] sm:text-[11px]">
              {content.heroKicker}
            </span>
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
          </div>

          <h1 className="font-serif text-[38px] font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-[76px]">
            {before}
            <span className="italic text-[#e8c697]">{content.heroAccent}</span>
            {after}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[10px] uppercase tracking-[0.24em] text-stone-300 sm:text-[11px]">
            <span>Private journeys</span>
            <Dot />
            <span>Local experts</span>
            <Dot />
            <span>24/7 support</span>
          </div>
        </div>
      </section>

      <SectionNav />

      {/* Overview */}
      <section id="overview" className="scroll-mt-[150px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            kicker="Overview"
            title={
              <>
                Experience Luxury Travel in{' '}
                <span className="italic text-[#c59b67]">{content.name}</span>
              </>
            }
            // description={`A considered introduction to travelling ${content.name} with Beyond Forever Earth — the pace, the places, and the people who shape the route.`}
            className="mb-14 sm:mb-16"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[15px] font-light leading-[1.95] text-stone-700 sm:text-[17px]">
                {content.overview[0]}
              </p>
              <div className="mt-6 space-y-5">
                {content.overview.slice(1).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm font-light leading-[1.95] text-stone-600 sm:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {content.countries && content.countries.length > 0 && (
                <div className="mt-8 border-t border-stone-200/90 pt-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] font-semibold text-[#b68b55]">
                    Explore {content.name} by country
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.countries.map((country) => (
                      <Link
                        key={country.href}
                        href={country.href}
                        className="rounded-full border border-stone-300/80 bg-white/70 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-[#081726] transition-colors hover:border-[#c59b67] hover:text-[#8a6a35]"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-2xl border border-[#e7e0d2] bg-[#f6f1e8] p-6 sm:p-7">
                <Kicker>In a line</Kicker>
                <p className="mt-4 font-serif text-xl leading-[1.5] tracking-tight text-[#081726] sm:text-[22px]">
                  {content.consultantQuote.quote}
                </p>
                <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8a6a35]">
                  — {content.consultantQuote.author}, {content.consultantQuote.role}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section id="itineraries" className="scroll-mt-[150px] bg-[#f6f1e8] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            kicker="Sample Itineraries"
            title={content.itineraryHeading}
            // description={content.itineraryIntro}
            className="mb-14 sm:mb-16"
          />

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {content.itineraries.slice(0, 3).map((itinerary) => (
              <Link
                key={itinerary.slug}
                href="/enquiry"
                aria-label={`Enquire about ${itinerary.title}`}
                className="group relative block h-[460px] overflow-hidden rounded-3xl bg-stone-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
              >
                <img
                  src={itinerary.image}
                  alt={itinerary.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/5" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                {/* <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md sm:text-[10px]">
                  {itinerary.meta}
                </span> */}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="mb-3 font-serif text-2xl leading-snug tracking-tight text-white sm:text-[28px]">
                    {itinerary.title}
                  </h3>
                  <p className="mb-5 line-clamp-2 max-w-xs text-sm font-light leading-relaxed text-stone-200/90">
                    {itinerary.excerpt}
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

          <div className="mt-12 flex justify-center">
            <Link
              href={content.kind === 'region' ? `/destinations/${content.slug}/${content.slug}-tours` : `/destinations/${content.parent}/${content.slug}/${content.slug}-tours`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] px-8 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] shadow-[0_8px_20px_-12px_rgba(197,155,103,0.8)] transition-all hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:text-xs"
            >
              {/* <span>{content.moreLabel}</span> */}
              <span>Discover More</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Guest review — mirrors TravelReviews */}
      <section id="reviews" className="relative scroll-mt-[150px] overflow-hidden bg-[#081726] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[#c59b67]/10 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c59b67] sm:text-[11px]">
              Guest Reviews
            </span>
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {content.reviewHeading}
          </h2>

          <blockquote className="mt-8 font-serif text-xl font-light leading-[1.55] text-stone-100 sm:text-2xl lg:text-[28px]">
            &ldquo;{content.review.quote}&rdquo;
          </blockquote>

          <div className="mt-7 flex items-center justify-center gap-1.5" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current text-[#e8c697]" aria-hidden="true" />
            ))}
          </div>

          <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">
            {content.review.author} · {content.review.meta}
          </p>
        </div>
      </section>

      {/* Difference */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-[140px] lg:col-span-4 lg:self-start">
              <Kicker>{content.name}, Considered</Kicker>

              <h2 className="mt-4 font-serif text-3xl leading-[1.12] tracking-tight text-[#081726] sm:text-4xl lg:text-[42px]">
                {content.differenceHeading}
              </h2>

              <p className="mt-5 max-w-sm text-sm font-light leading-[1.9] text-stone-600">
                Three things that do not change, whichever journey you choose — the way we
                design, the people on the ground, and the one person who answers.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="divide-y divide-stone-200/90 border-t border-stone-200/90">
                {content.difference.map((item) => (
                  <li
                    key={item.number}
                    className="grid gap-3 py-8 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-8 sm:py-10"
                  >
                    <span className="mt-1 font-serif text-2xl leading-none tracking-tight text-[#c59b67]/75 sm:mt-1.5">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="font-serif text-2xl leading-snug tracking-tight text-[#081726] sm:text-[26px]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-[13px] font-light leading-[1.9] text-stone-600 sm:text-sm">
                        {item.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Insider tips */}
      <section id="tips" className="scroll-mt-[150px] bg-[#f6f1e8] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Kicker>Insider Tips</Kicker>

              <h2 className="mt-4 font-serif text-3xl leading-[1.12] tracking-tight text-[#081726] sm:text-4xl">
                {content.tipsHeading}
              </h2>

              <p className="mt-4 max-w-xs text-[13px] font-light leading-[1.85] text-stone-600">
                The advice our consultants give over coffee — long before an itinerary exists.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <figure className="relative overflow-hidden rounded-3xl border border-[#c59b67]/30 bg-white/85 p-7 shadow-[0_24px_60px_-48px_rgba(8,23,38,0.55)] sm:p-9 lg:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 -top-8 select-none font-serif text-[140px] leading-none text-[#c59b67]/15"
                >
                  &rdquo;
                </span>

                <figcaption className="relative font-sans text-[9px] uppercase tracking-[0.28em] font-semibold text-[#b68b55]">
                  A note from your consultant
                </figcaption>

                <blockquote className="relative mt-5 font-serif text-xl leading-[1.6] tracking-tight text-[#081726] sm:text-[22px] lg:text-[26px]">
                  &ldquo;{content.tips.quote}&rdquo;
                </blockquote>

                <div className="relative mt-7 flex items-center gap-3 border-t border-stone-200/80 pt-5">
                  <span className="font-serif text-sm italic text-[#b68b55]">
                    {content.tips.author}
                  </span>
                  <span className="h-3 w-px bg-stone-300" aria-hidden="true" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-stone-500">
                    {content.tips.role}
                  </span>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Feature journey */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-stone-200 lg:aspect-[21/9] lg:rounded-3xl">
              <img
                src={content.feature.image}
                alt={content.feature.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05131f]/55 via-transparent to-transparent" />

              <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md sm:left-6 sm:top-6 sm:text-[10px]">
                Featured journey
              </span>
            </div>

            <div className="relative z-10 -mt-14 w-full rounded-2xl border border-stone-200/80 bg-white/95 p-6 shadow-[0_30px_70px_-50px_rgba(8,23,38,0.6)] backdrop-blur-sm sm:p-8 lg:absolute lg:bottom-10 lg:right-10 lg:mt-0 lg:w-[520px] lg:max-w-[48%] lg:rounded-3xl lg:p-10">
              <h2 className="font-serif text-2xl leading-[1.15] tracking-tight text-[#081726] sm:text-3xl lg:text-[38px]">
                {content.feature.title}
              </h2>

              <p className="mt-4 text-[13px] font-light leading-[1.9] text-stone-600 sm:text-sm">
                {content.feature.copy}
              </p>

              <div className="mt-6 border-t border-stone-200/80 pt-5">
                <div className="flex flex-col items-start gap-2.5">
                  <p className="font-sans text-[9px] uppercase tracking-[0.18em] font-semibold text-[#b68b55] sm:text-[10px]">
                    {content.feature.consultant}
                  </p>

                  <Link
                    href={content.feature.href}
                    className="group inline-flex shrink-0 items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-[#081726] transition-colors hover:text-[#8a6a35]"
                  >
                    View trip details
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#c59b67] transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts + the single call to action */}
      <section className="bg-[#f6f1e8] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          {/* <Kicker center>Travel With Experts</Kicker> */}
           <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-semibold text-[#c59b67] sm:text-[11px]">
              Travel With Experts
            </span>
            <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
          </div>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-[1.12] tracking-tight text-[#081726] sm:text-4xl lg:text-[44px]">
            {content.expert.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[13px] font-light leading-[1.9] text-stone-600 sm:text-sm">
            {content.expert.copy}
          </p>

          <div className="mt-12">
            <p className="font-sans text-[9px] uppercase tracking-[0.24em] font-semibold text-[#b68b55] sm:text-[10px]">
              {content.expert.statsLabel}
            </p>

            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-3 divide-x divide-stone-300/70 border-y border-stone-300/70">
              {content.expert.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-6">
                  <p className="font-serif text-3xl leading-none tracking-tight text-[#081726] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2.5 font-sans text-[8px] uppercase tracking-[0.16em] text-stone-500 sm:text-[9px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2 sm:gap-x-10">
            {content.expert.steps.map((step) => (
              <li key={step} className="flex gap-2.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c59b67]" aria-hidden="true" />
                <span className="text-[12px] font-light leading-relaxed text-stone-600 sm:text-[13px]">
                  {step}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => openPlanner()}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] px-8 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] shadow-[0_10px_28px_-16px_rgba(197,155,103,0.9)] transition-all hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] sm:text-xs"
            >
              <span>Travel Quote</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="font-sans text-[9px] uppercase tracking-[0.18em] font-semibold text-stone-500 transition-colors hover:text-[#8a6a35] sm:text-[10px]"
            >
              or call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Closing editorial band */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: 420 }}>
        <img
          src={content.closing.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05131f]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-[#05131f]/50 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-40 sm:px-8 sm:pb-14 lg:px-12">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {content.closing.title}
            </h2>
            <p className="mt-4 text-[13px] font-light leading-[1.85] text-stone-200 sm:text-sm">
              {content.closing.copy}
            </p>

            <Link
              href="/#stories"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-lg border border-white/35 bg-white/10 px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:border-[#e8c697] hover:text-[#e8c697] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c697]/70 sm:text-[11px]"
            >
              <span>Read article</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-[150px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            kicker="FAQs"
            title={
              <>
                Frequently Asked Questions about{' '}
                <span className="italic text-[#c59b67]">{content.name}</span> Tours
              </>
            }
            description=""
            className="mb-10 sm:mb-12"
          />

          <Faq items={content.faqs} />
        </div>
      </section>
    </div>
  );
};
