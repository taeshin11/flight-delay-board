import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAllAirports, getAllAirlines, getTopAirportsByOnTimeRate } from "@/lib/data";
import { getStatusBorderColor, getOnTimeColor } from "@/lib/types";
import { Plane, TrendingUp, Clock, AlertTriangle } from "lucide-react";

export const revalidate = 600;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  const allAirports = getAllAirports();
  const topAirports = getTopAirportsByOnTimeRate(6);
  const airlines = getAllAirlines().sort((a, b) => b.onTimeRate - a.onTimeRate).slice(0, 3);

  const avgOnTimeRate = Math.round(allAirports.reduce((s, a) => s + a.onTimeRate, 0) / allAirports.length * 10) / 10;
  const onTimeCount = allAirports.filter((a) => a.onTimeRate >= 85).length;
  const delayedCount = allAirports.filter((a) => a.onTimeRate < 75).length;

  const statusGrid = [...allAirports].sort((a, b) => b.onTimeRate - a.onTimeRate).slice(0, 30);

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FlightDelayBoard",
            url: "https://flight-delay-board.vercel.app",
            description: "Live airport delay status and on-time performance tracker",
            potentialAction: {
              "@type": "SearchAction",
              target: `https://flight-delay-board.vercel.app/${locale}/airports?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c2340] to-[#1e40af] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8 text-[#0ea5e9]" />
            <h1 className="text-3xl sm:text-4xl font-bold">{t("hero.title")}</h1>
          </div>
          <p className="text-sky-200 text-lg mb-8 max-w-2xl">{t("hero.subtitle")}</p>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">{onTimeCount}</p>
              <p className="text-xs text-sky-300 mt-1">On-Time Airports</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{avgOnTimeRate}%</p>
              <p className="text-xs text-sky-300 mt-1">Avg On-Time Rate</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-rose-400">{delayedCount}</p>
              <p className="text-xs text-sky-300 mt-1">Delay-Prone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad placeholder */}
      <div id="adsterra-native-banner" className="w-full my-4 min-h-[90px] bg-sky-50 flex items-center justify-center">
        <span className="text-xs text-sky-300">Advertisement</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* Top airports by on-time rate */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0ea5e9]" />
              <h2 className="text-xl font-bold text-[#0c2340]">{t("homepage.topAirports")}</h2>
            </div>
            <Link href={`/${locale}/airports`} className="text-sm text-[#0ea5e9] hover:underline">
              {t("homepage.viewAll")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAirports.map((airport, i) => (
              <Link
                key={airport.code}
                href={`/${locale}/airports/${airport.code.toLowerCase()}`}
                className={`bg-white rounded-xl border border-l-4 ${getStatusBorderColor(airport.onTimeRate)} border-sky-100 shadow-sm p-5 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sky-300 text-sm font-mono">#{i + 1}</span>
                    <h3 className="text-2xl font-bold text-[#0c2340]">{airport.code}</h3>
                    <p className="text-xs text-sky-400">{airport.city}, {airport.state}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getOnTimeColor(airport.onTimeRate)}`}>
                      {airport.onTimeRate}%
                    </p>
                    <p className="text-xs text-sky-400">on-time</p>
                  </div>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      airport.onTimeRate >= 85 ? "bg-emerald-500" : airport.onTimeRate >= 75 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${airport.onTimeRate}%` }}
                  />
                </div>
                <p className="text-xs text-sky-400 mt-2">Best day: {airport.bestDay}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* All airports status grid */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Airport Delay Status Grid</h2>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              {t("homepage.green")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              {t("homepage.yellow")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              {t("homepage.red")}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {statusGrid.map((airport) => (
              <Link
                key={airport.code}
                href={`/${locale}/airports/${airport.code.toLowerCase()}`}
                className={`bg-white rounded-lg border border-l-4 ${getStatusBorderColor(airport.onTimeRate)} border-sky-100 p-3 hover:shadow-md transition-shadow text-center`}
              >
                <p className="font-bold text-[#0c2340] text-lg">{airport.code}</p>
                <p className={`font-semibold text-sm ${getOnTimeColor(airport.onTimeRate)}`}>
                  {airport.onTimeRate}%
                </p>
                <p className="text-xs text-sky-400">{airport.avgDelayMin}min avg</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top airlines */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#0ea5e9]" />
              <h2 className="text-xl font-bold text-[#0c2340]">Top Airlines by On-Time Rate</h2>
            </div>
            <Link href={`/${locale}/airlines`} className="text-sm text-[#0ea5e9] hover:underline">
              {t("homepage.compareAirlines")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {airlines.map((airline, i) => (
              <Link
                key={airline.slug}
                href={`/${locale}/airlines/${airline.slug}`}
                className="bg-white rounded-xl border border-sky-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sky-300 text-sm">#{i + 1}</span>
                    <h3 className="font-bold text-[#0c2340]">{airline.name}</h3>
                    <span className="text-xs text-sky-400 font-mono">{airline.code}</span>
                  </div>
                  <p className={`text-2xl font-bold ${getOnTimeColor(airline.onTimeRate)}`}>
                    {airline.onTimeRate}%
                  </p>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      airline.onTimeRate >= 85 ? "bg-emerald-500" : airline.onTimeRate >= 75 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${airline.onTimeRate}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Best time CTA */}
        <section className="bg-gradient-to-r from-[#0c2340] to-[#0ea5e9] rounded-2xl p-8 text-white text-center">
          <Clock className="w-10 h-10 mx-auto mb-3 text-sky-300" />
          <h2 className="text-2xl font-bold mb-2">{t("bestTime.title")}</h2>
          <p className="text-sky-200 mb-5">{t("bestTime.tip")}</p>
          <Link
            href={`/${locale}/best-time`}
            className="inline-block bg-white text-[#0c2340] font-semibold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            {t("homepage.bestTimeGuide")}
          </Link>
        </section>
      </div>
    </div>
  );
}
