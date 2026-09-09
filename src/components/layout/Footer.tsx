import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";

import Logo from "../icons/Logo";
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
    <footer className="container mx-auto px-10 py-5 mt-20">
      <div className="flex flex-row justify-between">
        <Logo className="w-48" variant="footer" />
        <span className="text-base leading-6 font-semibold text-asphalt">
          {address.addressLine}
        </span>
        <SocialLinks links={socialLinks} className="gap-6" />
      </div>
    </footer>
  );
}
