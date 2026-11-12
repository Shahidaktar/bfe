import faqData from './faq-data.json';

export type FaqCategoryId = 'planning' | 'pricing' | 'journey' | 'trust';

export type FaqBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export interface FaqItem {
  id: string;
  category: FaqCategoryId;
  categoryLabel: string;
  question: string;
  blocks: FaqBlock[];
}

export const FAQ_ITEMS = faqData as unknown as FaqItem[];
