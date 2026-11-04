'use client';

import React, { useEffect, useState } from 'react';
import { JourneyEnquiryForm } from './EnquiryForm';

const TRUST_POINTS = ['100% Personalised', '1:1 Travel Specialist', '24/7 Support'];

export const PlanPage: React.FC = () => {
  const [initialDestination, setInitialDestination] = useState('');
  const [initialTravelType, setInitialTravelType] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Enquiry | Beyond Forever Earth';
    // Read query params after mount (e.g. /enquiry?journey=...&style=...)
    const params = new URLSearchParams(window.location.search);
    setInitialDestination(params.get('journey') ?? '');
    setInitialTravelType(params.get('style') ?? '');
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="bg-[#faf8f5]">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05131f] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/frames/ezgif-frame-075.jpg"
            alt="A private island surrounded by turquoise water, seen from above"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/75 to-[#04101b]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c59b67]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
              Bespoke Journey Design
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] max-w-3xl">
            Travel <span className="italic text-[#e8c697]">Quote</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base font-sans text-stone-200 font-light leading-relaxed">
            Tell us what you are dreaming of. A dedicated travel specialist will design
            a private itinerary around your pace, your preferences and the moments that
            matter to you.
          </p>

          {/* <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs tracking-wider uppercase text-stone-300 font-sans">
            {TRUST_POINTS.map((point, index) => (
              <React.Fragment key={point}>
                {index > 0 && (
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c59b67]/60" />
                )}
                <span>{point}</span>
              </React.Fragment>
            ))}
          </div> */}
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10 lg:p-12">
            {/* <div className="text-center mb-8 sm:mb-10">
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#c59b67] uppercase font-semibold block mb-3 font-sans">
                Four Quick Steps
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#081726] font-normal tracking-tight leading-[1.12] mb-3">
                Tell Us About Your <span className="italic text-[#c59b67]">Journey</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                No obligation and no automated packages. The more you share, the more
                personal the first draft will be.
              </p>
            </div> */}

            <JourneyEnquiryForm
              initialDestination={initialDestination}
              initialTravelType={initialTravelType}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
