import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";

import LogoFooter from "../icons/LogoFooter";

export default async function Footer() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const contacts = await payload.findGlobal({
    slug: "about",
    locale: locale as Locale,
  });

  const address = await payload.findGlobal({
    slug: "address",
    locale: locale as Locale,
  });

  return (
    <footer className="container mx-auto px-10 mt-20">
      <div className="flex flex-row justify-between">
        <LogoFooter className="w-48" />
        <span className="text-base leading-6 font-semibold text-asphalt">
          {address.addressLine}
        </span>
        <div className="flex flex-row"></div>
      </div>
    </footer>
  );
}
