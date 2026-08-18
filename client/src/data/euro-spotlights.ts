export interface EuroSpotlight {
  release: string;
  city: string;
  title: string;
  icon: string;
  copy: string;
}

export const euroSpotlights: EuroSpotlight[] = [
  {
    release: "2026-08-17",
    city: "London",
    title: "London Doesn't Do Jet Lag",
    icon: "🇬🇧",
    copy: "London gets the opening scene: fashion-district damage in daylight, a long dinner, and a night that ends when Fari and Storm say it does. Keep the route tight—one strong backdrop, one outfit-worthy table, then rooftop drinks into dancing.",
  },
  {
    release: "2026-08-18",
    city: "Florence",
    title: "Leather, Wine, Rooftop, Repeat",
    icon: "🌇",
    copy: "Florence gives its best light in one short window, and the rooftops already claimed it. Shop leather before dinner, catch the Arno or Piazzale Michelangelo at golden hour, then trade the camera for terrace wine and a piazza walk.",
  },
  {
    release: "2026-08-19",
    city: "Positano",
    title: "Positano Charges Extra. Here's Why.",
    icon: "🍋",
    copy: "Positano is the expensive answer, and it earns it: beach-club theater, Capri access, stronger nightlife, and a village that photographs like a set. Pay for the view and easy ferry access—not just the postcode—because those stairs charge interest.",
  },
  {
    release: "2026-08-20",
    city: "Amalfi",
    title: "The Coast Base That Does the Math",
    icon: "⛵",
    copy: "Amalfi is the girl-boss logistics pick: easier through Salerno, ferries in every direction, and Ravello sitting right above it. Use the smoother base to fund the boat day, then accept quieter nights as the tax for easier movement.",
  },
  {
    release: "2026-08-21",
    city: "Cinque Terre",
    title: "Soft Life, Loud Colors, Quiet Nights",
    icon: "🎨",
    copy: "Cinque Terre is soft life in loud colors: five villages, swim-to-sunset days, and the easiest coastal move from Florence. Base in Monterosso for the beach, then village-hop by train or boat—just know the nightlife stays romantic, not feral.",
  },
  {
    release: "2026-08-22",
    city: "Rome",
    title: "The Lizzie McGuire Finale",
    icon: "🏛️",
    copy: "Rome gets one night to close the whole movie: dinner, an outfit-worthy walk, and Trevi before the crowd turns it into combat. Stay near the fountain or Spanish Steps, take the sunrise Lizzie McGuire moment, then leave for the airport without chaos.",
  },
];

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
