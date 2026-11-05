export interface BucketDestination {
  id: string;
  name: string;
  location: string;
  description: string;
}

export interface BucketCategory {
  id: string;
  name: string;
  tagline: string;
  destinations: BucketDestination[];
}

export const BUCKET_LIST_DAYS = 10;
export const BUCKET_LIST_PRICE = 250000;

export const BUCKET_CATEGORIES: BucketCategory[] = [
  {
    id: 'ancient-wonders',
    name: 'Iconic Ancient Wonders & History',
    tagline: 'Civilisations, sacred stones and cities that remember everything.',
    destinations: [
      {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        location: 'Cusco Region, Peru',
        description:
          'Hike the ancient Inca Trail or take the train up to this 15th-century citadel perched high in the Andes.',
      },
      {
        id: 'petra-wadi-rum',
        name: 'Petra & Wadi Rum',
        location: 'Jordan',
        description:
          'Walk the rose-red city carved into the cliffs, then sleep beneath desert stars in the dunes of Wadi Rum.',
      },
      {
        id: 'egypt-nile',
        name: 'Pyramids, Luxor & Aswan',
        location: 'Egypt',
        description:
          'Stand before the last surviving ancient wonder, then sail the Nile between temples, tombs and riverbank villages.',
      },
      {
        id: 'rome-walking-tour',
        name: 'A Dynamic Walking Tour of Rome',
        location: 'Italy',
        description:
          'Trace layers of empire through the Colosseum, the Forum and hidden piazzas with a private historian.',
      },
      {
        id: 'amsterdam-canals',
        name: 'Explore the Canals of Amsterdam',
        location: 'Netherlands',
        description:
          'Glide past gabled houses and quiet bridges on a private boat through the city’s historic waterways.',
      },
      {
        id: 'chichen-itza',
        name: 'Chichen Itza & the Yucatan',
        location: 'Mexico',
        description:
          'Discover the Maya pyramid, hidden cenotes and colonial towns on a slow journey through the Yucatán.',
      },
      {
        id: 'german-castles',
        name: 'Tour of Castles of Germany',
        location: 'Rhine Valley, Germany',
        description:
          'Follow fairytale fortresses and vineyard-lined bends of the Rhine on a privately guided castle route.',
      },
      {
        id: 'ahu-tahai',
        name: 'Sunset from Ahu Tahai',
        location: 'Easter Island, Chile',
        description:
          'Watch the sun fall behind the moai at the island’s most atmospheric ceremonial site.',
      },
    ],
  },
  {
    id: 'natural-landscapes',
    name: 'Jaw-Dropping Natural Landscapes',
    tagline: 'The Earth at its most theatrical — quietly, overwhelmingly beautiful.',
    destinations: [
      {
        id: 'salar-de-uyuni',
        name: 'Salar de Uyuni',
        location: 'Bolivia',
        description:
          'Experience the world’s largest salt flat, which transforms into a giant mirror during the rainy season.',
      },
      {
        id: 'grand-canyon',
        name: 'The Grand Canyon',
        location: 'Arizona, USA',
        description:
          'Stand on the rim of a mile-deep gorge carved by the Colorado River over millions of years.',
      },
      {
        id: 'patagonia',
        name: 'Patagonia',
        location: 'Chile & Argentina',
        description:
          'Hike past towering granite peaks, turquoise lakes and massive calving glaciers like Perito Moreno.',
      },
      {
        id: 'banff',
        name: 'Banff National Park',
        location: 'Canada',
        description:
          'Paddle across the vivid turquoise waters of Lake Louise, surrounded by snow-capped Rocky Mountains.',
      },
      {
        id: 'victoria-falls',
        name: 'Victoria Falls',
        location: 'Zambia & Zimbabwe',
        description:
          'Witness the world’s largest sheet of falling water, locally called “The Smoke That Thunders”.',
      },
      {
        id: 'milford-sound',
        name: 'Milford Sound',
        location: 'New Zealand',
        description:
          'Cruise past sheer cliff faces, cascading waterfalls and dark waters in the heart of Fiordland.',
      },
      {
        id: 'alaskan-cruise',
        name: 'An Alaskan Cruise',
        location: 'Alaska, USA',
        description:
          'Sail through glacier-carved channels, past tidewater ice and remote rainforest towns.',
      },
      {
        id: 'lapland-aurora',
        name: 'Northern Lights & Christmas Village',
        location: 'Lapland, Finland',
        description:
          'Meet reindeer, sleep in a glass-roofed cabin and watch the aurora ripple across the Arctic sky.',
      },
      {
        id: 'san-blas',
        name: 'Island-hopping with the Kuna',
        location: 'San Blas, Panama',
        description:
          'Sail between tiny palm-fringed islands and share a day with the Kuna people of the San Blas archipelago.',
      },
      {
        id: 'raja-ampat',
        name: 'Raja Ampat',
        location: 'West Papua, Indonesia',
        description:
          'Explore, cruise and hike through the world’s most biodiverse marine landscape.',
      },
    ],
  },
  {
    id: 'wildlife-expeditions',
    name: 'Extraordinary Wildlife & Expeditions',
    tagline: 'Wild places, close encounters and journeys that ask a little more of you.',
    destinations: [
      {
        id: 'great-migration',
        name: 'The Great Migration',
        location: 'Serengeti, Tanzania & Kenya',
        description:
          'Watch millions of wildebeest and zebras cross crocodile-filled rivers on the open savanna.',
      },
      {
        id: 'galapagos',
        name: 'The Galápagos Islands',
        location: 'Ecuador',
        description:
          'Snorkel alongside sea lions, giant tortoises and marine iguanas that show no fear of humans.',
      },
      {
        id: 'round-the-world',
        name: 'Round the World in 30 Days',
        location: 'Multiple continents',
        description:
          'Circle the globe in a single, carefully paced journey linking the landscapes you have always wanted to see.',
      },
      {
        id: 'antarctica',
        name: 'Antarctica Expedition',
        location: 'Drake Passage & Antarctic Peninsula',
        description:
          'Sail across the Drake Passage to kayak among icebergs and meet massive penguin colonies.',
      },
      {
        id: 'gorilla-trekking',
        name: 'Gorilla Trekking',
        location: 'Rwanda & Uganda',
        description:
          'Hike through mist-covered rainforests to spend an hour face-to-face with wild mountain gorillas.',
      },
      {
        id: 'great-barrier-reef',
        name: 'Great Barrier Reef',
        location: 'Queensland, Australia',
        description:
          'Scuba dive or snorkel in the world’s largest coral reef system, home to thousands of marine species.',
      },
      {
        id: 'jellyfish-lake',
        name: 'Swimming with Jellyfish',
        location: 'Jellyfish Lake, Palau',
        description:
          'Swim with millions of golden jellyfish in a landlocked marine lake hidden among limestone islands.',
      },
    ],
  },
  {
    id: 'cultural-scenic',
    name: 'Unforgettable Cultural & Scenic Experiences',
    tagline: 'Colour, ritual, table and landscape — travel that lingers long after.',
    destinations: [
      {
        id: 'cappadocia',
        name: 'Hot Air Ballooning in Cappadocia',
        location: 'Türkiye',
        description:
          'Drift at sunrise over surreal fairy chimneys and honeycombed rock formations.',
      },
      {
        id: 'kyoto-cherry-blossom',
        name: 'Cherry Blossom Season in Kyoto',
        location: 'Japan',
        description:
          'Stroll beneath blooming sakura along ancient temple pathways and traditional teahouses.',
      },
      {
        id: 'northern-lights',
        name: 'Chasing the Northern Lights',
        location: 'Scandinavia & Iceland',
        description:
          'Watch ribbons of green and violet light dance across clear, frozen night skies.',
      },
      {
        id: 'overwater-villa',
        name: 'Overwater Bungalow Stay',
        location: 'Bora Bora or the Maldives',
        description:
          'Sleep in a floating villa directly over crystal-clear turquoise lagoons.',
      },
      {
        id: 'amalfi-coast',
        name: 'Road Tripping the Amalfi Coast',
        location: 'Italy',
        description:
          'Drive winding coastal roads past cliffside villages like Positano, perched above the Mediterranean.',
      },
      {
        id: 'santorini',
        name: 'Santorini Sunsets',
        location: 'Greece',
        description:
          'Watch the sun drop behind whitewashed buildings and blue-domed churches in Oia.',
      },
      {
        id: 'marrakech-souks',
        name: 'Wandering the Souks of Marrakech',
        location: 'Morocco',
        description:
          'Get lost in a sensory maze of spices, handwoven carpets, lanterns and riads.',
      },
      {
        id: 'jerusalem-dead-sea',
        name: 'Jerusalem & the Dead Sea',
        location: 'Ein Bokek, Israel',
        description:
          'Walk the old city’s sacred stones, then float weightlessly in the mineral-rich Dead Sea.',
      },
      {
        id: 'bagan',
        name: 'Temples of Bagan',
        location: 'Myanmar',
        description:
          'Cycle between thousands of ancient stupas as the plain glows gold at sunrise and dusk.',
      },
      {
        id: 'angkor-wat',
        name: 'Sunrise at Angkor Wat',
        location: 'Siem Reap, Cambodia',
        description:
          'Watch the temple silhouette emerge from darkness, then explore the jungle-shrouded Khmer complex.',
      },
      {
        id: 'japan-culture',
        name: 'Culture Trip of Japan',
        location: 'Japan',
        description:
          'Move from Tokyo’s energy to Kyoto’s temples, with tea ceremonies, craft studios and quiet gardens.',
      },
      {
        id: 'cuba',
        name: 'Cuba & a Dash of Change',
        location: 'Cuba',
        description:
          'Explore Havana’s faded elegance, tobacco valleys and the rhythm of a country in transition.',
      },
    ],
  },
  {
    id: 'family-vacations',
    name: 'Exotic Family Vacations',
    tagline: 'Shared adventures designed for every generation around the table.',
    destinations: [
      {
        id: 'iceland-family',
        name: 'Volcanoes & the Blue Lagoon',
        location: 'Iceland',
        description:
          'Walk lava fields, bathe in geothermal water and watch the island’s raw geology up close.',
      },
      {
        id: 'dubai-family',
        name: 'A Scintillating Tour of the Emirates',
        location: 'Dubai, U.A.E.',
        description:
          'Balance desert dunes and record-breaking architecture with quiet moments in old Dubai.',
      },
      {
        id: 'cape-town-family',
        name: 'The Tip of Africa',
        location: 'Cape Town, South Africa',
        description:
          'Drive the Cape Peninsula between penguin beaches, vineyards and the continent’s dramatic edge.',
      },
      {
        id: 'tigers-nest',
        name: 'Tiger’s Nest Hike',
        location: 'Paro, Bhutan',
        description:
          'Climb to the cliff-clinging monastery above the Paro Valley, with prayer flags in the wind.',
      },
      {
        id: 'torres-del-paine',
        name: 'Torres del Paine',
        location: 'Patagonia, Chile',
        description:
          'Stay in a remote lodge beneath granite towers, glaciers and some of the darkest skies on earth.',
      },
      {
        id: 'christmas-market-cruise',
        name: 'A Christmas Market Cruise',
        location: 'Europe',
        description:
          'Sail the Rhine or Danube between fairy-lit squares, mulled wine and snow-dusted old towns.',
      },
      {
        id: 'beluga-whales',
        name: 'Kayak with Beluga Whales',
        location: 'Manitoba, Canada',
        description:
          'Paddle the Churchill River estuary as curious belugas surface beside your kayak.',
      },
      {
        id: 'bora-bora-family',
        name: 'Sleeping in an Overwater Bungalow',
        location: 'Bora Bora, French Polynesia',
        description:
          'Wake above a lagoon so clear the villa’s shadow drifts across the coral below.',
      },
      {
        id: 'greek-islands',
        name: 'Island Hopping in Greece',
        location: 'Cyclades, Greece',
        description:
          'Move between whitewashed islands by private boat, with long lunches and quiet coves.',
      },
      {
        id: 'bali-borobudur',
        name: 'Bali & Borobudur',
        location: 'Indonesia',
        description:
          'Pair Bali’s rice terraces and temples with a sunrise visit to the vast Borobudur stupa.',
      },
      {
        id: 'whale-sharks',
        name: 'Swim with Whale Sharks',
        location: 'Cancun, Mexico',
        description:
          'Join a small group to swim alongside the ocean’s gentle giants in the Yucatán currents.',
      },
      {
        id: 'getsemani',
        name: 'Street Art in Getsemani',
        location: 'Cartagena, Colombia',
        description:
          'Wind through vivid murals, courtyard cafés and the Caribbean rhythm of Cartagena’s old quarter.',
      },
    ],
  },
];

export const TOTAL_BUCKET_DESTINATIONS = BUCKET_CATEGORIES.reduce(
  (total, category) => total + category.destinations.length,
  0
);

export const findBucketCategory = (categoryId: string) =>
  BUCKET_CATEGORIES.find((category) => category.id === categoryId);

export const findBucketDestination = (destinationId: string) => {
  for (const category of BUCKET_CATEGORIES) {
    const destination = category.destinations.find((item) => item.id === destinationId);
    if (destination) return { category, destination };
  }
  return null;
};

export const formatBucketPrice = (value: number) =>
  `₹${value.toLocaleString('en-IN')}`;

export const formatBucketStatus = (status: string) => {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'new') return 'Submitted';
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatBucketDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

export const addDaysToDateString = (value: string, days: number) => {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
};

export const toDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
