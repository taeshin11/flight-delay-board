import type { MetadataRoute } from "next";
import { getAllAirports, getAllAirlines } from "@/lib/data";

const BASE_URL = "https://flight-delay-board.vercel.app";
const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const airports = getAllAirports();
  const airlines = getAllAirlines();

  const staticPages = locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${locale}/airports`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/airlines`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${locale}/routes`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${locale}/best-time`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  const airportPages = airports.flatMap((airport) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/airports/${airport.code.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  const airlinePages = airlines.flatMap((airline) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/airlines/${airline.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...airportPages, ...airlinePages];
}
