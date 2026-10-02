import config from "@payload-config";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import ArrowIcon from "../icons/ArrowIcon";
import Heading from "../ui/Heading";
import SocialLinks from "../ui/SocialLinks";

// "Share → Embed a map" link for the "St.George HEMA School" place, so Google
// shows its own place card with an "Open in Google Maps" link. The interface
// language is the `!1s<lang>` part of the two `!3m2`/`!5m2` blocks.
function mapEmbedSrc(locale: string) {
  return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d186.15390386235114!2d44.8038282!3d41.7105386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d6994838d65%3A0x4cfa18708fa533a7!2sSt.George%20HEMA%20School!5e0!3m2!1s${locale}!2sge!4v1790714162460!5m2!1s${locale}!2sge`;
}

// Plain facts - where, what to look for, how to get in touch - next to a
// photo of the entrance and the map. The figures share one height on
// desktop and stack on mobile.
export default async function Address() {
  const locale = await getLocale();
  const t = await getTranslations("Address");
  const payload = await getPayload({ config });

  const [address, { docs: socialLinks }] = await Promise.all([
    payload.findGlobal({ slug: "address", locale: locale as Locale }),
    payload.find({
      collection: "social-links",
      sort: "order",
      locale: locale as Locale,
    }),
  ]);

  return (
    <div className="text-night flex w-full flex-col items-center gap-6 xl:gap-12">
      <Heading as="h2" className="text-center">
        {t("title")}
      </Heading>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,5fr)] lg:gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-medium">{address.addressLine}</span>
            {address.description && (
              <span className="text-base">{address.description}</span>
            )}
            {address.googleMap && (
              <a
                href={address.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-200 hover:text-gold-100 flex items-center gap-1 self-start text-base font-semibold transition-colors"
              >
                {t("openInMaps")}
                <ArrowIcon direction="up-right" />
              </a>
            )}
          </div>

          <div className="border-night/20 flex flex-col gap-4 border-t pt-6">
            <p className="font-text text-body">
              {t("howToJoin")}
            </p>
            <SocialLinks links={socialLinks} className="gap-5" />
          </div>
        </div>

        {/* Softened like the map and video so the three read as one set,
            but still in colour: the green shopfront is the landmark. */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[20px] lg:aspect-auto lg:h-96">
          <Image
            src="/images/entrance.jpg"
            alt={t("entranceAlt")}
            fill
            sizes="(min-width: 64rem) 25vw, 100vw"
            className="object-cover saturate-50 sepia-[.15]"
          />
        </div>

        <iframe
          title={address.addressLine}
          src={mapEmbedSrc(locale)}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          // Greyscale with a light sepia warmth, multiplied onto the paper
          // background so the map's whites take the page colour.
          className="aspect-4/3 w-full rounded-[20px] border-0 mix-blend-multiply contrast-90 grayscale sepia-[.1] lg:aspect-auto lg:h-96"
        />
      </div>
    </div>
  );
}
