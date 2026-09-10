import { getTranslations } from "next-intl/server";
import CtaTile from "../ui/CtaTile";
import Logo from "../icons/Logo";
import WeaponsPanel from "./WeaponsPanel";

export default async function Hero() {
  const t = await getTranslations("Hero");

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
          <div className="flex flex-col w-full gap-3 xl:max-w-91">
            <p className="text-base font-normal text-off-white">
              {t("description")}
            </p>
            <div className="flex flex-row h-10.5 sm:h-22 gap-2">
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
          </div>
          <div className="hidden portrait:sm:flex lg:flex">
            <WeaponsPanel />
          </div>
        </div>
      </section>
      <section className="flex portrait:sm:hidden lg:hidden">
        <WeaponsPanel />
      </section>
    </>
  );
}
