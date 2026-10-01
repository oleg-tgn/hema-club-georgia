import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";
import PausableVideo from "../ui/PausableVideo";
import Tailpiece from "../ui/Tailpiece";

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
        <Tailpiece />
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-[20px] lg:aspect-4/3">
        <PausableVideo src="/videos/hema-intro.webm" />
      </div>
    </div>
  );
}
