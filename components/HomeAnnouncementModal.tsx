'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowUpRight } from 'lucide-react';

interface HomeAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeAnnouncementModal: React.FC<HomeAnnouncementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-[#05101a]/75 backdrop-blur-sm animate-in fade-in duration-300"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Journeys - Safaris - Voyages"
        className="relative w-full max-w-[560px] max-h-[calc(100dvh-1.5rem)] overflow-y-auto bg-[#faf8f5] rounded-2xl shadow-[0_40px_80px_-20px_rgba(5,16,26,0.6)] border border-[#e7e0d2] animate-in zoom-in-95 fade-in duration-300"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Gold hairline across the very top */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#c59b67] to-transparent" />

        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#e0d8c9] text-stone-500 hover:text-[#b68b55] hover:border-[#c59b67] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-5 sm:px-12 pt-7 sm:pt-12 pb-5 sm:pb-10 text-center">
          {/* Masthead */}
          <p className="text-[9px] sm:text-[11px] tracking-[0.32em] uppercase font-semibold text-[#c59b67] font-sans">
            Beyond Forever Earth
          </p>
          <h2 className="mt-2 sm:mt-3 font-serif italic font-light text-2xl sm:text-[34px] leading-tight tracking-tight text-[#081726]">
            Journeys · Safaris · Voyages
          </h2>
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="w-12 h-px bg-[#ddd5c6]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#c59b67]" />
            <span className="w-12 h-px bg-[#ddd5c6]" />
          </div>

          {/* Body copy */}
          <div className="mt-4 sm:mt-6 text-[11px] sm:text-[13.5px] leading-[1.65] sm:leading-[1.8] text-stone-600">
            <p>
              Thank you for allowing Beyond Forever Earth to research a quote for your
              upcoming travel plans and experience. We will work to get you the best price
              with the most value available. Please fill out the Travel Quote Request Form
              in its entirety, and you shall be contacted within 3 business days with a
              quote. If you have any additional questions, please email us at{' '}
              <a
                href="mailto:hi@beyondforever.earth"
                className="text-[#081726] font-medium border-b border-[#c59b67]/50 hover:border-[#c59b67] transition-colors"
              >
                hi@beyondforever.earth
              </a>
              .
            </p>
            <p className="mt-3 sm:mt-4 font-serif text-[12.5px] sm:text-[15px] text-[#081726] italic">
              Thanks, again for choosing us to plan your next vacation.
            </p>
          </div>

          {/* Divider */}
          <div className="my-4 sm:my-7 border-t border-[#e7e0d2]" aria-hidden="true" />

          {/* Credits */}
          <p className="text-[8px] sm:text-[10.5px] tracking-[0.25em] uppercase font-semibold text-stone-400">
            Member Reward
          </p>
          <p className="mt-1.5 sm:mt-2 font-serif text-lg sm:text-2xl text-[#081726] tracking-tight">
            Complete the assessment and get 500 credits
          </p>
          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-stone-500">
            Your wallet will update after the assessment is submitted.
          </p>

          {/* CTAs */}
          <div className="mt-4 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <Link
              href="/travel-assessment"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] text-[#241a08] text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_6px_16px_-6px_rgba(197,155,103,0.55)]"
            >
              <span>Assessment</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/enquiry"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-[#081726] text-[#e8c697] hover:text-[#f3e2c0] text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase border border-[#081726] hover:border-[#c59b67]/40 transition-colors"
            >
              <span>Enquiry Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
