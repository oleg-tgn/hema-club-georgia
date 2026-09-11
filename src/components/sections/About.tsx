import config from "@payload-config";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
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
      className="group flex w-full items-stretch gap-2 rounded-lg border border-black/20 p-4 text-night text-left hover:border-black/80"
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative flex flex-col gap-2">
          {join.title && (
            <>
              <div aria-hidden className="h-8" />
              <h3 className="text-3xl pointer-events-none absolute inset-0 z-10 flex items-start bg-paper-100/0 uppercase transition-all duration-300 group-hover:pointer-events-auto group-hover:bg-paper-100 group-hover:text-5xl">
                {join.title}
              </h3>
            </>
          )}
          {join.text && <p className="text-sm leading-5 ">{join.text}</p>}
        </div>
        {join.buttonLabel && (
          <span className="text-base leading-6 font-semibold">
            {join.buttonLabel}
          </span>
        )}
      </div>
      <div className="relative w-48 shrink-0">
        <Image
          src="/images/About-join.svg"
          alt=""
          aria-hidden
          fill
          className="object-contain"
        />
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
          <p className="text-justify font-serif text-lg font-medium whitespace-pre-line">
            {about.text}
          </p>

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
