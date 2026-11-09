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
    hemagon && { href: hemagon, label: "Hemagon" },
    hemaRatings && { href: hemaRatings, label: "HEMA Ratings" },
    photos && { href: photos, label: "Photos" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  if (links.length === 0) return null;

  return (
    // The padding widens the tap target for a finger; the negative margin
    // takes it back, so the row looks as before.
    <div className="-mt-1 flex flex-wrap gap-x-6 text-base sm:text-sm">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-night hover:text-gold-200 flex items-center gap-2 py-2.5 transition-colors"
        >
          {link.label}
          <ExternalIcon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

// The tournament's main page, which its name links to: the website, then
// HEMA Ratings, then Hemagon. Every tournament is meant to have one of them;
// "#" only keeps the link valid if none was filled in.
function mainLinkOf(tournament: Tournament) {
  const { website, hemaRatings, hemagon } = tournament.links ?? {};
  return website || hemagon || hemaRatings || "#";
}

// A tournament is upcoming until its last day is over.
function isUpcoming(tournament: Tournament) {
  const lastDay = new Date(tournament.endDate ?? tournament.startDate);
  return lastDay.getTime() + 24 * 60 * 60 * 1000 > Date.now();
}

function TournamentCard({
  tournament,
  locale,
  t,
}: {
  tournament: Tournament;
  locale: string;
  t: TFunc;
}) {
  const banner = bannerOf(tournament);
  const mainLink = mainLinkOf(tournament);
  const upcoming = isUpcoming(tournament);
  const frame = upcoming
    ? "mb-4 rounded-2xl border-gold-200 border-2 bg-[#f7f4ed]"
    : "border-x-2 border-x-transparent not-last:border-b not-last:border-b-night/15";

  return (
    <article
      className={`text-night grid grid-cols-1 gap-4 p-4 sm:grid-cols-[18rem_minmax(0,1fr)] sm:gap-6 sm:p-5 md:grid-cols-[22rem_minmax(0,1fr)] md:gap-8 ${frame}`}
    >
      {/* The banner is the largest tap target, so it links where the name
          does. Hidden from the keyboard and screen readers: for them the
          name's link is enough, the same place twice would be noise. */}
      <a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-video w-full overflow-hidden rounded-md transition-opacity hover:opacity-85"
      >
        {banner && (
          <Image
            src={banner.url}
            alt={banner.alt}
            fill
            sizes="(min-width: 768px) 352px, (min-width: 640px) 288px, 100vw"
            className="object-cover"
          />
        )}
      </a>
      <div className="flex flex-col gap-3">
        {upcoming && (
          <p className="text-gold-200 flex items-center gap-2 text-sm font-medium">
            <span className="bg-gold-100 h-1.5 w-1.5 rounded-full" />
            {t("upcoming")}
          </p>
        )}
        <p className="text-sm font-medium tracking-wider uppercase">
          {formatDates(tournament, locale)}
          {tournament.location && (
            <span className="text-asphalt"> · {tournament.location}</span>
          )}
        </p>
        <Heading as="h3">
          <a
            href={mainLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-200 transition-colors"
          >
            {tournament.name}
          </a>
        </Heading>
        <TournamentLinks tournament={tournament} />
      </div>
    </article>
  );
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

  return (
    <div className="flex flex-col items-center">
      <Heading as="h1" className="mb-5 text-center md:mb-10">
        {t("title")}
      </Heading>
      <div className="flex w-full max-w-200 flex-col">
        {docs.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
