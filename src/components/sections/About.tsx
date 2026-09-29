import config from "@payload-config";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Locale } from "@/i18n/routing";
import type { About as AboutGlobal } from "@/payload-types";
import Guard from "../ui/Guards";
import Heading from "../ui/Heading";

type AboutJoin = NonNullable<AboutGlobal["join"]>;

function JoinTeaser({ join }: { join: AboutJoin }) {
  return (
    <a
      href="#join"
      className="group text-night flex w-full rounded-[9px] border border-black/20 p-4 text-center hover:border-black/80 sm:text-left"
    >
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex w-63 flex-col gap-2 sm:min-w-0 sm:flex-1">
          <div className="relative flex flex-col gap-2.5">
            <div aria-hidden className="h-8" />
            <h3 className="bg-paper-100/0 group-hover:bg-paper-100 pointer-events-none absolute inset-0 z-10 flex items-start justify-center transition-colors duration-300 group-hover:pointer-events-auto sm:justify-start">
              <span className="font-serif text-[32px] leading-none tracking-tight uppercase transition-[font-size] duration-300 group-hover:text-6xl">
                {join.title}
              </span>
            </h3>
            <p className="text-sm leading-5">{join.text}</p>
          </div>
          {join.buttonLabel && (
            <span className="text-base font-semibold">{join.buttonLabel}</span>
          )}
        </div>
        <div className="relative h-26.75 w-48 shrink-0">
          <Image
            src="/images/About-join.svg"
            alt=""
            aria-hidden
            fill
            className="object-contain"
          />
        </div>
      </div>
    </a>
  );
}

export default async function About() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const about = await payload.findGlobal({
    slug: "about",
    locale: locale as Locale,
  });

  return (
    <div className="flex w-full justify-center xl:-mx-10 xl:w-auto">
      <div className="flex w-full flex-col gap-8 md:mx-auto md:max-w-172 lg:max-w-167 xl:max-w-none xl:flex-row xl:gap-10.5">
        <div className="flex w-full flex-row items-end justify-center gap-8 xl:flex-col xl:items-center xl:justify-start">
          <Guard name="vom-tag" className="flex w-72 sm:w-80 2xl:w-100" />
        </div>

        <div className="flex w-full flex-col gap-6 text-center xl:max-w-lg">
          <Heading size="lg" as="h2">
            {about.title}
          </Heading>
          <RichText
            data={about.description}
            className="text-justify font-(family-name:--font-literata) text-[18px] leading-7"
          />
        </div>

        <div className="flex w-full flex-row items-end justify-center gap-8 xl:flex-col xl:items-center xl:justify-end">
          <Guard name="alber" className="flex w-72 sm:w-80 2xl:w-100" />
        </div>
      </div>
    </div>
  );
}
