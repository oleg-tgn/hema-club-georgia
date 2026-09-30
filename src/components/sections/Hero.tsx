import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";
import PausableVideo from "../ui/PausableVideo";

// Book-style tailpiece closing the welcome text: two crossed swords between
// hairlines.
function SwordsOrnament() {
  const sword = (
    <g stroke="currentColor" strokeLinecap="round" fill="none">
      <path d="M9 23 L 27 5" strokeWidth="1.6" />
      <path d="M6.5 20.5 L 11.5 25.5" strokeWidth="1.6" />
      <path d="M9 23 L 5.5 26.5" strokeWidth="2.2" />
      <circle cx="4.6" cy="27.4" r="1.3" fill="currentColor" stroke="none" />
    </g>
  );

  return (
    <div
      aria-hidden
      className="text-gold-200 flex max-w-160 items-center justify-center gap-4"
    >
      <span className="bg-gold-200/60 h-px w-16" />
      <svg viewBox="0 0 32 32" className="h-8 w-auto">
        {sword}
        <g transform="matrix(-1 0 0 1 32 0)">{sword}</g>
      </svg>
      <span className="bg-gold-200/60 h-px w-16" />
    </div>
  );
}

// The school name leads as the page's h1; the welcome text sits beside a
// modest video instead of under a full-screen one, so the schedule heading
// already shows on the first screen.
export default async function Hero() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const welcome = await payload.findGlobal({
    slug: "welcome-section",
    locale: locale as Locale,
  });

  return (
    <div className="text-night grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-6">
        <Heading size="lg" as="h1">
          St. George HEMA School
        </Heading>
        <p className="max-w-160 font-(family-name:--font-literata) text-[18px] leading-7 whitespace-pre-line">
          {welcome.text}
        </p>
        <SwordsOrnament />
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-[20px] lg:aspect-4/3">
        <PausableVideo src="/videos/hema-intro.webm" />
      </div>
    </div>
  );
}
