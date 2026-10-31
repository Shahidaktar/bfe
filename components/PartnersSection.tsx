import React from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    name: 'Partner 1',
    logo: 'https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/partner1-removebg-preview.png',
  },
  {
    id: 'partner-2',
    name: 'Partner 2',
    logo: 'https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/partner2-removebg-preview.png',
  },
  {
    id: 'partner-3',
    name: 'Partner 3',
    logo: 'https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/partner3-removebg-preview.png',
  },
  {
    id: 'partner-4',
    name: 'Partner 4',
    logo: 'https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/partner4-removebg-preview.png',
  },
  {
    id: 'partner-5',
    name: 'Partner 5',
    logo: 'https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/partner5-removebg-preview.png',
  },
];

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-20 sm:py-24 lg:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/60">
      {/* Subtle ambient luxury glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c59b67]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-stone-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header (Styled identically to PackagesSection) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Global Network
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Distinguished <span className="italic font-normal text-[#c59b67]">Partners</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              We collaborate with premier hospitality houses, private aviation charters, and bespoke operators across the globe.
            </p>
          </div>
        </div>

        {/* Cardless Partner Logos Row / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center justify-items-center gap-8 sm:gap-10 lg:gap-12 py-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="group flex items-center justify-center w-full px-2 py-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-20 sm:h-24 lg:h-28 xl:h-32 w-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] object-contain opacity-85 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
