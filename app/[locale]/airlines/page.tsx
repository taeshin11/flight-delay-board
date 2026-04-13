import { getAllAirlines } from "@/lib/data";
import AirlineCard from "@/components/AirlineCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airline On-Time Performance Rankings | FlightDelayBoard",
  description:
    "Compare on-time rates, average delays, and cancellation rates for 15 major US airlines. Find the most reliable airline for your next trip.",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AirlinesPage({ params }: Props) {
  const { locale } = await params;
  const airlines = getAllAirlines().sort((a, b) => b.onTimeRate - a.onTimeRate);

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">US Airlines On-Time Performance</h1>
          <p className="text-sky-200">
            Rankings for {airlines.length} US airlines based on 2024 BTS data
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {airlines.map((airline, i) => (
            <AirlineCard key={airline.slug} airline={airline} locale={locale} rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
