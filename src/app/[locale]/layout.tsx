import type { Metadata } from "next";
import {
  Manrope,
  Libertinus_Serif_Display,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const libertinusSerifDisplay = Libertinus_Serif_Display({
  variable: "--font-libertinus-serif-display",
  weight: "400",
  subsets: ["latin", "cyrillic"],
  adjustFontFallback: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-sans-georgian",
  subsets: ["georgian"],
});

const notoSerifGeorgian = Noto_Serif_Georgian({
  variable: "--font-noto-serif-georgian",
  subsets: ["georgian"],
});

export const metadata: Metadata = {
  title: "Saint George's HEMA School",
  description: "Historical European Martial Arts (HEMA) school in Tbilisi",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${libertinusSerifDisplay.variable} ${notoSansGeorgian.variable} ${notoSerifGeorgian.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper-100 text-black">
        <NextIntlClientProvider>
          <Header />
          <main className="container mx-auto px-10 flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
