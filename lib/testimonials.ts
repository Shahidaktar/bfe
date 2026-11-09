export interface TestimonialItem {
  id: string;
  name: string;
  author: string;
  role: string;
  quote: string;
  destination?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'rohit',
    name: 'Rohit',
    author: 'ROHIT',
    role: 'MALDIVES HONEYMOON',
    destination: '6 days, private island',
    quote:
      'We wanted a honeymoon that felt private rather than packaged. Our specialist steered us to an overwater villa we would never have found ourselves, and every transfer ran to the minute — we did not have to plan a single day.',
  },
  {
    id: 'rahul',
    name: 'Rahul',
    author: 'RAHUL',
    role: 'CENTRAL ASIA · THE FIVE STANS',
    destination: '15 days, five countries',
    quote:
      'Fifteen days across five countries, and not one moment where we felt like tourists on a schedule. The guides were chosen for us personally, the yurt camp at Issyk-Kul was moved twice until the weather suited us, and the evening at Darvaza was arranged months ahead so we could simply be there.',
  },
  {
    id: 'priya',
    name: 'Priya',
    author: 'PRIYA',
    role: 'IRELAND & SCOTLAND',
    destination: '7 days, three generations',
    quote:
      'Travelling with three generations usually means compromise. This time it did not: my parents had private castle tours, the children had a Highland day built entirely around them, and we still had dinner together every night.',
  },
];
