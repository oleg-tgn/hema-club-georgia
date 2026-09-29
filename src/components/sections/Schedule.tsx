import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import type { ScheduleGroup } from "@/payload-types";
import { Ochs, Pflug } from "../ui/Guards";
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
    // Content is capped at the width of the two-column grid below, so on
    // wide screens days and times stay close together instead of spreading
    // to the card edges.
    <div className="text-night flex flex-col gap-3 rounded-lg p-4 *:max-w-125">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Heading size="sm" as="h3">
          {weapon?.name ?? doc.title}
        </Heading>
        {weapon && (
          <WeaponIcon slug={weapon.slug} className="h-9 w-auto opacity-85" />
        )}
      </div>
      {sections.map((section, i) => (
        <div
          key={section.id ?? i}
          className="border-night/10 grid grid-cols-1 gap-1.5 border-t pt-3 @md:grid-cols-[10rem_minmax(0,1fr)] @md:gap-5"
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
    <div className="bg-old-paper flex w-full flex-col items-center gap-6 rounded-[20px] px-2 py-8 sm:p-10 md:rounded-[40px] md:p-16 xl:gap-12">
      <Heading size="lg" as="h2" className="text-center">
        {t("title")}
      </Heading>
      {/* Guard figures flank the cards only where there's room beside them;
          smaller screens keep the schedule on its own. They sit on a
          diagonal (left low, right high) - the mirror of About's. */}
      <div className="flex w-full justify-center xl:gap-10">
        <Ochs className="hidden w-50! shrink-0 self-end xl:flex 2xl:w-60!" />
        <div className="@container flex w-full max-w-120 flex-col gap-2.5">
          {groups.map((doc) => (
            <ScheduleCard key={doc.id} doc={doc} t={t} />
          ))}
        </div>
        <Pflug className="hidden w-60! shrink-0 self-start xl:flex 2xl:w-72.5!" />
      </div>
    </div>
  );
}
