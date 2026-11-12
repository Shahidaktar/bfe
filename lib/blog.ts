export type BlogPostStatus = 'draft' | 'published';

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'divider' };

export const BLOG_CATEGORIES = [
  'Journal',
  'Destination Guides',
  'Travel Tips',
  'Inspiration',
  'Field Notes',
  'News',
] as const;

export const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
    .replace(/-+$/g, '');

export const estimateReadingTime = (content: string): number => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const excerptFromContent = (content: string, maxLength = 180): string => {
  const plain = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*•]\s+/gm, '')
    .replace(/^\d+[.)]\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).replace(/\s+\S*$/, '')}…`;
};

export const formatBlogDate = (value: Date | string): string =>
  new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const isSafeHref = (href: string): boolean =>
  href.startsWith('/') || /^https?:\/\//i.test(href) || href.startsWith('mailto:');

export const parseBlogContent = (content: string): BlogBlock[] => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: BlogBlock[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      blocks.push({ type: 'list', ordered: list.ordered, items: list.items });
      list = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'divider' });
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length >= 3 ? 3 : 2,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'quote', text: quoteMatch[1].trim() });
      continue;
    }

    const orderedMatch = line.match(/^\d+[.)]\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(orderedMatch[1].trim());
      continue;
    }

    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bulletMatch[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
};

export const parseInlineSegments = (
  text: string
): { type: 'text' | 'strong' | 'emphasis' | 'code' | 'link'; text: string; href?: string }[] => {
  const segments: { type: 'text' | 'strong' | 'emphasis' | 'code' | 'link'; text: string; href?: string }[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, index) });
    }

    const token = match[0];
    if (token.startsWith('**')) {
      segments.push({ type: 'strong', text: token.slice(2, -2) });
    } else if (token.startsWith('`')) {
      segments.push({ type: 'code', text: token.slice(1, -1) });
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch && isSafeHref(linkMatch[2])) {
        segments.push({ type: 'link', text: linkMatch[1], href: linkMatch[2] });
      } else {
        segments.push({ type: 'text', text: token });
      }
    } else {
      segments.push({ type: 'emphasis', text: token.slice(1, -1) });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return segments.filter((segment) => segment.text.length > 0);
};
