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
    <div className="flex flex-col">
      <Hero />

      {/* padding instead of a flex gap: the nav highlight (globals.css)
          keys off each section's own box, and a gap belongs to neither
          neighbor. */}
      <section id="about" className="pt-20 pb-20">
        <About />
      </section>

      <section id="schedule" className="pb-20">
        <Schedule />
      </section>

      <section id="weapons" className="pb-20">
        <Weapons />
      </section>

      <section id="instructors" className="pb-20">
        <Instructors />
      </section>

      <section id="gallery" className="pb-20">
        <Gallery />
      </section>

      <section id="join">
        <Join />
      </section>
    </div>
  );
}
