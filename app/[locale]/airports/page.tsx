import { getTranslations } from "next-intl/server";
import { getAllAirports } from "@/lib/data";
import AirportTable from "@/components/AirportTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All US Airports — On-Time Performance Rankings | FlightDelayBoard",
  description:
    "Compare on-time performance, average delays, and cancellation rates for all major US airports. Sortable rankings by on-time rate.",
};

export default async function AirportsPage() {
  const t = await getTranslations();
  const airports = getAllAirports();

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Header */}
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">All US Airports</h1>
          <p className="text-sky-200">
            On-time performance rankings for {airports.length} major US airports
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-600">
              {airports.filter((a) => a.onTimeRate >= 85).length}
            </p>
            <p className="text-sm text-sky-400 mt-1">Excellent (&gt;85%)</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600">
              {airports.filter((a) => a.onTimeRate >= 75 && a.onTimeRate < 85).length}
            </p>
            <p className="text-sm text-sky-400 mt-1">Good (75-85%)</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-rose-600">
              {airports.filter((a) => a.onTimeRate < 75).length}
            </p>
            <p className="text-sm text-sky-400 mt-1">Poor (&lt;75%)</p>
          </div>
        </div>

        <AirportTable airports={airports} showRank={true} />
      </div>
    </div>
  );
}
