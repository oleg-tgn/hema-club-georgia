import { Fragment } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Instructors from "@/components/Instructors";
import About from "@/components/About";
import Schedule from "@/components/Schedule";

type Schedule = {
  day: string;
  rows: { weapon: string; time: string }[];
};

export const revalidate = 60;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tGallery = await getTranslations("Gallery");

  return (
    <div className="flex flex-col gap-20">
      <Hero />

      <section id="about">
        <About />
      </section>

      <section id="schedule">
        <Schedule />
      </section>

      <section id="weapons" className="w-full py-16">
        <div className="text-center gap-6 py-10">
          <h2 className="text-3xl font-bold">Weapons</h2>
          <p className="text-xl">
            Our club provides all training steel — longswords, rapiers, sabres,
            and sword & buckler.
          </p>
          <p className="text-xl">
            We also provide protective gear — armor and fencing masks.
          </p>
        </div>
      </section>

      <section id="instructors">
        <Instructors />
      </section>

      <section id="gallery" className="w-full py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{tGallery("title")}</h2>
          <Gallery />
        </div>
      </section>

      <section id="join" className="w-full py-16">
        <div className="text-center gap-6 py-10">
          <h2 className="text-3xl font-bold">Join the club</h2>
          <p className="text-xl">
            To join, message us on Instagram or just drop by the gym during any
            of our scheduled class times.
          </p>
        </div>
      </section>
    </div>
  );
}
