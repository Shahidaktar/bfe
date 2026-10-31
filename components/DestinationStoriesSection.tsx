import React from 'react';
import { ArrowRight } from 'lucide-react';

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

interface DestinationStoriesSectionProps {
  onRead: () => void;
}

// Imaginary editorial stories; placeholder photography — swap images manually.
const STORIES = [
  {
    tag: 'City Breaks',
    readTime: '4 min read',
    title: 'Tokyo After Midnight',
    excerpt:
      'Neon backstreets, six-seat bars and the ramen counter our specialists queue for — the city that begins when the towers dim.',
    image: pexels('2506923'),
  },
  {
    tag: 'Field Notes',
    readTime: '6 min read',
    title: 'Silence, Somewhere in Lapland',
    excerpt:
      'Private cabins, huskies at first light and forests so still you can hear the snow fall. Our notes on the art of true quiet.',
    image: pexels('235621'),
  },
  {
    tag: 'Arctic',
    readTime: '5 min read',
    title: 'The Night the Sky Caught Fire',
    excerpt:
      'A fjord, a firepit and forty minutes of aurora — when to go, where to stand, and why photos never quite settle the debt.',
    image: pexels('1562058'),
  },
];

export const DestinationStoriesSection: React.FC<DestinationStoriesSectionProps> = ({
  onRead,
}) => {
  return (
    <section
      id="stories"
      className="py-24 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PackagesSection header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Editor&rsquo;s Notebook
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#081726] leading-[1.08]">
              More Travel{' '}
              <span className="italic font-normal text-[#c59b67]">Inspiration</span>
            </h2>
          </div>

          <div className="max-w-sm md:text-right">
            <p className="text-xs sm:text-[13px] font-sans text-stone-500 font-light leading-relaxed">
              Longer reads for slower evenings — planning guides, seasonal notes and places our team can&rsquo;t stop talking about.
            </p>
          </div>
        </div>

        {/* Editorial rows: image left, text right, hairline separated */}
        <div className="divide-y divide-stone-200/80 border-t border-stone-200/80">
          {STORIES.map((story, index) => (
            <button
              key={story.title}
              type="button"
              onClick={onRead}
              className="group w-full text-left grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-8 sm:py-10 cursor-pointer focus-visible:outline-none"
              aria-label={`Read the story: ${story.title}`}
            >
              {/* Image */}
              <div className="md:col-span-4 relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-stone-200">
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Copy */}
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[#c59b67] tracking-widest tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold text-[#c59b67] font-sans">
                    {story.tag}
                  </span>
                  <span className="w-8 h-[1px] bg-stone-300" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.16em] text-stone-400 font-sans">
                    {story.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight leading-snug mb-3 group-hover:text-[#b68b55] transition-colors max-w-2xl">
                  {story.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-stone-500 font-light leading-relaxed max-w-xl mb-5">
                  {story.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#c59b67] font-sans">
                  Read the Story
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
