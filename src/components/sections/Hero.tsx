import CtaTile from "../ui/CtaTile";
import Logo from "../icons/Logo";
import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import { weaponIcons } from "../icons/weapons";
import { Weapon } from "@/payload-types";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;

function DescriptionPanel({ t }: { t: TFunc }) {
  return (
    <>
      <p className="text-base font-normal text-off-white sm:flex-1/2">
        {t("description")}
      </p>
      <div className="flex flex-row h-10.5 gap-2 sm:h-22 sm:flex-1/2">
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
        <CtaTile href="#about" className="flex-[6_0_0] text-xl">
          {t.rich("ctaSchedule")}
        </CtaTile>
      </div>
    </>
  );
}

function WeaponsPanel({ weapons }: { weapons: Weapon[] }) {
  if (weapons.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-off-white/30 bg-black/20 py-4 px-4 backdrop-blur-md">
      <div className="flex divide-x divide-off-white/20">
        {weapons.map((weapon) => {
          const WeaponIcon = weaponIcons[weapon.slug];

          return (
            <div
              key={weapon.id}
              className="flex w-60 flex-col align-center gap-2 px-2 first:pl-0 last:pr-0"
            >
              <div className="flex h-20 w-full items-center justify-center">
                {WeaponIcon && (
                  <WeaponIcon className="h-full w-auto text-paper-100" />
                )}
              </div>
              <span className="text-center font-serif text-3xl leading-8 font-light tracking-tight text-paper-100">
                {weapon.name}
              </span>
            </div>
          );
        })}
      </div>
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
      <section className="relative mb-1 flex h-[calc(100dvh-var(--header-height)-1rem)] min-h-100 min-w-76 flex-col justify-between overflow-hidden text-white p-5 rounded-[20px] md:p-10 md:rounded-[40px]">
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

        <div className="relative flex w-full items-end justify-between gap-10">
          <div className="flex flex-col w-full gap-3 sm:flex-row xl:max-w-91">
            <DescriptionPanel t={t} />
          </div>
          <div className="hidden portrait:sm:flex lg:flex">
            <WeaponsPanel weapons={weapons} />
          </div>
        </div>
      </section>
      <section className="flex portrait:sm:hidden lg:hidden">
        <WeaponsPanel weapons={weapons} />
      </section>
    </>
  );
}
