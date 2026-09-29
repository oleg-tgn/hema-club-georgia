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
        className="text-night flex w-full flex-row items-start justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-black/5"
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-[18px] font-medium sm:text-xl">
            {address.addressLine}
          </span>
          <span className="text-base font-normal">{address.description}</span>
        </div>
        <ArrowIcon
          direction="up-right"
          className="text-night h-8 w-8 shrink-0"
        />
      </a>
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

  const address = await payload.findGlobal({
    slug: "address",
    locale: locale as Locale,
  });

  return (
    <div className="bg-old-paper flex w-full flex-col gap-4 rounded-[20px] p-2 sm:p-5 md:rounded-[40px] md:p-10 xl:gap-12 2xl:gap-23">
      <div className="flex flex-col gap-4 sm:gap-10 xl:flex-row xl:justify-between 2xl:gap-10">
        <Heading size="lg" as="h2" className="w-full xl:w-auto 2xl:w-1/2">
          {t("title")}
        </Heading>
        <AddressCard className="xl:w-105 2xl:w-1/2" address={address} />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:gap-10">
        <div className="@container flex w-full max-w-120 flex-col gap-2.5 xl:w-1/2">
          {groups.map((doc) => (
            <ScheduleCard key={doc.id} doc={doc} t={t} />
          ))}
        </div>

        <div className="w-full xl:mt-auto xl:w-1/2">
          <Image
            src="/images/shedule-bg.webp"
            alt=""
            aria-hidden
            width={1999}
            height={1318}
            className="h-auto w-full mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
