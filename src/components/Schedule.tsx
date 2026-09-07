import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { getPayload } from "payload";
import Heading from "./Heading";
import { weaponIcons } from "./icons/weapons";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type Level = "beginners" | "advanced";

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

type WeaponRef = {
  id: string;
  name: string;
  slug: string;
};

type ScheduleRow = {
  day: Day;
  startTime: string;
  endTime: string;
};

type ScheduleSection = {
  level?: Level | null;
  rows?: ScheduleRow[] | null;
};

type ScheduleGroupDoc = {
  id: string;
  slug: string;
  weapon?: WeaponRef | string | null;
  title?: string | null;
  sections?: ScheduleSection[] | null;
};

function ScheduleCard({
  doc,
  t,
  className = "",
}: {
  doc: ScheduleGroupDoc;
  t: TFunc;
  className?: string;
}) {
  const weapon =
    doc.weapon && typeof doc.weapon === "object" ? doc.weapon : null;
  const sections = doc.sections ?? [];
  const WeaponIcon = weapon ? weaponIcons[weapon.slug] : undefined;

  return (
    <div
      className={`flex flex-col rounded-lg border gap-5 border-black/20 p-4 text-night ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        {WeaponIcon && (
          <div className="flex h-10 w-full items-center">
            <WeaponIcon className="h-full w-auto" />
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

function ScheduleFullRow({
  doc,
  t,
  className = "",
}: {
  doc: ScheduleGroupDoc;
  t: TFunc;
  className?: string;
}) {
  const rows = (doc.sections ?? []).flatMap((section) => section.rows ?? []);

  return (
    <div
      className={`flex flex-row gap-2 rounded-2xl border items-center border-night/15 p-5  justify-between ${className}`}
    >
      <Heading size="sm" as="h3">
        {doc.title}
      </Heading>
      <div className="flex flex-col gap-1 text-night sm:items-end">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-row gap-15">
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

  const { docs } = await payload.find({
    collection: "schedule-groups",
    depth: 2,
    limit: 100,
    locale: locale as "en" | "ka" | "ru",
  });

  const groups = docs as ScheduleGroupDoc[];
  const longsword = groups.find((doc) => doc.slug === "longsword");
  const saber = groups.find((doc) => doc.slug === "saber");
  const rapier = groups.find((doc) => doc.slug === "rapier");
  const sparrings = groups.find((doc) => doc.slug === "sparrings");

  const hasSchedule = Boolean(longsword || saber || rapier || sparrings);

  return (
    <div className="w-full rounded-[40px] bg-gold-100 p-10">
      <div className="flex flex-col gap-10 mb-20 lg:flex-row">
        <Heading size="lg" as="h2" className="w-full lg:w-1/2">
          {t("title")}
        </Heading>
        <a
          href="https://maps.app.goo.gl/HEMBpPfnXB1XGGXq7"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col w-full rounded-lg border border-black/20 p-2 text-night lg:w-1/2"
        >
          <span className="text-xl font-medium">{t("addressLine1")}</span>
          <span className="text-base font-normal">{t("addressLine2")}</span>
        </a>
      </div>

      {hasSchedule && (
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="grid grid-cols-2 gap-6 w-full lg:w-1/2">
            {longsword && (
              <ScheduleCard doc={longsword} t={t} className="row-span-2" />
            )}
            {saber && <ScheduleCard doc={saber} t={t} />}
            {rapier && <ScheduleCard doc={rapier} t={t} />}
            {sparrings && (
              <ScheduleFullRow doc={sparrings} t={t} className="col-span-2" />
            )}
          </div>

          <div className="relative min-h-64 w-full overflow-hidden lg:w-1/2">
            <Image
              src="/images/shedule-bg.png"
              alt=""
              aria-hidden
              fill
              className="object-contain object-top-left mix-blend-multiply"
            />
          </div>
        </div>
      )}
    </div>
  );
}
