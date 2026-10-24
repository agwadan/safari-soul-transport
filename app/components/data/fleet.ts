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
    id: "sedan",
    tier: "Standard",
    name: "Executive Sedan",
    model: "Toyota Crown, Camry or equivalent",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-hiYpUHQn35NllPMXtDGbEsVaLS7H5S05jdxloGT2_ggbgqZqlj7BbTownovJmLPevvu1Hb_o4dL96Vz7_gpCPd1JG00vyXUOiyfeK3zC8QAwfAbO--0WWAdmDhd9dydyS8Zo6hmxxiW6nrnAfq23QQJ1p9XAj3eDKJupuVIDQu-DkwKaVM6f03L0zyZleIRX_bzKi0LQSj-xYG6Etsa-stLmULpEP2Bk2DYLFPUShbDKHQjiYtU3",
    specs: [
      { icon: "person", text: "3 Pax" },
      { icon: "luggage", text: "2 Bags" },
      { icon: "wifi", text: "Free" },
    ],
    maxPassengers: 3,
    maxSuitcases: 2,
    priceKes: 4500,
    priceUsd: 35,
    isPopular: false,
  },
  {
    id: "comfort",
    tier: "Executive",
    name: "Executive Comfort",
    model: "Mercedes E-Class, Land Cruiser Prado",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAa8KsGXY7da23e2gL-1-VRfFwPnnygq-8LJ4GTaxkcxf1T78x5XMGYpHVfEUn1Pdohr5BR7D1-v-tKU0FU3MKK8X1AO0VJDwiK3ayiRaVQw0nE15TFwAyq8flw31kl7ORYWpPcs6dndsRJtEm1lyFhDfE4pT9EAXoNkkTrR9z1l6sJABr5HKDoQwmwLzFmRomznqY_BgzwFoscEx7wNuD_VjqVnkTYthDWz0K_2N88QdGoHtfFNyPB",
    specs: [
      { icon: "person", text: "3 Pax" },
      { icon: "luggage", text: "3 Bags" },
      { icon: "water_drop", text: "Bottled" },
    ],
    maxPassengers: 3,
    maxSuitcases: 3,
    priceKes: 8500,
    priceUsd: 65,
    isPopular: true,
  },
  {
    id: "first-class",
    tier: "First Class",
    name: "First Class Chauffeur",
    model: "Mercedes S-Class, Land Cruiser V8 / LC300",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUgmOEnhfIqIGDoMNapjpWFnq_tQtfpdbWsbeQke0JK4ANk-UkZIcx5sqjZPTRVnmgIAJelUynFxGsvDgmeZuHB1lJGF362_bUI-IRO2xeUxj4lzzm4Efzxm17uozWiCttXpSBGjsaF_0SauI0eAoR5704_PZIKYCUxlb9bS6-a8-mISJRwx1HqP9IDdjkYJADPg4cb6jEJh8R2IKcG2v4ADCYbQiX-AyakHP40P8SNYb5E5U6Q-Ef",
    specs: [
      { icon: "person", text: "3 Pax" },
      { icon: "luggage", text: "3 Bags" },
      { icon: "airline_seat_recline_extra", text: "Nappa" },
    ],
    maxPassengers: 3,
    maxSuitcases: 3,
    priceKes: 15000,
    priceUsd: 115,
    isPopular: false,
  },
  {
    id: "mpv",
    tier: "VIP MPV & Van",
    name: "Executive MPV",
    model: "Toyota Alphard Lounge, Mercedes V-Class",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZpFvcmbEQN3uxahP3j6Zn4FQrHVhPt9ClgGRtFowzZFthrR_5MXFZo0nJ02ecRrQYRhjdVw69SzOeSvCJIPxtVUV_7hkVmtajNpO8aGhxJOhrlhLqKSNlRpuhHVKcfBr3AdSGwtIkvtflz2uFuyk0W_JC4kTL3nT9yNYp7xyiwcWPblOukQes1ULawpVQv9I0jRQN60y-tAYDFbPgwgF6Olj_a51guSsjGDHwTaUZz4x9-z6GStf4",
    specs: [
      { icon: "group", text: "6-7 Pax" },
      { icon: "luggage", text: "6 Bags" },
      { icon: "meeting_room", text: "Tables" },
    ],
    maxPassengers: 7,
    maxSuitcases: 6,
    priceKes: 12000,
    priceUsd: 90,
    isPopular: false,
  },
];

export const formatKes = (n: number) => `KES ${n.toLocaleString("en-US")}`;