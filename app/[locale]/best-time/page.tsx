import { getTranslations } from "next-intl/server";
import BestTimeGrid from "@/components/BestTimeGrid";
import { Clock, TrendingDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Time to Fly — Avoid Airport Delays | FlightDelayBoard",
  description:
    "Find the best day and hour to fly with the fewest delays. Interactive heatmap showing average delay patterns by day and time across major US airports.",
};

const dayStats = [
  { day: "Monday", score: 72, note: "High delay risk — start of business travel week" },
  { day: "Tuesday", score: 92, note: "Best day to fly — lowest delays nationwide" },
  { day: "Wednesday", score: 90, note: "Excellent — minimal congestion" },
  { day: "Thursday", score: 78, note: "Good — slight increase toward weekend" },
  { day: "Friday", score: 61, note: "Worst day — heavy leisure + business travel" },
  { day: "Saturday", score: 80, note: "Moderate — lighter business travel" },
  { day: "Sunday", score: 75, note: "Fair — return travel surge in evenings" },
];

const monthStats = [
  { month: "Jan", score: 75, note: "Winter weather delays" },
  { month: "Feb", score: 72, note: "Peak winter weather risk" },
  { month: "Mar", score: 79, note: "Improving, spring break spike" },
  { month: "Apr", score: 85, note: "Excellent — mild weather" },
  { month: "May", score: 87, note: "Best month — low delays" },
  { month: "Jun", score: 74, note: "Summer travel surge begins" },
  { month: "Jul", score: 71, note: "Peak summer — thunderstorms" },
  { month: "Aug", score: 76, note: "High volume, improving late month" },
  { month: "Sep", score: 88, note: "Second best — post-summer calm" },
  { month: "Oct", score: 87, note: "Excellent — fall travel" },
  { month: "Nov", score: 78, note: "Thanksgiving spike" },
  { month: "Dec", score: 69, note: "Worst month — holidays + winter weather" },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="w-full bg-sky-100 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${
          score >= 85 ? "bg-emerald-500" : score >= 75 ? "bg-amber-500" : "bg-rose-500"
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export default async function BestTimePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      <div className="bg-[#0c2340] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-7 h-7 text-[#0ea5e9]" />
            <h1 className="text-3xl font-bold">{t("bestTime.title")}</h1>
          </div>
          <p className="text-sky-200 max-w-2xl">{t("bestTime.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Quick tip */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-4">
          <TrendingDown className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-800">Pro Tip</p>
            <p className="text-emerald-700 text-sm">{t("bestTime.tip")}</p>
          </div>
        </div>

        {/* By day of week */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0c2340] mb-5">{t("bestTime.byDay")}</h2>
          <div className="space-y-4">
            {dayStats.map((d) => (
              <div key={d.day}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-[#0c2340] w-24">{d.day}</span>
                  <span className="text-xs text-sky-400 flex-1 mx-4">{d.note}</span>
                  <span className={`font-bold text-sm w-10 text-right ${d.score >= 85 ? "text-emerald-600" : d.score >= 75 ? "text-amber-600" : "text-rose-600"}`}>
                    {d.score}
                  </span>
                </div>
                <ScoreBar score={d.score} />
              </div>
            ))}
          </div>
          <p className="text-xs text-sky-300 mt-4">Score: 100 = no delays, 0 = severe delays</p>
        </section>

        {/* By month */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0c2340] mb-5">{t("bestTime.byMonth")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monthStats.map((m) => (
              <div key={m.month}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-[#0c2340] w-12">{m.month}</span>
                  <span className="text-xs text-sky-400 flex-1 mx-3">{m.note}</span>
                  <span className={`font-bold text-sm ${m.score >= 85 ? "text-emerald-600" : m.score >= 75 ? "text-amber-600" : "text-rose-600"}`}>
                    {m.score}
                  </span>
                </div>
                <ScoreBar score={m.score} />
              </div>
            ))}
          </div>
        </section>

        {/* Heatmap example (national average) */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0c2340] mb-2">{t("bestTime.byHour")}</h2>
          <p className="text-sm text-sky-400 mb-5">National average delay heatmap (all major US airports)</p>
          <BestTimeGrid avgDelay={20} bestHour={7} worstHour={18} />
        </section>

        {/* Key insights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="font-bold text-emerald-800 mb-2">Best Time</h3>
            <p className="text-3xl font-bold text-emerald-700 mb-1">6–9 AM</p>
            <p className="text-sm text-emerald-600">Tuesday or Wednesday</p>
            <p className="text-xs text-emerald-500 mt-2">Early morning flights use fresh aircraft, have lowest ATC congestion</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-bold text-amber-800 mb-2">Avoid</h3>
            <p className="text-3xl font-bold text-amber-700 mb-1">5–8 PM</p>
            <p className="text-sm text-amber-600">Friday evenings</p>
            <p className="text-xs text-amber-500 mt-2">Delays cascade throughout the day and peak in evening</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
            <h3 className="font-bold text-sky-800 mb-2">Best Months</h3>
            <p className="text-3xl font-bold text-sky-700 mb-1">May & Sep</p>
            <p className="text-sm text-sky-600">Off-peak seasons</p>
            <p className="text-xs text-sky-500 mt-2">Mild weather, lower travel demand, best on-time rates</p>
          </div>
        </section>
      </div>
    </div>
  );
}
