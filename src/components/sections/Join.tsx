import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";

export default async function Join() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const join = await payload.findGlobal({
    slug: "join",
    locale: locale as Locale,
  });

  return (
    <div className="flex flex-col md:flex-row gap-24">
      <div className="relative flex h-157 md:w-4xl">
        <Image
          src="/images/join.png"
          alt=""
          aria-hidden
          fill
          className="object-contain object-top-center"
        />
      </div>
      <div className="flex flex-col w-84 gap-4">
        <div className="flex flex-row justify-between border-t-2 border-b-2 border-night">
          <span>{join.topLeftText}</span>
          <span>{join.topLeftText}</span>
        </div>

        <Heading size="lg" as="h2">
          {join.title}
        </Heading>

        <RichText data={join.description} />

        <div className="flex flex-row justify-between border-t-2 border-b-2 border-night">
          <span>{join.bottomText}</span>
        </div>
      </div>
    </div>
  );
}
