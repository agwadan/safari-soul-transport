export type Counts = {
  passengers: number;
  suitcases: number;
  handbags: number;
};

export type TripDetails = {
  pickup: string;
  destination: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  flight: string;
};

export const DEFAULT_TRIP: TripDetails = {
  pickup: "Jomo Kenyatta Int'l Airport (JKIA) - Terminal 1A/1E",
  destination: "",
  date: "",
  time: "",
  flight: "",
};

export const DEFAULT_COUNTS: Counts = {
  passengers: 2,
  suitcases: 2,
  handbags: 1,
};

export const plural = (n: number, word: string) =>
  `${n} ${word}${n === 1 ? "" : "s"}`;

export function formatDate(date: string) {
  return new Date(`${date}T00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}