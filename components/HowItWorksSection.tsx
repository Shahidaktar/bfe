import React from 'react';
import { MessageSquare, PenTool, SlidersHorizontal, CheckCircle2, Plane, Headphones } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartPlanning: () => void;
}

const STEPS = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Discover',
    description:
      'A relaxed conversation about your dreams, preferences, pace and travel style — no forms for form’s sake.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Your dedicated travel specialist crafts a private itinerary around the experiences that matter to you.',
  },
  {
    num: '03',
    icon: SlidersHorizontal,
    title: 'Refine',
    description:
      'We refine every detail together — hotels, guides, private moments — until the journey feels unmistakably yours.',
  },
  {
    num: '04',
    icon: CheckCircle2,
    title: 'Confirm',
    description:
      'Once you’re delighted, we confirm every reservation, transfer and experience with trusted partners.',
  },
  {
    num: '05',
    icon: Plane,
    title: 'Travel',
    description:
      'You travel with complete documents, seamless logistics and the confidence that everything is handled.',
  },
  {
    num: '06',
    icon: Headphones,
    title: 'Support',
    description:
      'A real human is available 24/7 throughout your journey — and long after you return home.',
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartPlanning,
}) => {
  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-28 lg:py-32 bg-[#071523] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                How It Works
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
              From First Conversation{' '}
              <span className="italic font-normal text-[#c59b67]">to Return Home</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-400 font-light leading-relaxed">
              Six steps, one dedicated specialist, and a journey designed entirely
              around you.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="group relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-sm text-[#c59b67] tracking-wider tabular-nums font-light">
                    {step.num}
                  </span>
                  <span className="flex-1 h-[1px] bg-white/15 group-hover:bg-[#c59b67]/50 transition-colors" />
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 text-[#c59b67] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#c59b67] group-hover:bg-[#c59b67] group-hover:text-[#081726]">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight mb-2.5">
                  {step.title}
                </h3>

                <p className="text-sm text-stone-400 font-light leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={onStartPlanning}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#c59b67] hover:bg-[#b68b55] active:scale-[0.98] text-[#081726] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md transition-all shadow-lg group cursor-pointer"
          >
            <span>Start the Conversation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
