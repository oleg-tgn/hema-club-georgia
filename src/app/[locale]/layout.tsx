import type { Metadata } from "next";
import {
  Manrope,
  Literata,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

// Variable, with the optical size axis: the browser fits the letters to the
// size, so one family serves headings (weight 350) and text (400).
const literata = Literata({
  variable: "--font-literata",
  axes: ["opsz"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
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
      className={`${manrope.variable} ${literata.variable} ${notoSansGeorgian.variable} ${notoSerifGeorgian.variable} h-full`}
    >
      <body className="bg-paper-100 flex min-h-full flex-col text-black">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1 pt-[calc(var(--header-height)+var(--page-gap))]">
            <Container>{children}</Container>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
