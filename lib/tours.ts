export type TourInterest = 'Culture' | 'Food & Wine' | 'Nature' | 'Coastal' | 'Rail';

export interface Tour {
  slug: string;
  /** Destination key: region slug, or `region/country`. */
  destination: string;
  title: string;
  excerpt: string;
  image: string;
  days: number;
  priceFrom: number;
  interests: TourInterest[];
}

export const TOUR_INTERESTS: TourInterest[] = [
  'Culture',
  'Food & Wine',
  'Nature',
  'Coastal',
  'Rail',
];

export const DURATION_BANDS = [
  { id: 'any', label: 'Any length' },
  { id: 'short', label: '1–7 days' },
  { id: 'medium', label: '8–12 days' },
  { id: 'long', label: '13+ days' },
] as const;

export const BUDGET_BANDS = [
  { id: 'any', label: 'Any budget' },
  { id: 'under-400k', label: 'Under ₹4,00,000' },
  { id: '400k-550k', label: '₹4,00,000–₹5,50,000' },
  { id: 'over-550k', label: '₹5,50,000+' },
] as const;

export type DurationBand = (typeof DURATION_BANDS)[number]['id'];
export type BudgetBand = (typeof BUDGET_BANDS)[number]['id'];

export const TOURS: Tour[] = [
  // ── Europe ─────────────────────────────────────────────────────────────
  {
    slug: 'essential-europe-by-rail',
    destination: 'europe',
    title: 'Essential Europe by Rail: Austria, Germany and Switzerland',
    excerpt:
      'Central Europe’s most beautiful and historic cities, linked by rail — Salzburg, Munich, Innsbruck and the Swiss Alps.',
    image: '/destinations/europe-rail.jpg',
    days: 12,
    priceFrom: 540000,
    interests: ['Rail', 'Culture'],
  },
  {
    slug: 'paris-and-london',
    destination: 'europe',
    title: 'A Love Story Across Paris & London',
    excerpt:
      'Two capitals, one crossing — grand boulevards, hidden courtyards and river evenings in Paris and London.',
    image: '/destinations/europe-paris.jpg',
    days: 7,
    priceFrom: 390000,
    interests: ['Culture', 'Food & Wine'],
  },
  {
    slug: 'european-capitals',
    destination: 'europe',
    title: 'European Capitals: History and Culture',
    excerpt:
      'Budapest, Vienna and Prague — three elegant capitals, coffee houses, opera and architecture at an unhurried pace.',
    image: '/destinations/europe-capitals.jpg',
    days: 10,
    priceFrom: 460000,
    interests: ['Culture'],
  },
  {
    slug: 'santorini-and-the-aegean',
    destination: 'europe',
    title: 'Santorini & the Aegean',
    excerpt:
      'Caldera views, private sailing and quiet island tavernas — the Cyclades without the crowds.',
    image: '/destinations/europe-hero.jpg',
    days: 8,
    priceFrom: 420000,
    interests: ['Coastal', 'Food & Wine'],
  },
  {
    slug: 'venice-florence-and-the-lakes',
    destination: 'europe',
    title: 'Venice, Florence & the Lakes',
    excerpt:
      'From the canals of Venice to the vineyards of Tuscany and the still water of Lake Como.',
    image: '/destinations/europe-venice.jpg',
    days: 9,
    priceFrom: 490000,
    interests: ['Culture', 'Food & Wine'],
  },
  {
    slug: 'best-of-switzerland',
    destination: 'europe',
    title: 'The Best of Switzerland',
    excerpt:
      'Zermatt, glacier trains and alpine walking — high passes and quiet valleys, with private guiding throughout.',
    image: '/destinations/europe-alps.jpg',
    days: 8,
    priceFrom: 580000,
    interests: ['Nature', 'Rail'],
  },
  {
    slug: 'lake-como-and-the-italian-lakes',
    destination: 'europe',
    title: 'Lake Como & the Italian Lakes',
    excerpt:
      'Villa gardens, boat days and long lunches on the water — the lakes at their quietest.',
    image: '/destinations/italy-como.jpg',
    days: 6,
    priceFrom: 360000,
    interests: ['Nature', 'Food & Wine'],
  },
  {
    slug: 'baroque-europe',
    destination: 'europe',
    title: 'Baroque Europe: Vienna to Prague',
    excerpt:
      'Frescoed ceilings, palace concerts and old-town squares — the Baroque heart of Central Europe.',
    image: '/destinations/europe-baroque.jpg',
    days: 9,
    priceFrom: 430000,
    interests: ['Culture'],
  },

  // ── Italy ──────────────────────────────────────────────────────────────
  {
    slug: 'italy-history-architecture-cuisine',
    destination: 'europe/italy',
    title: 'Italy: History, Architecture & Cuisine',
    excerpt:
      'From the canals of Venice to the ancient city of Rome, with Murano, Burano and a Tuscan kitchen in between.',
    image: '/destinations/italy-florence.jpg',
    days: 11,
    priceFrom: 480000,
    interests: ['Culture', 'Food & Wine'],
  },
  {
    slug: 'italy-lakes-and-wine',
    destination: 'europe/italy',
    title: 'Italy: Lakes & Wine',
    excerpt:
      'Italy beyond the famous cities — lakefront villas, cellar tastings and slow afternoons in the vineyards.',
    image: '/destinations/italy-como.jpg',
    days: 8,
    priceFrom: 390000,
    interests: ['Food & Wine', 'Nature'],
  },
  {
    slug: 'italy-switzerland-highlights',
    destination: 'europe/italy',
    title: 'Italy & Switzerland Highlights',
    excerpt:
      'Bellagio, Varenna and the Alps — a nature-lover’s route across two countries, with private transfers throughout.',
    image: '/destinations/europe-alps.jpg',
    days: 10,
    priceFrom: 520000,
    interests: ['Nature'],
  },
  {
    slug: 'italy-rome-matera-apulia',
    destination: 'europe/italy',
    title: 'Italy: Rome, Matera & Apulia',
    excerpt:
      'Rome’s piazzas, the sassi of Matera and the whitewashed coast of Apulia — the south, properly.',
    image: '/destinations/italy-matera.jpg',
    days: 9,
    priceFrom: 410000,
    interests: ['Culture', 'Food & Wine'],
  },
  {
    slug: 'italy-sicilian-heritage-beaches',
    destination: 'europe/italy',
    title: 'Italy: Sicilian Heritage & Beaches',
    excerpt:
      'Palermo’s street food, Cefalù by boat and long days on the water — Sicily’s culture and its coast.',
    image: '/destinations/italy-palermo.jpg',
    days: 8,
    priceFrom: 440000,
    interests: ['Coastal', 'Culture'],
  },
  {
    slug: 'highlights-of-italy-and-greece',
    destination: 'europe/italy',
    title: 'Highlights of Italy & Greece',
    excerpt:
      'Florence, Rome and the Greek islands on one continuous route — two civilisations, one journey.',
    image: '/destinations/italy-paestum.jpg',
    days: 12,
    priceFrom: 560000,
    interests: ['Culture', 'Coastal'],
  },
  {
    slug: 'tuscany-vineyards-and-villages',
    destination: 'europe/italy',
    title: 'Tuscany: Vineyards & Villages',
    excerpt:
      'Cypress roads, hill towns and estate lunches — Tuscany with a driver and no timetable.',
    image: '/destinations/italy-hero.jpg',
    days: 7,
    priceFrom: 340000,
    interests: ['Food & Wine', 'Culture'],
  },
  {
    slug: 'amalfi-coast-and-capri',
    destination: 'europe/italy',
    title: 'Amalfi Coast & Capri',
    excerpt:
      'Cliffside hotels, private boat days and the quiet side of Capri — the coast at its most considered.',
    image: '/destinations/italy-trevi.jpg',
    days: 6,
    priceFrom: 400000,
    interests: ['Coastal'],
  },
];

export function toursFor(destinationKey: string): Tour[] {
  return TOURS.filter((tour) => tour.destination === destinationKey);
}

export function findTour(destinationKey: string, slug: string): Tour | undefined {
  return TOURS.find((tour) => tour.destination === destinationKey && tour.slug === slug);
}

export function durationBand(days: number): Exclude<DurationBand, 'any'> {
  if (days <= 7) return 'short';
  if (days <= 12) return 'medium';
  return 'long';
}

export function budgetBand(price: number): Exclude<BudgetBand, 'any'> {
  if (price < 400000) return 'under-400k';
  if (price <= 550000) return '400k-550k';
  return 'over-550k';
}

export function filterTours(
  tours: Tour[],
  filters: { interest: TourInterest | 'all'; duration: DurationBand; budget: BudgetBand }
): Tour[] {
  return tours.filter((tour) => {
    if (filters.interest !== 'all' && !tour.interests.includes(filters.interest)) return false;
    if (filters.duration !== 'any' && durationBand(tour.days) !== filters.duration) return false;
    if (filters.budget !== 'any' && budgetBand(tour.priceFrom) !== filters.budget) return false;
    return true;
  });
}
