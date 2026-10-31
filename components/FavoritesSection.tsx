import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PACKAGES_DATA, TravelPackage } from './PackagesSection';

interface FavoritesSectionProps {
  onSelectPackage: (pkg: TravelPackage) => void;
}

const FAVORITES = [
  {
    num: '01',
    pkgId: 'five-stans',
    kicker: 'For First-Time Visitors',
    title: 'The Five Stans, Simplified',
    description:
      'Never been to Central Asia? This is the gentlest way in: five countries, one private route, zero logistics on your plate.',
    image: '/popup_mountain.jpg',
    alt: 'Mountain landscape in Central Asia',
    imageSide: 'left' as const,
  },
  {
    num: '02',
    pkgId: 'silk-road-adventure',
    kicker: 'Most Requested',
    title: 'The Silk Road at Your Own Pace',
    description:
      'Samarkand, Bukhara and the caravan cities — travelled privately, with every crossing and stay arranged around your rhythm.',
    image: '/popup_road.jpg',
    alt: 'Coastal road along an ancient trading route',
    imageSide: 'right' as const,
  },
];

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  onSelectPackage,
}) => {
  return (
    <section
      id="favorites"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 sm:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Guest Favorites
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Some of Our <span className="italic font-normal text-[#c59b67]">Favorites</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              The journeys our guests ask for again and again — each one a starting point you can reshape entirely.
            </p>
          </div>
        </div>

        {/* Overlapping editorial collage features */}
        <div className="space-y-24 sm:space-y-32">
          {FAVORITES.map((fav) => {
            const pkg = PACKAGES_DATA.find((p) => p.id === fav.pkgId);
            const imageFirst = fav.imageSide === 'left';

            const imageBlock = (
              <div className={`relative md:w-[62%] ${imageFirst ? '' : 'md:order-2'}`}>
                {/* Oversized ghost numeral overlapping the image */}
                {/* <span
                  aria-hidden="true"
                  className={`absolute -top-10 sm:-top-14 ${
                    imageFirst ? 'left-4 sm:left-8' : 'right-4 sm:right-8'
                  } z-10 font-serif italic text-[96px] sm:text-[140px] lg:text-[160px] leading-none text-[#c59b67]/25 select-none pointer-events-none`}
                >
                  {fav.num}
                </span> */}

                <div className="relative h-[320px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden bg-stone-900 shadow-xl shadow-stone-900/10">
                  <img
                    src={fav.image}
                    alt={fav.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            );

            const textCard = (
              <div
                className={`relative z-20 bg-white rounded-2xl border border-stone-200/80 shadow-2xl shadow-stone-900/10 p-7 sm:p-9 -mt-12 mx-4 sm:mx-6 md:mt-0 md:mx-0 md:w-[45%] ${
                  imageFirst ? 'md:-ml-24 lg:-ml-32' : 'md:-mr-24 lg:-mr-32 md:order-1'
                }`}
              >
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold text-[#c59b67] font-sans mb-4">
                  <span className="w-5 h-[1px] bg-[#c59b67]" />
                  {fav.kicker}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#081726] tracking-tight leading-[1.2] mb-4">
                  {fav.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-stone-500 font-light leading-relaxed mb-7">
                  {fav.description}
                </p>

                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#c59b67] font-sans">
                  Find Out More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            );

            return (
              <button
                key={fav.pkgId}
                type="button"
                onClick={() => pkg && onSelectPackage(pkg)}
                className="group block w-full text-left cursor-pointer focus-visible:outline-none"
                aria-label={`Find out more about ${fav.title}`}
              >
                <div className="relative md:flex md:items-center">
                  {imageFirst ? (
                    <>
                      {imageBlock}
                      {textCard}
                    </>
                  ) : (
                    <>
                      {textCard}
                      {imageBlock}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
