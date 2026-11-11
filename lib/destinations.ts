export interface DestinationItinerary {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  meta: string;
}

export interface DestinationFaq {
  question: string;
  answer: string;
}

export interface DestinationContent {
  slug: string;
  kind: 'region' | 'country';
  /** Region slug a country belongs to. */
  parent?: string;
  name: string;
  heroKicker: string;
  heroTitle: string;
  /** Word inside heroTitle rendered in italic gold. */
  heroAccent: string;
  heroImage: string;
  overviewHeading: string;
  overview: string[];
  consultantQuote: { quote: string; author: string; role: string };
  itineraryHeading: string;
  itineraryIntro: string;
  itineraries: DestinationItinerary[];
  moreLabel: string;
  reviewHeading: string;
  review: { quote: string; author: string; meta: string; image: string };
  differenceHeading: string;
  difference: { number: string; title: string; copy: string }[];
  tipsHeading: string;
  tips: { quote: string; author: string; role: string };
  feature: {
    image: string;
    title: string;
    copy: string;
    consultant: string;
    href: string;
  };
  expert: {
    image: string;
    title: string;
    copy: string;
    statsLabel: string;
    stats: { value: string; label: string }[];
    steps: string[];
  };
  closing: { image: string; title: string; copy: string };
  /** Country pages inside a region. */
  countries?: { name: string; href: string }[];
  faqs: DestinationFaq[];
}

export const DESTINATION_NAV: { id: string; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'itineraries', label: 'Sample Itineraries' },
  { id: 'reviews', label: 'Guest Reviews' },
  { id: 'tips', label: 'Insider Tips' },
  { id: 'faqs', label: 'FAQs' },
];

const DESTINATIONS: DestinationContent[] = [
  {
    slug: 'europe',
    kind: 'region',
    name: 'Europe',
    heroKicker: 'Europe',
    heroTitle: 'Luxury Europe Tours',
    heroAccent: 'Europe',
    heroImage: '/destinations/europe-hero.jpg',
    overviewHeading: 'Experience Luxury Travel in Europe',
    overview: [
      'Be it Iceland’s dancing Northern Lights, Croatia’s sun-kissed resort towns, or the exhilarating ski slopes of Switzerland, our luxury European tours offer unique experiences crafted just for you.',
      'Admire Ireland’s dramatic scenery at the Cliffs of Moher, cherish world-class wines in France, or sail the turquoise waters between Greece’s Aegean islands. Whatever side of the continent you are ready to uncover, our experts have personally tried the best activities to elevate your trip.',
      'Your luxury vacation to Europe begins with a private consultation. Dreaming of Gaudí’s surreal masterpieces in Barcelona? We know where to take you. If you want to explore the enchanting streets of Rome and Milan, your dedicated expert will organise this too.',
      'We offer 24/7 assistance during your travels and English-speaking guides with deep knowledge of the areas you visit. All you need to do is embrace the memorable moments of your European luxury tour.',
    ],
    consultantQuote: {
      quote:
        'Europe is a treasure trove of endless wonders, from Rome’s ancient streets to the Acropolis of Athens and France’s world-renowned wines. Whether you are a history enthusiast or a nature lover, this amazing continent has something for everyone.',
      author: 'Mark',
      role: 'Travel Consultant',
    },
    itineraryHeading: 'Our Most Popular Luxury Europe Tours',
    itineraryIntro:
      'Planning your first trip to Europe? Whether you want to explore Iceland’s Golden Circle, Croatia’s resort towns along the Adriatic, or the continent’s best cities, our custom European journeys offer all the inspiration you need to plan a dream trip.',
    itineraries: [
      {
        slug: 'essential-europe-by-rail',
        title: 'Essential Europe by Rail: Austria, Germany and Switzerland',
        excerpt:
          'Discover Central Europe’s most beautiful and historic cities on a rail journey through Austria, Germany and the Swiss Alps.',
        image: '/destinations/europe-rail.jpg',
        meta: 'Rail journey · 3 countries',
      },
      {
        slug: 'paris-and-london',
        title: 'A Love Story Across Paris & London',
        excerpt:
          'Fall in love with Europe through the timeless romance of Paris and London — grand boulevards, hidden courtyards and river evenings.',
        image: '/destinations/europe-paris.jpg',
        meta: 'Two cities · 2 countries',
      },
      {
        slug: 'european-capitals',
        title: 'European Capitals: History and Culture',
        excerpt:
          'Immerse yourself in the glorious history of Europe’s cultural hotspots — Budapest, Vienna and Prague — one elegant capital at a time.',
        image: '/destinations/europe-capitals.jpg',
        meta: 'Culture · 3 capitals',
      },
    ],
    moreLabel: 'Discover more luxury Europe tours',
    reviewHeading: 'Our Guests Love Our Luxury European Vacations',
    review: {
      quote:
        'Our trip to France in September was fabulous. Beyond Forever Earth did a wonderful job putting our trip together. We began the planning stages with Samara, who listened to every detail we cared about — and the itinerary showed it.',
      author: 'Amalia Timbers',
      meta: 'September 2025 · Rating 5/5',
      image: '/destinations/europe-venice.jpg',
    },
    differenceHeading: 'The Beyond Forever Difference',
    difference: [
      {
        number: '01',
        title: 'Europe: Uniquely Yours',
        copy: 'Our experts completely customise your European luxury vacation to match your interests and preferences.',
      },
      {
        number: '02',
        title: 'Authentic and Extraordinary',
        copy: 'Guided tours with local guides for an exclusive Europe experience that we have fully tested ourselves.',
      },
      {
        number: '03',
        title: 'The Personal Touch',
        copy: 'You have a personal, dedicated trip coordinator — backed by 24/7 support should anything change while you travel.',
      },
    ],
    tipsHeading: 'Our Insider Tips For Planning Luxury Travel in Europe',
    tips: {
      quote:
        'Combining two or more countries is a great way to experience more of Europe’s delights in a single trip. Two of my favourite pairings are Italy with Greece, and France with Switzerland. When we chat about your vacation, I’ll tell you why.',
      author: 'Nurit',
      role: 'Travel Consultant',
    },
    feature: {
      image: '/destinations/italy-como.jpg',
      title: 'Italy & Switzerland Highlights',
      copy:
        'If you are a nature lover or outdoor enthusiast, this specially curated vacation is for you. Your journey begins in the beautiful waterfront town of Bellagio. Explore the Roman and Baroque architecture of Como, enjoy fabulous views of Lake Como in Varenna, and soak in the atmosphere of Bellagio’s medieval centre — then hop over the Alps.',
      consultant: 'Mark Pollich · Travel Consultant',
      href: '/enquiry',
    },
    expert: {
      image: '/destinations/europe-alps.jpg',
      title: 'Planning Your Luxury Europe Tour With Our Experts',
      copy:
        'We offer unmatched expertise in Europe. Our specialists personally test the accommodations and activities we offer, and we work only with knowledgeable, licensed local guides — so you arrive knowing the trip has been checked, not assumed.',
      statsLabel: 'Our Europe destination experts have:',
      stats: [
        { value: '100+', label: 'Trips planned' },
        { value: '98%', label: 'Satisfied guests' },
        { value: '30+', label: 'Years experience' },
      ],
      steps: [
        'Call us or fill out the inquiry form',
        'We will call you and discuss your interests and needs',
        'We will create a unique trip and customise it until you are satisfied',
        'Book your trip, and we will take care of the rest',
      ],
    },
    countries: [{ name: 'Italy', href: '/destinations/europe/italy' }],
    closing: {
      image: '/destinations/europe-venice.jpg',
      title: 'The Best Cities to Visit in Europe',
      copy: 'Go off the beaten track, and away from the crowds, to experience these charming European gems — the squares, the side streets, the rooms no guidebook photographs.',
    },
    faqs: [
      {
        question: 'How does the Beyond Forever Earth planning process work for European tours?',
        answer:
          'It begins with a private consultation — call, WhatsApp or email. Your travel consultant learns your pace and preferences, then designs a custom itinerary with a transparent quote. Most travellers begin six to nine months ahead; for peak seasons or exclusive stays, ten to twelve months is safer.',
      },
      {
        question: 'Can I combine multiple countries in my Beyond Forever Earth Europe tour?',
        answer:
          'Yes. Multi-country journeys are one of the things we do best — Italy with Greece, or France with Switzerland, for example. We sequence the route so travel days stay short and every border crossing is planned ahead.',
      },
      {
        question: 'Are international flights included in European vacation packages?',
        answer:
          'International airfare is not included by default, so you can use frequent-flyer miles or your preferred cabin class. If you would rather hand it over, your consultant can route and book your long-haul flights for you. All internal regional flights and transfers are included.',
      },
      {
        question: 'Do you accommodate large groups for European luxury tours?',
        answer:
          'Every journey we design is private and custom-made. Families and small groups travelling together are welcome — we simply plan for the group you have, rather than placing you on a scheduled departure.',
      },
      {
        question: 'What emergency support do you provide during European trips?',
        answer:
          'You have 24/7 access to our team, plus proactive monitoring of internal flights and local conditions. If a delay or disruption occurs, we coordinate the solution on your behalf — you are never left to handle it alone.',
      },
      {
        question: 'Do European tours include private local tour guides?',
        answer:
          'Yes. You are guided by vetted local experts with deep knowledge of their region. If you prefer one accompanying guide for the whole journey, your consultant can arrange that instead.',
      },
      {
        question: 'Do you offer financial protection for European tour bookings?',
        answer:
          'Yes. As part of The Independent Travel Consultants, we provide full financial protection on every booking, giving you complete peace of mind from deposit to return.',
      },
      {
        question: 'When is the best time to book a Europe trip?',
        answer:
          'Six to nine months ahead for most journeys. If you are travelling in peak summer, over holidays, or want exclusive-use properties and private guides, plan ten to twelve months ahead to secure availability.',
      },
    ],
  },
  {
    slug: 'italy',
    kind: 'country',
    parent: 'europe',
    name: 'Italy',
    heroKicker: 'Europe · Italy',
    heroTitle: 'Luxury Custom Travel in Italy',
    heroAccent: 'Italy',
    heroImage: '/destinations/italy-hero.jpg',
    overviewHeading: 'Tour Italy in Luxury',
    overview: [
      'Italy is a country like no other — bursting with art, history and great food, with much to love and more to discover. Our custom-made luxury journeys provide countless ways to explore this captivating country through authentic experiences.',
      'From the grand scale of the Colosseum to the breathtaking Amalfi Coast, Italy has so many UNESCO-listed sites that planning a high-end Italian tour might seem daunting. Our luxury guided journeys take care of this, helping you discover Italy’s beauty with crafted vacations that match your planned itinerary.',
      'Roam the ancient streets of Vatican City, taste an impressive selection of prosciutto in the markets of Florence, or uncover the best vineyards in the Tuscan countryside. Stir up romance on a gondola in Venice, and immerse yourself in Italy’s laid-back lifestyle on the Isle of Capri. The possibilities are endless.',
      'Your luxury tour of Italy begins with a personal consultation. Your dedicated trip coordinator works with you to personalise the entire adventure. Tours include private transport, local English-speaking guides and curated excursions of the country’s best — with 24/7 support so each day unfolds without complications.',
    ],
    consultantQuote: {
      quote:
        'Italy rewards the traveller who slows down. The country is small enough to cross in a day, and rich enough that you could spend a lifetime in one region — so the real work is choosing what to leave out.',
      author: 'Kate',
      role: 'Travel Consultant',
    },
    itineraryHeading: 'Review our Sample Itineraries',
    itineraryIntro:
      'Every itinerary below is a starting point. Tell us which one feels closest, and your consultant will reshape the pace, the stays and the days around you.',
    itineraries: [
      {
        slug: 'italy-history-architecture-cuisine',
        title: 'Italy: History, Architecture & Cuisine',
        excerpt:
          'From the canals of Venice to the ancient city of Rome, visit the highlights of Italy on this 11-day tour. Explore the islands of Murano and Burano.',
        image: '/destinations/italy-florence.jpg',
        meta: '11 days',
      },
      {
        slug: 'italy-lakes-and-wine',
        title: 'Italy: Lakes & Wine',
        excerpt:
          'Discover Italy beyond the famous cities of Rome, Florence and Venice. This customisable vacation takes you through the lakes and the vineyards.',
        image: '/destinations/italy-como.jpg',
        meta: 'Lakes · Wine',
      },
      {
        slug: 'italy-switzerland-highlights',
        title: 'Italy & Switzerland Highlights',
        excerpt:
          'If you are a nature lover or outdoor enthusiast, this specially curated vacation is for you — beginning in the waterfront town of Bellagio.',
        image: '/destinations/europe-alps.jpg',
        meta: 'Two countries',
      },
      {
        slug: 'italy-rome-matera-apulia',
        title: 'Italy: Rome, Matera & Apulia',
        excerpt:
          'Ideal for those who want to go beyond the usual and see Italy’s hidden gems. Enjoy a walking tour of Rome and admire the south.',
        image: '/destinations/italy-matera.jpg',
        meta: '9 days',
      },
      {
        slug: 'italy-sicilian-heritage-beaches',
        title: 'Italy: Sicilian Heritage and Beaches',
        excerpt:
          'Delve into the region’s culture and heritage as you make your way through some of Sicily’s loveliest cities and towns.',
        image: '/destinations/italy-palermo.jpg',
        meta: 'Sicily',
      },
      {
        slug: 'highlights-of-italy-and-greece',
        title: 'Highlights of Italy and Greece',
        excerpt:
          'Experience the best of Italy and Greece on this superb 12-day tour. Enjoy guided walking tours of Florence, the birthplace of the Renaissance.',
        image: '/destinations/italy-paestum.jpg',
        meta: '12 days · Two countries',
      },
    ],
    moreLabel: 'Discover more Italy sample itineraries',
    reviewHeading: 'What Our Guests Say',
    review: {
      quote:
        'We had an amazing anniversary trip to Italy. Every aspect of the trip was great — we had a stay in Rome, a Tuscan villa and then the final leg in Florence. Nothing felt rushed, and nothing was left to chance.',
      author: 'Joshua Tracy',
      meta: 'May 2025 · Rating 5/5',
      image: '/destinations/italy-hills.jpg',
    },
    differenceHeading: 'The Beyond Forever Difference',
    difference: [
      {
        number: '01',
        title: 'Italy: Uniquely Yours',
        copy: 'Our experts completely customise your luxury journey to match your interests and preferences.',
      },
      {
        number: '02',
        title: 'Authentic & Extraordinary',
        copy: 'Guided tours with local experts for an exclusive Italian experience we thoroughly test.',
      },
      {
        number: '03',
        title: 'The Personal Touch',
        copy: 'You have a personal, dedicated trip coordinator with first-hand knowledge of Italy.',
      },
    ],
    tipsHeading: 'Our Insider Tips',
    tips: {
      quote:
        'Why not go off the beaten path to explore Italy’s hidden gems? An 11-day custom Italy vacation covering Rome, Matera and Apulia usually costs around $7,000. This is my favourite recommendation for history and culture lovers.',
      author: 'Kate Mayer',
      role: 'Travel Consultant',
    },
    feature: {
      image: '/destinations/italy-palermo.jpg',
      title: 'Italy: Sicilian Heritage and Beaches',
      copy:
        'Delve into the region’s culture and heritage as you make your way through some of Sicily’s loveliest cities and towns. Marvel at the beautiful architecture of Palermo and taste the local cuisine on a guided street food tour. Unwind on a picturesque beach and enjoy a boat tour in Cefalù.',
      consultant: 'Kate Mayer · Travel Consultant',
      href: '/enquiry',
    },
    expert: {
      image: '/destinations/italy-trevi.jpg',
      title: 'Your Italy Trip Planning with Our Experts',
      copy:
        'Our destination expertise is unmatched. Our specialists have travelled throughout Italy, and we work only with licensed, award-winning local guides and trusted chauffeurs to escort you during your trip.',
      statsLabel: 'Our Italy destination experts have:',
      stats: [
        { value: '100+', label: 'Trips planned' },
        { value: '98%', label: 'Satisfied guests' },
        { value: '30+', label: 'Years experience' },
      ],
      steps: [
        'Call us or fill out the inquiry form',
        'We will call you and discuss your interests and needs',
        'We will create a unique trip and customise it until you are satisfied',
        'Book your trip, and we will take care of the rest',
      ],
    },
    closing: {
      image: '/destinations/italy-carnival.jpg',
      title: 'Ode to the Centuries: Art and Architecture in Italy',
      copy: 'Whether you are a fan of classical columns and ornate frescoes or more contemporary allures, you will be spoiled for choice in Italy.',
    },
    faqs: [
      {
        question: 'How much does a luxury Italy tour cost?',
        answer:
          'There is no one-size-fits-all figure, because every journey is built from scratch. Your final quote reflects dates, hotel category, route complexity, internal flights and private experiences — and it is fully transparent before you commit.',
      },
      {
        question: 'What is included in custom Italy packages?',
        answer:
          'Airport meet-and-greet and private transfers, hand-selected hotels, internal flights and rail, curated experiences with expert local guides, and daily breakfast. Lunches and dinners stay flexible unless your itinerary specifies otherwise.',
      },
      {
        question: 'How do you build my custom Italy itinerary?',
        answer:
          'A private consultation, then a first draft from your consultant. You refine it — pace, stays, daily activities — until it feels right. We then confirm every reservation and issue a final proposal, usually valid for seven days.',
      },
      {
        question: 'What transportation is provided during an Italy tour?',
        answer:
          'All internal transportation is pre-arranged: private air-conditioned vehicles with vetted drivers, regional flights and rail tickets, and private boat transfers where they make sense. You never hail a cab or negotiate a fare.',
      },
      {
        question: 'Can Italy be combined with other European destinations?',
        answer:
          'Yes — Italy pairs beautifully with Greece, Switzerland or France. Your consultant sequences the route so the travel days stay short and the trip keeps its rhythm.',
      },
      {
        question: 'Who handles emergencies during my Italy vacation?',
        answer:
          'Your trip coordinator is your first point of contact, backed by our 24/7 team and local partners on the ground. Delays, cancellations and supplier issues are coordinated on your behalf.',
      },
      {
        question: 'What authentic culinary experiences do Italy tours include?',
        answer:
          'Market walks in Florence, a plov-style family dinner in a Tuscan home, cellar tastings in Chianti, and street food in Palermo — chosen for the region you are in, and briefed on any dietary requirements in advance.',
      },
      {
        question: 'Which Italian regions do you recommend for history lovers?',
        answer:
          'Rome and Latium for antiquity, Sicily for layered Greek, Arab and Norman heritage, Matera and Apulia for the south, and Tuscany for the Renaissance. We can combine two or three without the trip feeling like a checklist.',
      },
    ],
  },
];

export function findDestination(slug: string): DestinationContent | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function findCountry(regionSlug: string, countrySlug: string): DestinationContent | undefined {
  const country = DESTINATIONS.find((d) => d.slug === countrySlug && d.kind === 'country');
  if (!country || country.parent !== regionSlug) return undefined;
  return country;
}

export function destinationSlugs() {
  return DESTINATIONS.map((d) => d.slug);
}

export function countryParams() {
  return DESTINATIONS.filter((d) => d.kind === 'country' && d.parent).map((d) => ({
    slug1: d.parent as string,
    slug2: d.slug,
  }));
}
