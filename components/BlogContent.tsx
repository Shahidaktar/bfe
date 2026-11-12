import React from 'react';
import {
  parseBlogContent,
  parseInlineSegments,
  type BlogBlock,
} from '../lib/blog';

const Inline: React.FC<{ text: string }> = ({ text }) => {
  const segments = parseInlineSegments(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'strong') {
          return <strong key={index} className="font-semibold text-[#081726]">{segment.text}</strong>;
        }
        if (segment.type === 'emphasis') {
          return <em key={index}>{segment.text}</em>;
        }
        if (segment.type === 'code') {
          return (
            <code key={index} className="px-1.5 py-0.5 rounded bg-stone-100 text-[0.9em] text-[#8a6a35]">
              {segment.text}
            </code>
          );
        }
        if (segment.type === 'link') {
          const external = /^https?:\/\//i.test(segment.href ?? '');
          return (
            <a
              key={index}
              href={segment.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-[#8a6a35] underline decoration-[#c59b67]/50 underline-offset-4 hover:decoration-[#c59b67] transition-colors"
            >
              {segment.text}
            </a>
          );
        }
        return <React.Fragment key={index}>{segment.text}</React.Fragment>;
      })}
    </>
  );
};

const Block: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return block.level === 3 ? (
        <h3 className="font-serif text-2xl sm:text-[26px] text-[#081726] leading-snug mt-10 mb-4">
          <Inline text={block.text} />
        </h3>
      ) : (
        <h2 className="font-serif text-3xl sm:text-4xl text-[#081726] leading-tight mt-12 mb-5">
          <Inline text={block.text} />
        </h2>
      );
    case 'list':
      return block.ordered ? (
        <ol className="list-decimal pl-5 sm:pl-6 space-y-2.5 my-6 text-stone-700">
          {block.items.map((item, index) => (
            <li key={index} className="pl-1 leading-relaxed">
              <Inline text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-5 sm:pl-6 space-y-2.5 my-6 text-stone-700 marker:text-[#c59b67]">
          {block.items.map((item, index) => (
            <li key={index} className="pl-1 leading-relaxed">
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="my-10 border-l-2 border-[#c59b67] pl-6 sm:pl-8">
          <p className="font-serif text-2xl sm:text-[28px] italic text-[#081726] leading-snug">
            <Inline text={block.text} />
          </p>
        </blockquote>
      );
    case 'divider':
      return <hr className="my-10 border-stone-200" />;
    default:
      return (
        <p className="text-[15px] sm:text-base text-stone-600 leading-[1.85] my-5">
          <Inline text={block.text} />
        </p>
      );
  }
};

export const BlogContent: React.FC<{ content: string }> = ({ content }) => {
  const blocks = parseBlogContent(content);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
};
