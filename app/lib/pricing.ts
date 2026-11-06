import { fleet } from "../components/data/fleet";
import type { TripDetails } from "../components/data/booking";

export const INCLUDED_METERS = 40_000;
export const BLOCK_METERS = 5_000;
export const PRICING_VERSION = 1;

export type RouteLeg = { distanceMeters: number; durationSeconds: number };
export type VehicleFare = {
  vehicleId: string;
  baseKes: number;
  extraBlockKes: number;
  extraBlocks: number[];
  legTotalsKes: number[];
  totalKes: number;
};
export type Quote = {
  version: number;
  expiresAt: number;
  trip: TripDetails;
  legs: RouteLeg[];
  fares: VehicleFare[];
};
export type QuoteResponse = Quote & { token: string };

export function extraBlocks(distanceMeters: number): number {
  if (!Number.isSafeInteger(distanceMeters) || distanceMeters <= 0) {
    throw new Error("Invalid driving distance");
  }
  return Math.ceil(Math.max(0, distanceMeters - INCLUDED_METERS) / BLOCK_METERS);
}

export function calculateFares(legs: RouteLeg[]): VehicleFare[] {
  if (legs.length < 1 || legs.length > 2) throw new Error("Invalid number of legs");
  const blocks = legs.map((leg) => extraBlocks(leg.distanceMeters));
  return fleet.map((vehicle) => {
    const legTotalsKes = blocks.map((count) => vehicle.priceKes + count * vehicle.extraBlockKes);
    return {
      vehicleId: vehicle.id, baseKes: vehicle.priceKes, extraBlockKes: vehicle.extraBlockKes,
      extraBlocks: blocks, legTotalsKes,
      totalKes: legTotalsKes.reduce((sum, value) => sum + value, 0),
    };
  });
}

// Display all metre precision so a distance just beyond a block boundary is clear.
export const formatDistance = (meters: number) => `${(meters / 1000).toLocaleString("en-KE", { maximumFractionDigits: 3 })} km`;
export const formatDuration = (seconds: number) => {
  const minutes = Math.ceil(seconds / 60);
  return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
};
