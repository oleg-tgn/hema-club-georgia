import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import type { Address, ScheduleGroup } from "@/payload-types";
import Heading from "../ui/Heading";
import ArrowIcon from "../icons/ArrowIcon";
import WeaponIcon from "../icons/WeaponIcon";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Tbilisi",
});

function formatTime(value: string): string {
  return timeFormatter.format(new Date(value));
}

function ScheduleCard({
  doc,
  t,
  className = "",
}: {
  doc: ScheduleGroup;
  t: TFunc;
  className?: string;
}) {
  const weapon =
    doc.weapon && typeof doc.weapon === "object" ? doc.weapon : null;
  const sections = doc.sections ?? [];

  return (
    <div
      className={`flex flex-col rounded-lg border gap-5 border-black/20 p-4 text-night ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        {weapon && (
          <div className="flex h-10 w-full items-center">
            <WeaponIcon slug={weapon.slug} className="h-full w-auto" />
          </div>
        )}
        <Heading size="sm" as="h3">
          {weapon?.name}
        </Heading>
      </div>
      <div className="flex flex-col divide-y divide-night/20">
        {sections.map((section, i) => (
          <div
            key={section.level ?? i}
            className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
          >
            {section.level && (
              <span className="text-xl font-medium leading-none">
                {t(`levels.${section.level}`)}
              </span>
            )}
            <div className="flex flex-col gap-1 text-night">
              {(section.rows ?? []).map((row, idx) => (
                <div key={idx} className="flex justify-between gap-2">
                  <span className="text-base">{t(`days.${row.day}`)}</span>
                  <span className="text-base text-right font-semibold tabular-nums">
                    {formatTime(row.startTime)} – {formatTime(row.endTime)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressCard({
  className = "",
  address,
}: {
  className?: string;
  address: Address;
}) {
  return (
    <div className={`${className}`}>
      <a
        href={address.googleMap}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex w-full flex-col p-2 rounded-lg border border-black/20 bg-transparent  text-night transition-colors hover:bg-black/10"
      > 
        <ArrowIcon
          direction="up-right"
          className="absolute w-8 h-8 right-2 top-2 text-night"
        />
        <div className="flex flex-col w-full max-w-56 gap-1.5">
          <span className="text-[18px] sm:text-xl font-medium">{address.addressLine}</span>
          <span className="text-base font-normal">{address.description}</span>
        </div>
      </a>
    </div>
  );
}

function ScheduleFullRow({
  doc,
  t,
  className = "",
}: {
  doc: ScheduleGroup;
  t: TFunc;
  className?: string;
}) {
  const rows = (doc.sections ?? []).flatMap((section) => section.rows ?? []);

  return (
    <div
      className={`flex flex-col gap-5 p-4 rounded-2xl border border-night/15  justify-between sm:flex-row sm:p-5 sm:items-center ${className}`}
    >
      <Heading size="sm" as="h3">
        {doc.title}
      </Heading>
      <div className="flex w-full flex-col gap-1 text-night sm:items-end">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-row justify-between sm:gap-15">
            <span className="text-base">{t(`days.${row.day}`)}</span>
            <span className="text-right font-semibold tabular-nums">
              {formatTime(row.startTime)} – {formatTime(row.endTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Schedule() {
  const locale = await getLocale();
  const t = await getTranslations("Schedule");
  const payload = await getPayload({ config });

  const { docs: groups } = await payload.find({
    collection: "schedule-groups",
    depth: 1,
    limit: 10,
    locale: locale as Locale,
  });

  const longsword = groups.find((doc) => doc.slug === "longsword");
  const saber = groups.find((doc) => doc.slug === "saber");
  const rapier = groups.find((doc) => doc.slug === "rapier");
  const sparrings = groups.find((doc) => doc.slug === "sparrings");

  const address = await payload.findGlobal({
    slug: "address",
    locale: locale as Locale,
  });

  return (
    <div className="flex flex-col w-full gap-4 rounded-[20px] bg-gold-100 p-2 sm:p-5 md:p-10 md:rounded-[40px] xl:gap-20">
      <div className="flex flex-col gap-4 sm:gap-10 xl:flex-row">
        <Heading size="lg" as="h2" className="w-full xl:w-1/2">
          {t("title")}
        </Heading>
        <AddressCard className="xl:w-1/2" address={address} />
      </div>
      
      <div className="flex flex-col gap-4 lg:gap-10 xl:flex-row">
        <div className="grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:gap-6 xl:w-1/2">
          {longsword && (
            <ScheduleCard doc={longsword} t={t} className="row-span-1 sm:row-span-2" />
          )}
          {saber && <ScheduleCard doc={saber} t={t} />}
          {rapier && <ScheduleCard doc={rapier} t={t} />}
          {sparrings && (
            <ScheduleFullRow doc={sparrings} t={t} className="col-span-1 sm:col-span-2" />
          )}
        </div>

        <div className="w-full xl:w-1/2">
          <Image
            src="/images/shedule-bg.webp"
            alt=""
            aria-hidden
            width={1999}
            height={1318}
            className="w-full h-auto mix-blend-multiply"
          />
        </div>
      </div>      
    </div>
  );
}
