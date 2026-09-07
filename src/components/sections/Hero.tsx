import { getTranslations } from "next-intl/server";
import CtaTile from "../ui/CtaTile";
import HeroLogo from "../icons/HeroLogo";
import WeaponsPanel from "./WeaponsPanel";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative mb-4 flex h-[calc(100dvh-var(--header-height)-16px)] flex-col justify-between overflow-hidden rounded-[40px] p-10 text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hema-intro.webm"
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(72deg, rgba(0, 0, 0, 0.90) 0.35%, rgba(0, 0, 0, 0.77) 22.81%, rgba(0, 0, 0, 0.00) 54.77%)",
        }}
      />

      <div className="relative h-48 w-auto self-start">
        <HeroLogo className="h-full w-auto" />
      </div>

      <div className="relative flex w-full items-end justify-between gap-10">
        <div className="max-w-91">
          <p className="text-base font-normal text-off-white">
            {t("description")}
          </p>
          <div className="mt-6 flex h-22 gap-2">
            <CtaTile href="#schedule" size="lg" className="flex-[6.5_0_0]">
              {t.rich("ctaJoin", { br: () => <br /> })}
            </CtaTile>
            <CtaTile href="#about" size="sm" className="flex-[3.5_0_0]">
              {t.rich("ctaAbout", { br: () => <br /> })}
            </CtaTile>
          </div>
        </div>

        <WeaponsPanel />
      </div>
    </section>
  );
}
