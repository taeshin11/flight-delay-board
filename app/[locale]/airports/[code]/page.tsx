import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAirportByCode, getAllAirports, getAllAirlines, getMonthlyTrend, getHourlyDelayData } from "@/lib/data";
import { getOnTimeColor, getStatusColor } from "@/lib/types";
import DelayChart from "@/components/DelayChart";
import BestTimeGrid from "@/components/BestTimeGrid";
import { ExternalLink, Plane, Clock, Calendar, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 600;

interface Props {
  params: Promise<{ locale: string; code: string }>;
}

export async function generateStaticParams() {
  const airports = getAllAirports();
  return airports.flatMap((airport) =>
    ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"].map((locale) => ({
      locale,
      code: airport.code.toLowerCase(),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const airport = getAirportByCode(code);
  if (!airport) return {};
  return {
    title: `${airport.code} Airport Delays — ${airport.name} On-Time Performance & Best Travel Times`,
    description: `${airport.name} on-time rate: ${airport.onTimeRate}%. Average delay: ${airport.avgDelayMin} minutes. See best times to fly and delay patterns.`,
  };
}

export default async function AirportDetailPage({ params }: Props) {
  const { locale, code } = await params;
  const t = await getTranslations();
  const airport = getAirportByCode(code);

  if (!airport) notFound();

  const monthlyTrend = getMonthlyTrend(airport.onTimeRate);
  const hourlyData = getHourlyDelayData(airport.avgDelayMin, airport.bestHour, airport.worstHour);
  const airlines = getAllAirlines();
  const airlineData = airport.airlines.map((name) => {
    const al = airlines.find((a) => a.name === name);
    return { name, onTimeRate: al?.onTimeRate ?? 80, avgDelay: al?.avgDelayMin ?? 20 };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Airport",
    name: airport.name,
    iataCode: airport.code,
    address: {
      "@type": "PostalAddress",
      addressLocality: airport.city,
      addressRegion: airport.state,
      addressCountry: "US",
    },
    url: airport.website,
  };

  function formatHour(h: number) {
    if (h === 0) return "12 AM";
    if (h < 12) return `${h} AM`;
    if (h === 12) return "12 PM";
    return `${h - 12} PM`;
  }

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Plane className="w-6 h-6 text-[#0ea5e9]" />
                <Link href={`/${locale}/airports`} className="text-sky-400 text-sm hover:underline">
                  All Airports
                </Link>
                <span className="text-sky-600">/</span>
                <span className="text-sky-200 text-sm">{airport.code}</span>
              </div>
              <h1 className="text-3xl font-bold">{airport.code}</h1>
              <p className="text-sky-200 mt-1">{airport.name}</p>
              <p className="text-sky-300 text-sm">{airport.city}, {airport.state}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(airport.onTimeRate)}`}>
                {airport.onTimeRate >= 85 ? "Excellent" : airport.onTimeRate >= 75 ? "Good" : "Poor"} Performance
              </span>
              <a
                href={airport.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-sky-300 hover:text-white"
              >
                Official Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className={`text-3xl font-bold ${getOnTimeColor(airport.onTimeRate)}`}>
              {airport.onTimeRate}%
            </p>
            <p className="text-sm text-sky-400 mt-1">{t("airport.onTimeRate")}</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#0c2340]">{airport.avgDelayMin}<span className="text-base text-sky-400">min</span></p>
            <p className="text-sm text-sky-400 mt-1">{t("airport.avgDelay")}</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#0c2340]">{airport.cancelRate}%</p>
            <p className="text-sm text-sky-400 mt-1">{t("airport.cancelRate")}</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">{airport.bestDay}</p>
            <p className="text-sm text-sky-400 mt-1">{t("airport.bestDay")}</p>
          </div>
        </div>

        {/* Monthly trend chart */}
        <section>
          <h2 className="text-xl font-bold text-[#0c2340] mb-4">Monthly On-Time Performance</h2>
          <DelayChart data={monthlyTrend} title="" />
        </section>

        {/* Best time to fly */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">{t("airport.bestTimeToFly")}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <p className="font-bold text-emerald-700">{airport.bestDay}</p>
              <p className="text-xs text-emerald-600">Best Day</p>
            </div>
            <div className="text-center p-4 bg-rose-50 rounded-xl">
              <p className="font-bold text-rose-700">{airport.worstDay}</p>
              <p className="text-xs text-rose-600">Worst Day</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <p className="font-bold text-emerald-700">{formatHour(airport.bestHour)}</p>
              <p className="text-xs text-emerald-600">Best Hour</p>
            </div>
            <div className="text-center p-4 bg-rose-50 rounded-xl">
              <p className="font-bold text-rose-700">{formatHour(airport.worstHour)}</p>
              <p className="text-xs text-rose-600">Worst Hour</p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-[#0c2340] mb-3">Delay Heatmap (avg minutes by day & hour)</h3>
          <BestTimeGrid avgDelay={airport.avgDelayMin} bestHour={airport.bestHour} worstHour={airport.worstHour} />
        </section>

        {/* Hourly delay table */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">{t("airport.delayByHour")}</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {hourlyData.filter((h) => h.hour >= 5 && h.hour <= 23).map((h) => (
              <div key={h.hour} className="text-center">
                <div
                  className={`rounded-lg p-2 text-xs font-mono ${
                    h.delay <= 12 ? "bg-emerald-100 text-emerald-700" :
                    h.delay <= 20 ? "bg-amber-100 text-amber-700" :
                    "bg-rose-100 text-rose-700"
                  }`}
                >
                  {h.delay}m
                </div>
                <p className="text-xs text-sky-400 mt-1">{formatHour(h.hour)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Airlines at this airport */}
        <section>
          <h2 className="text-xl font-bold text-[#0c2340] mb-4">{t("airport.airlines")} at {airport.code}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {airlineData.map((al) => (
              <div key={al.name} className="bg-white rounded-xl border border-sky-100 p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0c2340] text-sm">{al.name}</p>
                    <p className="text-xs text-sky-400">{al.avgDelay} min avg delay</p>
                  </div>
                </div>
                <p className={`font-bold ${getOnTimeColor(al.onTimeRate)}`}>{al.onTimeRate}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terminals */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0c2340] mb-4">{t("airport.terminals")}</h2>
          <div className="flex flex-wrap gap-2">
            {airport.terminals.map((t) => (
              <span key={t} className="px-3 py-1 bg-sky-50 text-[#0c2340] rounded-full text-sm font-medium">
                Terminal {t}
              </span>
            ))}
          </div>
        </section>

        {/* Ad placeholder */}
        <div id="adsterra-display-banner" className="flex justify-center my-4">
          <div className="w-full max-w-2xl h-[90px] bg-sky-50 rounded-xl flex items-center justify-center">
            <span className="text-xs text-sky-300">Advertisement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
