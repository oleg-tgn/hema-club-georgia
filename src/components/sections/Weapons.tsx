import type { Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import config from "@payload-config";
import { getPayload } from "payload";
import WeaponsTitleIcon from "../icons/WeaponsTitleIcon";
import CtaTile from "../ui/CtaTile";

export default async function Weapons() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const weapons = await payload.findGlobal({
    slug: "weapons-section",
    locale: locale as Locale,
  });

  return (
    <div className="relative w-full overflow-hidden p-0  bg-paper-200 rounded-[20px] xl:rounded-[40px]">
      <div className="relative z-10 flex flex-col py-8 px-5 gap-1 xl:gap-20">
        <WeaponsTitleIcon aria-hidden className="w-full text-gold-100/80" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between xl:gap-12">
          <div className="flex flex-col gap-6 w-full md:max-w-44 xl:gap-12">
            {weapons.provisions?.map((row) => (
              <div key={row.id}>
                <div className="text-base font-normal">{row.intro}</div>
                <strong className="text-xl font-medium">{row.highlight}</strong>
              </div>
            ))}
          </div>

          <div className="w-full h-10.5 lg:h-40 xl:h-56 xl:max-w-44 xl:shrink-0">
            <CtaTile
              href="https://docs.google.com/document/d/1v5YkBME_fWG1vdxpjDT1uqGH_Tiis3cSz2iiYRITwUU/edit?tab=t.0"
              external
              className="text-xl leading-none font-medium"
            >
              Equip Guide
            </CtaTile>
          </div>
        </div>
      </div>

      <div className="relative pointer-events-none w-full mx-auto aspect-168/95 xl:absolute xl:inset-x-0 xl:bottom-0 xl:max-w-239">
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
