export interface DestinationPlace {
  id: string;
  name: string;
  location: string;
  description: string;
  days?: number;
  priceFrom?: number;
  image?: string;
}

export interface DestinationCategory {
  id: string;
  name: string;
  tagline: string;
  destinations: DestinationPlace[];
}

export const DESTINATIONS_DATA: DestinationCategory[] = [
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
        days: 8,
        priceFrom: 385000,
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'petra-wadi-rum',
        name: 'Petra & Wadi Rum',
        location: 'Jordan',
        description:
          'Walk the rose-red city carved into the cliffs, then sleep beneath desert stars in the dunes of Wadi Rum.',
        days: 7,
        priceFrom: 345000,
        image: 'https://images.pexels.com/photos/39375906/pexels-photo-39375906.jpeg',
      },
      {
        id: 'egypt-nile',
        name: 'Pyramids, Luxor & Aswan',
        location: 'Egypt',
        description:
          'Stand before the last surviving ancient wonder, then sail the Nile between temples, tombs and riverbank villages.',
        days: 10,
        priceFrom: 465000,
        image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'rome-walking-tour',
        name: 'A Dynamic Walking Tour of Rome',
        location: 'Italy',
        description:
          'Trace layers of empire through the Colosseum, the Forum and hidden piazzas with a private historian.',
        days: 5,
        priceFrom: 295000,
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'amsterdam-canals',
        name: 'Explore the Canals of Amsterdam',
        location: 'Netherlands',
        description:
          'Glide past gabled houses and quiet bridges on a private boat through the city’s historic waterways.',
        days: 4,
        priceFrom: 240000,
        image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'chichen-itza',
        name: 'Chichen Itza & the Yucatan',
        location: 'Mexico',
        description:
          'Discover the Maya pyramid, hidden cenotes and colonial towns on a slow journey through the Yucatán.',
        days: 6,
        priceFrom: 290000,
        image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'german-castles',
        name: 'Tour of Castles of Germany',
        location: 'Rhine Valley, Germany',
        description:
          'Follow fairytale fortresses and vineyard-lined bends of the Rhine on a privately guided castle route.',
        days: 9,
        priceFrom: 445000,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'ahu-tahai',
        name: 'Sunset from Ahu Tahai',
        location: 'Easter Island, Chile',
        description:
          'Watch the sun fall behind the moai at the island’s most atmospheric ceremonial site.',
        days: 5,
        priceFrom: 395000,
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop',
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
        days: 5,
        priceFrom: 285000,
        image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'grand-canyon',
        name: 'The Grand Canyon',
        location: 'Arizona, USA',
        description:
          'Stand on the rim of a mile-deep gorge carved by the Colorado River over millions of years.',
        days: 4,
        priceFrom: 230000,
        image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'patagonia',
        name: 'Patagonia',
        location: 'Chile & Argentina',
        description:
          'Hike past towering granite peaks, turquoise lakes and massive calving glaciers like Perito Moreno.',
        days: 12,
        priceFrom: 590000,
        image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'banff',
        name: 'Banff National Park',
        location: 'Canada',
        description:
          'Paddle across the vivid turquoise waters of Lake Louise, surrounded by snow-capped Rocky Mountains.',
        days: 7,
        priceFrom: 375000,
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'victoria-falls',
        name: 'Victoria Falls',
        location: 'Zambia & Zimbabwe',
        description:
          'Witness the world’s largest sheet of falling water, locally called “The Smoke That Thunders”.',
        days: 5,
        priceFrom: 320000,
        image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'milford-sound',
        name: 'Milford Sound',
        location: 'New Zealand',
        description:
          'Cruise past sheer cliff faces, cascading waterfalls and dark waters in the heart of Fiordland.',
        days: 8,
        priceFrom: 475000,
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'alaskan-cruise',
        name: 'An Alaskan Cruise',
        location: 'Alaska, USA',
        description:
          'Sail through glacier-carved channels, past tidewater ice and remote rainforest towns.',
        days: 10,
        priceFrom: 510000,
        image: 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'lapland-aurora',
        name: 'Northern Lights & Christmas Village',
        location: 'Lapland, Finland',
        description:
          'Meet reindeer, sleep in a glass-roofed cabin and watch the aurora ripple across the Arctic sky.',
        days: 6,
        priceFrom: 420000,
        image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'san-blas',
        name: 'Island-hopping with the Kuna',
        location: 'San Blas, Panama',
        description:
          'Sail between tiny palm-fringed islands and share a day with the Kuna people of the San Blas archipelago.',
        days: 6,
        priceFrom: 280000,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'raja-ampat',
        name: 'Raja Ampat',
        location: 'West Papua, Indonesia',
        description:
          'Explore, cruise and hike through the world’s most biodiverse marine landscape.',
        days: 9,
        priceFrom: 565000,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
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
        days: 10,
        priceFrom: 690000,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'galapagos',
        name: 'The Galápagos Islands',
        location: 'Ecuador',
        description:
          'Snorkel alongside sea lions, giant tortoises and marine iguanas that show no fear of humans.',
        days: 8,
        priceFrom: 625000,
        image: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'round-the-world',
        name: 'Round the World in 30 Days',
        location: 'Multiple continents',
        description:
          'Circle the globe in a single, carefully paced journey linking the landscapes you have always wanted to see.',
        days: 30,
        priceFrom: 2350000,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'antarctica',
        name: 'Antarctica Expedition',
        location: 'Drake Passage & Antarctic Peninsula',
        description:
          'Sail across the Drake Passage to kayak among icebergs and meet massive penguin colonies.',
        days: 14,
        priceFrom: 1120000,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'gorilla-trekking',
        name: 'Gorilla Trekking',
        location: 'Rwanda & Uganda',
        description:
          'Hike through mist-covered rainforests to spend an hour face-to-face with wild mountain gorillas.',
        days: 7,
        priceFrom: 565000,
        image: 'https://images.pexels.com/photos/17398433/pexels-photo-17398433.jpeg',
      },
      {
        id: 'great-barrier-reef',
        name: 'Great Barrier Reef',
        location: 'Queensland, Australia',
        description:
          'Scuba dive or snorkel in the world’s largest coral reef system, home to thousands of marine species.',
        days: 7,
        priceFrom: 395000,
        image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'jellyfish-lake',
        name: 'Swimming with Jellyfish',
        location: 'Jellyfish Lake, Palau',
        description:
          'Swim with millions of golden jellyfish in a landlocked marine lake hidden among limestone islands.',
        days: 6,
        priceFrom: 365000,
        image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?q=80&w=1200&auto=format&fit=crop',
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
        days: 5,
        priceFrom: 295000,
        image: 'https://images.unsplash.com/photo-1520645521318-f03a712f0e67?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'kyoto-cherry-blossom',
        name: 'Cherry Blossom Season in Kyoto',
        location: 'Japan',
        description:
          'Stroll beneath blooming sakura along ancient temple pathways and traditional teahouses.',
        days: 8,
        priceFrom: 495000,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'northern-lights',
        name: 'Chasing the Northern Lights',
        location: 'Scandinavia & Iceland',
        description:
          'Watch ribbons of green and violet light dance across clear, frozen night skies.',
        days: 7,
        priceFrom: 435000,
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'overwater-villa',
        name: 'Overwater Bungalow Stay',
        location: 'Bora Bora or the Maldives',
        description:
          'Sleep in a floating villa directly over crystal-clear turquoise lagoons.',
        days: 7,
        priceFrom: 645000,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'amalfi-coast',
        name: 'Road Tripping the Amalfi Coast',
        location: 'Italy',
        description:
          'Drive winding coastal roads past cliffside villages like Positano, perched above the Mediterranean.',
        days: 7,
        priceFrom: 445000,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'santorini',
        name: 'Santorini Sunsets',
        location: 'Greece',
        description:
          'Watch the sun drop behind whitewashed buildings and blue-domed churches in Oia.',
        days: 6,
        priceFrom: 375000,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'marrakech-souks',
        name: 'Wandering the Souks of Marrakech',
        location: 'Morocco',
        description:
          'Get lost in a sensory maze of spices, handwoven carpets, lanterns and riads.',
        days: 6,
        priceFrom: 265000,
        image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'jerusalem-dead-sea',
        name: 'Jerusalem & the Dead Sea',
        location: 'Ein Bokek, Israel',
        description:
          'Walk the old city’s sacred stones, then float weightlessly in the mineral-rich Dead Sea.',
        days: 6,
        priceFrom: 345000,
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'bagan',
        name: 'Temples of Bagan',
        location: 'Myanmar',
        description:
          'Cycle between thousands of ancient stupas as the plain glows gold at sunrise and dusk.',
        days: 6,
        priceFrom: 295000,
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'angkor-wat',
        name: 'Sunrise at Angkor Wat',
        location: 'Siem Reap, Cambodia',
        description:
          'Watch the temple silhouette emerge from darkness, then explore the jungle-shrouded Khmer complex.',
        days: 5,
        priceFrom: 255000,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'japan-culture',
        name: 'Culture Trip of Japan',
        location: 'Japan',
        description:
          'Move from Tokyo’s energy to Kyoto’s temples, with tea ceremonies, craft studios and quiet gardens.',
        days: 12,
        priceFrom: 640000,
        image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'cuba',
        name: 'Cuba & a Dash of Change',
        location: 'Cuba',
        description:
          'Explore Havana’s faded elegance, tobacco valleys and the rhythm of a country in transition.',
        days: 8,
        priceFrom: 355000,
        image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=1200&auto=format&fit=crop',
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
        days: 7,
        priceFrom: 425000,
        image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'dubai-family',
        name: 'A Scintillating Tour of the Emirates',
        location: 'Dubai, U.A.E.',
        description:
          'Balance desert dunes and record-breaking architecture with quiet moments in old Dubai.',
        days: 6,
        priceFrom: 365000,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'cape-town-family',
        name: 'The Tip of Africa',
        location: 'Cape Town, South Africa',
        description:
          'Drive the Cape Peninsula between penguin beaches, vineyards and the continent’s dramatic edge.',
        days: 9,
        priceFrom: 485000,
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'tigers-nest',
        name: 'Tiger’s Nest Hike',
        location: 'Paro, Bhutan',
        description:
          'Climb to the cliff-clinging monastery above the Paro Valley, with prayer flags in the wind.',
        days: 8,
        priceFrom: 520000,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'torres-del-paine',
        name: 'Torres del Paine',
        location: 'Patagonia, Chile',
        description:
          'Stay in a remote lodge beneath granite towers, glaciers and some of the darkest skies on earth.',
        days: 8,
        priceFrom: 555000,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'christmas-market-cruise',
        name: 'A Christmas Market Cruise',
        location: 'Europe',
        description:
          'Sail the Rhine or Danube between fairy-lit squares, mulled wine and snow-dusted old towns.',
        days: 8,
        priceFrom: 395000,
        image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'beluga-whales',
        name: 'Kayak with Beluga Whales',
        location: 'Manitoba, Canada',
        description:
          'Paddle the Churchill River estuary as curious belugas surface beside your kayak.',
        days: 6,
        priceFrom: 430000,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'bora-bora-family',
        name: 'Sleeping in an Overwater Bungalow',
        location: 'Bora Bora, French Polynesia',
        description:
          'Wake above a lagoon so clear the villa’s shadow drifts across the coral below.',
        days: 7,
        priceFrom: 665000,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'greek-islands',
        name: 'Island Hopping in Greece',
        location: 'Cyclades, Greece',
        description:
          'Move between whitewashed islands by private boat, with long lunches and quiet coves.',
        days: 9,
        priceFrom: 465000,
        image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'bali-borobudur',
        name: 'Bali & Borobudur',
        location: 'Indonesia',
        description:
          'Pair Bali’s rice terraces and temples with a sunrise visit to the vast Borobudur stupa.',
        days: 8,
        priceFrom: 355000,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'whale-sharks',
        name: 'Swim with Whale Sharks',
        location: 'Cancun, Mexico',
        description:
          'Join a small group to swim alongside the ocean’s gentle giants in the Yucatán currents.',
        days: 5,
        priceFrom: 295000,
        image: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'getsemani',
        name: 'Street Art in Getsemani',
        location: 'Cartagena, Colombia',
        description:
          'Wind through vivid murals, courtyard cafés and the Caribbean rhythm of Cartagena’s old quarter.',
        days: 5,
        priceFrom: 260000,
        image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
];

export const DESTINATIONS_FAQS = [
  {
    question: 'How are these private destination itineraries tailored?',
    answer:
      'Every journey is crafted bespoke around your pace, travel style, and personal interests. While our itineraries serve as inspiration, our travel designers tailor every detail—from private guides and vetted boutique stays to behind-the-scenes access.',
  },
  {
    question: 'Can we combine multiple destinations or categories into one trip?',
    answer:
      'Absolutely. Seamless cross-border and multi-country routing is our specialty. We manage all private transfers, regional flights, and logistics so transitions between regions feel effortless.',
  },
  {
    question: 'What is included in the estimated starting price?',
    answer:
      'Indicative pricing covers luxury handpicked accommodations, private chauffeured transfers, dedicated local insider guides, entrance fees, and 24/7 on-the-ground concierge support throughout your journey.',
  },
  {
    question: 'How far in advance should we plan our journey?',
    answer:
      'For high-demand experiences such as the Great Migration, Gorilla Trekking, Antarctica, or peak season in Kyoto and Peru, we recommend planning 6 to 12 months ahead to secure exclusive lodges and permits.',
  },
  {
    question: 'What support is provided while traveling?',
    answer:
      'You will have direct access to our 24/7 in-country concierge team and our private operations desk, ensuring continuous support, restaurant reservations, and on-the-fly itinerary refinements.',
  },
];
