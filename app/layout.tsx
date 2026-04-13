import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Airport Delays Today — Live Status Board | FlightDelayBoard",
  description:
    "Live airport delay status for all major US airports. Updated every 10 minutes. Check delays at LAX, JFK, ORD, ATL, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#eff6ff] text-[#0c2340]">
        {children}
      </body>
    </html>
  );
}
