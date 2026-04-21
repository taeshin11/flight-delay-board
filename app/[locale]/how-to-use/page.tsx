import type { Metadata } from "next";
import { HelpCircle, Plane, Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use FlightDelayBoard — FAQ | Flight Delay Help",
  description:
    "Learn how to compare flight delay statistics by airline and airport. Answers to common questions about on-time performance, delay types, compensation, and the best time to fly.",
};

interface Props {
  params: Promise<{ locale: string }>;
}

const faqs = [
  {
    q: "Which airline has the most delays?",
    a: "Based on DOT Bureau of Transportation Statistics data, ultra-low-cost carriers (ULCCs) like Spirit Airlines and Frontier Airlines typically have the highest delay rates — often 25–35% of flights delayed. Major network carriers vary, with Delta Air Lines historically performing best among the large carriers. You can compare all airlines on our Airlines page.",
  },
  {
    q: "Which airports have the most delays?",
    a: "Airports with the highest delay rates tend to be congested hub airports and those prone to weather disruptions. Newark (EWR), San Francisco (SFO), and Chicago O'Hare (ORD) frequently rank among the most delay-prone. SFO is notorious for fog delays, ORD for winter weather, and EWR for airspace congestion. See the full ranking on our Airports page.",
  },
  {
    q: "What causes flight delays?",
    a: "The DOT tracks five main delay causes: (1) Carrier delays — maintenance, crew scheduling, cleaning; (2) Weather delays — significant meteorological conditions; (3) NAS (National Air System) delays — ATC, heavy traffic, non-extreme weather; (4) Security delays — screening issues; (5) Late aircraft delays — the previous flight using the same plane arrived late. Late aircraft and carrier delays account for roughly 60% of all delays.",
  },
  {
    q: "What's the best time of day to fly?",
    a: "Early morning flights (6–9 AM) have the lowest delay rates nationally. Aircraft are freshest from overnight maintenance, ATC congestion is minimal, and there's no cascade of earlier delays to compound your flight. Evening flights (especially 5–8 PM) have the highest delay rates as delays snowball throughout the day. See our Best Time to Fly page for a full hour-by-hour breakdown.",
  },
  {
    q: "What's the best day of the week to fly?",
    a: "Tuesday and Wednesday consistently have the fewest delays — both business and leisure travel volumes are lowest mid-week. Friday is the worst day to fly, combining heavy business and leisure travel. Sunday evenings also see high delays from return travelers. Our Best Time to Fly page shows a full day-by-day score breakdown.",
  },
  {
    q: "What is the difference between delay types?",
    a: "There are five official DOT delay categories: Carrier (airline's fault — maintenance, crew), Weather (significant weather at origin or destination), NAS (air traffic control, non-extreme weather, airport operations), Security (screening or security breach), and Late Aircraft (the inbound plane was late). Only Weather delays are typically outside the airline's control — Carrier and Late Aircraft delays are squarely the airline's responsibility.",
  },
  {
    q: "Can I get compensation for flight delays?",
    a: "US law does not require airlines to compensate passengers for delayed flights (unlike EU regulations). However, airlines are required to refund your ticket if they cancel your flight or make a \"significant\" schedule change and you choose not to travel. Many airlines also offer travel credits or miles as goodwill gestures. For cancellations, DOT rules require prompt refunds to original payment. Always check your airline's Contract of Carriage for their specific delay policy.",
  },
  {
    q: "How do I check my actual flight status?",
    a: "FlightDelayBoard shows historical delay statistics — not real-time flight tracking. For your actual flight status, use: (1) Your airline's app or website; (2) The FAA's Air Traffic Control System Command Center at fly.faa.gov; (3) Third-party trackers like FlightAware or Flightradar24. Always check with your airline directly for the most accurate, real-time information.",
  },
  {
    q: "What is an on-time performance rate?",
    a: "On-time performance (OTP) rate is the percentage of flights that arrive within 15 minutes of their scheduled arrival time. The DOT uses the 15-minute threshold as the official definition of \"on time.\" A rate of 85% means 85 out of every 100 flights on that airline or at that airport arrived within 15 minutes of schedule. Industry average hovers around 78–82% depending on the year.",
  },
];

export default async function HowToUsePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Hero */}
      <div className="bg-[#0c2340] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-7 h-7 text-[#0ea5e9]" />
            <h1 className="text-3xl font-bold">How to Use FlightDelayBoard</h1>
          </div>
          <p className="text-sky-200 text-lg max-w-2xl">
            A guide to reading flight delay data and answers to the most common questions about
            US airline on-time performance.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick nav */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0c2340] mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: `/${locale}/airlines`, label: "Compare Airlines", desc: "Side-by-side on-time rates" },
              { href: `/${locale}/airports`, label: "Browse Airports", desc: "Delay stats by airport" },
              { href: `/${locale}/routes`, label: "Search Routes", desc: "Origin-to-destination data" },
              { href: `/${locale}/best-time`, label: "Best Time to Fly", desc: "Day, hour & month guide" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
              >
                <Plane className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                <div>
                  <p className="font-semibold text-[#0c2340] text-sm">{item.label}</p>
                  <p className="text-xs text-sky-500">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How to read the data */}
        <section className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">How to Read the Data</h2>
          </div>
          <div className="space-y-4 text-sky-700 text-sm leading-relaxed">
            <p>
              Each airline and airport page shows an <strong>on-time performance rate</strong> — the
              percentage of flights arriving within 15 minutes of schedule. Higher is better.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0" />
                <span><strong className="text-emerald-800">Green (85%+):</strong> Excellent on-time performance</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
                <div className="w-3 h-3 bg-amber-500 rounded-full shrink-0" />
                <span><strong className="text-amber-800">Yellow (75–84%):</strong> Average — some delay risk</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-rose-50 rounded-lg">
                <div className="w-3 h-3 bg-rose-500 rounded-full shrink-0" />
                <span><strong className="text-rose-800">Red (below 75%):</strong> High delay risk — plan accordingly</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-bold text-[#0c2340]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-sky-100 shadow-sm p-6">
                <h3 className="font-bold text-[#0c2340] mb-2">{faq.q}</h3>
                <p className="text-sky-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-[#0c2340] to-[#0ea5e9] rounded-2xl p-7 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to find your best flight?</h2>
          <p className="text-sky-200 mb-5 text-sm">Compare airlines and airports to make a smarter booking decision.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/airlines`}
              className="bg-white text-[#0c2340] font-semibold px-5 py-2.5 rounded-lg hover:bg-sky-50 transition-colors text-sm"
            >
              Compare Airlines
            </Link>
            <Link
              href={`/${locale}/best-time`}
              className="bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/30 transition-colors text-sm"
            >
              Best Time to Fly
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
