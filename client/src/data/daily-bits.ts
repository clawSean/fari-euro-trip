import amalfiCoastSunset from "@assets/generated_images/amalfi_coast_sunset_view.png";

export interface SuggestionSection {
  label: string;
  emoji: string;
  ideas: string[];
}

export interface ExploreLink {
  label: string;
  url: string;
  note?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface DailyBit {
  isoDate: string;
  headlineOverride?: string;
  eyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  urgencyLine: string;
  sideQuests: string[];
  chaosBonus?: string;
  suggestionSections?: SuggestionSection[];
  exploreLinks?: ExploreLink[];
}

export const dailyBits: Record<string, DailyBit> = {
  "2026-05-13": {
    isoDate: "2026-05-13",
    headlineOverride: "We Made It to Rome 🇮🇹",
    urgencyLine:
      "Arrival day. Don't lose your passport. Find coffee immediately. Trastevere awaits.",
    sideQuests: [
      "🚬 Acquire one (1) Italian cigarette through any socially acceptable means",
      "💑 Scout the field — identify any promising Roman husband candidates for the group",
      "🍦 Find the gelato place that becomes Your Place for the whole trip",
    ],
    chaosBonus: "If you find a negroni sbagliato and it's perfect, that's a 10/10 start.",
  },
  "2026-05-14": {
    isoDate: "2026-05-14",
    headlineOverride: "Rome Today",
    eyebrow: "Only full Rome day",
    heroTitle: "Rome, Unscripted",
    heroSubtitle: "Vatican, Pantheon, then Colosseum-view drinks at The Court.",
    heroImageUrl: "/rome/rome-colosseum.jpg",
    urgencyLine:
      "Real plan forming: Vatican → Pantheon → drinks overlooking the Colosseum at The Court. Still flexible, still Rome doing Rome.",
    suggestionSections: [
      {
        label: "Morning suggestions",
        emoji: "☕",
        ideas: [
          "Vatican / Sistine / St. Peter's if the crew is ready for peak Rome grandeur",
          "Coffee + cornetto before committing to any basilica-level decisions",
          "Pantheon can slide later if Vatican timing becomes the main character",
        ],
      },
      {
        label: "Daytime anchors",
        emoji: "🏛️",
        ideas: [
          "Pantheon as the clean, central, jaw-dropping anchor between Vatican and evening plans",
          "Colosseum / Roman Forum if ancient Rome mode still has legs before drinks",
          "Capitoline Hill if you want classic Rome views without turning the day into a museum marathon",
        ],
      },
      {
        label: "Offbeat views & walks",
        emoji: "👀",
        ideas: [
          "Aventine Keyhole + Orange Garden for a quieter weird little Rome view quest",
          "Gianicolo Hill if sunset energy beats another ticketed monument",
          "Trastevere side streets when everyone wants vibes instead of lines",
        ],
      },
      {
        label: "Evening / night ideas",
        emoji: "🥂",
        ideas: [
          "The Court at Palazzo Manfredi: cocktail-bar view straight at the Colosseum",
          "Aroma next door is the fancy rooftop restaurant backup, but The Court is the drink target",
          "Gelato walk after, because ancient ruins plus cocktails requires balance",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🍝",
        ideas: [
          "Carbonara / amatriciana / cacio e pepe — Rome pasta holy trinity",
          "Trapizzino-style street food if you need fast, local, handheld fuel",
          "Supplì: fried rice ball, red sauce, mozzarella, zero regrets",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Pantheon official site",
        url: "https://www.pantheonroma.com/home-eng/",
        note: "Tickets, hours, and dome lore",
        imageUrl: "/rome/rome-pantheon.jpg",
        imageAlt: "Pantheon exterior in Rome",
      },
      {
        label: "The Court — Colosseum-view cocktails",
        url: "https://www.manfredihotels.com/en/the-court/",
        note: "Tonight's drinks target at Palazzo Manfredi",
        imageUrl: "/rome/rome-colosseum.jpg",
        imageAlt: "Colosseum exterior in Rome",
      },
      {
        label: "Colosseum official tickets/info",
        url: "https://colosseo.it/en/",
        note: "Official monument info + visit planning",
        imageUrl: "/rome/rome-colosseum.jpg",
        imageAlt: "Colosseum exterior in Rome",
      },
      {
        label: "Aventine Keyhole / Orange Garden map",
        url: "https://www.google.com/maps/search/Aventine+Keyhole+Orange+Garden+Rome/",
        note: "Offbeat view mini-quest",
      },
      {
        label: "Trastevere food map",
        url: "https://www.google.com/maps/search/Trastevere+Rome+restaurants/",
        note: "Dinner chaos board",
      },
    ],
    sideQuests: [
      "🏛️ Ask an actual Italian for one real local recommendation (not TripAdvisor)",
      "💑 Bonus: If the ladies are on the case, identify one plausible Roman husband candidate",
      "🚬 Chaos bonus: Find the least sketchy cigarette path without derailing the day",
    ],
    chaosBonus:
      "If you see the Pantheon dome AND make it through Colosseum mode without losing your soul, you win Rome.",
  },
  "2026-05-15": {
    isoDate: "2026-05-15",
    headlineOverride: "Amalfi Arrival",
    eyebrow: "Coast transfer day",
    heroTitle: "Amalfi, First Look",
    heroSubtitle: "Roma Termini to cliffs, lemons, and full coastal drama.",
    heroImageUrl: amalfiCoastSunset,
    urgencyLine: "Rome → Naples → Amalfi Coast. 12:30pm private transfer from Naples Central, then Via Papa Leone X in Amalfi.",
    suggestionSections: [
      {
        label: "Travel anchors",
        emoji: "🚆",
        ideas: [
          "Frecciarossa 8335: Roma Termini 10:20 → Napoli Centrale 11:33",
          "Private transfer pickup: Naples Central Station at 12:30pm",
          "Drop-off is Via Papa Leone X, Amalfi; once bags are down, do the first-look wander",
        ],
      },
      {
        label: "Arrival mode",
        emoji: "🌊",
        ideas: [
          "Find the closest ridiculous sea view and let everyone recalibrate from Rome speed",
          "Keep dinner low-friction: seafood, pasta, lemon anything, view if possible",
          "Home base is Amalfi, not a vague coast situation; pick vibes over perfection and stay flexible",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🍋",
        ideas: [
          "Lemon everything: granita, delizia al limone, limoncello, zero restraint",
          "Scialatielli ai frutti di mare if seafood-pasta mode is calling",
          "Sfogliatella or a Naples-adjacent pastry if the transfer leaves snack damage",
        ],
      },
      {
        label: "Soft quests",
        emoji: "📸",
        ideas: [
          "First coastline photo from somewhere that makes the group chat annoying",
          "Find the route/ferry situation for tomorrow before spritz brain takes over",
          "If energy is low, tonight is a balcony/glass/water-staring night. Valid.",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Roma Termini → Napoli Centrale train",
        url: "https://www.trenitalia.com/en.html",
        note: "Frecciarossa logistics check",
      },
      {
        label: "Amalfi Coast ferry routes",
        url: "https://www.travelmar.it/en/",
        note: "Useful if the coast starts moving by water",
      },
      {
        label: "Amalfi town map",
        url: "https://www.google.com/maps/search/Amalfi+Coast+Amalfi+Italy/",
        note: "Arrival wander / dinner scouting",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Amalfi_Coast_(Italy).jpg",
        imageAlt: "Amalfi Coast view",
      },
      {
        label: "Ravello map",
        url: "https://www.google.com/maps/search/Ravello+Italy/",
        note: "If the crew wants the elegant cliffside detour",
      },
    ],
    sideQuests: [
      "🚂 Make the train. Frecciarossa 8335, Roma Termini 10:20.",
      "🚐 Private transfer pickup at Naples Central Station, 12:30pm.",
      "🍋 Eat or drink something aggressively lemon within one hour of arrival",
    ],
    chaosBonus: "If everyone survives the transfer and still gets a sea-view drink, Amalfi has officially begun.",
  },
  "2026-05-16": {
    isoDate: "2026-05-16",
    headlineOverride: "Ravello Day",
    eyebrow: "Hilltop views day",
    heroTitle: "Ravello Above It All",
    heroSubtitle: "Terraces, gardens, lemon light, and the coast from the balcony seats.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cimbrone_terraza_infinito_01.jpg",
    urgencyLine: "Today is Ravello. Make the uphill move, find the gardens, get the ridiculous views, then drift back to Amalfi for the evening.",
    suggestionSections: [
      {
        label: "Morning move",
        emoji: "☕",
        ideas: [
          "Coffee first, then commit to the Ravello climb/ride before the day gets too loose",
          "Check bus/taxi timing early; hilltop towns reward people who avoid transit roulette",
          "Keep the plan simple: get up there, see the gardens, let the views do the work",
        ],
      },
      {
        label: "Ravello anchors",
        emoji: "🌿",
        ideas: [
          "Villa Cimbrone / Terrace of Infinity if the crew wants the balcony seats",
          "Villa Rufolo for gardens, views, and maximum graceful wandering",
          "Piazza Centrale for a reset drink before deciding how ambitious everyone still feels",
        ],
      },
      {
        label: "View / photo targets",
        emoji: "📸",
        ideas: [
          "Terrace of Infinity shot, because sometimes the famous thing is famous for a reason",
          "Garden arches, cliff edges, and any angle that makes the coastline look fake",
          "One group photo before everyone starts pretending they are too candid for group photos",
        ],
      },
      {
        label: "Evening ease",
        emoji: "🍋",
        ideas: [
          "Drift back to Amalfi before return logistics become the villain",
          "Lemon dessert or limoncello victory lap after the hilltop views",
          "Seafood dinner near home base if Ravello already took the day's effort budget",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Villa Cimbrone / Terrace of Infinity",
        url: "https://www.villacimbrone.com/en/",
        note: "The balcony-seats view",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cimbrone_terraza_infinito_01.jpg",
        imageAlt: "Terrace of Infinity at Villa Cimbrone",
      },
      {
        label: "Ravello map",
        url: "https://www.google.com/maps/search/Ravello+Italy/",
        note: "Hilltop target for today",
      },
      {
        label: "Villa Rufolo",
        url: "https://www.villarufolo.com/",
        note: "Gardens and classic Ravello views",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath:Ravello_Villa_Rufolo_2009.jpg",
        imageAlt: "Villa Rufolo in Ravello",
      },
      {
        label: "Amalfi to Ravello route",
        url: "https://www.google.com/maps/dir/Amalfi,+Italy/Ravello,+Italy/",
        note: "Check bus/taxi/walk options before committing",
      },
    ],
    sideQuests: [
      "🌿 Touch grass in a garden that costs more than your houseplants",
      "📸 Get the Terrace of Infinity shot without dropping a phone into the void",
      "🍋 Lemon dessert or limoncello victory lap",
    ],
    chaosBonus: "If Ravello makes everyone briefly whisper instead of yap, the hill did its job.",
  },
  "2026-05-17": {
    isoDate: "2026-05-17",
    headlineOverride: "Beach Club Day 🌊",
    eyebrow: "Sun / swim / flex day",
    heroTitle: "Beach Club, Then See What Happens",
    heroSubtitle: "Sun, water, drinks, and zero need to pretend this was a productivity challenge.",
    heroImageUrl: amalfiCoastSunset,
    urgencyLine: "Today was beach club day and it ripped. Anything beyond that should read as optional bonus content, not fake commitments.",
    suggestionSections: [
      {
        label: "Core move",
        emoji: "🌊",
        ideas: [
          "Beach club first. Let the coast do the work.",
          "Protect the easy, luxurious part of the day instead of overpacking it.",
          "If the group finds the perfect chair / swim / spritz rhythm, do not interrupt excellence.",
        ],
      },
      {
        label: "Optional add-ons",
        emoji: "⛵",
        ideas: [
          "Positano if the crew wants the glamorous postcard version after the beach club.",
          "Minori / Maiori if everyone wants an easier wander without a whole production.",
          "Ravello if hilltop views sound better than more beach chaos.",
        ],
      },
      {
        label: "Food / drink wins",
        emoji: "🍹",
        ideas: [
          "Beach club lunch, cold drinks, and anything lemon-forward are already enough of a thesis.",
          "Seafood dinner is great if the day leaves room for it, not because the itinerary ordered it.",
          "Dessert should be chosen emotionally, not strategically.",
        ],
      },
      {
        label: "Evening landing",
        emoji: "🌅",
        ideas: [
          "Sunset from wherever requires the least transit drama",
          "Low-key dinner if lunch turned into the main event",
          "Balcony/water-staring decompression is a legitimate itinerary item",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Positano map",
        url: "https://www.google.com/maps/search/Positano+Italy/",
        note: "Postcard-coast wander",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Positano_Amalfi_Coast_Italy.jpg",
        imageAlt: "Positano on the Amalfi Coast",
      },
      {
        label: "Minori map",
        url: "https://www.google.com/maps/search/Minori+Italy/",
        note: "Easier pastry/coast detour",
      },
      {
        label: "Villa Cimbrone / Ravello",
        url: "https://www.villacimbrone.com/en/",
        note: "Terrace of Infinity option",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cimbrone_terraza_infinito_01.jpg",
        imageAlt: "Terrace of Infinity at Villa Cimbrone",
      },
      {
        label: "Amalfi Coast ferry routes",
        url: "https://www.travelmar.it/en/",
        note: "Plan the hop before dinner brain",
      },
    ],
    sideQuests: [
      "🌊 Fully enjoy the beach club without feeling like you need to optimize it",
      "🍹 Have one drink that tastes aggressively like vacation",
      "📸 Get one coast photo that proves today was absurdly good",
    ],
    chaosBonus: "If the beach club day was amazing and nobody rushed it for fake productivity, the day was played correctly.",
  },
  "2026-05-18": {
    isoDate: "2026-05-18",
    headlineOverride: "Capri Day",
    eyebrow: "Island day",
    heroTitle: "Capri Is Happening",
    heroSubtitle: "You made the island move. Now it’s about finishing the day well, not cramming every postcard into one sprint.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Capri_skaly_Faraglione.JPG",
    urgencyLine: "Capri is the day. Best move now is to pick the strongest remaining beat from where you are and work backward from the return ferry without turning transit into the whole story.",
    suggestionSections: [
      {
        label: "Morning anchors",
        emoji: "🚢",
        ideas: [
          "Keep the return ferry time in view; Capri gets annoying when the boat becomes the main character",
          "If Blue Grotto conditions are good and timing is clean, go for it before the queue turns evil",
          "If the grotto is closed or annoying, pivot fast: Anacapri + Monte Solaro is still a huge day",
        ],
      },
      {
        label: "Capri moves",
        emoji: "🏝️",
        ideas: [
          "Marina Grande arrival, then funicular/taxi up before the harbor eats the whole day",
          "Gardens of Augustus for Faraglioni views without requiring a full expedition",
          "Anacapri if the crew wants the slightly calmer, higher-up version of the island",
        ],
      },
      {
        label: "View / photo targets",
        emoji: "📸",
        ideas: [
          "Faraglioni rocks: the obvious shot because sometimes obvious is correct",
          "Monte Solaro if chairlift energy beats boutique wandering",
          "A boat or overlook photo that makes Capri look fake, because Capri kind of is",
        ],
      },
      {
        label: "Food & drink",
        emoji: "🍹",
        ideas: [
          "Aperol or limoncello spritz with a view; price pain is part of the ritual",
          "Caprese salad actually on Capri, because geography demands it",
          "Seafood pasta or a long lunch only if it does not make the ferry your enemy",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Capri ferry options",
        url: "https://www.capri.com/en/ferry-schedule",
        note: "Check same-day timing before committing",
      },
      {
        label: "Blue Grotto info",
        url: "https://www.capri.com/en/s/blue-grotto",
        note: "Sea-condition-dependent brain melter",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Grotta_azzurra.capri.JPG",
        imageAlt: "Blue Grotto in Capri",
      },
      {
        label: "Monte Solaro chairlift",
        url: "https://www.capri.com/en/e/mount-solaro-chairlift",
        note: "Single-seat sky chair chaos",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Anacapri_-_Monte_Solaro_-_panoramio.jpg",
        imageAlt: "Monte Solaro view in Capri",
      },
      {
        label: "Gardens of Augustus map",
        url: "https://www.google.com/maps/search/Gardens+of+Augustus+Capri/",
        note: "Easy Faraglioni overlook",
      },
    ],
    sideQuests: [
      "🚢 Blue Grotto if the sea says yes; graceful pivot if it says absolutely not",
      "📸 Find a view that makes everyone back home insane with jealousy",
      "💅 Aperol Spritz with a view because you are literally on Capri",
    ],
    chaosBonus: "If you make the return ferry with everyone accounted for, Capri did not defeat you.",
  },
  "2026-05-19": {
    isoDate: "2026-05-19",
    headlineOverride: "Florence Arrival",
    eyebrow: "Arrival + culture plays",
    heroTitle: "Florence Has Some Weirdly Strong Options Tonight",
    heroSubtitle: "Get in, drop bags, then pick the kind of brain-melt you actually want: Dante hell-room, Rothko color fields, or a Villa Bardini art-history detour.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Palazzo_strozzi_22.JPG",
    urgencyLine: "Florence arrival. Napoli 12:10 → Firenze SMN 15:11, then Costa dei Magnoli, 19. After that, tonight has real optional culture plays instead of generic wandering.",
    suggestionSections: [
      {
        label: "Hard anchors",
        emoji: "🚆",
        ideas: [
          "Napoli Centrale 12:10 → Firenze SMN 15:11 on Frecciarossa 9422",
          "Check into Costa dei Magnoli, 19",
          "Keep arrival friction low before choosing any evening mission",
        ],
      },
      {
        label: "Strong culture plays",
        emoji: "🎭",
        ideas: [
          "Cattedrale dell'Immagine — INFERNO: immersive Dante in a deconsecrated church near Ponte Vecchio, open until 19:00 with last entry at 18:00",
          "Rothko in Florence at Palazzo Strozzi: 70+ works, big emotional color-field / Renaissance-space connection, open until 20:00",
          "Firenze negli anni di Rothko at Villa Bardini: one-night 18:00 event tied to Florence in Rothko's era, seats first come",
        ],
      },
      {
        label: "Pick by energy",
        emoji: "🧭",
        ideas: [
          "If you want strange and immersive: INFERNO",
          "If you want the most serious art flex: Rothko at Palazzo Strozzi",
          "If timing lines up and you want a one-night-only thing: Villa Bardini at 18:00",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Cattedrale dell'Immagine — INFERNO",
        url: "https://www.cattedraledellimmagine.it/",
        note: "Immersive Dante venue near Ponte Vecchio",
      },
      {
        label: "INFERNO hours / tickets info",
        url: "https://www.cattedraledellimmagine.it/biglietti-e-orari-2/",
        note: "Today: 10:00-19:00, last entry 18:00",
      },
      {
        label: "INFERNO tickets",
        url: "https://cattedraledellimmagine.vivaticket.it/",
        note: "Ticketing via Vivaticket",
      },
      {
        label: "Rothko in Florence",
        url: "https://www.palazzostrozzi.org/en/exhibition/mark-rothko/",
        note: "Palazzo Strozzi, 70+ works, open until 20:00",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Palazzo_strozzi_22.JPG",
        imageAlt: "Palazzo Strozzi in Florence",
      },
      {
        label: "Rothko tickets",
        url: "https://palazzostrozzi.vivaticket.it/",
        note: "Palazzo Strozzi ticketing",
      },
      {
        label: "Firenze negli anni di Rothko",
        url: "https://www.palazzostrozzi.org/evento/firenze-negli-anni-di-rothko/",
        note: "Tonight at 18:00, Villa Bardini",
      },
    ],
    sideQuests: [
      "🚆 Make the Napoli 12:10 train without turning checkout into a war crime",
      "🏡 Check into Costa dei Magnoli, 19",
      "🎭 Pick one Florence culture play if arrival energy allows",
      "🍨 Take one first-night Florence gelato walk after the serious stuff",
    ],
    chaosBonus: "If Florence casually offers Dante's Inferno, Rothko, and a Villa Bardini side quest on arrival night, the city is already showing off.",
  },
  "2026-05-20": {
    isoDate: "2026-05-20",
    urgencyLine: "Art and sunset day. One museum is plenty; the rest can stay loose.",
    sideQuests: [
      "🎨 Accademia (David) or Uffizi — pick one and let that be enough",
      "🌅 Piazzale Michelangelo sunset if the day still has legs",
      "🍽️ Oltrarno dinner or any place that feels obviously right",
    ],
  },
  "2026-05-21": {
    isoDate: "2026-05-21",
    urgencyLine: "Rental car day. Pickup is Via Maso Finiguerra 31 R near Firenze SMN, then onward to Castelmuzio.",
    sideQuests: [
      "🚗 Rental car pickup at Via Maso Finiguerra 31 R",
      "🏡 Get to Castelmuzio and settle in without overbooking the first night",
      "🌄 Sunset over the hills is literally a screensaver",
    ],
  },
  "2026-05-22": {
    isoDate: "2026-05-22",
    headlineOverride: "Wine Tasting Day 🍷",
    eyebrow: "Val d'Orcia wine country",
    heroTitle: "Wine Country, Properly",
    heroSubtitle: "Vino Nobile, Tuscan food logic, and one very specific pizza bit on the side.",
    heroImageUrl: "/tuscany/pienza-hills.jpg",
    urgencyLine: "Today is wine tasting day. Let the tasting do the teaching: grape, hill, aging, food pairing, and why this part of Tuscany tastes like this. Bitcoin Pizza Day stays a tiny side quest.",
    suggestionSections: [
      {
        label: "Region lens",
        emoji: "🧭",
        ideas: [
          "Val d'Orcia is the UNESCO postcard version of Tuscany: cypress lines, clay hills, wheat fields, and towns built to look good from a distance",
          "Montepulciano is the wine/history anchor: Vino Nobile, steep stone lanes, and a town built around patience",
          "The useful tasting question: what does this wine do with Tuscan food that it would not do alone?",
        ],
      },
      {
        label: "Tasting lens",
        emoji: "🍷",
        ideas: [
          "Vino Nobile di Montepulciano is mostly Sangiovese here, traditionally called Prugnolo Gentile",
          "Notice the difference between fruit, earth, tannin, and oak instead of trying to sound like a sommelier",
          "If there is a cellar or vineyard view, ask what changed between the old way and the current way",
        ],
      },
      {
        label: "Food / culture notes",
        emoji: "🍝",
        ideas: [
          "Pecorino di Pienza is the local cheese thread; it belongs next to honey, pear, or whatever the server insists on",
          "Pici is the local pasta shape: thick, hand-rolled, usually better with simple sauce than fancy theater",
          "Pizza is not the regional star here, which makes the Bitcoin Pizza Day tribute funnier and more specific",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Val d'Orcia UNESCO",
        url: "https://whc.unesco.org/en/list/1026/",
        note: "Why this landscape looks intentionally cinematic",
        imageUrl: "/tuscany/pienza-hills.jpg",
        imageAlt: "Rolling hills in Val d'Orcia",
      },
      {
        label: "Pienza overview",
        url: "https://www.visittuscany.com/en/towns-and-villages/pienza/",
        note: "Renaissance ideal-city context",
      },
      {
        label: "Montepulciano",
        url: "https://www.visittuscany.com/en/towns-and-villages/montepulciano/",
        note: "Hill town + Vino Nobile primer",
      },
      {
        label: "Bagno Vignoni",
        url: "https://www.visittuscany.com/en/towns-and-villages/bagno-vignoni/",
        note: "Thermal-pool piazza curiosity",
      },
    ],
    sideQuests: [
      "🍷 Learn one specific thing about the wine you're tasting",
      "🧀 Pair something local with the wine: pecorino, pici, salumi, or whatever the table demands",
      "🍕 Bitcoin Pizza Day tribute: split a pizza somewhere the girls will tolerate",
    ],
    chaosBonus: "If the pizza costs less than 10,000 BTC, you are technically outperforming history.",
  },
  "2026-05-23": {
    isoDate: "2026-05-23",
    headlineOverride: "Vespa Day 🛵",
    eyebrow: "Pienza / hill-town roads",
    heroTitle: "Vespa Through Tuscany",
    heroSubtitle: "Hill-town roads, Renaissance geometry, clay hills, and the slowest possible version of speed.",
    heroImageUrl: "/tuscany/crete-senesi.jpg",
    urgencyLine: "Tomorrow is Vespa day. Keep the inspiration regional: Pienza's ideal-city bones, Val d'Orcia roads, Crete Senesi clay hills, and one good stop rather than a checklist.",
    suggestionSections: [
      {
        label: "Region lens",
        emoji: "🧭",
        ideas: [
          "Pienza was rebuilt by Pope Pius II as a Renaissance 'ideal city,' which is why the tiny center feels unusually composed",
          "Val d'Orcia roads are the classic cypress-and-hill visual language; the point is the space between towns, not only the towns",
          "The Crete Senesi are Tuscany's clay hills: softer, stranger, and more moonlike than the postcard version",
        ],
      },
      {
        label: "Vespa lens",
        emoji: "🛵",
        ideas: [
          "The win is not distance; it is moving slowly enough that the landscape becomes the activity",
          "Pienza plus one nearby stop is stronger than turning the ride into a scavenger hunt",
          "Bagno Vignoni is a good curiosity stop if the route wants a weird little hook: the main square is a thermal pool",
        ],
      },
      {
        label: "Food / stop ideas",
        emoji: "🍝",
        ideas: [
          "Pecorino di Pienza is the obvious local bite; it is worth tasting where it actually belongs",
          "Pici is the local pasta shape: thick, hand-rolled, and usually best when the sauce stays simple",
          "Best version of the day is probably simple: road, view, one town, pasta, no spreadsheet",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Crete Senesi",
        url: "https://www.visittuscany.com/en/areas/crete-senesi/",
        note: "Clay hills and lunar-landscape context",
        imageUrl: "/tuscany/crete-senesi.jpg",
        imageAlt: "Clay hills in the Crete Senesi",
      },
      {
        label: "Montalcino",
        url: "https://www.visittuscany.com/en/towns-and-villages/montalcino/",
        note: "Brunello town and fortress views",
      },
      {
        label: "Abbey of Sant'Antimo",
        url: "https://www.antimo.it/en/",
        note: "Quiet Romanesque abbey near Montalcino",
        imageUrl: "/tuscany/sant-antimo.jpg",
        imageAlt: "Abbey of Sant'Antimo in Tuscany",
      },
      {
        label: "San Quirico d'Orcia",
        url: "https://www.visittuscany.com/en/towns-and-villages/san-quirico-dorcia/",
        note: "Small-town walk + classic Val d'Orcia roads",
      },
    ],
    sideQuests: [
      "🛵 Vespa through Pienza / Val d'Orcia if weather and confidence make it fun",
      "🏘️ Learn one tiny thing about Pienza or whichever town you actually stop in",
      "📸 Get one road/view photo that feels impossible to recreate at home",
    ],
  },
  "2026-05-24": {
    isoDate: "2026-05-24",
    urgencyLine: "Cinque Terre arrival. Drive Tuscany → Monterosso, parking confirmed, then Via Roma 33.",
    sideQuests: [
      "🚗 Drive to Monterosso al Mare — about 2.5–3 hours",
      "🅿️ Parking is confirmed at the accommodation",
      "🏡 Check into Via Roma 33",
      "🌊 First look at the five villages: breathe it in",
    ],
  },
  "2026-05-25": {
    isoDate: "2026-05-25",
    urgencyLine: "Village-hop day. Manarola sunset is a strong candidate, not a courtroom order.",
    sideQuests: [
      "🚉 Train through as many villages as actually sounds fun",
      "🌅 Manarola sunset if it still feels like the clear winner later",
      "🦞 Fresh seafood dinner with the whole crew",
    ],
  },
  "2026-05-26": {
    isoDate: "2026-05-26",
    urgencyLine: "Venice transfer day. Car return + trains are the hard commitments; once you land, keep the evening easy around the 8:20pm gondola.",
    suggestionSections: [
      {
        label: "Low-effort Venice wins",
        emoji: "🛶",
        ideas: [
          "Let the first Venice walk be a wander, not a mission; the city works best when you get mildly lost",
          "Cicchetti plus a spritz near the hotel is the ideal arrival-night difficulty setting",
          "If energy is low, save the ambitious sightseeing and just make the gondola the moment",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Rialto Market",
        url: "https://www.veneziaunica.it/en/content/rialto-market",
        note: "Classic morning-market wander if Venice gives you a little extra time",
      },
      {
        label: "Cicchetti guide",
        url: "https://www.visitvenezia.eu/en/venetianity/taste-veneto/venetian-cicchetti",
        note: "Tiny bar snacks, small glasses, zero need to over-plan dinner",
      },
    ],
    sideQuests: [
      "🚗 Return the rental car in La Spezia",
      "🚆 La Spezia Centrale 12:35 → Firenze SMN 15:08, Regional 18413, PNR JU7ZC5",
      "🚆 Firenze SMN → Venezia Santa Lucia second train — details TBD",
      "🏨 Check into Canal Grande",
      "🥂 Cicchetti crawl if there is still appetite for one more adventure",
      "🚣 8:20pm gondola ride — the actual anchor tonight",
    ],
    chaosBonus: "Final Italian dinner with Prosecco. Make a toast. Make it good.",
  },
  "2026-05-27": {
    isoDate: "2026-05-27",
    urgencyLine: "Departure day. Last morning in Venice. Soak it up before real life resumes.",
    suggestionSections: [
      {
        label: "Last-morning Venice",
        emoji: "☕",
        ideas: [
          "Do one tiny canal loop before checkout; Venice rewards the ten-minute detour",
          "Grab coffee somewhere with standing-room energy instead of turning breakfast into an ordeal",
          "If there is one final postcard moment, make it a bridge view or vaporetto glance, not a rushed museum",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Grand Canal",
        url: "https://www.veneziaunica.it/en/content/grand-canal",
        note: "The obvious goodbye view, and still the correct one",
      },
      {
        label: "Santa Lucia station",
        url: "https://www.veneziaunica.it/en/content/venice-santa-lucia-railway-station",
        note: "Departure logistics without killing the mood",
      },
    ],
    sideQuests: [
      "☕ One last proper Italian coffee",
      "📦 Repack your bag with all the things you bought",
      "💭 Start mentally planning the return trip",
    ],
  },
};
