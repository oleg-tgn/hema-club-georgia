import CtaTile from "../ui/CtaTile";
import Logo from "../icons/Logo";
import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import { weaponIcons } from "../icons/weapons";
import { Weapon } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;

function DescriptionPanel({ t }: { t: TFunc }) {
  return (
    <div className="flex flex-col w-full gap-3 sm:flex-row md:flex-col">
      <p className="flex w-full text-base font-normal text-off-white">
        {t("description")}
      </p>
      <div className="flex flex-row w-full h-10.5 gap-2 sm:h-22">
        <CtaTile
          href="#schedule"
          className="flex-[4_0_0] text-xl flex sm:hidden"
        >
          {t.rich("ctaJoinMobile")}
        </CtaTile>

        <CtaTile
          href="#schedule"
          className="flex-[3_0_0] text-xl hidden sm:flex"
        >
          {t.rich("ctaJoin", { br: () => <br /> })}
        </CtaTile>
        <CtaTile href="#about" className="flex-[6_0_0] text-xl sm:text-[34px]">
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
    <div className="flex flex-col w-full gap-2 md:gap-4 xl:flex-row">
      {weapons.map((weapon) => {
        const WeaponIcon = weaponIcons[weapon.slug];

        return (
          <div
            key={weapon.id}
            className="flex flex-col w-full align-center gap-2 p-4 rounded-[20px] bg-gold-100 border border-gold-100 sm:bg-transparent sm:backdrop-blur-md sm:gap-4 sm:border sm:border-off-white/30 sm:rounded-lg lg:flex-row lg:justify-between xl:flex-col"
          >
            <div className="flex h-10.5 w-full lg:w-auto xl:w-full">
              {WeaponIcon && (
                <WeaponIcon className="h-full w-auto text-night sm:text-paper-100" />
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-43 xl:w-full">
              <span className="font-serif text-[32px] leading-none font-light tracking-tight text-night sm:text-paper-100">
                {weapon.name}
              </span>
              {weapon.label && (
                <RichText
                  data={weapon.label}
                  className="text-base leading-none text-night [&_strong]:text-semibold sm:text-gold-100"
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

  const { docs: weapons } = await payload.find({
    collection: "weapons",
    depth: 0,
    limit: 10,
    locale: locale as Locale,
    sort: "order",
  });

  return (
    <>
      <section className="relative flex flex-col min-h-[calc(100dvh-var(--header-height)-1rem)] mb-4 w-full justify-between overflow-hidden text-white p-5 rounded-[20px] sm:gap-10 md:p-10 md:rounded-[40px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hema-intro.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-hero-gradient" />

        <div className="relative h-19 sm:h-33 md:h-37 xl:h-47 w-auto max-w-full self-start">
          <Logo className="h-full w-auto" variant="hero" />
        </div>

        <div className="relative flex flex-col w-full justify-between sm:flex-col-reverse sm:gap-10 md:max-w-77 lg:max-w-full lg:mt-auto lg:flex-row lg:items-end">
          <div className="flex w-full md:max-w-77 lg:mt-auto xl:max-w-91">
            <DescriptionPanel t={t} />
          </div>

          <div className="hidden w-full sm:flex sm:max-w-[256px] md:max-w-77 lg:max-w-1/2 xl:max-w-none">
            <WeaponsPanel weapons={weapons} />
          </div>
        </div>
      </section>
      <section className="flex mt-2 sm:hidden">
        <WeaponsPanel weapons={weapons} />
      </section>
    </>
  );
}
