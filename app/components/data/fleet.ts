export type Vehicle = {
  id: string;
  tier: string;
  name: string;
  model: string;
  image: string;
  specs: { icon: string; text: string }[];
  maxPassengers: number;
  maxSuitcases: number;
  priceKes: number;
  priceUsd: number;
  isPopular: boolean;
};

export const fleet: Vehicle[] = [
  {
    id: "mazda-3",
    tier: "Economy / Standard",
    name: "Mazda 3 Sedan",
    model: "Mazda 3 Sedan",
    image:
      "/images/fleet/axela.png",
    specs: [
      { icon: "person", text: "3 Pax" },
      { icon: "luggage", text: "2 Bags" },
      { icon: "wifi", text: "Free" },
    ],
    maxPassengers: 3,
    maxSuitcases: 2,
    priceKes: 3500,
    priceUsd: 25,
    isPopular: false,
  },
  {
    id: "vw-arteon",
    tier: "Luxury",
    name: "Volkswagen Arteon",
    model: "Volkswagen Arteon",
    image:
      "/images/fleet/arteon.jpg",
    specs: [
      { icon: "person", text: "2 Pax" },
      { icon: "luggage", text: "2 Bags" },
      { icon: "wifi", text: "Free" },
    ],
    maxPassengers: 2,
    maxSuitcases: 2,
    priceKes: 10000,
    priceUsd: 75,
    isPopular: false,
  },
  {
    id: "toyota-noah",
    tier: "Family / Group",
    name: "Toyota Noah",
    model: "Toyota Noah MPV",
    image:
      "/images/fleet/toyota-noah.jpg",
    specs: [
      { icon: "group", text: "6 Pax" },
      { icon: "luggage", text: "4 Bags" },
      { icon: "ac_unit", text: "Climate" },
    ],
    maxPassengers: 6,
    maxSuitcases: 4,
    priceKes: 7000,
    priceUsd: 55,
    isPopular: true,
  },
  {
    id: "coaster-bus",
    tier: "Large Group",
    name: "Coaster Bus",
    model: "Toyota Coaster Executive",
    image:
      "/images/fleet/coaster_2.png",
    specs: [
      { icon: "groups", text: "22-28 Pax" },
      { icon: "luggage", text: "Large Capacity" },
      { icon: "airline_seat_recline_extra", text: "Recliner" },
    ],
    maxPassengers: 28,
    maxSuitcases: 20,
    priceKes: 18000,
    priceUsd: 140,
    isPopular: false,
  },
];

export const formatKes = (n: number) => `KES ${n.toLocaleString("en-US")}`;
export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function convertKesToUsd(
  amountKes: number,
  rate: number | null,
  fallbackUsd: number,
) {
  if (rate && Number.isFinite(rate) && rate > 0) {
    return Math.round(amountKes * rate);
  }

  return fallbackUsd;
}