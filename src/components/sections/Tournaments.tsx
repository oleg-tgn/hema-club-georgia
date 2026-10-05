import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Tournament } from "@/payload-types";
import Heading from "../ui/Heading";
import ExternalIcon from "../icons/externalIcon";
import { demoTournaments } from "./tournaments-demo";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;
export type Variant = "plain" | "light" | "warm" | "old";

// TEMPORARY: candidate sheets for the cards, to pick one by eye.
const sheets: Record<Variant, string> = {
  plain: "",
  light: "bg-[#e2dccd] rounded-2xl p-4 sm:p-5",
  warm: "bg-[#e7e0cf] rounded-2xl p-4 sm:p-5",
  old: "bg-old-paper rounded-2xl p-4 sm:p-5",
};

function bannerOf(tournament: Tournament) {
  const media = tournament.banner;
  if (!media || typeof media !== "object" || !media.url) return null;
  return { url: media.url, alt: media.alt || tournament.name };
}

// "12–14 September 2025" / "12 сентября 2025 г." in the page's language.
// Dates are picked as whole days in Tbilisi, so they are read there too.
function formatDates(tournament: Tournament, locale: string): string {
  const format = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tbilisi",
  });
  const start = new Date(tournament.startDate);
  return tournament.endDate
    ? format.formatRange(start, new Date(tournament.endDate))
    : format.format(start);
}

function TournamentLinks({
  tournament,
  t,
}: {
  tournament: Tournament;
  t: TFunc;
}) {
  const { website, hemaRatings, hemagon, photos } = tournament.links ?? {};
  const links = [
    website && { href: website, label: t("website") },
    hemaRatings && { href: hemaRatings, label: "HEMA Ratings" },
    hemagon && { href: hemagon, label: "Hemagon" },
    photos && { href: photos, label: t("photos") },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-night hover:text-gold-200 flex items-center gap-2 transition-colors"
        >
          {link.label}
          <ExternalIcon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

// Banner on the left, cropped to 16:9 so every card has the same rhythm
// whatever the uploaded proportions; on phones it sits above the text.
// An upcoming tournament is flagged above its date.
function TournamentCard({
  tournament,
  upcoming,
  sheet,
  bg,
  locale,
  t,
}: {
  tournament: Tournament;
  upcoming: boolean;
  sheet: string;
  bg?: string;
  locale: string;
  t: TFunc;
}) {
  const banner = bannerOf(tournament);

  return (
    <article
      className={`text-night grid grid-cols-1 gap-4 sm:grid-cols-[18rem_minmax(0,1fr)] sm:gap-6 md:grid-cols-[22rem_minmax(0,1fr)] md:gap-8 ${sheet}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-sm">
        {banner && (
          <Image
            src={banner.url}
            alt={banner.alt}
            fill
            sizes="(min-width: 768px) 352px, (min-width: 640px) 288px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        {upcoming && (
          <p className="text-gold-200 flex items-center gap-2 text-sm font-medium">
            <span className="bg-gold-100 h-1.5 w-1.5 rounded-full" />
            {t("upcoming")}
          </p>
        )}
        <p className="text-base font-medium">
          {formatDates(tournament, locale)}
          {tournament.location && (
            <span className="text-asphalt"> · {tournament.location}</span>
          )}
        </p>
        <Heading as="h3">{tournament.name}</Heading>
        <TournamentLinks tournament={tournament} t={t} />
      </div>
    </article>
  );
}

// A tournament is upcoming until its last day is over. Upcoming ones read
// soonest first, past ones newest first.
function splitByDate(tournaments: Tournament[]) {
  const now = Date.now();
  const lastDay = (x: Tournament) =>
    new Date(x.endDate ?? x.startDate).getTime() + 24 * 60 * 60 * 1000;
  const upcoming = tournaments
    .filter((x) => lastDay(x) > now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = tournaments
    .filter((x) => lastDay(x) <= now)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  return { upcoming, past };
}

export type Mark = "label" | "sheet";

export default async function Tournaments({
  variant,
  mark,
  bg,
  frame,
  demo,
}: {
  variant: Variant;
  mark: Mark;
  bg?: string;
  frame: boolean;
  demo: boolean;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Tournaments");

  let tournaments: Tournament[];
  if (demo) {
    tournaments = demoTournaments;
  } else {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "tournaments",
      depth: 1,
      limit: 200,
      sort: "-startDate",
      locale: locale as Locale,
    });
    tournaments = docs;
  }

  const { upcoming, past } = splitByDate(tournaments);

  // TEMPORARY: "label" puts every card on the same sheet; "sheet" gives
  // only upcoming tournaments a sheet and leaves past ones on the page.
  const sheetOf = (isUpcoming: boolean) =>
    (frame ? "border border-night/15 " : "") +
    (mark === "label"
      ? sheets[variant]
      : isUpcoming
        ? sheets[variant === "plain" ? "light" : variant]
        : `${sheets.plain} px-4 sm:px-5`);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12">
      <Heading as="h1" className="text-center">
        {t("title")}
      </Heading>
      <div
        className={`flex w-full max-w-200 flex-col ${
          mark === "label" && variant !== "plain" ? "gap-4" : "gap-10"
        }`}
      >
        {[...upcoming, ...past].map((tournament, i) => {
          const isUpcoming = i < upcoming.length;
          return (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              upcoming={isUpcoming}
              sheet={sheetOf(isUpcoming)}
              bg={mark === "label" || isUpcoming ? bg : undefined}
              locale={locale}
              t={t}
            />
          );
        })}
      </div>
    </div>
  );
}
