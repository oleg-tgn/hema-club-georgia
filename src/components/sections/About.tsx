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
    <div
      className={`relative w-[200px] h-[257px] sm:w-[222px] h-[285px] ${className}`}
    >
      <Image
        src="/images/about-vom-tag.svg"
        alt="Vom Tag"
        title="Vom Tag"
        fill
        className="object-contain"
      />
    </div>
  );
}

function Pflug({ className }: { className: string }) {
  return (
    <div className={`relative w-[332px] h-[183px] ${className}`}>
      <Image
        src="/images/about-pflug.svg"
        alt="Pflug"
        title="Pflug"
        fill
        className="object-contain"
      />
    </div>
  );
}

function Alber({ className }: { className: string }) {
  return (
    <div className={`relative w-[304px] h-[188px] ${className}`}>
      <Image
        src="/images/about-alber.svg"
        alt="Alber"
        title="Alber"
        fill
        className="object-contain"
      />
    </div>
  );
}

function Ochs({ className }: { className: string }) {
  return (
    <div className={`relative w-[243px] h-[209px] ${className}`}>
      <Image
        src="/images/about-ochs.svg"
        alt="Ochs"
        title="Ochs"
        fill
        className="object-contain"
      />
    </div>
  );
}

function JoinTeaser({ join }: { join: AboutJoin }) {
  return (
    <a
      href="#join"
      className="group flex w-full rounded-lg border border-black/20 p-4 text-night text-center sm:text-left hover:border-black/80"
    >
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2 w-63 sm:w-110">
          <div className="relative flex flex-col gap-2.5">
            <div aria-hidden className="h-8" />
            <h3 className="font-serif text-[32px] leading-none pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-paper-100/0 uppercase transition-all duration-300 group-hover:pointer-events-auto group-hover:bg-paper-100 group-hover:text-6xl sm:justify-start">
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
      <div className="flex flex-wrap w-full gap-8 md:max-w-167">
        <div className="flex flex-row w-full gap-8 justify-center items-end">
          <VomTag className="flex" />
          <Pflug className="hidden sm:flex" />
        </div>

        <div className="flex flex-col text-center gap-6 w-full">
          <Heading size="lg" as="h2">
            {about.title}
          </Heading>
          <RichText
            data={about.description}
            className="text-justify font-(family-name:--font-literata) text-[18px] "
          />

          {about.join?.text && <JoinTeaser join={about.join} />}
        </div>

        <div className="flex flex-row w-full gap-8 justify-center items-end">
          <Ochs className="hidden sm:flex" />
          <Alber className="flex" />
        </div>
      </div>
    </div>
  );
}
