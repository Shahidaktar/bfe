import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface TravelPackage {
  id: string;
  title: string;
  categoryTag?: string;
  tagline: string;
  image: string;
  duration: string;
  locations: string[];
  price: string;
  highlights: string[];
  description: string;
}

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

export const PACKAGES_DATA: TravelPackage[] = [
  {
    id: 'five-stans',
    title: 'Central Asia: The Five Stans',
    categoryTag: 'CENTRAL ASIA',
    tagline:
      'A 15-day overland journey through all five Stans, from Ashgabat to Almaty.',
    image: pexels('36003363'),
    duration: '15 Days / 14 Nights',
    locations: ['Ashgabat', 'Bukhara', 'Samarkand', 'Bishkek', 'Almaty'],
    price: 'On Request',
    highlights: [
      'White-marble Ashgabat and the burning Darwaza gas crater',
      'Silk Road heritage in Bukhara, Samarkand and Tashkent',
      'Kokand, Rishtan and the Fergana Valley border crossing',
      'Charyn Canyon and a final stay in Almaty',
    ],
    description:
      'Cross all five Central Asian republics overland in fifteen days, linking Ashgabat’s marble monuments and the Darvaza gas crater with the Silk Road cities of Bukhara and Samarkand before finishing in Almaty.',
  },
  {
    id: 'ultimate-five-stans',
    title: 'The Ultimate 5 Stans Adventure',
    categoryTag: 'GRAND TOUR',
    tagline:
      'A 22-day grand tour from Bishkek to Ashgabat across mountains, yurts and Silk Road cities.',
    image: pexels('5662219'),
    duration: '22 Days / 21 Nights',
    locations: ['Bishkek', 'Issyk-Kul', 'Almaty', 'Dushanbe', 'Samarkand', 'Khiva', 'Ashgabat'],
    price: 'On Request',
    highlights: [
      'Ala-Archa Gorge, Burana Tower and a Kok-Boru horseback game',
      'Felt-making in Kochkor and a day trip to Tash-Rabat',
      'Eagle hunters, Skazka Canyon and a yurt camp at Issyk-Kul',
      'Samarkand, Bukhara, Khiva and a night at Darvaza',
    ],
    description:
      'Travel the full sweep of Central Asia at a measured pace: alpine gorges and yurt camps in Kyrgyzstan, Charyn Canyon and Almaty in Kazakhstan, then Tajikistan and Uzbekistan’s Silk Road cities before ending beside the Darvaza crater and Ashgabat.',
  },
  {
    id: 'silk-road-adventure',
    title: 'The Silk Road Adventure',
    categoryTag: 'SILK ROAD',
    tagline:
      'A 22-day Silk Road passage through Central Asia’s greatest cities and wild landscapes.',
    image: pexels('30850916'),
    duration: '22 Days / 21 Nights',
    locations: ['Bishkek', 'Karakol', 'Almaty', 'Dushanbe', 'Samarkand', 'Bukhara', 'Khiva', 'Ashgabat'],
    price: 'On Request',
    highlights: [
      'The Silk Road caravanserai of Tash-Rabat',
      'Issyk-Kul’s southern shore and the red rocks of Jeti-Oguz',
      'Iskanderkul Lake and the Fergana Valley',
      'Samarkand, Bukhara, Khiva and Darvaza',
    ],
    description:
      'Follow the Silk Road from Bishkek to Ashgabat, weaving through Kyrgyz mountain country, Kazakhstan’s canyons, Tajik lakes and the historic cities of Samarkand, Bukhara and Khiva.',
  },
  {
    id: 'dublin-edinburgh',
    title: 'Dublin & Edinburgh',
    categoryTag: 'CELTIC CAPITALS',
    tagline:
      'Dublin, the Cliffs of Moher, the Scottish Highlands and Loch Ness in one week.',
    image: pexels('4064432'),
    duration: '7 Days / 6 Nights',
    locations: ['Dublin', 'Cliffs of Moher', 'Edinburgh', 'Glen Coe', 'Loch Ness'],
    price: 'On Request',
    highlights: [
      'Trinity College, Dublin Castle and Temple Bar',
      'Guided day tour to the Cliffs of Moher and the Burren',
      'Royal Mile and Edinburgh Castle walking tour',
      'Loch Ness, Glen Coe and the Scottish Highlands',
    ],
    description:
      'A week between two Celtic capitals, pairing Dublin’s literary streets and Temple Bar with the Cliffs of Moher, Edinburgh’s Royal Mile and a Highland run to Loch Ness and Glen Coe.',
  },
  {
    id: 'maldives-escape',
    title: 'Maldives Escape',
    categoryTag: 'ISLAND RETREAT',
    tagline:
      'Turquoise lagoons, overwater villas and unhurried island days.',
    image: pexels('9149277'),
    duration: '6 Days / 5 Nights',
    locations: ['Malé', 'Private Island Resort', 'Coral Reefs'],
    price: 'On Request',
    highlights: [
      'Overwater villa with direct lagoon access',
      'Snorkelling among coral reefs and marine life',
      'Sunset cruise across the Indian Ocean',
      'Malé, local island life and a beachside dinner',
    ],
    description:
      'Settle into a Maldivian island resort for six days of coral reefs, sunset cruises and barefoot dining, with time in Malé and the freedom to do as much—or as little—as you wish.',
  },
];

interface PackagesSectionProps {
  onSelectPackage: (pkg: TravelPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
}) => {
  const [flagship, ...rest] = PACKAGES_DATA;

  return (
    <section id="destinations" className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/80">
      {/* Delicate ambient gold glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c59b67]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-stone-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Curated Journeys
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              Journeys We <span className="italic font-normal text-[#c59b67]">Dream Of</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Discover the trips our travellers dream about the most — then make them entirely your own.
            </p>
          </div>
        </div>

        {/* Big Visual Portfolio */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Flagship journey */}
          {flagship && (
            <div
              onClick={() => onSelectPackage(flagship)}
              className="group cursor-pointer relative h-[480px] sm:h-[600px] lg:h-[680px] w-full rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(197,155,103,0.18)] transition-all duration-700 bg-stone-900"
            >
              <img
                src={flagship.image}
                alt={flagship.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />
              {/* Cinematic subtle gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />

              {/* Top corner minimal tag */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-white/75 uppercase font-light">
                  01 / {flagship.categoryTag}
                </span>
              </div>

              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#c59b67] group-hover:text-white transition-all duration-500">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Bottom minimal content: Title + Short 1-line description */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 max-w-2xl">
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-[#f3e7d3] transition-colors duration-300 leading-tight mb-2.5">
                  {flagship.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200/90 font-light font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {flagship.tagline}
                </p>
              </div>
            </div>
          )}

          {/* Remaining journeys */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {rest.map((pkg, index) => (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className="group cursor-pointer relative h-[440px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(197,155,103,0.18)] transition-all duration-700 bg-stone-900"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute top-6 left-6 sm:top-7 sm:left-7">
                  <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-white/75 uppercase font-light">
                    {String(index + 2).padStart(2, '0')} / {pkg.categoryTag}
                  </span>
                </div>

                <div className="absolute top-6 right-6 sm:top-7 sm:right-7 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#c59b67] group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal group-hover:text-[#f3e7d3] transition-colors duration-300 leading-tight mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-200/90 font-light font-sans leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
