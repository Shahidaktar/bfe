import termsData from './terms-data.json';
import type { LegalContent } from './legal';

export type { LegalBlock, LegalContent, LegalSection } from './legal';
export type TermsBlock = import('./legal').LegalBlock;
export type TermsSection = import('./legal').LegalSection;
export type TermsContent = LegalContent;

export const TERMS = termsData as unknown as LegalContent;
