import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import Guard from "../ui/Guards";
import Heading from "../ui/Heading";

export default async function Welcome() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const welcome = await payload.findGlobal({
    slug: "welcome-section",
    locale: locale as Locale,
  });

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col gap-4 md:mx-auto md:max-w-172 md:gap-8 lg:max-w-167 xl:max-w-none xl:flex-row xl:gap-10.5">
        <div className="flex w-full flex-row items-end justify-center gap-8 xl:flex-col xl:items-center xl:justify-start">
          <Guard name="vom-tag" className="flex w-64 sm:w-68 2xl:w-80" />
        </div>

        <div className="flex w-full flex-col gap-6 px-2 text-center xl:max-w-lg">
          <Heading size="lg" as="h2">
            {welcome.title}
          </Heading>
          <p className="text-justify font-(family-name:--font-literata) text-[18px] leading-7 whitespace-pre-line">
            {welcome.text}
          </p>
        </div>

        <div className="flex w-full flex-row items-end justify-center gap-8 xl:flex-col xl:items-center xl:justify-end">
          <Guard name="alber" className="flex w-64 sm:w-68 2xl:w-80" />
        </div>
      </div>
    </div>
  );
}
