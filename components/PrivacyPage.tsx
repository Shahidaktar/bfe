import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { CONTACT, mailtoLink } from '../lib/contact';
import type { LegalContent } from '../lib/legal';
import { LegalSectionList } from './LegalSectionList';

const HERO_IMAGE = '/destinations/italy-hero.jpg';

interface PrivacyPageProps {
  content: LegalContent;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ content }) => {
  const { sections } = content;

  return (
    <div className="bg-[#FAF8F5]">
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
                Your Privacy
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Privacy, <span className="italic text-[#e8c697]">respected.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-[1.9] text-stone-200 sm:text-base">
              How SSTPL collects, uses and protects your personal data — together with
              our cookie policy and the terms that govern this website.
            </p>
          </div>
        </div>
      </section>

      {/* ── Policy ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#c59b67]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b68b55]">
            <span>Privacy Policy</span>
            <span className="text-stone-300" aria-hidden="true">
              /
            </span>
            <a href="#cookie-policy" className="transition-colors hover:text-[#081726]">
              Cookie Policy
            </a>
            <span className="text-stone-300" aria-hidden="true">
              /
            </span>
            <a href="#terms-of-use" className="transition-colors hover:text-[#081726]">
              Terms of Use
            </a>
            <span className="ml-auto font-medium tracking-[0.18em] text-stone-400">
              Effective 24 September 2018
            </span>
          </div>

          <LegalSectionList sections={sections} />

          <div className="mt-16 overflow-hidden rounded-2xl bg-[#081726] p-7 text-white sm:p-10">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c59b67]">
              Privacy questions?
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              Talk to us about{' '}
              <span className="italic text-[#e8c697]">your data.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-stone-300">
              If you have a question about this policy or want to exercise a privacy
              right, our team is here to help.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={mailtoLink(
                  'Privacy Policy enquiry',
                  'Hello Beyond Forever Earth, I have a question about your Privacy Policy.'
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
      </section>
    </div>
  );
};
