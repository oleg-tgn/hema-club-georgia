import type { Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import config from "@payload-config";
import { getPayload } from "payload";
import WeaponsIcon from "../icons/WeaponsIcon";
import CtaTile from "../ui/CtaTile";

export default async function Weapons() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const weapons = await payload.findGlobal({
    slug: "weapons-section",
    locale: locale as Locale,
  });

  return (
    <div className="relative w-full overflow-hidden rounded-[40px] bg-paper-200 p-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto aspect-168/95 w-full max-w-239">
        <Image
          src="/images/weapons.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-20">
        <WeaponsIcon aria-hidden className="w-full text-gold-100/80" />

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-12 md:max-w-44">
            {weapons.provisions?.map((row) => (
              <div key={row.id}>
                <div className="text-base font-normal">{row.intro}</div>
                <strong className="text-xl font-medium">{row.highlight}</strong>
              </div>
            ))}
          </div>

          <div className="h-40 w-full md:h-56 md:max-w-44 md:shrink-0">
            <CtaTile
              href="https://docs.google.com/document/d/1v5YkBME_fWG1vdxpjDT1uqGH_Tiis3cSz2iiYRITwUU/edit?tab=t.0"
              size="lg"
              external
            >
              Equip Guide
            </CtaTile>
          </div>
        </div>
      </div>
    </div>
  );
}
