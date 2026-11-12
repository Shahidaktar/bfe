import type { Metadata } from 'next';
import { FaqPage } from '../../components/FaqPage';
import { FAQ_ITEMS } from '../../lib/faq';

export const metadata: Metadata = {
  title: 'FAQs - Beyond Forever Earth',
  description:
    'Answers about our custom travel planning process, pricing and inclusions, on-journey support, and how your booking is protected.',
  openGraph: {
    title: 'FAQs — Beyond Forever Earth',
    description:
      'Answers about our custom travel planning process, pricing and inclusions, on-journey support, and how your booking is protected.',
  },
};

export default function FaqRoute() {
  return <FaqPage items={FAQ_ITEMS} />;
}
