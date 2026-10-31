import React, { useState, useEffect, useRef } from 'react';

export const AboutSection: React.FC = () => {
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0, 0, 0]);
  const [activePopup, setActivePopup] = useState<'mountain' | 'road' | null>(null);
  const [hoveredPopup, setHoveredPopup] = useState<'mountain' | 'road' | null>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const line5Ref = useRef<HTMLSpanElement>(null);

  const capsule1Ref = useRef<HTMLSpanElement>(null);
  const capsule2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerY = window.innerHeight * 0.52;
          const tolerance = 75;

          const lines = [
            line1Ref.current,
            line2Ref.current,
            line3Ref.current,
            line4Ref.current,
            line5Ref.current,
          ];

          // Compute color illumination progress for each line
          const newProgress = lines.map((el) => {
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            const mid = rect.top + rect.height * 0.5;
            if (mid <= triggerY) {
              return 1; // fully illuminated (dark #111111)
            }
            if (mid <= triggerY + 120) {
              return Math.max(0, 1 - (mid - triggerY) / 120);
            }
            return 0; // muted (stone-300)
          });
          setLineProgress(newProgress);

          // Check if scrolling has reached Capsule 1 (Mountain)
          let currentPopup: 'mountain' | 'road' | null = null;
          if (capsule1Ref.current) {
            const rect1 = capsule1Ref.current.getBoundingClientRect();
            const mid1 = rect1.top + rect1.height * 0.5;
            if (mid1 >= triggerY - tolerance && mid1 <= triggerY + tolerance) {
              currentPopup = 'mountain';
            }
          }

          // Check if scrolling has reached Capsule 2 (Road)
          if (!currentPopup && capsule2Ref.current) {
            const rect2 = capsule2Ref.current.getBoundingClientRect();
            const mid2 = rect2.top + rect2.height * 0.5;
            if (mid2 >= triggerY - tolerance && mid2 <= triggerY + tolerance) {
              currentPopup = 'road';
            }
          }

          setActivePopup(currentPopup);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showMountainPopup = activePopup === 'mountain' || hoveredPopup === 'mountain';
  const showRoadPopup = activePopup === 'road' || hoveredPopup === 'road';

  // Helper function to return text color class based on progress
  const getTextColor = (progress: number) => {
    if (progress >= 0.85) return 'text-[#111111]';
    if (progress >= 0.4) return 'text-[#555555]';
    return 'text-stone-300';
  };

  return ( 
    <section id="about" className="relative py-32 sm:py-40 lg:py-48 bg-[#FAF8F5] overflow-visible">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Brand Statement */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] leading-[1.35] sm:leading-[1.28] md:leading-[1.24] tracking-tight select-none">
            {/* Line 1 */}
            <span
              ref={line1Ref}
              className={`block transition-colors duration-300 ${getTextColor(lineProgress[0])}`}
            >
              <span className="font-sans italic font-normal tracking-normal">
                We're all about
              </span>{' '}
              <span className="font-serif font-normal">
                inspiring people to
              </span>
            </span>

            {/* Line 2 */}
            <span
              ref={line2Ref}
              className={`block mt-1 sm:mt-1.5 transition-colors duration-300 ${getTextColor(lineProgress[1])}`}
            >
              <span className="font-serif font-normal">
                explore
              </span>{' '}
              <span className="font-sans italic font-normal tracking-normal">
                the world
              </span>{' '}

              {/* Inline Mountain Capsule Pill with Image Popup */}
              <span className="relative inline-block align-middle mx-1.5 sm:mx-2.5 -mt-1 group">
                {/* Image Popup Above Mountain Capsule (No Text) */}
                {showMountainPopup && (
                  <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-36 sm:w-44 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-2 border-white ring-1 ring-black/10 bg-stone-100">
                      <img
                        src="/images/popup_mountain.jpg"
                        alt="Alpine Mountain View"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Downward Pointer Triangle */}
                    <div className="w-2.5 h-2.5 bg-white border-r border-b border-black/10 rotate-45 mx-auto -mt-1.5 shadow-sm" />
                  </div>
                )}

                {/* Capsule Element */}
                <span
                  ref={capsule1Ref}
                  onMouseEnter={() => setHoveredPopup('mountain')}
                  onMouseLeave={() => setHoveredPopup(null)}
                  className={`inline-flex items-center justify-center h-[0.68em] w-[2.2em] sm:w-[2.4em] rounded-full overflow-hidden border transition-all duration-300 shadow-xs shrink-0 cursor-pointer ${
                    showMountainPopup
                      ? 'border-[#c59b67] ring-2 ring-[#c59b67]/40 scale-105'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <img
                    src="/images/popup_mountain.jpg"
                    alt="Scenic mountain landscape"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </span>{' '}

              <span className="font-serif font-normal">
                through a
              </span>
            </span>

            {/* Line 3 */}
            <span
              ref={line3Ref}
              className={`block mt-1 sm:mt-1.5 transition-colors duration-300 ${getTextColor(lineProgress[2])}`}
            >
              <span className="font-sans italic font-normal tracking-normal">
                holistic approach to travel,
              </span>
            </span>

            {/* Line 4 */}
            <span
              ref={line4Ref}
              className={`block mt-1 sm:mt-1.5 transition-colors duration-300 ${getTextColor(lineProgress[3])}`}
            >
              <span className="font-serif font-normal">
                developing
              </span>{' '}
              <span className="font-sans italic font-normal tracking-normal">
                both travel hard &
              </span>
            </span>

            {/* Line 5 */}
            <span
              ref={line5Ref}
              className={`block mt-1 sm:mt-1.5 transition-colors duration-300 ${getTextColor(lineProgress[4])}`}
            >
              <span className="font-sans italic font-normal tracking-normal">
                travel
              </span>{' '}

              {/* Inline Road Capsule Pill with Image Popup */}
              <span className="relative inline-block align-middle mx-1.5 sm:mx-2.5 -mt-1 group">
                {/* Image Popup Above Road Capsule (No Text) */}
                {showRoadPopup && (
                  <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-36 sm:w-44 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-2 border-white ring-1 ring-black/10 bg-stone-100">
                      <img
                        src="/images/popup_road.jpg"
                        alt="Scenic Coastal Route"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Downward Pointer Triangle */}
                    <div className="w-2.5 h-2.5 bg-white border-r border-b border-black/10 rotate-45 mx-auto -mt-1.5 shadow-sm" />
                  </div>
                )}

                {/* Capsule Element */}
                <span
                  ref={capsule2Ref}
                  onMouseEnter={() => setHoveredPopup('road')}
                  onMouseLeave={() => setHoveredPopup(null)}
                  className={`inline-flex items-center justify-center h-[0.68em] w-[2.2em] sm:w-[2.4em] rounded-full overflow-hidden border transition-all duration-300 shadow-xs shrink-0 cursor-pointer ${
                    showRoadPopup
                      ? 'border-[#c59b67] ring-2 ring-[#c59b67]/40 scale-105'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <img
                    src="/images/popup_road.jpg"
                    alt="Scenic open road"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </span>{' '}

              <span className="font-sans font-normal tracking-normal">
                soft skills.
              </span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};
