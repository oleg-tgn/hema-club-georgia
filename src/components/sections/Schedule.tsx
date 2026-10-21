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
    <div className="text-night border-night/20 flex flex-col border-b font-serif first:border-t">
      <div className="bg-night/5 px-4 py-3 md:px-5">
        <div className="mx-auto flex max-w-125 items-center justify-between gap-3">
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
      </div>
      <div className="p-4 md:p-5">
        <div className="@container mx-auto flex max-w-125 flex-col gap-4">
          {sections.map((section, i) => (
            <div
              key={section.id ?? i}
              className="flex flex-col gap-1.5 @md:flex-row @md:gap-5"
            >
              <span className="text-xl font-medium @md:w-40 @md:shrink-0">
                {section.label || t("levels.all")}
              </span>
              {/* Capped so each time stays close to its day, and pushed to the
                  content's right edge. */}
              <div className="ml-auto flex w-full max-w-80 min-w-0 flex-col gap-1">
                {(section.rows ?? []).map((row, idx) => (
                  <div key={idx} className="flex justify-between gap-3">
                    <span className="text-xl">{t(`days.${row.day}`)}</span>
                    <span className="text-right text-xl font-semibold whitespace-nowrap tabular-nums">
                      {formatTime(row.startTime)} — {formatTime(row.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
            where there's room beside them. Both share one vertical centre;
            the files share a canvas, so their feet land on the same line. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-15 select-none xl:block"
        >
          <Guard
            name="ochs"
            className="absolute top-1/2 right-[calc(50%+13rem)] w-104 -translate-y-1/2 2xl:w-136"
          />
          <Guard
            name="pflug"
            className="absolute top-1/2 left-[calc(50%+13rem)] w-104 -translate-y-1/2 2xl:w-136"
          />
        </div>
        {/* Cards match the FAQ column width so the rules line up; their
            content stays narrower to read well. */}
        <div className="relative flex w-full max-w-160 flex-col">
          {groups.map((doc) => (
            <ScheduleCard key={doc.id} doc={doc} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
