import CtaTile from "../ui/CtaTile";
import Logo from "../icons/Logo";
import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import WeaponIcon from "../icons/WeaponIcon";
import { Weapon } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;

function DescriptionPanel({
  t,
  description,
}: {
  t: TFunc;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row md:flex-col">
      <p className="text-off-white flex w-full text-base font-normal">
        {description}
      </p>
      <div className="flex h-10.5 w-full flex-row gap-2 sm:h-22">
        <CtaTile href="#join" className="flex flex-[4_0_0] text-xl sm:hidden">
          {t.rich("ctaJoinMobile")}
        </CtaTile>

        <CtaTile href="#join" className="hidden flex-[3_0_0] text-xl sm:flex">
          {t.rich("ctaJoin", { br: () => <br /> })}
        </CtaTile>
        <CtaTile
          href="#schedule"
          className="flex-[6_0_0] text-xl sm:text-[34px]"
        >
          {t.rich("ctaSchedule")}
        </CtaTile>
      </div>
    </div>
  );
}

function WeaponsPanel({ weapons }: { weapons: Weapon[] }) {
  if (weapons.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-2 md:gap-4 lg:gap-2 xl:flex-row xl:justify-end xl:gap-4">
      {weapons.map((weapon) => {
        return (
          <div
            key={weapon.id}
            className="bg-gold-100 border-gold-100 sm:border-off-white/30 flex h-38 w-full flex-col items-start justify-between rounded-[20px] border p-4 sm:h-auto sm:justify-normal sm:gap-4 sm:rounded-lg sm:border sm:bg-black/40 sm:backdrop-blur-md lg:flex-row lg:justify-between xl:max-w-59 xl:flex-col 2xl:max-w-68.5"
          >
            <div className="flex h-10.5 w-full lg:w-auto xl:w-full">
              <WeaponIcon
                slug={weapon.slug}
                className="text-night sm:text-off-white h-full w-auto"
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-43 xl:w-full">
              <span className="text-night sm:text-paper-100 font-serif text-[32px] leading-none tracking-tight">
                {weapon.name}
              </span>
              {weapon.label && (
                <RichText
                  data={weapon.label}
                  className="text-night/80 [&_strong]:text-semibold sm:text-gold-100 text-base leading-6"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function Hero() {
  const t = await getTranslations("Hero");
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const [{ docs: weapons }, hero] = await Promise.all([
    payload.find({
      collection: "weapons",
      depth: 0,
      limit: 10,
      locale: locale as Locale,
      sort: "order",
    }),
    payload.findGlobal({ slug: "hero", locale: locale as Locale }),
  ]);

  return (
    <>
      <section className="relative mb-(--hero-gap) flex min-h-[calc(100dvh-var(--header-height)-var(--hero-gap))] w-full flex-col justify-between overflow-hidden rounded-[20px] p-5 text-white sm:gap-10 md:rounded-[40px] md:p-10">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hema-intro.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="bg-hero-gradient absolute inset-0" />

        <div className="relative h-19 w-auto max-w-full self-start sm:h-33 md:h-37 xl:h-47">
          <Logo className="h-full w-auto" variant="hero" />
        </div>

        <div className="relative flex w-full flex-col justify-between sm:flex-col-reverse sm:gap-10 md:max-w-77 lg:mt-auto lg:max-w-full lg:flex-row lg:items-end">
          <div className="flex w-full md:max-w-77 lg:mt-auto xl:max-w-91">
            <DescriptionPanel t={t} description={hero.description} />
          </div>

          <div className="hidden w-full sm:flex sm:max-w-[256px] md:max-w-77 lg:max-w-110 xl:max-w-none">
            <WeaponsPanel weapons={weapons} />
          </div>
        </div>
      </section>
      <section className="flex sm:hidden">
        <WeaponsPanel weapons={weapons} />
      </section>
    </>
  );
}
