import Hero from "@/components/sections/Hero";
import Schedule from "@/components/sections/Schedule";
import Faq from "@/components/sections/Faq";
import Join from "@/components/sections/Join";

export const revalidate = 60;

// Padding, not a flex gap: the nav highlight (globals.css) needs the
// sections back-to-back, or it goes blank while scrolling through a gap.
const sectionGap = "pb-10 sm:pb-15 md:pb-20 xl:pb-25";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className={`pt-5 md:pt-10 ${sectionGap}`}>
        <Hero />
      </section>

      <section id="schedule" className={sectionGap}>
        <Schedule />
      </section>

      <section id="faq" className={sectionGap}>
        <Faq />
      </section>

      <section id="join">
        <Join />
      </section>
    </div>
  );
}
