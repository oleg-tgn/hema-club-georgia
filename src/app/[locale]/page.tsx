import { setRequestLocale } from "next-intl/server";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Instructors from "@/components/sections/Instructors";
import About from "@/components/sections/About";
import Schedule from "@/components/sections/Schedule";
import Weapons from "@/components/sections/Weapons";

type Schedule = {
  day: string;
  rows: { weapon: string; time: string }[];
};

export const revalidate = 60;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-20">
      <Hero />

      <section id="about">
        <About />
      </section>

      <section id="schedule">
        <Schedule />
      </section>

      <section id="weapons">
        <Weapons />
      </section>

      <section id="instructors" className="w-full py-16">
        <Instructors />
      </section>

      <section id="gallery" className="w-full py-16">
        <Gallery />
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
