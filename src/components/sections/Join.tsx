import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { Locale } from "@/i18n/routing";
import type { Address } from "@/payload-types";
import ArrowIcon from "../icons/ArrowIcon";
import Heading from "../ui/Heading";

function AddressCard({ address }: { address: Address }) {
  return (
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
      <ArrowIcon direction="up-right" className="text-night h-8 w-8 shrink-0" />
    </a>
  );
}

// Coordinates of the "St.George HEMA School" place behind the address's
// Google Maps share link (share links themselves can't be embedded).
const MAP_EMBED_COORDS = "41.7105187,44.8040199";

function MapEmbed({ locale, title }: { locale: string; title: string }) {
  return (
    <iframe
      title={title}
      src={`https://www.google.com/maps?q=${MAP_EMBED_COORDS}&z=17&hl=${locale}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      // Muted to a warm grey so the map blends into the page background.
      className="aspect-16/9 w-full rounded-lg border-0 mix-blend-multiply contrast-90 grayscale sepia-[.3]"
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
        <AddressCard address={address} />
        <MapEmbed locale={locale} title={address.addressLine} />
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
