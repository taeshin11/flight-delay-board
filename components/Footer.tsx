"use client";

import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visits, setVisits] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => setVisits(d))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#0c2340] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-5 h-5 text-[#0ea5e9]" />
              <span className="font-bold text-lg">FlightDelayBoard</span>
            </div>
            <p className="text-sm text-sky-200 leading-relaxed">
              Airport delay status and on-time performance tracker for major US airports.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sky-300">Quick Links</h3>
            <ul className="space-y-1 text-sm text-sky-200">
              <li><a href="/en/airports" className="hover:text-white transition-colors">All Airports</a></li>
              <li><a href="/en/airlines" className="hover:text-white transition-colors">Airlines</a></li>
              <li><a href="/en/routes" className="hover:text-white transition-colors">Routes</a></li>
              <li><a href="/en/best-time" className="hover:text-white transition-colors">Best Time to Fly</a></li>
              <li><a href="/en/how-to-use" className="hover:text-white transition-colors">How to Use / FAQ</a></li>
              <li><a href="/en/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/en/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/en/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          {/* Data info */}
          <div>
            <h3 className="font-semibold mb-3 text-sky-300">Data Source</h3>
            <p className="text-sm text-sky-200 leading-relaxed">
              Historical data from BTS On-Time Performance database. Updated quarterly.
            </p>
            {/* Adsterra placeholder */}
            <div id="adsterra-native-footer" className="mt-4 min-h-[50px] rounded bg-[#0d2d4e]" />
          </div>
        </div>

        <div className="border-t border-sky-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-sky-400">
            © 2024 FlightDelayBoard. Data from BTS On-Time Performance database.
          </p>
          {visits && (
            <p className="text-xs text-sky-400">
              Visitors — Today: {visits.today.toLocaleString()} | Total: {visits.total.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
