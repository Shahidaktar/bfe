import type { Metadata } from 'next';
import { PrivacyPage } from '../../components/PrivacyPage';
import { PRIVACY } from '../../lib/privacy';

export const metadata: Metadata = {
  title: 'Privacy Policy - Beyond Forever Earth',
  description:
    'How SSTPL collects, uses, shares and protects personal data, plus our cookie policy and the terms of use for the Beyond Forever Earth website.',
  openGraph: {
    title: 'Privacy Policy — Beyond Forever Earth',
    description:
      'How SSTPL collects, uses, shares and protects personal data, plus our cookie policy and the terms of use for the Beyond Forever Earth website.',
  },
};

export default function PrivacyRoute() {
  return <PrivacyPage content={PRIVACY} />;
}
