import type { Metadata } from 'next';
import { TermsPage } from '../../components/TermsPage';
import { TERMS } from '../../lib/terms';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Beyond Forever Earth',
  description:
    'The terms and conditions governing bookings, payments, cancellations, travel arrangements and support for every Beyond Forever Earth journey.',
  openGraph: {
    title: 'Terms & Conditions — Beyond Forever Earth',
    description:
      'The terms and conditions governing bookings, payments, cancellations, travel arrangements and support for every Beyond Forever Earth journey.',
  },
};

export default function TermsRoute() {
  return <TermsPage content={TERMS} />;
}
