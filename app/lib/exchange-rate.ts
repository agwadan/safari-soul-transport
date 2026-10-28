import { cacheLife } from "next/cache";

const EXCHANGE_RATE_URL = "https://open.er-api.com/v6/latest/KES";

type OpenErApiResponse = {
  result?: string;
  rates?: {
    USD?: number;
  };
};

export async function getKesToUsdRate(): Promise<number | null> {
  "use cache";

  try {
    const response = await fetch(EXCHANGE_RATE_URL);

    if (!response.ok) {
      cacheLife("seconds");
      return null;
    }

    const data = (await response.json()) as OpenErApiResponse;
    const rate = data.rates?.USD;

    if (data.result !== "success" || typeof rate !== "number" || rate <= 0) {
      cacheLife("seconds");
      return null;
    }

    cacheLife("days");
    return rate;
  } catch {
    cacheLife("seconds");
    return null;
  }
}
