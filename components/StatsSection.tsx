import React from 'react';

const STATS = [
  {
    value: '100%',
    label: 'Personalised Journeys',
  },
  {
    value: '1:1',
    label: 'Dedicated Travel Specialist',
  },
  {
    value: '24/7',
    label: 'Travel Support',
  },
  {
    value: 'Trusted',
    label: 'Handpicked Partners',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#081726] text-white py-12 sm:py-14 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center pt-4 md:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white tabular-nums mb-1.5">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-stone-300 font-sans tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

