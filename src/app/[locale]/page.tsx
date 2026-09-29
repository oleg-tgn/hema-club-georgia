import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Schedule from "@/components/sections/Schedule";
import Faq from "@/components/sections/Faq";
import Join from "@/components/sections/Join";

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* padding instead of a flex gap: the nav highlight (globals.css)
          keys off each section's own box, and a gap belongs to neither
          neighbor. */}
      <section id="about" className="py-10 sm:py-15 md:py-20">
        <About />
      </section>

      <section id="schedule" className="pb-10 sm:pb-15 md:pb-20">
        <Schedule />
      </section>

      <section id="faq" className="pb-10 sm:pb-15 md:pb-20">
        <Faq />
      </section>

      <section id="join">
        <Join />
      </section>
    </div>
  );
}
