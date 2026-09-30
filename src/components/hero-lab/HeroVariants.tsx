// Prototype hero variants for comparison at /hero-lab/[a-f].
// Throwaway: delete this folder and src/app/[locale]/hero-lab once a
// variant is chosen.
import Image from "next/image";
import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import CtaTile from "../ui/CtaTile";
import Heading from "../ui/Heading";
import PausableVideo from "./PausableVideo";

// Short copy for the merged hero+welcome variants. Not in the CMS yet on
// purpose - it's only here to judge the layouts.
const LEAD: Record<string, string> = {
  ru: "Школа исторического европейского фехтования в Тбилиси. Изучаем старинные трактаты и учимся работать мечом так, как это делали мастера прошлого. Никогда не держали меч в руках — приходите на пробную тренировку.",
  en: "A school of historical European martial arts in Tbilisi. We study old fencing treatises and learn to fight the way the masters of the past did. Never held a sword? Come to a trial class.",
};

const FREE_TRIAL: Record<string, string> = {
  ru: "Первое занятие бесплатно",
  en: "First class is free",
};

const LANGUAGES = "RU · EN · GE";

const VIDEO_SRC = "/videos/hema-intro.webm";

async function loadData() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const [welcome, address, { docs: weapons }] = await Promise.all([
    payload.findGlobal({ slug: "welcome-section", locale: locale as Locale }),
    payload.findGlobal({ slug: "address", locale: locale as Locale }),
    payload.find({
      collection: "weapons",
      depth: 0,
      limit: 10,
      locale: locale as Locale,
      sort: "order",
    }),
  ]);

  const lang = locale === "ru" ? "ru" : "en";

  return {
    welcome,
    address,
    weaponNames: weapons.map((w) => w.name).join(" · "),
    lead: LEAD[lang],
    freeTrial: FREE_TRIAL[lang],
  };
}

type Data = Awaited<ReturnType<typeof loadData>>;

function HeroVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      src={VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

function Facts({ data }: { data: Data }) {
  const rows = [
    data.weaponNames,
    LANGUAGES,
    data.freeTrial,
    data.address.addressLine,
  ];

  return (
    <ul className="border-night/20 flex flex-col border-t">
      {rows.map((row) => (
        <li key={row} className="border-night/20 border-b py-2 text-base">
          {row}
        </li>
      ))}
    </ul>
  );
}

async function Ctas() {
  const t = await getTranslations("Hero");

  return (
    <div className="grid w-full max-w-100 grid-cols-1 gap-2 sm:grid-cols-[3fr_2fr]">
      <CtaTile href="#schedule" className="h-12 text-xl sm:h-16">
        {t.rich("ctaSchedule")}
      </CtaTile>
      <CtaTile href="#join" className="h-12 text-xl sm:h-16">
        {t.rich("ctaJoinMobile")}
      </CtaTile>
    </div>
  );
}

// A: the full-screen video stays; the welcome text moves on top of it.
export async function HeroA() {
  const data = await loadData();

  return (
    <section className="relative mb-(--hero-gap) flex min-h-[calc(100dvh-var(--header-height)-var(--hero-gap))] w-full flex-col justify-end overflow-hidden rounded-[20px] p-5 text-white md:rounded-[40px] md:p-10">
      <HeroVideo className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex max-w-160 flex-col gap-5">
        <Image
          src="/images/hero-logo.svg"
          alt="St. George HEMA School"
          width={364}
          height={189}
          loading="eager"
          className="h-16 w-auto self-start sm:h-24"
        />
        <p className="text-off-white font-(family-name:--font-literata) text-[18px] leading-7">
          {data.welcome.text}
        </p>
        <Ctas />
      </div>
    </section>
  );
}

// B: the video shrinks to a band; the welcome section follows unchanged.
export async function HeroB() {
  return (
    <section className="relative flex h-[55dvh] min-h-80 w-full flex-col justify-between overflow-hidden rounded-[20px] p-5 text-white md:rounded-[40px] md:p-10">
      <HeroVideo className="absolute inset-0" />
      <div className="bg-hero-gradient absolute inset-0" />

      <Image
        src="/images/hero-logo.svg"
        alt="St. George HEMA School"
        width={364}
        height={189}
        loading="eager"
        className="relative h-19 w-auto self-start sm:h-28 xl:h-36"
      />
      <div className="relative">
        <Ctas />
      </div>
    </section>
  );
}

// C: text leads, the video sits beside it like a photo in an article.
export async function HeroC() {
  const data = await loadData();

  return (
    <section className="text-night grid w-full grid-cols-1 gap-6 py-6 md:py-10 lg:min-h-[calc(100dvh-var(--header-height))] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-6">
        <Heading size="lg" as="h1">
          St. George HEMA School
        </Heading>
        <p className="font-(family-name:--font-literata) text-[18px] leading-7">
          {data.lead}
        </p>
        <Facts data={data} />
        <Ctas />
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-[20px] lg:aspect-4/5 lg:max-h-[calc(100dvh-var(--header-height)-5rem)] lg:rounded-[40px]">
        <HeroVideo />
      </div>
    </section>
  );
}

// D: no hero at all - a plain heading and facts, then straight to schedule.
export async function HeroD() {
  const data = await loadData();

  return (
    <section className="text-night flex w-full flex-col gap-6 pt-10 pb-4 md:pt-16">
      <Heading size="lg" as="h1">
        St. George HEMA School
      </Heading>
      <p className="max-w-180 font-(family-name:--font-literata) text-[18px] leading-7">
        {data.lead}
      </p>
      <p className="border-night/20 flex flex-wrap gap-x-6 gap-y-1 border-y py-2 text-base font-semibold">
        <span>{data.weaponNames}</span>
        <span>{LANGUAGES}</span>
        <span>{data.freeTrial}</span>
        <span>{data.address.addressLine}</span>
      </p>
    </section>
  );
}

// E: C mirrored - the video leads on the left, the text answers on the right.
// On mobile the text still comes first. No CTA buttons.
export async function HeroE() {
  const data = await loadData();

  return (
    <section className="text-night grid w-full grid-cols-1 gap-6 py-6 md:py-10 lg:min-h-[calc(100dvh-var(--header-height))] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
      <div className="order-last aspect-video w-full overflow-hidden rounded-[20px] lg:order-first lg:aspect-4/5 lg:max-h-[calc(100dvh-var(--header-height)-5rem)] lg:rounded-[40px]">
        <PausableVideo src={VIDEO_SRC} />
      </div>

      <div className="flex flex-col gap-6">
        <Heading size="lg" as="h1">
          St. George HEMA School
        </Heading>
        <p className="font-(family-name:--font-literata) text-[18px] leading-7">
          {data.lead}
        </p>
        <Facts data={data} />
      </div>
    </section>
  );
}

// F: compact - the block is only as tall as its text and the video is a
// modest figure beside it, so the schedule heading shows on first screen.
// No CTA buttons.
export async function HeroF() {
  const data = await loadData();

  return (
    <section className="text-night grid w-full grid-cols-1 gap-6 pt-6 md:pt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-6">
        <Heading size="lg" as="h1">
          St. George HEMA School
        </Heading>
        <p className="max-w-160 font-(family-name:--font-literata) text-[18px] leading-7">
          {data.lead}
        </p>
        <Facts data={data} />
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-[20px] lg:aspect-4/3">
        <PausableVideo src={VIDEO_SRC} />
      </div>
    </section>
  );
}
