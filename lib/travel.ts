// Static catalogue for the /luxury-travel/[slug] pages.
// Content is authored here (no CMS yet) so the page can be statically generated.

export type TravelHighlightIcon =
  | 'days'
  | 'countries'
  | 'cities'
  | 'mountain'
  | 'heritage'
  | 'yurt';

export interface TravelHighlight {
  icon: TravelHighlightIcon;
  value: string;
  label: string;
  note: string;
}

export interface TravelDay {
  day: number;
  title: string;
  paragraphs: string[];
  accommodation: string;
  meals: string;
  travel: string;
}

export interface TravelChapter {
  id: string;
  country: string;
  dayRange: string;
  image: string;
  imageAlt: string;
  intro: string;
  days: TravelDay[];
}

export interface TravelSummaryRow {
  days: string;
  country: string;
  places: string;
  stay: string;
}

export interface TravelRouteStop {
  label: string;
  country: string;
  dayRange: string;
  coords: [number, number];
}

export type TravelInfoIcon = 'wallet' | 'shield' | 'stamp' | 'calendar' | 'heart';

export interface TravelInfoBlock {
  icon: TravelInfoIcon;
  title: string;
  body: string;
}

export interface TravelInfoCountry {
  country: string;
  blocks: TravelInfoBlock[];
}

export interface TravelItinerary {
  slug: string;
  title: string;
  titleAccent: string;
  headingBefore: string;
  headingAccent: string;
  eyebrow: string;
  durationDays: number;
  nights: number;
  countries: number;
  price: number;
  priceNote: string;
  bestTime: string;
  heroImage: string;
  heroAlt: string;
  overview: string[];
  highlights: TravelHighlight[];
  summary: TravelSummaryRow[];
  routeStops: TravelRouteStop[];
  chapters: TravelChapter[];
  included: string[];
  includedNote: string;
  excluded: string[];
  travelInfo: TravelInfoCountry[];
  travelInfoNote: string;
  routeTitle: string;
  routeDescription: string;
  routeNote: string;
  relatedPackageIds: string[];
}

export const TRAVEL_ITINERARIES: TravelItinerary[] = [
  {
    slug: 'the-best-of-the-five-stan-tour',
    title: 'The Best of the Five Stan Tour',
    titleAccent: 'Five Stan',
    headingBefore: 'Bishkek to',
    headingAccent: 'Ashgabat',
    eyebrow: 'Central Asia · Five Countries',
    durationDays: 22,
    nights: 21,
    countries: 5,
    price: 850000,
    priceNote:
      'Indicative price per person on twin sharing. Final pricing depends on travel dates, availability and the category of hotels you choose.',
    bestTime: 'Apr–Jun · Sep–Nov',
    heroImage: '/travel/five-stans-hero.jpg',
    heroAlt:
      'Turquoise-tiled madrasah portals glowing in the late afternoon sun in Central Asia',
    overview: [
      'Embark on an extraordinary journey through all five countries of Central Asia, beginning in Bishkek and ending in Ashgabat.',
      'In Kyrgyzstan, explore Ala-Archa Gorge, experience traditional nomadic culture, meet eagle hunters and discover the beautiful landscapes surrounding Issyk-Kul Lake. Continue into Kazakhstan to explore the spectacular Charyn Canyon and the vibrant city of Almaty.',
      'In Tajikistan, discover the historic city of Dushanbe, the beautiful Iskanderkul Lake and the ancient heritage of Penjikent and Khujand. Continue through Uzbekistan’s legendary Silk Road cities, including Tashkent, Samarkand, Bukhara and Khiva — magnificent architecture, historic monuments, traditional markets and a local plov cooking experience.',
      'Finally, journey into Turkmenistan to witness the spectacular Darvaza Gas Crater and discover the white-marble capital of Ashgabat. A remarkable journey combining history, culture, nature, architecture and authentic local experiences.',
    ],
    highlights: [
      {
        icon: 'days',
        value: '22 Days',
        label: 'Extended journey',
        note: 'One continuous route from Bishkek to Ashgabat.',
      },
      {
        icon: 'countries',
        value: '5 Countries',
        label: 'Central Asia',
        note: 'Kyrgyzstan, Kazakhstan, Tajikistan, Uzbekistan, Turkmenistan.',
      },
      {
        icon: 'cities',
        value: 'Multiple Cities',
        label: 'Silk Road destinations',
        note: 'Tashkent, Samarkand, Bukhara and Khiva among them.',
      },
      {
        icon: 'mountain',
        value: 'Mountain Adventures',
        label: 'Alpine landscapes',
        note: 'Ala-Archa, Jeti-Oguz and the Fann Mountains.',
      },
      {
        icon: 'heritage',
        value: 'Ancient Heritage',
        label: 'Historic architecture',
        note: 'Registan, Ichan-Kala and ancient Nisa.',
      },
      {
        icon: 'yurt',
        value: 'Yurt Experiences',
        label: 'Traditional stays',
        note: 'A lakeside camp at Tamga and a desert camp at Darvaza.',
      },
    ],
    summary: [
      {
        days: '1 – 6',
        country: 'Kyrgyzstan',
        places: 'Bishkek · Burana · Kochkor · Naryn · Tash-Rabat · Tamga · Karakol',
        stay: 'My Hotel · Grand Khan Tengri · Oymo Tash Yurt Camp · Green Yard',
      },
      {
        days: '7 – 9',
        country: 'Kazakhstan',
        places: 'Karakol · Kegen border · Charyn Canyon · Almaty',
        stay: 'Grand Sapphire, Almaty',
      },
      {
        days: '10 – 12',
        country: 'Tajikistan',
        places: 'Dushanbe · Hissar · Iskanderkul · Penjikent · Khujand',
        stay: 'Atlas Hotel · Panjakent Plaza',
      },
      {
        days: '13 – 19',
        country: 'Uzbekistan',
        places: 'Tashkent · Samarkand · Bukhara · Khiva · Shavat border',
        stay: 'Arba · Asal Boutique · Darvaza Hotel',
      },
      {
        days: '19 – 22',
        country: 'Turkmenistan',
        places: 'Darvaza · Ashgabat · Nisa',
        stay: 'Shared yurt camp · Ak-Altyn Hotel',
      },
    ],
    routeStops: [
      { label: 'Bishkek', country: 'Kyrgyzstan', dayRange: 'Day 1', coords: [42.8746, 74.5698] },
      { label: 'Burana Tower', country: 'Kyrgyzstan', dayRange: 'Day 2', coords: [42.747, 75.25] },
      { label: 'Kochkor', country: 'Kyrgyzstan', dayRange: 'Day 3', coords: [42.217, 75.75] },
      { label: 'Naryn', country: 'Kyrgyzstan', dayRange: 'Day 3 – 4', coords: [41.4287, 75.9911] },
      { label: 'Tash-Rabat', country: 'Kyrgyzstan', dayRange: 'Day 4', coords: [41.9, 75.24] },
      { label: 'Tamga, Issyk-Kul', country: 'Kyrgyzstan', dayRange: 'Day 5', coords: [42.1614, 77.535] },
      { label: 'Karakol', country: 'Kyrgyzstan', dayRange: 'Day 6', coords: [42.4907, 78.3936] },
      { label: 'Charyn Canyon', country: 'Kazakhstan', dayRange: 'Day 7', coords: [43.354, 79.07] },
      { label: 'Almaty', country: 'Kazakhstan', dayRange: 'Day 8 – 9', coords: [43.222, 76.8512] },
      { label: 'Dushanbe', country: 'Tajikistan', dayRange: 'Day 10', coords: [38.5598, 68.787] },
      { label: 'Hissar Fortress', country: 'Tajikistan', dayRange: 'Day 10', coords: [38.52, 68.53] },
      { label: 'Iskanderkul Lake', country: 'Tajikistan', dayRange: 'Day 11', coords: [39.07, 68.36] },
      { label: 'Penjikent', country: 'Tajikistan', dayRange: 'Day 11 – 12', coords: [39.495, 67.61] },
      { label: 'Khujand', country: 'Tajikistan', dayRange: 'Day 12', coords: [40.2833, 69.6333] },
      { label: 'Tashkent', country: 'Uzbekistan', dayRange: 'Day 13', coords: [41.2995, 69.2401] },
      { label: 'Samarkand', country: 'Uzbekistan', dayRange: 'Day 13 – 15', coords: [39.6542, 66.9597] },
      { label: 'Bukhara', country: 'Uzbekistan', dayRange: 'Day 15 – 17', coords: [39.7747, 64.4286] },
      { label: 'Khiva', country: 'Uzbekistan', dayRange: 'Day 17 – 19', coords: [41.3783, 60.3639] },
      { label: 'Darvaza Gas Crater', country: 'Turkmenistan', dayRange: 'Day 19 – 20', coords: [40.2526, 58.4394] },
      { label: 'Ashgabat', country: 'Turkmenistan', dayRange: 'Day 20 – 22', coords: [37.9601, 58.3261] },
    ],
    chapters: [
      {
        id: 'kyrgyzstan',
        country: 'Kyrgyzstan',
        dayRange: 'Days 1 – 6',
        image: '/travel/kyrgyzstan.jpg',
        imageAlt: 'Yurts beside a turquoise alpine lake below snow-capped Tien Shan peaks',
        intro:
          'Alpine gorges, Silk Road minarets and the shore of Issyk-Kul — the journey opens in the mountains of Kyrgyzstan.',
        days: [
          {
            day: 1,
            title: 'Bishkek, Arrival',
            paragraphs: [
              'Arrive in Bishkek early in the morning and transfer directly to your hotel to freshen up and rest after your flight.',
              'After breakfast, begin your Central Asian journey with a visit to Ala-Archa Gorge, located approximately 45 km south of Bishkek. Explore the beautiful mountain scenery, pine forests, rivers and snow-capped peaks while enjoying a gentle walk along the trails.',
              'In the afternoon, return to Bishkek for a city tour. Visit Ala-Too Square, watch the changing of the guard at the National Flagstaff and discover monuments dedicated to Lenin, Freedom and Manas the Great.',
              'The evening is free to relax.',
            ],
            accommodation: 'My Hotel 3* or similar, Bishkek',
            meals: 'Breakfast',
            travel: 'Bishkek – Bishkek',
          },
          {
            day: 2,
            title: 'Bishkek',
            paragraphs: [
              'After breakfast, travel into the countryside to visit Burana Tower, an impressive 11th-century minaret and an important landmark of the ancient Silk Road city of Balasagun.',
              'Explore the archaeological area surrounding the tower, including ancient stone balbals and historical ruins.',
              'Nearby, enjoy lunch at a local family home and experience traditional Kyrgyz hospitality.',
              'In the afternoon, witness Kok-Boru, the traditional Kyrgyz horseback game. Watch skilled riders compete in this remarkable display of strength, balance and horsemanship.',
              'Return to Bishkek for the evening.',
            ],
            accommodation: 'My Hotel 3* or similar, Bishkek',
            meals: 'Breakfast, Lunch',
            travel: 'Bishkek – Burana Tower – Bishkek',
          },
          {
            day: 3,
            title: 'Bishkek – Kochkor – Naryn',
            paragraphs: [
              'After breakfast, depart Bishkek and travel towards Naryn through beautiful mountain valleys and highland landscapes.',
              'Along the way, stop in Kochkor village, famous for its traditional felt-making crafts. Visit a local workshop and participate in a hands-on masterclass to learn how traditional shyrdak felt rugs are made.',
              'After lunch, continue the journey through the mountains to Naryn, a peaceful town located at an altitude of over 2,000 metres.',
              'Arrive at the hotel and enjoy a relaxing evening.',
            ],
            accommodation: 'Grand Khan Tengri Hotel 3* or similar, Naryn',
            meals: 'Breakfast, Lunch',
            travel: 'Bishkek – Kochkor – Naryn',
          },
          {
            day: 4,
            title: 'Naryn – Tash-Rabat Caravanserai – Naryn',
            paragraphs: [
              'After breakfast, set out for a day trip to Tash-Rabat Caravanserai, a remarkable stone structure that once provided shelter for Silk Road traders and travellers.',
              'Surrounded by high mountains and beautiful meadows, this historic 15th-century caravanserai offers a glimpse into the region’s ancient trading history.',
              'Explore its stone chambers and learn about the merchants who once travelled through these mountain routes.',
              'Enjoy a picnic-style lunch in the fresh mountain air before returning to Naryn.',
            ],
            accommodation: 'Grand Khan Tengri Hotel 3* or similar, Naryn',
            meals: 'Breakfast, Lunch',
            travel: 'Naryn – Tash-Rabat – Naryn',
          },
          {
            day: 5,
            title: 'Naryn – Bokonbaevo – Tamga',
            paragraphs: [
              'After breakfast, continue along the southern shore of Issyk-Kul Lake, one of the world’s largest alpine lakes.',
              'Visit Bokonbaevo village to meet local eagle hunters and experience a traditional falconry demonstration. Discover how these majestic birds are trained and learn about a centuries-old Kyrgyz tradition.',
              'Enjoy lunch along the way before visiting Fairytale Canyon, also known as Skazka Canyon. Explore its colourful clay formations shaped by wind and time into unusual towers, castles and other fascinating shapes.',
              'By evening, arrive in Tamga village near the lakeshore. Enjoy a traditional yurt camp stay and dinner.',
            ],
            accommodation: 'Oymo Tash Yurt Camp, Tamga',
            meals: 'Breakfast, Lunch, Dinner',
            travel: 'Naryn – Bokonbaevo – Tamga',
          },
          {
            day: 6,
            title: 'Tamga – Jeti-Oguz Gorge – Karakol',
            paragraphs: [
              'After breakfast, travel to Jeti-Oguz Gorge, famous for its impressive red sandstone cliffs known as the Seven Bulls.',
              'Enjoy an easy hike along the winding mountain river, surrounded by dramatic red rock formations and green Tien Shan spruce forests.',
              'Continue to Karakol, a charming town located at the eastern end of Issyk-Kul Lake.',
              'Upon arrival, visit the colourful Dungan Mosque, built entirely of wood without a single nail, and the Russian Orthodox Cathedral. Also visit the Przhevalsky Museum, dedicated to the Russian explorer who mapped much of Central Asia.',
              'Enjoy the evening at leisure.',
            ],
            accommodation: 'Green Yard Hotel 3* or similar, Karakol',
            meals: 'Breakfast, Lunch',
            travel: 'Tamga – Jeti-Oguz – Karakol',
          },
        ],
      },
      {
        id: 'kazakhstan',
        country: 'Kazakhstan',
        dayRange: 'Days 7 – 9',
        image: '/travel/kazakhstan.jpg',
        imageAlt: 'Red sandstone towers of Charyn Canyon under a deep blue sky',
        intro:
          'A land-border crossing into the steppe, the Valley of Castles at Charyn Canyon, and two days in Almaty beneath the mountains.',
        days: [
          {
            day: 7,
            title: 'Karakol – Kegen Border – Charyn Canyon – Almaty',
            paragraphs: [
              'After an early breakfast, depart Karakol and travel towards the Kazakh border at Kegen.',
              'After completing border formalities, continue through scenic valleys and mountain passes towards Almaty.',
              'Along the way, visit Charyn Canyon, one of Central Asia’s most impressive natural attractions. Explore the famous Valley of Castles, known for its dramatic rock formations and colourful canyon walls.',
              'Enjoy a leisurely walk through the canyon before continuing to Almaty.',
              'Arrive in the evening, check into the hotel and relax.',
            ],
            accommodation: 'Grand Sapphire 3* or similar, Almaty',
            meals: 'Breakfast, Lunch',
            travel: 'Karakol – Kegen Border – Charyn Canyon – Almaty',
          },
          {
            day: 8,
            title: 'Almaty',
            paragraphs: [
              'After breakfast, enjoy a full-day sightseeing tour of Almaty.',
              'Begin at the colourful Green Bazaar, followed by a walk through Panfilov Park. Visit the beautiful wooden Zenkov Cathedral and the Memorial of Glory and Eternal Flame.',
              'Continue to Kok-Tobe Hill for panoramic views of the city and enjoy the famous Almaty cableway.',
              'After lunch, travel into the mountains to visit Medeo, the world’s highest ice-skating rink, and Shymbulak Ski Resort. Take the cable car up to approximately 3,200 metres for spectacular alpine views.',
              'Return to the hotel in the evening.',
            ],
            accommodation: 'Grand Sapphire 3* or similar, Almaty',
            meals: 'Breakfast',
            travel: 'Almaty city and mountain sightseeing',
          },
          {
            day: 9,
            title: 'Almaty – Dushanbe',
            paragraphs: [
              'After breakfast, enjoy a relaxed morning in Almaty. Spend your remaining time exploring the city at your own pace, visiting the bazaar or taking a leisurely walk along Arbat pedestrian street.',
              'Hotel check-out is at 12:00, with luggage storage available at the hotel.',
              'At the agreed time, meet your guide and transfer to the airport for your evening flight to Dushanbe.',
              'Upon arrival, meet your local representative and transfer to the hotel. Enjoy the rest of the evening at leisure.',
            ],
            accommodation: 'Atlas Hotel B&B 3* or similar, Dushanbe',
            meals: 'Breakfast',
            travel: 'Almaty – Dushanbe (flight)',
          },
        ],
      },
      {
        id: 'tajikistan',
        country: 'Tajikistan',
        dayRange: 'Days 10 – 12',
        image: '/travel/tajikistan.jpg',
        imageAlt: 'Turquoise glacial lake beneath rocky peaks in the Fann Mountains',
        intro:
          'Soviet-era avenues, a ninth-century fortress, and the impossible blue of Iskanderkul on the road to the Fergana Valley.',
        days: [
          {
            day: 10,
            title: 'Dushanbe',
            paragraphs: [
              'After breakfast, begin exploring Dushanbe, a city that combines Soviet heritage with modern Central Asian charm.',
              'Visit the National Museum of Tajikistan, home to the famous Buddha in Nirvana. Continue to the Botanical Garden and the Oriental Bazaar, where you can discover local produce, spices and handmade goods.',
              'After lunch, drive approximately 30 km outside the city to visit Hissar Fortress, an important historical stronghold along the Silk Road.',
              'Explore the fortress complex and Madrasah Kukhna before returning to Dushanbe for the evening.',
            ],
            accommodation: 'Atlas Hotel B&B 3* or similar, Dushanbe',
            meals: 'Breakfast',
            travel: 'Dushanbe – Hissar – Dushanbe',
          },
          {
            day: 11,
            title: 'Dushanbe – Iskanderkul Lake – Penjikent',
            paragraphs: [
              'Depart Dushanbe after breakfast and travel through the beautiful mountain landscapes of northern Tajikistan.',
              'Along the way, stop at Iskanderkul Lake, named after Alexander the Great. Enjoy the striking turquoise water, dramatic mountain scenery and peaceful surroundings.',
              'Continue towards Penjikent, where you will explore the town’s historical and cultural heritage.',
              'Visit the ancient settlement of Sarazm, a UNESCO World Heritage Site, and the local museum to discover the region’s early history.',
              'Transfer to your hotel and relax after the day’s journey.',
            ],
            accommodation: 'Panjakent Plaza Hotel or similar, Panjakent',
            meals: 'Breakfast',
            travel: 'Dushanbe – Panjakent (235 km)',
          },
          {
            day: 12,
            title: 'Penjikent – Khujand – Oybek Border – Tashkent',
            paragraphs: [
              'After breakfast, travel north towards Khujand, one of Tajikistan’s oldest cities and an important Silk Road destination.',
              'Explore the Archaeological Museum, Shaikh Muslihiddin Mosque and Madrasah, and Payshanba Bazaar, where you can experience the everyday life of the Fergana Valley.',
              'After sightseeing, continue towards the Oybek land border and complete the border formalities.',
              'On the Uzbek side, meet your Uzbek guide and driver and continue to Tashkent.',
              'Arrive at the hotel and enjoy time to rest.',
            ],
            accommodation: 'Avant Hotel 3* or similar, Tashkent',
            meals: 'Breakfast',
            travel: 'Penjikent – Khujand – Oybek Border – Tashkent (approximately 460 km)',
          },
        ],
      },
      {
        id: 'uzbekistan',
        country: 'Uzbekistan',
        dayRange: 'Days 13 – 19',
        image: '/travel/uzbekistan.jpg',
        imageAlt: 'The Kalyan minaret and madrasah facade lit at dusk in Bukhara',
        intro:
          'The heart of the Silk Road: Tashkent’s bazaars, the Registan at Samarkand, Bukhara’s domed lanes and the walled city of Khiva.',
        days: [
          {
            day: 13,
            title: 'Tashkent – Samarkand',
            paragraphs: [
              'After breakfast, discover Tashkent, Uzbekistan’s capital.',
              'Begin at Khast-Imam Square, the city’s historic religious centre, featuring beautiful mosques, madrasahs and mausoleums.',
              'Continue to Chorsu Bazaar, one of the oldest markets in Central Asia, where you can explore stalls filled with spices, fresh produce, bread and local goods.',
              'After lunch, visit Independence Square and Amir Temur Square. Experience the Tashkent Metro, known for its distinctive station designs and architectural details.',
              'In the evening, transfer to the railway station and board the train to Samarkand. Upon arrival, transfer to the hotel.',
            ],
            accommodation: 'Arba 3* or similar, Samarkand',
            meals: 'Breakfast',
            travel: 'Tashkent – Samarkand (train, approximately 343 km)',
          },
          {
            day: 14,
            title: 'Samarkand',
            paragraphs: [
              'After breakfast, explore Samarkand, one of the most remarkable cities of the ancient Silk Road.',
              'Begin with Registan Square, surrounded by three magnificent madrasahs: Ulugbek, Sher-Dor and Tilla-Qori.',
              'Continue to Gur-e Amir Mausoleum, the resting place of Tamerlane and his dynasty.',
              'After lunch, visit Bibi-Khanym Mosque and the beautiful Shah-i-Zinda Necropolis, known for its colourful blue-tiled mausoleums.',
              'End the day at Ulugbek Observatory, where the famous astronomer studied and charted the stars centuries ago.',
              'Return to the hotel for the evening.',
            ],
            accommodation: 'Arba 3* or similar, Samarkand',
            meals: 'Breakfast',
            travel: 'Samarkand sightseeing',
          },
          {
            day: 15,
            title: 'Samarkand – Bukhara',
            paragraphs: [
              'After breakfast, depart for Bukhara, travelling across the Kyzylkum plains, once an important route for Silk Road caravans.',
              'Upon arrival, explore the historic old town, beginning with the impressive Po-i-Kalyan Complex and its magnificent minaret.',
              'Continue to Miri-Arab Madrasa, Magoki Attori Mosque and Ulugbek Madrasa, each representing an important part of the city’s architectural and religious heritage.',
              'End the day at Lyabi-Hauz Square, a peaceful historic gathering place surrounded by traditional architecture.',
              'Check into your hotel and relax.',
            ],
            accommodation: 'Asal Boutique 3* or similar, Bukhara',
            meals: 'Breakfast',
            travel: 'Samarkand – Bukhara (280 km)',
          },
          {
            day: 16,
            title: 'Bukhara',
            paragraphs: [
              'After breakfast, continue exploring the historic city of Bukhara.',
              'Visit the Ismail Samani Mausoleum and Chashma Ayub Mausoleum before exploring the local bazaar.',
              'Continue to Bolo-Khauz Mosque and the impressive Ark Citadel, including its historic Zindan prison.',
              'In the afternoon, visit Sitorai Mokhi-Khosa Palace, the former summer residence of the last emir, followed by the Mausoleum of Bakhouddin Naqshbandi.',
              'In the evening, enjoy a special culinary experience at a traditional Uzbek family home. Participate in a plov cooking masterclass, learn how to prepare this famous local dish and share a homemade dinner with your hosts.',
            ],
            accommodation: 'Asal Boutique 3* or similar, Bukhara',
            meals: 'Breakfast, Dinner',
            travel: 'Bukhara sightseeing',
          },
          {
            day: 17,
            title: 'Bukhara – Khiva',
            paragraphs: [
              'After breakfast, depart for Khiva on a long but scenic journey across the Kyzylkum Desert and along the Amudarya River.',
              'Travel through vast desert landscapes, golden sands and open countryside, experiencing the historic routes that once connected the Silk Road cities.',
              'Stop for lunch along the way before continuing to Khiva.',
              'Upon arrival, enjoy free time to explore the narrow streets, traditional workshops and local souvenir shops.',
            ],
            accommodation: 'Darvaza Hotel 3* or similar, Khiva',
            meals: 'Breakfast',
            travel: 'Bukhara – Khiva (460 km)',
          },
          {
            day: 18,
            title: 'Khiva',
            paragraphs: [
              'After breakfast, explore Ichan-Kala, the walled inner city of Khiva and a UNESCO World Heritage Site.',
              'Discover the historic Pakhlavan Mahmud Mausoleum, Kunya-Ark Fortress and the impressive Islam Hajji Minaret.',
              'After lunch, continue to Tash Khauli Palace, Juma Mosque, famous for its carved wooden columns, Muhammad Aminkhan Madrasah and the Avesta Museum.',
              'Return to the hotel in the evening.',
            ],
            accommodation: 'Darvaza Hotel 3* or similar, Khiva',
            meals: 'Breakfast',
            travel: 'Khiva sightseeing',
          },
          {
            day: 19,
            title: 'Khiva – Shavat Border – Darvaza',
            paragraphs: [
              'Depart Khiva in the morning and travel towards the Shavat land border.',
              'After completing border formalities, meet your local Turkmen guide and driver and continue across the vast desert landscapes of Turkmenistan.',
              'Arrive in the Darvaza area before sunset and settle into the desert camp.',
              'As evening approaches, enjoy a BBQ dinner near the famous Darvaza Gas Crater. After dark, walk closer to the crater and witness the spectacular flames illuminating the desert night.',
              'Experience this extraordinary natural attraction both in daylight and after sunset.',
              'Spend the night in shared yurts in the heart of the Karakum Desert.',
            ],
            accommodation:
              'Shared Yurt Camp, Darvaza Gas Crater (3–4 travellers per yurt; shared bathrooms outside the yurt)',
            meals: 'Breakfast, Dinner',
            travel: 'Khiva – Darvaza Gas Crater (360 km)',
          },
        ],
      },
      {
        id: 'turkmenistan',
        country: 'Turkmenistan',
        dayRange: 'Days 20 – 22',
        image: '/travel/turkmenistan.jpg',
        imageAlt: 'The Darvaza gas crater glowing in the Karakum Desert at night',
        intro:
          'White marble avenues, Akhal-Teke horses and the ancient Parthian capital of Nisa — before the road turns home.',
        days: [
          {
            day: 20,
            title: 'Darvaza – Ashgabat',
            paragraphs: [
              'After breakfast at the desert camp, depart Darvaza and continue towards Ashgabat through the wide landscapes of the Karakum Desert.',
              'Along the way, stop at the nearby mud and water craters, unusual natural features of the region.',
              'Upon arrival in Ashgabat, begin exploring the capital, famous for its grand avenues and white-marble architecture.',
              'Visit the Sunday Bazaar, where local residents shop for fresh produce, textiles and everyday goods.',
              'Continue to the Akhal-Teke horse stables to see the famous horses that are an important national symbol of Turkmenistan.',
              'End the sightseeing with a visit to Ertogrul Ghazi Mosque, inspired by classical Ottoman architecture.',
              'Transfer to the hotel and relax.',
            ],
            accommodation: 'Ak-Altyn Hotel 3* or similar, Ashgabat',
            meals: 'Breakfast',
            travel: 'Darvaza Gas Crater – Ashgabat (300 km)',
          },
          {
            day: 21,
            title: 'Ashgabat',
            paragraphs: [
              'After breakfast, continue exploring Ashgabat’s cultural, historical and architectural landmarks.',
              'Begin at the National Museum, where you can discover the country’s ancient civilizations and archaeological heritage.',
              'Visit Independence Park, the Rukhnama Monument and the impressive Neutrality Arch.',
              'Continue to the Wedding Palace, where the panoramic viewpoint offers beautiful views across the city’s distinctive white-marble skyline.',
              'Outside the city, explore Nisa, a UNESCO World Heritage Site and former capital of the Parthian Empire.',
              'Conclude the day with a visit to the Turkmenbashi Mosque-Mausoleum before returning to the hotel.',
            ],
            accommodation: 'Ak-Altyn Hotel 3* or similar, Ashgabat',
            meals: 'Breakfast',
            travel: 'Ashgabat – Nisa – Ashgabat',
          },
          {
            day: 22,
            title: 'Ashgabat, Departure',
            paragraphs: [
              'After breakfast at the hotel, enjoy your final morning in Ashgabat.',
              'At the scheduled time, transfer to Ashgabat International Airport for your departure flight, bringing your unforgettable journey through the five countries of Central Asia to an end.',
            ],
            accommodation: 'No overnight stay — departure day',
            meals: 'Breakfast',
            travel: 'Hotel – Ashgabat International Airport',
          },
        ],
      },
    ],
    included: [
      'Accommodation at the listed hotels or similar properties of the same category, in double/twin rooms with breakfast.',
      'Early check-in on Day 1 in Bishkek.',
      'Accommodation at the Tamga village yurt camp, with twin accommodation and private en-suite bathrooms.',
      'Accommodation at the Darvaza yurt camp, with 3–4 travellers per yurt and shared bathrooms outside.',
      'Daily breakfasts, 6 lunches and 3 dinners as per the itinerary.',
      'Plov cooking class and dinner in a traditional Bukhara family home.',
      'Entrance fees to the monuments and museums mentioned in the itinerary.',
      'Kok-Boru horseback game demonstration.',
      'Falconry demonstration in Kyrgyzstan.',
      'Felt-making and felt carpet masterclass.',
      'English-speaking local sightseeing guides.',
      'Comfortable air-conditioned transportation throughout the tour.',
      'Airport–hotel–airport transfers.',
      'Tashkent–Samarkand railway transfer, economy class.',
      'Almaty–Dushanbe flight ticket, economy class.',
      'Turkmenistan visa invitation letter.',
    ],
    includedNote:
      'High-speed train tickets are subject to availability and cannot be guaranteed in advance. Hotel check-in at other hotels is at 14:00 and check-out is at 12:00.',
    excluded: [
      'Meals not mentioned in the itinerary.',
      'Medical expenses and travel insurance.',
      'Porterage at hotels, railway stations and airports.',
      'Tips for guides and drivers.',
      'Visa fees (Turkmenistan visa approximately USD 100–120 per person).',
      'Personal expenses, including the Turkmenistan hotel tourist fee of approximately USD 2 per person per night.',
    ],
    travelInfo: [
      {
        country: 'Turkmenistan',
        blocks: [
          {
            icon: 'wallet',
            title: 'Money & Costs',
            body: 'The official currency is the Turkmen manat. Most shops and restaurants accept cash only, so carry sufficient cash, preferably new US dollar notes. Visa cards may work at some hotels and banks, but most ATMs accept only local Turkmen cards.',
          },
          {
            icon: 'shield',
            title: 'Safety',
            body: 'Carry identification at all times. Follow local laws and customs, avoid photographing restricted government or military locations, and be aware that some social media platforms and websites are blocked.',
          },
          {
            icon: 'stamp',
            title: 'Entry & Exit',
            body: 'All international visitors require a visa. A tourist visa requires an approved Letter of Invitation (LOI), arranged through a licensed local tour operator. This itinerary includes the Turkmenistan visa invitation letter; visa fees are additional.',
          },
          {
            icon: 'calendar',
            title: 'Best Time to Visit',
            body: 'March–June and September–November are the recommended periods. July and August can be extremely hot, while winter temperatures can fall below freezing.',
          },
          {
            icon: 'heart',
            title: 'Health',
            body: 'Medical services are limited. Comprehensive travel insurance, including medical evacuation, is recommended. Drink bottled, filtered or boiled water and take appropriate food precautions.',
          },
        ],
      },
      {
        country: 'Uzbekistan',
        blocks: [
          {
            icon: 'wallet',
            title: 'Money & Costs',
            body: 'The local currency is the Uzbek sum. Cash is commonly used, although ATMs and card payments are available in larger cities. US dollars, euros and other major currencies can be exchanged at banks and authorised exchange offices.',
          },
          {
            icon: 'shield',
            title: 'Safety',
            body: 'Uzbekistan is generally considered safe for travellers. Carry your passport, use licensed taxis, take care of valuables and follow photography restrictions around official and security locations.',
          },
          {
            icon: 'stamp',
            title: 'Entry & Exit',
            body: 'Visa requirements depend on nationality. Many travellers can visit visa-free, while others require a visa. Hotel registration is important — registration is required within three days of arrival.',
          },
          {
            icon: 'calendar',
            title: 'Best Time to Visit',
            body: 'March–May and September–November offer pleasant conditions for exploring the historic cities. Summer can be very hot, while winters can be cold.',
          },
          {
            icon: 'heart',
            title: 'Health',
            body: 'Medical facilities are limited compared with many international destinations. Travel insurance, bottled drinking water and appropriate food precautions are recommended.',
          },
        ],
      },
      {
        country: 'Kyrgyzstan',
        blocks: [
          {
            icon: 'wallet',
            title: 'Money & Costs',
            body: 'The official currency is the Kyrgyz som (KGS). Cash is widely used outside the larger cities. ATMs are available in Bishkek and some larger towns, while card acceptance is more limited in rural areas.',
          },
          {
            icon: 'shield',
            title: 'Safety',
            body: 'Kyrgyzstan is generally safe for travellers. Keep identification with you, take care in crowded bazaars, use established taxi services and follow local laws and customs.',
          },
          {
            icon: 'stamp',
            title: 'Entry & Exit',
            body: 'Visa-free entry is available to travellers from many countries. Other nationalities may require an electronic visa or an embassy-issued visa. Special permits may be required for certain border regions.',
          },
          {
            icon: 'calendar',
            title: 'Best Time to Visit',
            body: 'May–June and September are recommended for lower areas. July and August are particularly suitable for high mountain travel, trekking and yurt experiences.',
          },
          {
            icon: 'heart',
            title: 'Health',
            body: 'Medical facilities are limited, especially outside larger towns. Comprehensive travel insurance is important. Bottled water is the safest drinking option, and regular medication should be brought from home.',
          },
        ],
      },
      {
        country: 'Kazakhstan',
        blocks: [
          {
            icon: 'wallet',
            title: 'Money & Costs',
            body: 'The official currency is the Kazakh tenge (KZT). ATMs and exchange offices are widely available in major cities. International cards are accepted at many hotels, restaurants and larger shops.',
          },
          {
            icon: 'shield',
            title: 'Safety',
            body: 'Take normal precautions against pickpocketing and theft. Carry original identification, arrange transport through established services and follow local laws and photography restrictions.',
          },
          {
            icon: 'stamp',
            title: 'Entry & Exit',
            body: 'Visa requirements depend on nationality. Some travellers can enter visa-free, while others require a visa or electronic visa. Check the relevant requirements before travelling.',
          },
          {
            icon: 'calendar',
            title: 'Best Time to Visit',
            body: 'April–June and September–November are recommended for comfortable temperatures. Summers can be very hot, while winters can be extremely cold.',
          },
          {
            icon: 'heart',
            title: 'Health',
            body: 'Make sure your travel insurance covers medical treatment and emergency evacuation. Medical staff may have limited English-language ability, and prescription medicines may require local documentation.',
          },
        ],
      },
      {
        country: 'Tajikistan',
        blocks: [
          {
            icon: 'wallet',
            title: 'Money & Costs',
            body: 'The official currency is the Tajik somoni (TJS). Carry sufficient cash, as withdrawing money can be difficult in some locations. US dollars and euros may be accepted in certain places.',
          },
          {
            icon: 'shield',
            title: 'Safety',
            body: 'Take care of personal belongings, carry a copy of your passport and avoid demonstrations or large gatherings. Follow local laws and be aware that roads and emergency services can be limited outside major cities.',
          },
          {
            icon: 'stamp',
            title: 'Entry & Exit',
            body: 'Visa-free entry is available for many nationalities. Others may need a visa. A special GBAO permit is required for travel to the Gorno-Badakhshan Autonomous Region, which is not part of this itinerary.',
          },
          {
            icon: 'calendar',
            title: 'Best Time to Visit',
            body: 'April–June and September–October are recommended. September is particularly suitable for exploring the country’s mountain and lowland regions.',
          },
          {
            icon: 'heart',
            title: 'Health',
            body: 'Medical facilities are limited, particularly outside Dushanbe. Comprehensive travel insurance is essential. Check medication restrictions before travelling and take necessary precautions against ticks in rural areas.',
          },
        ],
      },
    ],
    travelInfoNote:
      'Visa rules, safety guidance, medical advice and entry conditions change regularly. We reconfirm all of it against official sources before you travel.',
    routeTitle: 'Explore the Five Countries of Central Asia',
    routeDescription:
      'Follow an incredible journey through five countries, connecting historic Silk Road cities, spectacular mountain landscapes and unforgettable cultural destinations.',
    routeNote:
      'The route includes an Almaty–Dushanbe flight, a Tashkent–Samarkand train journey and three land-border crossings at Kegen, Oybek and Shavat. Map data © OpenStreetMap contributors.',
    relatedPackageIds: ['five-stans', 'ultimate-five-stans', 'silk-road-adventure'],
  },
];

export const findTravelItinerary = (slug: string): TravelItinerary | null =>
  TRAVEL_ITINERARIES.find((itinerary) => itinerary.slug === slug) ?? null;

export const travelSlugs = () => TRAVEL_ITINERARIES.map((itinerary) => itinerary.slug);

export const formatTravelPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const totalDaysInChapters = (itinerary: TravelItinerary) =>
  itinerary.chapters.reduce((total, chapter) => total + chapter.days.length, 0);
