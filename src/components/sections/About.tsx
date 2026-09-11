import config from "@payload-config";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Locale } from "@/i18n/routing";
import type { About as AboutGlobal } from "@/payload-types";
import Heading from "../ui/Heading";

type AboutJoin = NonNullable<AboutGlobal["join"]>;

function VomTag({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-vom-tag.svg"
      alt="Vom Tag"
      title="Vom Tag"
      width={222}
      height={285}
      className={`h-auto w-[200px] sm:w-[222px] 2xl:w-[259px] ${className}`}
    />
  );
}

function Pflug({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-pflug.svg"
      alt="Pflug"
      title="Pflug"
      width={332}
      height={183}
      className={`h-auto w-[332px] 2xl:w-[385px] ${className}`}
    />
  );
}

function Alber({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-alber.svg"
      alt="Alber"
      title="Alber"
      width={304}
      height={188}
      className={`h-auto w-[304px] 2xl:w-[353px] ${className}`}
    />
  );
}

function Ochs({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-ochs.svg"
      alt="Ochs"
      title="Ochs"
      width={274}
      height={241}
      className={`h-auto w-[243px] xl:w-[274px] 2xl:w-[317px] ${className}`}
    />
  );
}

function JoinTeaser({ join }: { join: AboutJoin }) {
  return (
    <a
      href="#join"
      className="group flex w-full rounded-lg border border-black/20 p-4 text-night text-center sm:text-left hover:border-black/80"
    >
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2 w-63 sm:w-110 xl:w-63">
          <div className="relative flex flex-col gap-2.5">
            <div aria-hidden className="h-8" />
            <h3 className="font-serif text-[32px] leading-none pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-paper-100/0 uppercase transition-[background-color,font-size] duration-300 group-hover:pointer-events-auto group-hover:bg-paper-100 group-hover:text-6xl sm:justify-start">
              {join.title}
            </h3>
            <p className="text-sm leading-5">{join.text}</p>
          </div>
          {join.buttonLabel && (
            <span className="text-base font-semibold">{join.buttonLabel}</span>
          )}
        </div>
        <div className="relative w-48 h-26.75">
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
    <div className="flex w-full justify-center xl:w-auto xl:-mx-10">
      <div className="flex flex-col w-full gap-8 md:max-w-167 md:mx-auto xl:flex-row xl:max-w-none xl:gap-10.5">
        <div className="flex flex-row w-full gap-8 justify-center items-end xl:flex-col xl:justify-between xl:items-center">
          <VomTag className="flex" />
          <Pflug className="hidden sm:flex xl:hidden" />
          <Ochs className="hidden xl:flex" />
        </div>

        <div className="flex flex-col text-center gap-6 w-full xl:max-w-lg">
          <Heading size="lg" as="h2">
            {about.title}
          </Heading>
          <RichText
            data={about.description}
            className="text-justify font-(family-name:--font-literata) text-[18px]"
          />

          {about.join?.text && <JoinTeaser join={about.join} />}
        </div>

        <div className="flex flex-row w-full gap-8 justify-center items-end xl:flex-col xl:py-22.5 xl:justify-between xl:items-center">
          <Pflug className="hidden xl:flex" />
          <Ochs className="hidden sm:flex xl:hidden" />
          <Alber className="flex" />
        </div>
      </div>
    </div>
  );
}
