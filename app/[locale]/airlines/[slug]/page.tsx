import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAirlineBySlug, getAllAirlines, getMonthlyTrend } from "@/lib/data";
import { getOnTimeColor, getStatusColor } from "@/lib/types";
import DelayChart from "@/components/DelayChart";
import { Plane, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 86400;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const airlines = getAllAirlines();
  return airlines.flatMap((airline) =>
    ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"].map((locale) => ({
      locale,
      slug: airline.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);
  if (!airline) return {};
  return {
    title: `${airline.name} On-Time Performance — Delay Statistics | FlightDelayBoard`,
    description: `${airline.name} has a ${airline.onTimeRate}% on-time rate. Average delay: ${airline.avgDelayMin} minutes. Cancellation rate: ${airline.cancelRate}%.`,
  };
}

export default async function AirlineDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const airline = getAirlineBySlug(slug);

  if (!airline) notFound();

  const monthlyTrend = getMonthlyTrend(airline.onTimeRate);

  // Mock delay causes
  const delayCauses = [
    { cause: "Late Aircraft", pct: 38, color: "bg-rose-400" },
    { cause: "Carrier", pct: 26, color: "bg-orange-400" },
    { cause: "Weather", pct: 19, color: "bg-sky-400" },
    { cause: "NAS", pct: 13, color: "bg-amber-400" },
    { cause: "Security", pct: 4, color: "bg-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1 text-sky-400 text-sm">
            <Link href={`/${locale}/airlines`} className="hover:underline">Airlines</Link>
            <span>/</span>
            <span className="text-sky-200">{airline.name}</span>
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Plane className="w-8 h-8 text-[#0ea5e9]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{airline.name}</h1>
                <p className="text-sky-200">IATA Code: <span className="font-mono">{airline.code}</span></p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(airline.onTimeRate)}`}>
              {airline.onTimeRate >= 85 ? "Excellent" : airline.onTimeRate >= 75 ? "Good" : "Fair"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Key stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className={`text-3xl font-bold ${getOnTimeColor(airline.onTimeRate)}`}>
              {airline.onTimeRate}%
            </p>
            <p className="text-sm text-sky-400 mt-1">{t("airline.overallOTP")}</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#0c2340]">{airline.avgDelayMin}<span className="text-base text-sky-400">min</span></p>
            <p className="text-sm text-sky-400 mt-1">{t("airline.avgDelay")}</p>
          </div>
          <div className="bg-white rounded-xl border border-sky-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#0c2340]">{airline.cancelRate}%</p>
            <p className="text-sm text-sky-400 mt-1">{t("airline.cancelRate")}</p>
          </div>
        </div>

        {/* Monthly trend */}
        <section>
          <h2 className="text-xl font-bold text-[#0c2340] mb-4">Monthly On-Time Performance</h2>
          <DelayChart data={monthlyTrend} title="" />
        </section>

        {/* Delay causes */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0c2340] mb-5">{t("airline.delayCauses")}</h2>
          <div className="space-y-3">
            {delayCauses.map((d) => (
              <div key={d.cause}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#0c2340]">{d.cause}</span>
                  <span className="font-mono text-sky-500">{d.pct}%</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-3">
                  <div className={`h-3 rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hub airports */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">{t("airline.hubs")}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {airline.hubs.map((hub) => (
              <Link
                key={hub}
                href={`/${locale}/airports/${hub.toLowerCase()}`}
                className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-[#0c2340] rounded-xl font-bold font-mono text-lg transition-colors"
              >
                {hub}
              </Link>
            ))}
          </div>
        </section>

        {/* Ad placeholder */}
        <div id="adsterra-display-banner" className="flex justify-center">
          <div className="w-full max-w-2xl h-[90px] bg-sky-50 rounded-xl flex items-center justify-center">
            <span className="text-xs text-sky-300">Advertisement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
