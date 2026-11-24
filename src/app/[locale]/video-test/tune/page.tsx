import Hero from "@/components/sections/Hero";
import Schedule from "@/components/sections/Schedule";
import Join from "@/components/sections/Join";
import VideoTuner from "./VideoTuner";

// Temporary: the home page with a slider panel for the Hero video look.
// Mirrors src/app/[locale]/page.tsx; remove once a look is chosen.
const sectionGap = "pb-10 sm:pb-15 md:pb-20 xl:pb-25";

export default function VideoTunePage() {
  return (
    <div className="flex flex-col">
      <section className={`pt-2.5 md:pt-5 ${sectionGap}`}>
        <Hero
          video={{
            src: "/videos/fencing.mp4",
            className: "[filter:var(--video-filter)]",
            overlayClassName: "[background:var(--video-overlay)]",
          }}
        />
      </section>

      <section id="schedule" className={sectionGap}>
        <Schedule />
      </section>

      <section id="join">
        <Join />
      </section>

      <VideoTuner />
    </div>
  );
}
