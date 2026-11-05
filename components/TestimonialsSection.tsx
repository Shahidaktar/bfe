import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string; // Displayed in the selector: 'Sandy', 'John', etc.
  author: string; // Displayed in kicker: 'SANDY', 'JOHN', etc.
  role: string; // 'COLLECTOR OF MOMENTS', etc.
  quote: string;
  destination?: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'rohit',
    name: 'Rohit',
    author: 'ROHIT',
    role: 'MALDIVES HONEYMOON',
    destination: '6 days, private island',
    quote:
      'We wanted a honeymoon that felt private rather than packaged. Our specialist steered us to an overwater villa we would never have found ourselves, and every transfer ran to the minute — we did not have to plan a single day.',
  },
  {
    id: 'rahul',
    name: 'Rahul',
    author: 'RAHUL',
    role: 'CENTRAL ASIA · THE FIVE STANS',
    destination: '15 days, five countries',
    quote:
      'Fifteen days across five countries, and not one moment where we felt like tourists on a schedule. The guides were chosen for us personally, the yurt camp at Issyk-Kul was moved twice until the weather suited us, and the evening at Darvaza was arranged months ahead so we could simply be there.',
  },
  {
    id: 'priya',
    name: 'Priya',
    author: 'PRIYA',
    role: 'IRELAND & SCOTLAND',
    destination: '7 days, three generations',
    quote:
      'Travelling with three generations usually means compromise. This time it did not: my parents had private castle tours, the children had a Highland day built entirely around them, and we still had dinner together every night.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [paused, setPaused] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const changeTestimonial = (nextIdx: number, forcedDir?: 'next' | 'prev') => {
    if (nextIdx === activeIndex || isExiting) return;

    // Determine slide direction
    const calculatedDir =
      forcedDir ||
      (nextIdx > activeIndex
        ? activeIndex === 0 && nextIdx === TESTIMONIALS_DATA.length - 1
          ? 'prev'
          : 'next'
        : activeIndex === TESTIMONIALS_DATA.length - 1 && nextIdx === 0
        ? 'next'
        : 'prev');

    setDirection(calculatedDir);
    setActiveIndex(nextIdx);
    setIsExiting(true);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // Smooth exit phase -> mount new content with smooth entrance keyframe
    transitionTimerRef.current = setTimeout(() => {
      setDisplayIndex(nextIdx);
      setIsExiting(false);
    }, 220);
  };

  const handlePrev = () => {
    const prevIdx = activeIndex === 0 ? TESTIMONIALS_DATA.length - 1 : activeIndex - 1;
    changeTestimonial(prevIdx, 'prev');
  };

  const handleNext = () => {
    const nextIdx = activeIndex === TESTIMONIALS_DATA.length - 1 ? 0 : activeIndex + 1;
    changeTestimonial(nextIdx, 'next');
  };

  // Auto-advance every 6s; paused on hover/focus, and the timer restarts
  // whenever the slide changes (including manual navigation).
  const handleNextRef = useRef(handleNext);
  useEffect(() => {
    handleNextRef.current = handleNext;
  });

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => handleNextRef.current(), 6000);
    return () => window.clearInterval(id);
  }, [paused, activeIndex]);

  const current = TESTIMONIALS_DATA[displayIndex];

  return (
    <section id="journal" className="py-24 sm:py-32 lg:py-36 bg-[#081726] relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {/* Subtle ambient luxury glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c59b67]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header styled identically to PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            {/* Gold Kicker */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Client Voices
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
              What Our <span className="italic font-normal text-[#c59b67]">Guests Say</span>
            </h2>
          </div>

          {/* Right Description matching PackagesSection */}
          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-400 font-light leading-relaxed">
              Stories of transcendence, seamless choreography, and lifelong memories from our private clients.
            </p>
          </div>
        </div>

        {/* Editorial Testimonials Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left Column: Large Editorial Quote & Author Kicker with smooth transition */}
          <div className="lg:col-span-8 flex flex-col justify-between min-h-[220px] sm:min-h-[200px] lg:min-h-[240px]">
            <div
              className={`transition-all duration-200 ease-in-out ${
                isExiting
                  ? direction === 'next'
                    ? 'opacity-0 -translate-y-3 blur-[2px]'
                    : 'opacity-0 translate-y-3 blur-[2px]'
                  : direction === 'next'
                  ? 'animate-testimonial-next'
                  : 'animate-testimonial-prev'
              }`}
              key={`${displayIndex}-${isExiting ? 'exit' : 'enter'}`}
            >
              {/* Large Serif Italic Quote */}
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] leading-[1.38] text-white tracking-tight font-normal">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author & Role Kicker */}
              <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-12">
                <span className="text-xs sm:text-[13px] tracking-[0.26em] font-bold text-white uppercase font-sans">
                  {current.author}
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-white/20" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.22em] text-stone-400 font-sans font-medium uppercase">
                  {current.role}
                </span>
                {current.destination && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c59b67]/60 hidden sm:inline-block" />
                    <span className="text-[10px] sm:text-[11px] tracking-[0.16em] text-stone-500 font-sans hidden sm:inline-block">
                      {current.destination}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Client Names Selector & Arrows */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end lg:items-end gap-6 sm:gap-8">
            {/* Interactive Names Row matching the screenshot design */}
            <div className="flex items-center justify-between sm:justify-start lg:justify-end gap-6 sm:gap-8 lg:gap-10 overflow-x-auto pb-2 scrollbar-none">
              {TESTIMONIALS_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => changeTestimonial(index)}
                    className={`font-serif italic transition-all duration-300 relative py-1 cursor-pointer select-none text-left group ${
                      isActive
                        ? 'text-2xl sm:text-3xl text-white font-semibold scale-105'
                        : 'text-xl sm:text-2xl text-stone-600 hover:text-stone-300 font-normal hover:scale-100'
                    }`}
                    aria-label={`View testimonial by ${item.name}`}
                  >
                    <span className="transition-colors duration-300">{item.name}</span>
                    <span
                      className={`block h-[1.5px] bg-[#c59b67] mt-1 transition-all duration-300 ease-out origin-left ${
                        isActive ? 'w-full opacity-100 scale-x-100' : 'w-full opacity-0 scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Subtle Prev/Next Navigation Controls */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10 lg:border-t-0">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#c59b67] text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-white/10 active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-sans text-stone-500 tracking-widest px-2 select-none tabular-nums">
                0{activeIndex + 1} / 0{TESTIMONIALS_DATA.length}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#c59b67] text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-white/10 active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

