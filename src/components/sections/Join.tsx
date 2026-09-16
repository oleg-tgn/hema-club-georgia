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
    <div className="flex flex-col gap-4 items-center sm:gap-10 lg:flex-row lg:gap-24">
      <div className="flex w-full lg:flex-1 lg:max-w-118.25 xl:max-w-159.5 2xl:max-w-233 aspect-600/404">
        <Image
          src={joinImage}
          alt=""
          aria-hidden
          className="h-auto w-full object-bottom"
        />
      </div>
      <div className="flex flex-col w-full max-w-84 mx-auto gap-4 ">
        <div className="flex flex-row justify-between border-t border-b border-night text-base font-semibold">
          <span>{join.topLeftText}</span>
          <span>{join.topRightText}</span>
        </div>

        <Heading size="lg" as="h2" className="text-center">
          {join.title}
        </Heading>

        <RichText
          data={join.description}
          className="font-serif text-night text-center text-[18px] leading-7 [&_a]:text-gold-200 [&_a]:transition-colors [&_a]:hover:text-gold-100"
        />

        <div className="flex flex-row justify-center border-t border-b border-night text-base font-semibold text-center">
          <span>{join.bottomText}</span>
        </div>
      </div>
    </div>
  );
}
