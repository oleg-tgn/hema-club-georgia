import config from "@payload-config";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Locale } from "@/i18n/routing";
import type { About as AboutGlobal } from "@/payload-types";
import Heading from "../ui/Heading";

type AboutJoin = NonNullable<AboutGlobal["join"]>;

function AboutImage({ src }: { src: string }) {
  return (
    <div className="relative aspect-square">
      <Image src={src} alt="" aria-hidden fill className="object-contain" />
    </div>
  );
}

function JoinTeaser({ join }: { join: AboutJoin }) {
  return (
    <a
      href="#join"
      className="group flex w-full rounded-lg border border-black/20 p-4 text-night text-center sm:text-left hover:border-black/80"
    >
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-2 w-63">
          <div className="relative flex flex-col gap-2.5">
            <div aria-hidden className="h-8" />
            <h3 className="font-serif text-[32px] leading-8 pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-paper-100/0 uppercase transition-all duration-300 group-hover:pointer-events-auto group-hover:bg-paper-100 group-hover:text-6xl sm:justify-start">
              {join.title}
            </h3>
            <p className="text-sm leading-5">{join.text}</p>
          </div>
          {join.buttonLabel && (
            <span className="text-base font-semibold">{join.buttonLabel}</span>
          )}
        </div>
        <div className="relative w-48 h-26.75 sm:w-48">
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
    <div className="w-full">
      <div className="grid grid-cols-1 gap-8 [grid-template-areas:'img1'_'content'_'img4'] sm:grid-cols-2 sm:[grid-template-areas:'img1_img3'_'content_content'_'img2_img4'] md:grid-cols-[1fr_minmax(0,32rem)_1fr] md:[grid-template-areas:'img1_content_img3'_'img2_content_img4']">
        <div className="[grid-area:img1]">
          <AboutImage src="/images/about-1.svg" />
        </div>

        <div className="hidden [grid-area:img3] sm:block">
          <AboutImage src="/images/about-3.svg" />
        </div>

        <div className="[grid-area:content] flex flex-col text-center gap-6">
          <Heading size="lg" as="h2">
            {about.title}
          </Heading>
          <RichText
            data={about.description}
            className="text-justify font-(family-name:--font-literata) text-[18px] "
          />

          {about.join?.text && <JoinTeaser join={about.join} />}
        </div>

        <div className="hidden [grid-area:img2] sm:block">
          <AboutImage src="/images/about-2.svg" />
        </div>

        <div className="[grid-area:img4]">
          <AboutImage src="/images/about-4.svg" />
        </div>
      </div>
    </div>
  );
}
