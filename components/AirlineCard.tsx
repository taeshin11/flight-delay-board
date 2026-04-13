import Link from "next/link";
import { Plane } from "lucide-react";
import type { Airline } from "@/lib/types";
import { getOnTimeColor, getStatusColor } from "@/lib/types";

interface Props {
  airline: Airline;
  locale: string;
  rank?: number;
}

export default function AirlineCard({ airline, locale, rank }: Props) {
  return (
    <div className="bg-white rounded-xl border border-sky-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {rank && (
            <span className="text-sky-300 font-mono text-sm">#{rank}</span>
          )}
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
            <Plane className="w-5 h-5 text-[#0ea5e9]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0c2340]">{airline.name}</h3>
            <span className="text-xs text-sky-400 font-mono">{airline.code}</span>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(airline.onTimeRate)}`}
        >
          {airline.onTimeRate >= 85 ? "Excellent" : airline.onTimeRate >= 75 ? "Good" : "Fair"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <p className={`text-xl font-bold ${getOnTimeColor(airline.onTimeRate)}`}>
            {airline.onTimeRate}%
          </p>
          <p className="text-xs text-sky-400">On-Time</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-[#0c2340]">{airline.avgDelayMin}</p>
          <p className="text-xs text-sky-400">Avg Delay (min)</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-[#0c2340]">{airline.cancelRate}%</p>
          <p className="text-xs text-sky-400">Cancel Rate</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-sky-400 mb-1">Hub Airports</p>
        <div className="flex flex-wrap gap-1">
          {airline.hubs.slice(0, 4).map((hub) => (
            <span key={hub} className="text-xs bg-sky-50 text-[#0c2340] px-2 py-0.5 rounded font-mono">
              {hub}
            </span>
          ))}
          {airline.hubs.length > 4 && (
            <span className="text-xs text-sky-400">+{airline.hubs.length - 4}</span>
          )}
        </div>
      </div>

      {/* On-time bar */}
      <div className="mb-4">
        <div className="w-full bg-sky-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              airline.onTimeRate >= 85 ? "bg-emerald-500" : airline.onTimeRate >= 75 ? "bg-amber-500" : "bg-rose-500"
            }`}
            style={{ width: `${airline.onTimeRate}%` }}
          />
        </div>
      </div>

      <Link
        href={`/${locale}/airlines/${airline.slug}`}
        className="block text-center text-sm font-medium text-[#0ea5e9] hover:underline"
      >
        View Performance Details
      </Link>
    </div>
  );
}
