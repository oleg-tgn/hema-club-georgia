import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";

// "Share → Embed a map" link for the "St.George HEMA School" place, so Google
// shows its own place card with an "Open in Google Maps" link. The interface
// language is the `!1s<lang>` part of the two `!3m2`/`!5m2` blocks.
function mapEmbedSrc(locale: string) {
  return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d186.15390386235114!2d44.8038282!3d41.7105386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d6994838d65%3A0x4cfa18708fa533a7!2sSt.George%20HEMA%20School!5e0!3m2!1s${locale}!2sge!4v1790714162460!5m2!1s${locale}!2sge`;
}

// The mirror of Hero: the map where Hero has its video, and the text set the
// same way as the welcome text - a heading and plain paragraphs. Contact
// details live in the footer, so this stays prose. On mobile the text comes
// first, as in Hero.
export default async function Join() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const join = await payload.findGlobal({
    slug: "join",
    locale: locale as Locale,
  });

  return (
    <div className="text-night grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
      <iframe
        title={join.title}
        src={mapEmbedSrc(locale)}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        // Greyscale with a light sepia warmth, multiplied onto the paper
        // background so the map's whites take the page colour.
        className="order-last aspect-video w-full rounded-[20px] border-0 mix-blend-multiply contrast-90 grayscale sepia-[.1] lg:order-first lg:aspect-4/3"
      />

      <div className="flex flex-col gap-6">
        <Heading size="lg" as="h2">
          {join.title}
        </Heading>
        <RichText
          data={join.description}
          className="[&_a]:text-gold-200 [&_a]:hover:text-gold-100 flex max-w-160 flex-col gap-4 font-(family-name:--font-literata) text-[18px] leading-7 [&_a]:transition-colors"
        />
      </div>
    </div>
  );
}
