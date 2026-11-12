'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { CONTACT, mailtoLink } from '../lib/contact';
import type { LegalContent } from '../lib/legal';
import { LegalSectionList } from './LegalSectionList';

const HERO_IMAGE = '/destinations/europe-hero.jpg';

interface TermsPageProps {
  content: LegalContent;
}

export const TermsPage: React.FC<TermsPageProps> = ({ content }) => {
  const { intro, sections } = content;

  return (
    <div id="top" className="bg-[#FAF8F5]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#05131f] pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg`}
            alt=""
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#c59b67]" aria-hidden="true" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c59b67] sm:text-[11px]">
                The Fine Print
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Terms &amp; <span className="italic text-[#e8c697]">conditions.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              The agreements that govern your booking, your journey and the care we owe
              each other — written to be read, not buried.
            </p>
          </div>
        </div>
      </section>

      {/* ── Terms ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#c59b67]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div>
              <div className="rounded-2xl border border-[#c59b67]/25 bg-white p-6 shadow-[0_2px_16px_rgba(8,23,38,0.04)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-[#c59b67]" aria-hidden="true" />
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b68b55]">
                    Definitions
                  </p>
                </div>
                <ol className="mt-5 space-y-4">
                  {intro.map((entry, index) => (
                    <li
                      key={index}
                      className="flex gap-4 font-sans text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]"
                    >
                      <span className="shrink-0 select-none font-serif text-xs font-medium leading-7 text-[#c59b67]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{entry}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12">
                <LegalSectionList sections={sections} />
              </div>

              <div className="mt-16 overflow-hidden rounded-2xl bg-[#081726] p-7 text-white sm:p-10">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67]">
                  Need clarity?
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  Questions about{' '}
                  <span className="italic text-[#e8c697]">these terms?</span>
                </h2>
                <p className="mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-stone-300">
                  Our travel specialists are happy to walk you through anything here
                  before you book.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoLink(
                      'Terms & Conditions enquiry',
                      'Hello Beyond Forever Earth, I have a question about your Terms & Conditions.'
                    )}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#c59b67] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] transition-colors hover:bg-[#d6aa75]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{CONTACT.email}</span>
                  </a>
                  <Link
                    href="/enquiry"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c59b67] hover:text-[#e8c697]"
                  >
                    <span>Talk to a specialist</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};
