import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Airport Delays Today — Live Status Board | FlightDelayBoard",
  description:
    "Live airport delay status for all major US airports. Updated every 10 minutes. Check delays at LAX, JFK, ORD, ATL, and more.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
