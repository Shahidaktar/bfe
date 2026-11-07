import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONTACT, mailtoLink } from '../../lib/contact';

export const metadata: Metadata = {
  title: 'E-Shop - Beyond Forever Earth',
  description:
    'The Beyond Forever Earth E-Shop is coming soon — a private collection curated for the considered traveller. Launching soon.',
};

export default function EShopPage() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-[#05131f] pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://res.cloudinary.com/dnm6dyuaw/image/upload/v1794056940/Untitled-1.jpg_dmaxg6.jpg"
            alt="A private island seen from above, surrounded by turquoise water"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] font-semibold text-[#c59b67] uppercase font-sans">
              Bespoke Editions · Retail
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] max-w-3xl">
            The <span className="italic text-[#e8c697]">E-Shop</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm sm:text-base font-sans text-stone-200 font-light leading-relaxed">
            A private collection, curated by our travel designers — objects and editions
            for those who remember every journey.
          </p>

        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-semibold text-[#c59b67] font-sans">
            Coming Soon
          </p>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.1]">
            Something <span className="italic text-[#c59b67]">beautiful</span><br />
            is on its way.
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="w-14 h-px bg-[#ddd5c6]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#c59b67]" />
            <span className="w-14 h-px bg-[#ddd5c6]" />
          </div>

          <p className="mt-7 max-w-xl mx-auto text-sm sm:text-[15px] text-stone-600 leading-[1.8]">
            Our curators are assembling the first Beyond Forever Earth collection —
            embossed leather journals, safari-grade editions, fine stationery and rare
            objects that travel beautifully. Join the list and be the first to know when
            the door opens.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={mailtoLink('Notify me — E-Shop launch', 'Please add me to the list for the E-Shop launch.')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] hover:from-[#e8c697] hover:via-[#d6aa75] hover:to-[#c59b67] text-[#241a08] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_6px_16px_-6px_rgba(197,155,103,0.55)]"
            >
              <span>Notify Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#081726] text-[#e8c697] hover:text-[#f3e2c0] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase border border-[#081726] hover:border-[#c59b67]/40 transition-colors"
            >
              <span>Explore Our Journeys</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="mt-8 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-stone-400 font-sans">
            Launching Soon · {CONTACT.email}
          </p>
        </div>
      </section>
    </div>
  );
}
