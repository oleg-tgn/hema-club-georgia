import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";
import joinImage from "@public/images/join.png";

export default async function Join() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const join = await payload.findGlobal({
    slug: "join",
    locale: locale as Locale,
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-24">
      <div className="flex-1">
        <Image
          src={joinImage}
          alt=""
          aria-hidden
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-col w-84 gap-4">
        <div className="flex flex-row justify-between border-t-2 border-b-2 border-night text-base font-semibold">
          <span>{join.topLeftText}</span>
          <span>{join.topRightText}</span>
        </div>

        <Heading size="lg" as="h2">
          {join.title}
        </Heading>

        <RichText
          data={join.description}
          className="text-night text-center [&_a]:text-gold-100 [&_a]:transition-colors [&_a]:hover:text-gold-200"
        />

        <div className="flex flex-row justify-center border-t-2 border-b-2 border-night text-base font-semibold text-center">
          <span>{join.bottomText}</span>
        </div>
      </div>
    </div>
  );
}
