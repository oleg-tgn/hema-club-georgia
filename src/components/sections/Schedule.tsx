import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import type { ScheduleGroup } from "@/payload-types";
import Guard from "../ui/Guards";
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
    // The weapon heads the card as a band on every screen size, so the
    // section reads on one top-to-bottom axis.
    <div className="text-night border-night/20 flex flex-col overflow-hidden rounded-2xl border">
      <div className="bg-night/5 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">
          <Heading size="sm" as="h3" className="shrink-0 whitespace-nowrap">
            {weapon?.name ?? doc.title}
          </Heading>
          {/* The engraving gives way to the name on narrow cards: its mask
              is `contain`, so a squeezed box just draws it smaller. */}
          {weapon && (
            <WeaponIcon
              slug={weapon.slug}
              className="h-7 w-auto min-w-0 sm:h-10"
            />
          )}
        </div>
      </div>
      <div className="@container flex flex-col gap-4 p-4 md:p-5">
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
    <div className="flex w-full flex-col items-center gap-6 xl:gap-12">
      <Heading size="lg" as="h2" className="text-center">
        {t("title")}
      </Heading>
      {/* Guard figures flank the cards only where there's room beside them;
          smaller screens keep the schedule on its own. They sit on a
          diagonal (left low, right high). */}
      <div className="flex w-full justify-center xl:gap-6 2xl:gap-10">
        <Guard
          name="ochs"
          className="hidden w-68 shrink-0 self-end xl:flex 2xl:w-80"
        />
        {/* Cards stay narrow so each time sits close to its day. */}
        <div className="flex w-full max-w-125 flex-col gap-3">
          {groups.map((doc) => (
            <ScheduleCard key={doc.id} doc={doc} t={t} />
          ))}
        </div>
        <Guard
          name="pflug"
          className="hidden w-68 shrink-0 self-start xl:flex 2xl:w-80"
        />
      </div>
    </div>
  );
}
