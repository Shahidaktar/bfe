import React from 'react';
import type { LegalSection } from '../lib/legal';

const LegalBlocks: React.FC<{ section: LegalSection }> = ({ section }) => (
  <div className="mt-5 space-y-4">
    {section.blocks.map((block, blockIndex) => {
      if (block.type === 'paragraph') {
        return (
          <p
            key={blockIndex}
            className="font-sans text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]"
          >
            {block.text}
          </p>
        );
      }

      if (block.type === 'subheading') {
        return (
          <h3
            key={blockIndex}
            className="pt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b68b55] sm:text-[11px]"
          >
            {block.text}
          </h3>
        );
      }

      if (block.ordered) {
        return (
          <ol key={blockIndex} className="space-y-3">
            {block.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex gap-4 font-sans text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]"
              >
                <span className="shrink-0 select-none font-serif text-xs font-medium leading-7 text-[#c59b67]">
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }

      return (
        <ul key={blockIndex} className="space-y-3">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="flex gap-3 font-sans text-sm font-light leading-[1.9] text-stone-600 sm:text-[15px]"
            >
              <span
                className="mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c59b67]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    })}
  </div>
);

export const LegalSectionList: React.FC<{ sections: LegalSection[] }> = ({
  sections,
}) => (
  <div className="space-y-10">
    {sections.map((section, index) => (
      <section
        key={section.id}
        id={section.id}
        className="scroll-mt-28 border-t border-stone-200/80 pt-10 first:border-t-0 first:pt-0"
      >
        <div className="flex items-baseline gap-4">
          <span className="shrink-0 select-none font-serif text-xs font-medium tracking-wider text-[#c59b67] sm:text-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-serif text-2xl leading-snug tracking-tight text-[#081726] sm:text-3xl">
            {section.title}
          </h2>
        </div>

        <LegalBlocks section={section} />
      </section>
    ))}
  </div>
);
