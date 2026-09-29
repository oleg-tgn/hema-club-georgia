import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { Locale } from "@/i18n/routing";
import type { Address } from "@/payload-types";
import Heading from "../ui/Heading";

function AddressText({ address }: { address: Address }) {
  return (
    <div className="text-night flex flex-col gap-1.5 px-2">
      <span className="text-[18px] font-medium sm:text-xl">
        {address.addressLine}
      </span>
      <span className="text-base font-normal">{address.description}</span>
    </div>
  );
}

// "Share → Embed a map" link for the "St.George HEMA School" place, so Google
// shows its own place card with an "Open in Google Maps" link. The interface
// language is the `!1s<lang>` part of the two `!3m2`/`!5m2` blocks.
function mapEmbedSrc(locale: string) {
  return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d186.15390386235114!2d44.8038282!3d41.7105386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d6994838d65%3A0x4cfa18708fa533a7!2sSt.George%20HEMA%20School!5e0!3m2!1s${locale}!2sge!4v1790714162460!5m2!1s${locale}!2sge`;
}

function MapEmbed({ locale, title }: { locale: string; title: string }) {
  return (
    <iframe
      title={title}
      src={mapEmbedSrc(locale)}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      // Greyscale with a light sepia warmth, multiplied onto the paper
      // background so the map's whites take the page colour.
      className="aspect-16/9 w-full rounded-lg border-0 mix-blend-multiply contrast-90 grayscale sepia-[.15]"
    />
  );
}

export default async function Join() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const join = await payload.findGlobal({
    slug: "join",
    locale: locale as Locale,
  });

  const address = await payload.findGlobal({
    slug: "address",
    locale: locale as Locale,
  });

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-10 lg:flex-row">
      {/* On mobile the invitation comes first, then where to find us. */}
      <div className="order-last flex w-full flex-col gap-2.5 lg:order-first lg:max-w-118.25 lg:flex-1 xl:max-w-159.5 2xl:max-w-233">
        <MapEmbed locale={locale} title={address.addressLine} />
        <AddressText address={address} />
      </div>
      <div className="mx-auto flex w-full max-w-84 flex-col gap-4">
        <div className="border-night flex flex-row justify-between border-t border-b py-1 text-base font-semibold">
          <span>{join.topLeftText}</span>
          <span>{join.topRightText}</span>
        </div>

        <Heading size="lg" as="h2" className="text-center">
          {join.title}
        </Heading>

        <RichText
          data={join.description}
          className="text-night [&_a]:text-gold-200 [&_a]:hover:text-gold-100 text-center font-(family-name:--font-literata) text-[18px] leading-7 [&_a]:transition-colors"
        />

        <div className="border-night flex flex-row justify-center border-t border-b py-1 text-center text-base font-semibold xl:items-start xl:text-left">
          <span>{join.bottomText}</span>
        </div>
      </div>
    </div>
  );
}
