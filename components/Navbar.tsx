"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Plane, Menu, X, Globe } from "lucide-react";

const locales = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
];

export default function Navbar() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: "Home" },
    { href: `/${locale}/airports`, label: "Airports" },
    { href: `/${locale}/airlines`, label: "Airlines" },
    { href: `/${locale}/routes`, label: "Routes" },
    { href: `/${locale}/best-time`, label: "Best Time" },
  ];

  return (
    <nav className="bg-white border-b border-sky-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-[#0c2340]">
            <Plane className="w-6 h-6 text-[#0ea5e9]" />
            <span className="text-lg">FlightDelayBoard</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0c2340] hover:text-[#0ea5e9] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language + Mobile */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-[#0c2340] hover:text-[#0ea5e9] transition-colors px-2 py-1 rounded"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-sky-100 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
                  {locales.map((l) => (
                    <Link
                      key={l.code}
                      href={`/${l.code}`}
                      className={`block px-4 py-2 text-sm hover:bg-sky-50 ${
                        l.code === locale ? "text-[#0ea5e9] font-medium" : "text-[#0c2340]"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-sky-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-[#0c2340] hover:text-[#0ea5e9]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
