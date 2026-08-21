export interface TripStop {
  city: string;
  icon: string;
  start: string;
  end: string;
  dates: string;
  status: string;
  copy: string;
}

export const tripStart = "2026-08-19";
export const tripEnd = "2026-08-31";

export const tripStops: TripStop[] = [
  {
    city: "London",
    icon: "🇬🇧",
    start: "2026-08-19",
    end: "2026-08-22",
    dates: "Aug 19–22",
    status: "Opening act",
    copy: "Red-eye arrival, fashion-district damage, long dinners, and the nights that set the tone.",
  },
  {
    city: "Florence",
    icon: "🇮🇹",
    start: "2026-08-22",
    end: "2026-08-25",
    dates: "Aug 22–25",
    status: "Renaissance era",
    copy: "Leather workshops, rooftop light, Piazzale Michelangelo golden hour, and unhurried wine.",
  },
  {
    city: "Amalfi",
    icon: "🍋",
    start: "2026-08-25",
    end: "2026-08-27",
    dates: "Aug 25–27",
    status: "Coast base one",
    copy: "Two nights on the easier base: Ravello above, ferries in every direction, calmer evenings.",
  },
  {
    city: "Positano",
    icon: "🛥️",
    start: "2026-08-27",
    end: "2026-08-30",
    dates: "Aug 27–30",
    status: "Peak baddie era",
    copy: "Three nights of beach clubs, boat days, cave-club weekend, and the loudest possible skyline.",
  },
  {
    city: "Rome",
    icon: "🏛️",
    start: "2026-08-30",
    end: "2026-08-31",
    dates: "Aug 30–31",
    status: "Finale + flight",
    copy: "One night near Trevi, a sunrise fountain moment, then a mid-afternoon flight home.",
  },
];

export type TripPhase = "before" | "during" | "after";

export interface TripStatus {
  phase: TripPhase;
  dayNumber: number;
  totalDays: number;
  daysUntilStart: number;
  current: TripStop | null;
  next: TripStop | null;
}

function toUtcDays(key: string): number {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

export function daysBetween(from: string, to: string): number {
  return toUtcDays(to) - toUtcDays(from);
}

export function getTripStatus(today: string): TripStatus {
  const totalDays = daysBetween(tripStart, tripEnd) + 1;
  const daysUntilStart = daysBetween(today, tripStart);

  if (daysUntilStart > 0) {
    return {
      phase: "before",
      dayNumber: 0,
      totalDays,
      daysUntilStart,
      current: null,
      next: tripStops[0],
    };
  }

  if (daysBetween(today, tripEnd) < 0) {
    return { phase: "after", dayNumber: totalDays, totalDays, daysUntilStart: 0, current: null, next: null };
  }

  const index = tripStops.findIndex((stop, position) =>
    position === tripStops.length - 1
      ? daysBetween(stop.start, today) >= 0
      : daysBetween(stop.start, today) >= 0 && daysBetween(today, stop.end) > 0,
  );
  const current = index === -1 ? null : tripStops[index];

  return {
    phase: "during",
    dayNumber: daysBetween(tripStart, today) + 1,
    totalDays,
    daysUntilStart: 0,
    current,
    next: index === -1 || index === tripStops.length - 1 ? null : tripStops[index + 1],
  };
}
