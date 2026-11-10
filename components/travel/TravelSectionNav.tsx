'use client';

import React, { useEffect, useRef, useState } from 'react';
import { scrollTo } from '../../lib/lenis';
import { setHasSectionNav, setNavHidden } from '../../lib/chrome';

const SECTIONS = [
  { id: 'overview', label: 'Itinerary Summary' },
  { id: 'itinerary', label: 'Sample Itinerary' },
  { id: 'price', label: 'Price & Inclusions' },
  { id: 'information', label: 'Travel Information' },
  { id: 'reviews', label: 'Guest Reviews' },
];

export const TravelSectionNav: React.FC = () => {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [compact, setCompact] = useState(false);
  // While a tab click is scrolling, don't treat the movement as a reader scroll.
  const lockRef = useRef(0);

  useEffect(() => {
    setHasSectionNav(true);
    return () => {
      setHasSectionNav(false);
      setNavHidden(false);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 200) {
          current = section.id;
        }
      }
      setActive(current);

      if (Date.now() < lockRef.current) {
        lastY = y;
        return;
      }

      const delta = y - lastY;

      if (y <= 80) {
        setCompact(false);
        setNavHidden(false);
      } else if (delta > 8 && y > 200) {
        // Scrolling down: the navbar steps away, this bar takes the top edge.
        setCompact(true);
        setNavHidden(true);
      } else if (delta < -8) {
        setCompact(false);
        setNavHidden(false);
      }

      lastY = y;
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

  const goTo = (id: string) => {
    lockRef.current = Date.now() + 900;
    setCompact(false);
    setNavHidden(false);
    scrollTo(`#${id}`, { offset: -140 });
  };

  return (
    <nav
      aria-label="Itinerary sections"
      className={`sticky z-40 border-y backdrop-blur-md transition-colors duration-300 ${
        compact
          ? 'top-0 border-white/10 bg-[#081726]/95 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.9)]'
          : 'top-[60px] border-stone-200/80 bg-[#FAF8F5]/95 sm:top-[64px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max items-stretch justify-center gap-5 sm:gap-10">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goTo(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative shrink-0 py-[18px] text-[14px] font-semibold uppercase tracking-[0.18em] font-sans transition-colors cursor-pointer focus-visible:outline-none sm:text-[17px] ${
                  compact
                    ? isActive
                      ? 'text-[#e8c697]'
                      : 'text-stone-400 hover:text-white'
                    : isActive
                      ? 'text-[#081726]'
                      : 'text-stone-400 hover:text-[#8a6a35]'
                }`}
              >
                {section.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-px h-[2px] transition-colors ${
                    isActive ? 'bg-[#c59b67]' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </nav>
  );
};
