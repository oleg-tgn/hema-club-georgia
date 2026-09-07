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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto aspect-168/95 w-full max-w-239 bg-[lightgray]">
        <Image
          src="/images/weponsPhoto.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-bottom mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <WeaponsIcon aria-hidden className="w-full text-gold-100" />

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4 text-lg md:max-w-55">
            {weapons.provisions?.map((row) => (
              <p key={row.id}>
                {row.intro}{" "}
                <strong className="font-semibold">{row.highlight}</strong>
              </p>
            ))}
          </div>

          <div className="h-40 w-full md:h-56 md:w-56 md:shrink-0">
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
