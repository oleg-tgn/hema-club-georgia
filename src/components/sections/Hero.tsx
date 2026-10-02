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
      <div className="flex w-full max-w-160 flex-col gap-6 justify-self-center lg:justify-self-stretch">
        <Heading as="h1" className="text-center lg:text-left">
          St. George HEMA School
        </Heading>
        <p className="max-w-160 font-text text-xl leading-[30px] whitespace-pre-line">
          {welcome.text}
        </p>
        <Tailpiece />
      </div>

      <div className="aspect-video w-full max-w-160 justify-self-center overflow-hidden rounded-[20px] lg:aspect-4/3 lg:max-w-none lg:justify-self-stretch">
        <PausableVideo src="/videos/hema-intro.webm" />
      </div>
    </div>
  );
}
