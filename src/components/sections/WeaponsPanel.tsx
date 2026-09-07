import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import { weaponIcons } from "../icons/weapons";

export default async function WeaponsPanel() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");
  const tNav = await getTranslations("Nav");
  const payload = await getPayload({ config });

  const { docs: weapons } = await payload.find({
    collection: "weapons",
    depth: 0,
    limit: 10,
    locale: locale as Locale,
    sort: "order",
  });

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
      <div className="flex justify-center gap-6 border-t border-off-white/20 pt-4">
        <a
          href="#instructors"
          className="text-base font-medium text-gold-200 transition-colors hover:text-gold-100"
        >
          {tNav("instructors")}
        </a>
        <a
          href="#schedule"
          className="text-base font-medium text-gold-200 transition-colors hover:text-gold-100"
        >
          {t("ctaSchedule")}
        </a>
      </div>
    </div>
  );
}
