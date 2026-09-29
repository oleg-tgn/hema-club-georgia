import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";

import SocialLinks from "../ui/SocialLinks";

export default async function Footer() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const { docs: socialLinks } = await payload.find({
    collection: "social-links",
    sort: "order",
    locale: locale as Locale,
  });

  const address = await payload.findGlobal({
    slug: "address",
    locale: locale as Locale,
  });

  return (
    <footer className="mx-auto mt-20 w-full max-w-384 px-2 py-5 sm:px-5 md:px-10">
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
        <span className="text-night text-base leading-6 font-semibold">
          {address.addressLine}
        </span>
        <SocialLinks links={socialLinks} className="gap-6" />
      </div>
    </footer>
  );
}
