"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { Airport } from "@/lib/types";
import { getOnTimeColor } from "@/lib/types";

type SortKey = "onTimeRate" | "avgDelayMin" | "cancelRate" | "code";

interface Props {
  airports: Airport[];
  showRank?: boolean;
}

export default function AirportTable({ airports, showRank = true }: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [sortKey, setSortKey] = useState<SortKey>("onTimeRate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("all");

  const states = Array.from(new Set(airports.map((a) => a.state))).sort();

  const sorted = [...airports]
    .filter((a) => {
      const q = filter.toLowerCase();
      const matchSearch = !q || a.code.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q);
      const matchState = stateFilter === "all" || a.state === stateFilter;
      return matchSearch && matchState;
    })
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return sortDir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />;
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          placeholder="Search airports..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-sky-200 bg-white text-[#0c2340] text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
        />
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-sky-200 bg-white text-[#0c2340] text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
        >
          <option value="all">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-sky-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-sky-50 text-[#0c2340]">
            <tr>
              {showRank && <th className="px-4 py-3 text-left font-semibold w-12">#</th>}
              <th
                className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-[#0ea5e9]"
                onClick={() => toggleSort("code")}
              >
                <span className="flex items-center gap-1">Airport <SortIcon col="code" /></span>
              </th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">City</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">State</th>
              <th
                className="px-4 py-3 text-right font-semibold cursor-pointer hover:text-[#0ea5e9]"
                onClick={() => toggleSort("onTimeRate")}
              >
                <span className="flex items-center justify-end gap-1">On-Time <SortIcon col="onTimeRate" /></span>
              </th>
              <th
                className="px-4 py-3 text-right font-semibold hidden sm:table-cell cursor-pointer hover:text-[#0ea5e9]"
                onClick={() => toggleSort("avgDelayMin")}
              >
                <span className="flex items-center justify-end gap-1">Avg Delay <SortIcon col="avgDelayMin" /></span>
              </th>
              <th
                className="px-4 py-3 text-right font-semibold hidden md:table-cell cursor-pointer hover:text-[#0ea5e9]"
                onClick={() => toggleSort("cancelRate")}
              >
                <span className="flex items-center justify-end gap-1">Cancel % <SortIcon col="cancelRate" /></span>
              </th>
              <th className="px-4 py-3 text-right font-semibold">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50">
            {sorted.map((airport, i) => (
              <tr key={airport.code} className="hover:bg-sky-50 transition-colors">
                {showRank && (
                  <td className="px-4 py-3 text-sky-400 font-mono">{i + 1}</td>
                )}
                <td className="px-4 py-3">
                  <div>
                    <span className="font-bold text-[#0c2340]">{airport.code}</span>
                    <p className="text-xs text-sky-500 hidden sm:block truncate max-w-[200px]">{airport.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-sky-600">{airport.city}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-sky-600">{airport.state}</td>
                <td className={`px-4 py-3 text-right font-bold ${getOnTimeColor(airport.onTimeRate)}`}>
                  {airport.onTimeRate}%
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-sky-600">
                  {airport.avgDelayMin} min
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell text-sky-600">
                  {airport.cancelRate}%
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/${locale}/airports/${airport.code.toLowerCase()}`}
                    className="text-[#0ea5e9] hover:underline text-xs font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
