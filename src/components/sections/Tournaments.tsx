import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Tournament } from "@/payload-types";
import Heading from "../ui/Heading";
import ExternalIcon from "../icons/externalIcon";

type TFunc = Awaited<ReturnType<typeof getTranslations>>;

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

// Link labels stay in English on every language, like the names.
function TournamentLinks({ tournament }: { tournament: Tournament }) {
  const { website, hemaRatings, hemagon, photos } = tournament.links ?? {};
  const links = [
    website && { href: website, label: "Website" },
    hemaRatings && { href: hemaRatings, label: "HEMA Ratings" },
    hemagon && { href: hemagon, label: "Hemagon" },
    photos && { href: photos, label: "Photos" },
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

// One card per tournament: banner on the left (cropped to 16:9 so every
// card keeps the same rhythm whatever the upload), dateline, headline,
// links. On phones the banner sits above the text. Upcoming tournaments
// lead: a gold frame, a label and a larger banner.
function TournamentCard({
  tournament,
  upcoming,
  locale,
  t,
}: {
  tournament: Tournament;
  upcoming: boolean;
  locale: string;
  t: TFunc;
}) {
  const banner = bannerOf(tournament);

  return (
    <article
      className={`text-night grid grid-cols-1 gap-4 rounded-2xl bg-[#f7f4ed] p-4 sm:gap-6 sm:p-5 md:gap-8 ${
        upcoming
          ? "border-gold-200 border-2 sm:grid-cols-[18rem_minmax(0,1fr)] md:grid-cols-[22rem_minmax(0,1fr)]"
          : "border-night/15 border sm:grid-cols-[12rem_minmax(0,1fr)] md:grid-cols-[14rem_minmax(0,1fr)]"
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-sm">
        {banner && (
          <Image
            src={banner.url}
            alt={banner.alt}
            fill
            sizes={
              upcoming
                ? "(min-width: 768px) 352px, (min-width: 640px) 288px, 100vw"
                : "(min-width: 768px) 224px, (min-width: 640px) 192px, 100vw"
            }
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
        <p className="text-sm font-semibold tracking-wider uppercase">
          {formatDates(tournament, locale)}
          {tournament.location && (
            <span className="text-asphalt"> · {tournament.location}</span>
          )}
        </p>
        <Heading as="h3">{tournament.name}</Heading>
        <TournamentLinks tournament={tournament} />
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

export default async function Tournaments() {
  const locale = await getLocale();
  const t = await getTranslations("Tournaments");

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "tournaments",
    depth: 1,
    limit: 200,
    sort: "-startDate",
    locale: locale as Locale,
  });
  const { upcoming, past } = splitByDate(docs);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12">
      <Heading as="h1" className="text-center">
        {t("title")}
      </Heading>
      <div className="flex w-full max-w-200 flex-col gap-4">
        {[...upcoming, ...past].map((tournament, i) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            upcoming={i < upcoming.length}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
