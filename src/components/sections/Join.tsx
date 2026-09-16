import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";
import joinImage from "@public/images/join.webp";

export default async function Join() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const join = await payload.findGlobal({
    slug: "join",
    locale: locale as Locale,
  });

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-10 lg:flex-row xl:gap-24">
      <div className="flex aspect-600/404 w-full lg:max-w-118.25 lg:flex-1 xl:max-w-159.5 2xl:max-w-233">
        <Image
          src={joinImage}
          alt=""
          aria-hidden
          className="h-auto w-full object-bottom"
        />
      </div>
      <div className="mx-auto flex w-full max-w-84 flex-col gap-4">
        <div className="border-night flex flex-row justify-between border-t border-b py-1 text-base font-semibold">
          <span>{join.topLeftText}</span>
          <span>{join.topRightText}</span>
        </div>

        <Heading size="lg" as="h2" className="text-center">
          {join.title}
        </Heading>

        <RichText
          data={join.description}
          className="text-night [&_a]:text-gold-200 [&_a]:hover:text-gold-100 text-center font-(family-name:--font-literata) text-[18px] leading-7 [&_a]:transition-colors"
        />

        <div className="border-night flex flex-row justify-center border-t border-b py-1 text-center text-base font-semibold">
          <span>{join.bottomText}</span>
        </div>
      </div>
    </div>
  );
}
