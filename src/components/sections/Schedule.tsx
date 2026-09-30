import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import type { ScheduleGroup } from "@/payload-types";
import Heading from "../ui/Heading";
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

function ScheduleCard({ doc, t }: { doc: ScheduleGroup; t: TFunc }) {
  const weapon =
    doc.weapon && typeof doc.weapon === "object" ? doc.weapon : null;
  const sections = doc.sections ?? [];

  return (
    // Stacked on mobile; on desktop the weapon sits in a side column so each
    // card is only as tall as its schedule and the section fits one screen.
    <div className="text-night border-night/20 flex flex-col overflow-hidden rounded-2xl border md:flex-row">
      <div className="bg-night/5 px-4 py-3 md:w-60 md:shrink-0 md:p-5">
        <div className="flex max-w-125 flex-wrap items-center justify-between gap-3 md:flex-col md:items-start">
          <Heading size="sm" as="h3">
            {weapon?.name ?? doc.title}
          </Heading>
          {weapon && <WeaponIcon slug={weapon.slug} className="h-10 w-auto" />}
        </div>
      </div>
      <div className="@container flex min-w-0 flex-1 flex-col gap-4 p-4 *:max-w-125 md:p-5">
        {sections.map((section, i) => (
          <div
            key={section.id ?? i}
            className="grid grid-cols-1 gap-1.5 @md:grid-cols-[10rem_minmax(0,1fr)] @md:gap-5"
          >
            <span className="text-base font-medium">
              {section.label || t("levels.all")}
            </span>
            <div className="flex flex-col gap-1">
              {(section.rows ?? []).map((row, idx) => (
                <div key={idx} className="flex justify-between gap-3">
                  <span className="text-base">{t(`days.${row.day}`)}</span>
                  <span className="text-right text-base font-semibold whitespace-nowrap tabular-nums">
                    {formatTime(row.startTime)} — {formatTime(row.endTime)}
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

export default async function Schedule() {
  const locale = await getLocale();
  const t = await getTranslations("Schedule");
  const payload = await getPayload({ config });

  const { docs: groups } = await payload.find({
    collection: "schedule-groups",
    depth: 1,
    limit: 50,
    sort: ["order", "createdAt"],
    locale: locale as Locale,
  });

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-[20px] px-4 py-8 sm:p-10 md:rounded-[40px] md:p-16 xl:gap-12">
      <Heading size="lg" as="h2" className="text-center">
        {t("title")}
      </Heading>
      <div className="flex w-full max-w-120 flex-col gap-3 md:max-w-4xl">
        {groups.map((doc) => (
          <ScheduleCard key={doc.id} doc={doc} t={t} />
        ))}
      </div>
    </div>
  );
}
