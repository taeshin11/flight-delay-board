import type { Metadata } from "next";
import { Plane, Database, BarChart2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About FlightDelayBoard | US Flight Delay Statistics",
  description:
    "Learn about FlightDelayBoard — tracking on-time performance and delay statistics for US airlines and airports using DOT Bureau of Transportation Statistics data.",
};

const airlines = [
  { name: "Delta Air Lines", code: "DL", note: "Consistently top on-time performer" },
  { name: "Alaska Airlines", code: "AS", note: "Strong reliability, West Coast focus" },
  { name: "United Airlines", code: "UA", note: "Major hub network, improving performance" },
  { name: "American Airlines", code: "AA", note: "Largest US carrier by fleet size" },
  { name: "Southwest Airlines", code: "WN", note: "Point-to-point model, no hubs" },
  { name: "JetBlue Airways", code: "B6", note: "Focus carrier, Northeast & Florida" },
  { name: "Spirit Airlines", code: "NK", note: "Ultra-low-cost, higher delay rates" },
  { name: "Frontier Airlines", code: "F9", note: "Ultra-low-cost, leisure routes" },
];

const airports = [
  { code: "ATL", name: "Hartsfield-Jackson Atlanta", note: "World's busiest airport" },
  { code: "LAX", name: "Los Angeles International", note: "Largest West Coast hub" },
  { code: "ORD", name: "Chicago O'Hare", note: "Major connecting hub, weather delays" },
  { code: "DFW", name: "Dallas/Fort Worth", note: "American Airlines mega-hub" },
  { code: "DEN", name: "Denver International", note: "High altitude, weather impacts" },
  { code: "JFK", name: "John F. Kennedy International", note: "NY gateway, congestion delays" },
  { code: "SFO", name: "San Francisco International", note: "Fog delays, tech hub traffic" },
  { code: "SEA", name: "Seattle-Tacoma", note: "Alaska Airlines home base" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Hero */}
      <div className="bg-[#0c2340] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Plane className="w-7 h-7 text-[#0ea5e9]" />
            <h1 className="text-3xl font-bold">About FlightDelayBoard</h1>
          </div>
          <p className="text-sky-200 text-lg max-w-2xl">
            Your source for historical flight delay statistics across US domestic airlines and airports,
            powered by official DOT Bureau of Transportation Statistics data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Mission */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-7">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Our Mission</h2>
          </div>
          <p className="text-sky-700 leading-relaxed mb-3">
            FlightDelayBoard was built to give travelers a clear, unbiased view of US airline and airport
            on-time performance. Too many travelers make booking decisions without knowing which airlines
            are consistently late, which airports are delay hotspots, or what time of day minimizes their
            risk of a delayed flight.
          </p>
          <p className="text-sky-700 leading-relaxed">
            We aggregate and present historical on-time performance data from the US Department of
            Transportation (DOT) Bureau of Transportation Statistics (BTS), covering all major US domestic
            carriers and airports. Our goal is simple: help you fly smarter.
          </p>
        </section>

        {/* Data Source */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-7">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Data Source</h2>
          </div>
          <p className="text-sky-700 leading-relaxed mb-4">
            All delay statistics on FlightDelayBoard come from the{" "}
            <strong>DOT Bureau of Transportation Statistics On-Time Performance (OTP) database</strong>.
            This is the official government dataset that US carriers are required to report to — covering
            every domestic flight operated by carriers with at least 1% of total domestic scheduled
            service.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div className="bg-sky-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#0c2340]">10+</p>
              <p className="text-sm text-sky-600">Major Airlines Tracked</p>
            </div>
            <div className="bg-sky-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#0c2340]">100+</p>
              <p className="text-sm text-sky-600">Airports Covered</p>
            </div>
            <div className="bg-sky-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#0c2340]">Quarterly</p>
              <p className="text-sm text-sky-600">Data Updates</p>
            </div>
          </div>
        </section>

        {/* Airlines Tracked */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-7">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Airlines We Track</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {airlines.map((airline) => (
              <div key={airline.code} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                <span className="font-mono font-bold text-[#0ea5e9] text-sm w-8 shrink-0">{airline.code}</span>
                <div>
                  <p className="font-semibold text-[#0c2340] text-sm">{airline.name}</p>
                  <p className="text-xs text-sky-500">{airline.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Airports Covered */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-7">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Major Airports Covered</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {airports.map((airport) => (
              <div key={airport.code} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                <span className="font-mono font-bold text-[#0ea5e9] text-sm w-10 shrink-0">{airport.code}</span>
                <div>
                  <p className="font-semibold text-[#0c2340] text-sm">{airport.name}</p>
                  <p className="text-xs text-sky-500">{airport.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-sky-400 mt-4">
            And 90+ additional US airports across all major metro areas and regional hubs.
          </p>
        </section>

        {/* Delay Types */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-7">
          <h2 className="text-xl font-bold text-[#0c2340] mb-4">Delay Categories Tracked</h2>
          <div className="space-y-3">
            {[
              { label: "Carrier Delay", desc: "Caused by the airline — maintenance, crew issues, aircraft cleaning, baggage handling, fueling." },
              { label: "Weather Delay", desc: "Significant meteorological conditions at the origin or destination airport." },
              { label: "NAS Delay", desc: "National Air System delays — ATC, heavy traffic, non-extreme weather conditions, airport operations." },
              { label: "Security Delay", desc: "Caused by security breaches, inoperative screening equipment, or passenger screening issues." },
              { label: "Late Aircraft Delay", desc: "Previous flight with same aircraft arrived late, causing a knock-on effect." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2 shrink-0" />
                <div>
                  <span className="font-semibold text-[#0c2340] text-sm">{item.label}: </span>
                  <span className="text-sky-700 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> FlightDelayBoard provides historical delay statistics for planning
            purposes only. This is not a real-time flight tracking service. For your actual flight status,
            always check directly with your airline or the FAA&apos;s official flight status tools.
          </p>
        </div>
      </div>
    </div>
  );
}
