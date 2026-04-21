import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | FlightDelayBoard",
  description:
    "Privacy policy for FlightDelayBoard. Learn how we collect, use, and protect your information when you use our flight delay statistics service.",
};

const LAST_UPDATED = "April 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#eff6ff]">
      {/* Hero */}
      <div className="bg-[#0c2340] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-7 h-7 text-[#0ea5e9]" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-sky-300 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl border border-sky-100 shadow-sm p-8 space-y-8 text-sky-800 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">1. Introduction</h2>
            <p>
              FlightDelayBoard (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at flight-delay-board.vercel.app
              (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our website. Please read this policy carefully. If you
              disagree with its terms, please discontinue use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="space-y-2 list-disc list-inside text-sky-700">
              <li>
                <strong>Usage Data:</strong> Automatically collected information including your browser type,
                operating system, referring URLs, pages viewed, time spent on pages, and the date and time
                of your visits.
              </li>
              <li>
                <strong>Device Information:</strong> Information about the device you use to access the
                Service, including IP address (anonymized), screen resolution, and language preference.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking
                technologies to track activity on our Service and hold certain information. See Section 5
                for more details.
              </li>
            </ul>
            <p className="mt-3">
              We do not collect personally identifiable information such as names, email addresses, or
              payment information unless you voluntarily contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="space-y-1.5 list-disc list-inside text-sky-700">
              <li>Operate, maintain, and improve the Service</li>
              <li>Analyze usage patterns to understand how visitors interact with the site</li>
              <li>Monitor and prevent abuse or fraudulent activity</li>
              <li>Display aggregate visitor statistics (e.g., daily and total visit counts)</li>
              <li>Serve relevant advertisements through third-party ad networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">4. Third-Party Services</h2>
            <p className="mb-3">
              We use the following third-party services that may collect information about you:
            </p>
            <div className="space-y-3">
              <div className="bg-sky-50 rounded-lg p-4">
                <p className="font-semibold text-[#0c2340] mb-1">Google AdSense</p>
                <p className="text-sky-700">
                  We use Google AdSense to display advertisements. Google may use cookies to show ads
                  based on your prior visits to this or other websites. You can opt out of personalized
                  advertising by visiting{" "}
                  <a href="https://www.google.com/settings/ads" className="text-[#0ea5e9] hover:underline" target="_blank" rel="noopener noreferrer">
                    Google Ad Settings
                  </a>.
                </p>
              </div>
              <div className="bg-sky-50 rounded-lg p-4">
                <p className="font-semibold text-[#0c2340] mb-1">Vercel Analytics</p>
                <p className="text-sky-700">
                  Our site is hosted on Vercel, which may collect anonymized usage data for performance
                  monitoring. Vercel&apos;s privacy policy is available at vercel.com/legal/privacy-policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">5. Cookies</h2>
            <p className="mb-3">
              Cookies are small data files stored on your device. We use cookies for the following purposes:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-sky-700">
              <li><strong>Essential cookies:</strong> Required for the site to function properly (e.g., locale preferences)</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use the site</li>
              <li><strong>Advertising cookies:</strong> Used by third-party ad networks to show relevant ads</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Note that disabling cookies may
              affect some functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">6. Data Retention</h2>
            <p>
              We retain aggregate usage statistics (total page views, daily visitor counts) indefinitely
              for reporting purposes. These statistics contain no personally identifiable information.
              Any server logs containing IP addresses are retained for no more than 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">7. Children&apos;s Privacy</h2>
            <p>
              The Service is not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe a child has provided us with
              personal information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">8. Your Rights</h2>
            <p className="mb-2">Depending on your location, you may have the right to:</p>
            <ul className="space-y-1.5 list-disc list-inside text-sky-700">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Object to our processing of your personal data</li>
              <li>Opt out of targeted advertising</li>
            </ul>
            <p className="mt-3">
              Because we collect minimal personal data, most requests can be addressed by adjusting your
              browser&apos;s cookie settings. For other requests, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by updating the &quot;Last updated&quot; date at the top of this page. Your continued use of the
              Service after any changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0c2340] mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through the feedback
              form on FlightDelayBoard or via the contact information listed on our About page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
