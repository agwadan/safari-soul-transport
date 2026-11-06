import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://airport.safarisoul.africa";

  return ["/", "/contact", "/privacy-policy", "/terms-of-service"].map(
    (path) => ({ url: new URL(path, baseUrl).href }),
  );
}
