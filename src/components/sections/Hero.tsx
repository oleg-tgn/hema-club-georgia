import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
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
    <div className="text-night flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-12">
      <div className="flex w-full max-w-160 flex-col gap-6 lg:flex-1">
        <Heading as="h1" className="text-center lg:text-left">
          St. George HEMA School
        </Heading>
        {welcome.description && (
          <RichText
            data={welcome.description}
            className="[&_a]:text-gold-200 [&_a]:hover:text-gold-100 text-night/85 font-text text-body flex max-w-160 flex-col gap-4 [&_a]:transition-colors"
          />
        )}
        <Tailpiece />
      </div>

      <div className="aspect-video w-full max-w-160 overflow-hidden rounded-2xl lg:aspect-4/3 lg:w-5/11 lg:max-w-none">
        <PausableVideo src="/videos/hema-intro.webm" />
      </div>
    </div>
  );
}
