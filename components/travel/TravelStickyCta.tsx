'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, Star } from 'lucide-react';
import { CONTACT } from '../../lib/contact';

/**
 * Bottom action bar for itinerary pages.
 *
 * Deliberately hidden while the reader is still inside TravelOverview — it only
 * slides in once that section has been scrolled past, and steps away again when
 * the footer arrives so it never covers the closing content.
 */
export const TravelStickyCta: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const overview = document.getElementById('overview');
    const footer = document.querySelector('footer');
    if (!overview) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const overviewBottom = overview.getBoundingClientRect().bottom;
      const footerTop = footer ? footer.getBoundingClientRect().top : Number.POSITIVE_INFINITY;

      const pastOverview = overviewBottom <= 0;
      const footerInView = footerTop < window.innerHeight - 40;

      setVisible(pastOverview && !footerInView);
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

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/80 bg-[#FAF8F5]/95 backdrop-blur-md transition-all duration-500 motion-reduce:transition-none ${
        visible
          ? 'visible translate-y-0 opacity-100 shadow-[0_-16px_40px_-34px_rgba(8,23,38,0.6)]'
          : 'invisible translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-8 sm:py-3 lg:px-12">
        <Link
          href="/create-the-bucketlist"
          aria-label="Create your bucket list"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-[#b68b55] transition-colors hover:border-[#c59b67] hover:text-[#8a6a35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67]"
        >
          <Star className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </Link>

        <Link
          href="/enquiry"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#241a08] shadow-[0_6px_16px_-8px_rgba(197,155,103,0.6)] transition-all hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081726]/30 sm:px-8 sm:py-3.5 sm:text-xs"
        >
          Start Planning
        </Link>

        <a
          href={`tel:${CONTACT.phoneTel}`}
          aria-label={`Call ${CONTACT.phoneDisplay}`}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-[#8a6a35] px-3.5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f6efe4] transition-colors hover:bg-[#7a5c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081726]/30 sm:px-6 sm:py-3.5 sm:text-xs"
        >
          <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
