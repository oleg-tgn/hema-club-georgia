import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Schedule from "@/components/sections/Schedule";
import Join from "@/components/sections/Join";

// Temporary: the home page with the "old film" Hero video - the footage at
// 18 fps plus grain and flicker (media-film in globals.css) - to compare
// with the plain toned video on the home page. Mirrors
// src/app/[locale]/page.tsx; remove once a look is chosen.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const sectionGap = "pb-10 sm:pb-15 md:pb-20 xl:pb-25";

export default function VideoFilmPage() {
  return (
    <div className="flex flex-col">
      <section className={`pt-2.5 md:pt-5 ${sectionGap}`}>
        <Hero
          video={{
            src: "/videos/fencing-film.webm",
            className: "media-tone",
            overlayClassName: "media-vignette media-film",
          }}
        />
      </section>

      <section id="schedule" className={sectionGap}>
        <Schedule />
      </section>

      <section id="join">
        <Join />
      </section>
    </div>
  );
}
