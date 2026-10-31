import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT, whatsappLink } from '../lib/contact';

interface CuratedBannerSectionProps {
  onStartPlanning: () => void;
}

export const CuratedBannerSection: React.FC<CuratedBannerSectionProps> = ({
  onStartPlanning,
}) => {
  return (
    <section
      id="experiences"
      className="relative py-12 sm:py-16 overflow-hidden bg-[#FAF8F5] border-t border-stone-200/60"
    >
      {/* Ambient gold glow behind the invitation panel */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c59b67]/10 rounded-full blur-[140px] pointer-events-none" /> */}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Invitation panel — inset gold hairline frame */}
        <div className="relative bg-white/70 border border-[#c59b67]/40 rounded-[1.75rem] px-6 py-12 sm:px-12 sm:py-14 text-center overflow-hidden">
          {/* Corner flourishes */}
          {/* <span aria-hidden="true" className="absolute top-4 left-5 sm:top-6 sm:left-7 font-serif text-[#c59b67]/50 text-base select-none">✦</span>
          <span aria-hidden="true" className="absolute top-4 right-5 sm:top-6 sm:right-7 font-serif text-[#c59b67]/50 text-base select-none">✦</span>
          <span aria-hidden="true" className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 font-serif text-[#c59b67]/50 text-base select-none">✦</span>
          <span aria-hidden="true" className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 font-serif text-[#c59b67]/50 text-base select-none">✦</span> */}

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[52px] tracking-tight text-[#081726] leading-[1.15] max-w-3xl mx-auto">
            Your Next Extraordinary Journey,{' '}
            <span className="italic font-normal text-[#c59b67]">Starts With a Conversation</span>
          </h2>

          {/* Primary CTA */}
          <div className="mt-8">
            <button
              onClick={onStartPlanning}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c59b67] hover:bg-[#d6aa75] active:scale-[0.98] text-[#081726] text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-md transition-all shadow-lg shadow-stone-900/10 group cursor-pointer whitespace-nowrap"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Minimal contact alternatives */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-0 text-[11px] tracking-[0.16em] uppercase font-sans text-stone-400">
            <span className="sm:px-4">Or talk to a specialist now</span>
            <span aria-hidden="true" className="hidden sm:inline text-[#c59b67] px-2">·</span>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="px-2 text-stone-500 hover:text-[#c59b67] transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
            <span aria-hidden="true" className="hidden sm:inline text-[#c59b67] px-2">·</span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-stone-500 hover:text-[#c59b67] transition-colors"
            >
              WhatsApp a Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
