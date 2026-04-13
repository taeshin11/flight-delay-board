import airportsFallback from "@/data/airports-fallback.json";
import airlinesFallback from "@/data/airlines-fallback.json";
import type { Airport, Airline } from "./types";

export function getAllAirports(): Airport[] {
  return airportsFallback as Airport[];
}

export function getAirportByCode(code: string): Airport | undefined {
  return (airportsFallback as Airport[]).find(
    (a) => a.code.toLowerCase() === code.toLowerCase()
  );
}

export function getAllAirlines(): Airline[] {
  return airlinesFallback as Airline[];
}

export function getAirlineBySlug(slug: string): Airline | undefined {
  return (airlinesFallback as Airline[]).find((a) => a.slug === slug);
}

export function getTopAirportsByOnTimeRate(limit = 10): Airport[] {
  return [...(airportsFallback as Airport[])]
    .sort((a, b) => b.onTimeRate - a.onTimeRate)
    .slice(0, limit);
}

export function getAirlinesSortedByOnTimeRate(): Airline[] {
  return [...(airlinesFallback as Airline[])].sort(
    (a, b) => b.onTimeRate - a.onTimeRate
  );
}

// Generate mock monthly trend data for an airport
export function getMonthlyTrend(baseRate: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => ({
    month,
    onTimeRate: Math.max(60, Math.min(98, baseRate + (Math.random() - 0.5) * 12)),
  }));
}

// Generate hourly delay data
export function getHourlyDelayData(avgDelay: number, bestHour: number, worstHour: number) {
  return Array.from({ length: 24 }, (_, hour) => {
    let delay = avgDelay;
    const distFromBest = Math.abs(hour - bestHour);
    const distFromWorst = Math.abs(hour - worstHour);
    delay = avgDelay * (1 + (distFromBest / 12) * 0.5 - (distFromWorst / 12) * 0.3);
    delay = Math.max(5, Math.min(avgDelay * 2, delay));
    return { hour, delay: Math.round(delay) };
  });
}

// Mock busiest routes
export const busiestRoutes = [
  { origin: "LAX", dest: "JFK", onTimeRate: 76.2, avgDelay: 28, airlines: ["Delta", "JetBlue", "American"] },
  { origin: "ATL", dest: "LAX", onTimeRate: 81.4, avgDelay: 20, airlines: ["Delta", "Southwest"] },
  { origin: "ORD", dest: "LAX", onTimeRate: 73.8, avgDelay: 31, airlines: ["United", "American"] },
  { origin: "DFW", dest: "LAX", onTimeRate: 79.6, avgDelay: 22, airlines: ["American", "Spirit"] },
  { origin: "LAX", dest: "SFO", onTimeRate: 78.1, avgDelay: 24, airlines: ["United", "Alaska", "Southwest"] },
  { origin: "JFK", dest: "MIA", onTimeRate: 77.3, avgDelay: 25, airlines: ["American", "JetBlue"] },
  { origin: "ORD", dest: "ATL", onTimeRate: 75.9, avgDelay: 27, airlines: ["Delta", "United", "American"] },
  { origin: "DEN", dest: "LAX", onTimeRate: 82.3, avgDelay: 18, airlines: ["United", "Southwest", "Frontier"] },
  { origin: "SEA", dest: "LAX", onTimeRate: 80.7, avgDelay: 20, airlines: ["Alaska", "Southwest", "Delta"] },
  { origin: "ATL", dest: "MCO", onTimeRate: 84.2, avgDelay: 16, airlines: ["Delta", "Southwest", "Spirit"] },
  { origin: "LAX", dest: "LAS", onTimeRate: 85.1, avgDelay: 14, airlines: ["Southwest", "Spirit", "Frontier"] },
  { origin: "BOS", dest: "MIA", onTimeRate: 78.6, avgDelay: 23, airlines: ["American", "JetBlue", "Spirit"] },
];
