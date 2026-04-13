import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { busiestRoutes } from "@/lib/data";
import { getOnTimeColor } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Busiest US Routes — On-Time Performance Comparison | FlightDelayBoard",
  description:
    "Compare on-time performance for the busiest US flight routes. Find the best airlines for each route and the best departure times.",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function RoutesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Busiest US Flight Routes</h1>
          <p className="text-sky-200">On-time performance for the most traveled domestic routes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {busiestRoutes.map((route) => (
            <div key={`${route.origin}-${route.dest}`} className="bg-white rounded-xl border border-sky-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-2xl text-[#0c2340] font-mono">{route.origin}</span>
                  <ArrowRight className="w-5 h-5 text-sky-400" />
                  <span className="font-bold text-2xl text-[#0c2340] font-mono">{route.dest}</span>
                </div>
                <p className={`text-2xl font-bold ${getOnTimeColor(route.onTimeRate)}`}>
                  {route.onTimeRate}%
                </p>
              </div>
              <div className="w-full bg-sky-100 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${
                    route.onTimeRate >= 85 ? "bg-emerald-500" : route.onTimeRate >= 75 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${route.onTimeRate}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-2 flex-wrap">
                  {route.airlines.map((al) => (
                    <span key={al} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded">{al}</span>
                  ))}
                </div>
                <span className="text-sky-400 text-xs">{route.avgDelay} min avg</span>
              </div>
            </div>
          ))}
        </div>

        {/* Schema.org FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the most on-time US flight route?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "LAX to LAS (Las Vegas) consistently has the highest on-time rate among major US routes at ~85%, due to short flight time and good weather at both endpoints.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which US routes have the most delays?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Routes through New York (JFK/EWR/LGA) and Chicago (ORD) tend to have the most delays due to high traffic volume and variable weather. JFK to MIA and ORD to LAX are among the most delay-prone.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}
