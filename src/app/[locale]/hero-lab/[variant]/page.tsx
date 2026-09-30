// Prototype page for comparing hero variants - see
// src/components/hero-lab/HeroVariants.tsx. Delete together with it.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  HeroA,
  HeroB,
  HeroC,
  HeroD,
  HeroE,
  HeroF,
} from "@/components/hero-lab/HeroVariants";
import Welcome from "@/components/sections/Welcome";
import Schedule from "@/components/sections/Schedule";
import Faq from "@/components/sections/Faq";
import Join from "@/components/sections/Join";

export const revalidate = 60;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const variants = {
  a: { Hero: HeroA, label: "A · текст на видео", welcome: false },
  b: { Hero: HeroB, label: "B · видео-полоса", welcome: true },
  c: { Hero: HeroC, label: "C · две колонки", welcome: false },
  d: { Hero: HeroD, label: "D · только текст", welcome: false },
  e: { Hero: HeroE, label: "E · видео слева, без кнопок", welcome: false },
  f: { Hero: HeroF, label: "F · маленькое видео, без кнопок", welcome: false },
} as const;

type Variant = keyof typeof variants;

function isVariant(value: string): value is Variant {
  return value in variants;
}

function Switcher({ current }: { current: Variant }) {
  return (
    <nav className="bg-night/90 fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full p-1 text-sm font-semibold text-white shadow-lg backdrop-blur">
      {(Object.keys(variants) as Variant[]).map((key) => (
        <Link
          key={key}
          href={`/hero-lab/${key}`}
          title={variants[key].label}
          className={`rounded-full px-4 py-2 uppercase ${
            key === current ? "text-night bg-white" : "hover:bg-white/15"
          }`}
        >
          {key}
        </Link>
      ))}
      <Link href="/" className="rounded-full px-4 py-2 hover:bg-white/15">
        сейчас
      </Link>
    </nav>
  );
}

export default async function HeroLabPage({
  params,
}: PageProps<"/[locale]/hero-lab/[variant]">) {
  const { variant } = await params;

  if (!isVariant(variant)) {
    notFound();
  }

  const { Hero, welcome } = variants[variant];

  return (
    <div className="flex flex-col">
      <Hero />

      {welcome && (
        <section id="welcome" className="py-10 sm:py-15 md:py-20">
          <Welcome />
        </section>
      )}

      <section
        id="schedule"
        className={`pb-10 sm:pb-15 md:pb-20 ${welcome ? "" : "pt-6 md:pt-10"}`}
      >
        <Schedule />
      </section>

      <section id="faq" className="pb-10 sm:pb-15 md:pb-20">
        <Faq />
      </section>

      <section id="join">
        <Join />
      </section>

      <Switcher current={variant} />
    </div>
  );
}
