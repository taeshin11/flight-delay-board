import type { Metadata } from "next";
import { FileText, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | FlightDelayBoard",
  description:
    "Terms of use for FlightDelayBoard. Historical flight delay statistics only — not real-time flight tracking. No liability for travel decisions made using this data.",
};

const LAST_UPDATED = "April 2025";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Hero */}
      <div className="bg-[#0c2340] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-7 h-7 text-[#0ea5e9]" />
            <h1 className="text-3xl font-bold">Terms of Use</h1>
          </div>
          <p className="text-sky-300 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Critical disclaimer banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 mb-1">Important: Historical Data Only</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              FlightDelayBoard provides <strong>historical flight delay statistics</strong> for travel
              planning purposes only. This service does <strong>not</strong> provide real-time flight
              status, live delay information, or current gate assignments. For your actual flight status,
              always use your airline&apos;s official app, website, or the FAA&apos;s official resources.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 shadow-sm p-8 space-y-8 text-sky-800 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FlightDelayBoard (the &quot;Service&quot;) at flight-delay-board.vercel.app,
              you agree to be bound by these Terms of Use. If you do not agree to these terms, please
              do not use the Service. We reserve the right to update these terms at any time; continued
              use of the Service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">2. Nature of the Service</h2>
            <p className="mb-3">FlightDelayBoard is a <strong>historical data reference tool</strong>. Specifically:</p>
            <ul className="space-y-2 list-disc list-inside text-sky-700">
              <li>
                All delay statistics are derived from the US Department of Transportation (DOT) Bureau
                of Transportation Statistics (BTS) On-Time Performance database.
              </li>
              <li>
                Data is updated quarterly and reflects historical performance over prior reporting periods,
                not current or future flight performance.
              </li>
              <li>
                On-time rates, average delay minutes, and delay cause breakdowns reflect past patterns
                and are intended to help with general travel planning, not specific flight predictions.
              </li>
              <li>
                The Service does not connect to any airline operations system, FAA live data feed, or
                airport operations database.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">3. Not a Real-Time Flight Status Service</h2>
            <p className="mb-3 font-semibold text-[#0c2340]">
              FlightDelayBoard is NOT a real-time flight tracker. Do not rely on this service for:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-sky-700">
              <li>Current flight departure or arrival times</li>
              <li>Live gate assignments or terminal information</li>
              <li>Real-time delay alerts or cancellation notices</li>
              <li>Current weather-related flight status</li>
              <li>Any information about a specific upcoming or current flight</li>
            </ul>
            <p className="mt-3 text-sky-700">
              For real-time flight status, use official sources:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-sky-700">
              <li>Your airline&apos;s official website or mobile application</li>
              <li>FAA Air Traffic Control System Command Center: <span className="font-mono">fly.faa.gov</span></li>
              <li>Airport official websites and departure/arrival boards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">4. Accuracy of Data</h2>
            <p>
              While we strive to present BTS data accurately, FlightDelayBoard makes no warranties
              regarding the completeness, accuracy, or timeliness of the information presented. The
              underlying BTS data may contain reporting errors, revisions, or methodology changes.
              Statistics are aggregated and rounded for display purposes. Do not use FlightDelayBoard
              data for legal, regulatory, or commercial aviation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">5. Limitation of Liability</h2>
            <p className="mb-3">
              To the fullest extent permitted by applicable law, FlightDelayBoard and its operators
              shall not be liable for any direct, indirect, incidental, special, or consequential
              damages arising from:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-sky-700">
              <li>Travel decisions made based on data displayed on this Service</li>
              <li>Missed flights, travel disruptions, or financial losses related to flight delays</li>
              <li>Inaccuracies in historical delay statistics</li>
              <li>Interruptions in Service availability</li>
              <li>Any reliance on this Service as a real-time flight tracking tool</li>
            </ul>
            <p className="mt-3">
              Your use of this Service is entirely at your own risk. Always verify critical travel
              information through official airline and government sources before making any travel decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">6. Intellectual Property</h2>
            <p>
              The design, layout, and original content of FlightDelayBoard are the property of its
              operators. The underlying flight data is sourced from the DOT BTS, which is a US government
              database available in the public domain. You may use delay statistics for personal reference,
              but may not reproduce, redistribute, or commercialize the Service&apos;s presentation, design,
              or methodology without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">7. Advertising</h2>
            <p>
              FlightDelayBoard displays third-party advertisements through Google AdSense and other
              ad networks. We are not responsible for the content of these advertisements. Clicking on
              ads may take you to third-party websites governed by their own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">8. External Links</h2>
            <p>
              The Service may contain links to external websites for reference purposes (e.g., airline
              websites, FAA resources, DOT BTS). These links are provided for convenience only. We have
              no control over and assume no responsibility for the content, privacy policies, or practices
              of any third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United
              States, without regard to conflict of law provisions. Any disputes arising from use of
              this Service shall be resolved through binding arbitration or in the courts of competent
              jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">10. Contact</h2>
            <p>
              For questions about these Terms of Use, please contact us through the feedback mechanism
              available on the Service. We will respond to inquiries in a reasonable time.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
