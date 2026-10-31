'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { JourneyEnquiryForm } from './EnquiryForm';
import { CONTACT, whatsappLink } from '../lib/contact';

const NEXT_STEPS = [
  {
    num: '01',
    title: 'Your brief reaches a specialist',
    description:
      'Your enquiry goes to a dedicated travel designer who knows your destination — not a shared inbox.',
  },
  {
    num: '02',
    title: 'A personal reply',
    description:
      'We come back within one business day with first thoughts, questions and a sense of what is possible.',
  },
  {
    num: '03',
    title: 'A private draft itinerary',
    description:
      'Hotels, guides and private experiences, refined together until the journey feels unmistakably yours.',
  },
];

const TRUST_POINTS = ['100% Personalised', '1:1 Travel Specialist', '24/7 Support'];

export const PlanPage: React.FC = () => {
  const [initialDestination, setInitialDestination] = useState('');
  const [initialTravelType, setInitialTravelType] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Plan My Journey | Beyond Forever Earth';
    // Read query params after mount (e.g. /plan-my-journey?journey=...&style=...)
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
            Plan My <span className="italic text-[#e8c697]">Journey</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base font-sans text-stone-200 font-light leading-relaxed">
            Tell us what you are dreaming of. A dedicated travel specialist will design
            a private itinerary around your pace, your preferences and the moments that
            matter to you.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs tracking-wider uppercase text-stone-300 font-sans">
            {TRUST_POINTS.map((point, index) => (
              <React.Fragment key={point}>
                {index > 0 && (
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c59b67]/60" />
                )}
                <span>{point}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Form + guidance */}
      <section id="enquiry" className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Enquiry form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-1">
                  Two Short Steps
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight mb-1.5">
                  Tell Us About Your Journey
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-500 font-light leading-relaxed mb-6">
                  No obligation and no automated packages. The more you share, the more
                  personal the first draft will be.
                </p>

                <JourneyEnquiryForm
                  initialDestination={initialDestination}
                  initialTravelType={initialTravelType}
                />
              </div>
            </div>

            {/* Supporting panel */}
            <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#081726] rounded-2xl p-6 sm:p-8 text-white">
                <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-1">
                  What Happens Next
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-normal mb-6">
                  From enquiry to departure
                </h2>

                <ol className="space-y-5">
                  {NEXT_STEPS.map((step) => (
                    <li key={step.num} className="flex gap-4">
                      <span className="font-mono text-xs text-[#c59b67] tracking-wider tabular-nums pt-0.5">
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs text-stone-400 font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <figure className="bg-[#f3ece1] rounded-2xl p-6 sm:p-7 border border-[#e4d7c3]">
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#081726] leading-snug">
                  “We wanted a honeymoon that felt private rather than packaged. Our
                  specialist steered us to an overwater villa we would never have found
                  ourselves, and every transfer ran to the minute.”
                </blockquote>
                <figcaption className="mt-4 text-[11px] tracking-[0.2em] uppercase text-stone-600 font-sans">
                  Rohit — Maldives honeymoon, 6 days
                </figcaption>
              </figure>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7">
                <h3 className="font-serif text-lg sm:text-xl text-[#081726] mb-1">
                  Prefer to talk it through?
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed mb-4">
                  Message a specialist directly — we are happy to answer questions before
                  you commit to anything.
                </p>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-[#c59b67] hover:bg-[#d6aa75] text-[#081726] text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp a Travel Specialist</span>
                </a>

                <div className="mt-4 space-y-2 text-xs text-stone-600">
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="flex items-center gap-2.5 hover:text-[#c59b67] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c59b67]" />
                    <span>{CONTACT.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-2.5 hover:text-[#c59b67] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#c59b67]" />
                    <span className="break-all">{CONTACT.email}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
