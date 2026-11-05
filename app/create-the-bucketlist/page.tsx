import type { Metadata } from 'next';
import { BucketListPage } from '../../components/BucketListPage';

export const metadata: Metadata = {
  title: 'Create Your Bucket List - Beyond Forever Earth',
  description:
    'Dreamstorm, categorize and prioritise the journeys you want to collect in this lifetime — then let our travel designers shape the first one around you.',
};

export default function CreateTheBucketListPage() {
  return <BucketListPage />;
}
