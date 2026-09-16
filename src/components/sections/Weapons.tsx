import type { Locale } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import config from "@payload-config";
import { getPayload } from "payload";
import WeaponsTitleIcon from "../icons/WeaponsTitleIcon";
import CtaTile from "../ui/CtaTile";

export default async function Weapons() {
  const locale = await getLocale();
  const t = await getTranslations("Training");
  const payload = await getPayload({ config });

  const weapons = await payload.findGlobal({
    slug: "weapons-section",
    locale: locale as Locale,
  });

  return (
    <div className="bg-paper-200 relative w-full overflow-hidden rounded-[20px] p-0 md:rounded-[40px]">
      <div className="relative z-10 flex flex-col gap-1 px-5 py-8 sm:gap-5 md:px-10 md:pt-14 md:pb-5 lg:gap-0 lg:pb-12 xl:pb-10">
        <WeaponsTitleIcon aria-hidden className="text-gold-100/80 w-full" />

        <div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-8 md:justify-between md:gap-8 lg:-mt-10 xl:-mt-5 2xl:mt-25.5">
          <div className="flex w-full flex-col gap-6 sm:w-auto md:flex-row md:justify-between lg:gap-12 xl:flex-col xl:gap-12.5">
            {weapons.provisions?.map((row) => (
              <div key={row.id} className="lg:w-47 xl:w-41.5">
                <div className="text-base font-normal">{row.intro}</div>
                <strong className="text-xl font-medium">{row.highlight}</strong>
              </div>
            ))}
          </div>

          <div className="h-10.5 w-full sm:h-auto sm:w-43.5 sm:shrink-0 lg:w-70 xl:w-44">
            <CtaTile
              href="https://docs.google.com/document/d/1v5YkBME_fWG1vdxpjDT1uqGH_Tiis3cSz2iiYRITwUU/edit?tab=t.0"
              external
              className="h-full text-xl leading-none font-medium sm:text-[34px]"
            >
              <span className="sm:hidden">{t.rich("equipGuideCtaMobile")}</span>
              <span className="hidden sm:inline">
                {t.rich("equipGuideCta", { br: () => <br /> })}
              </span>
            </CtaTile>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative mx-auto aspect-168/95 w-full xl:absolute xl:inset-x-0 xl:bottom-0 xl:w-208 2xl:w-239">
        <Image
          src="/images/weapons.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
}
