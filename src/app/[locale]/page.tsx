import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Instructors from "@/components/sections/Instructors";
import About from "@/components/sections/About";
import Schedule from "@/components/sections/Schedule";
import Weapons from "@/components/sections/Weapons";
import Join from "@/components/sections/Join";

export const revalidate = 60;

export default function HomePage() {
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

      <section id="instructors">
        <Instructors />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="join">
        <Join />
      </section>
    </div>
  );
}
