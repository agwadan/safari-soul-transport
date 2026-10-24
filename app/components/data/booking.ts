export type Counts = {
  passengers: number;
  suitcases: number;
  handbags: number;
};

export type TripType = "one-way" | "return";

export type TripDetails = {
  tripType: TripType;
  pickup: string;
  destination: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  returnDate: string; // only used when tripType === "return"
  returnTime: string;
  flight: string;
};

// Collected in the confirmation step
export type Contact = {
  name: string;
  phone: string;
  email: string;
  airline: string;
  notes: string;
};

export const DEFAULT_TRIP: TripDetails = {
  tripType: "one-way",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  returnDate: "",
  returnTime: "",
  flight: "",
};

export const DEFAULT_COUNTS: Counts = {
  passengers: 2,
  suitcases: 2,
  handbags: 1,
};

// A return trip is priced as two legs. Change this one function if you offer a
// return discount (e.g. return Math.round(price * 1.8) for 10% off).
export const legsFor = (trip: Pick<TripDetails, "tripType">) =>
  trip.tripType === "return" ? 2 : 1;

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