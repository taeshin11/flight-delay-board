import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

const BASE_URL = "https://flight-delay-board.vercel.app";

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "Flight Delay Statistics by Airline & Airport | FlightDelayBoard",
  description:
    "Compare on-time performance and delay statistics for US airlines and airports. Find the most reliable carriers and best departure times.",
  keywords: [
    "flight delays",
    "airline on-time performance",
    "airport delays",
    "flight statistics",
    "best airline delays",
    "DOT flight data",
    "flight delay tracker",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: `${BASE_URL}/en`,
      ko: `${BASE_URL}/ko`,
      ja: `${BASE_URL}/ja`,
      zh: `${BASE_URL}/zh`,
      es: `${BASE_URL}/es`,
      fr: `${BASE_URL}/fr`,
      de: `${BASE_URL}/de`,
      pt: `${BASE_URL}/pt`,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Flight Delay Statistics by Airline & Airport | FlightDelayBoard",
    description:
      "Compare on-time performance and delay statistics for US airlines and airports. Find the most reliable carriers and best departure times.",
    siteName: "FlightDelayBoard",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FlightDelayBoard — US Flight Delay Statistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Delay Statistics by Airline & Airport | FlightDelayBoard",
    description:
      "Compare on-time performance and delay statistics for US airlines and airports. Find the most reliable carriers and best departure times.",
    images: [`${BASE_URL}/og-image.png`],
  },
  other: {
    "google-adsense-account": "ca-pub-7098271335538021",
  },
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
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="FlightDelayBoard" />
      <Footer />
    </NextIntlClientProvider>
  );
}
