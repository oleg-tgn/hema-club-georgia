import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import type { ScheduleGroup } from "@/payload-types";
import { GuardShape } from "../ui/Guards";
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
    <div className="px-1 pt-4 pb-5 sm:px-3">
      <div className="flex items-center justify-between gap-3 pb-2">
        <Heading as="h3" className="shrink-0 whitespace-nowrap">
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
      <div className="flex flex-col gap-3">
        {sections.map((section, i) => (
          <div key={section.id ?? i}>
            {/* The level captions its days, set apart in italic text. */}
            <p className="text-night/70 font-text pb-1 text-base italic">
              {section.label || t("levels.all")}
            </p>
            {(section.rows ?? []).map((row, idx) => (
              // Dot leaders carry the eye from the day to its time, set to
              // the right edge, like a line in a book's contents.
              <div key={idx} className="flex items-baseline gap-2">
                <span>{t(`days.${row.day}`)}</span>
                <span
                  aria-hidden
                  className="border-night/30 mb-1.5 min-w-4 flex-1 border-b border-dotted"
                />
                <span className="whitespace-nowrap tabular-nums">
                  {formatTime(row.startTime)} — {formatTime(row.endTime)}
                </span>
              </div>
            ))}
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
    <div className="flex w-full flex-col items-center gap-6">
      <Heading as="h2" className="text-center">
        {t("title")}
      </Heading>
      <div className="relative flex w-full justify-center">
        {/* Guard figures sit faintly behind the cards as a backdrop, only
            where there's room beside them, tinted gold to sink into the
            paper. Both share one vertical centre; the files share a canvas,
            so their feet land on the same line. */}
        <div
          aria-hidden
          className="text-gold-200 pointer-events-none absolute inset-0 hidden opacity-15 select-none xl:block"
        >
          <GuardShape
            name="ochs"
            className="absolute top-1/2 right-[calc(50%+17rem)] w-76 -translate-y-1/2 2xl:w-104"
          />
          <GuardShape
            name="pflug"
            className="absolute top-1/2 left-[calc(50%+17rem)] w-76 -translate-y-1/2 2xl:w-104"
          />
        </div>
        {/* Narrow, so each time stays close to its day. */}
        <div className="text-night relative flex w-full max-w-112.5 flex-col font-text text-xl">
          {groups.map((doc) => (
            <ScheduleCard key={doc.id} doc={doc} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
