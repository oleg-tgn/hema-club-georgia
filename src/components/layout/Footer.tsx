import config from "@payload-config";
import type { ComponentType } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import PhoneIcon from "../icons/PhoneIcon";
import TelegramIcon from "../icons/TelegramIcon";
import Container from "../ui/Container";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  facebook: FacebookIcon,
};

// Shown when a link has no account label set in the CMS.
const platformNames: Record<string, string> = {
  instagram: "Instagram",
  telegram: "Telegram",
  facebook: "Facebook",
};

// Kept light: one hairline across the whole screen (the same tone as the
// FAQ dividers), then three columns inside the page container - contacts on
// the left, the school's name and address centred like a signature, the site
// credit on the right. On mobile they stack: name and address first.
export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const payload = await getPayload({ config });

  const [address, { docs: socialLinks }] = await Promise.all([
    payload.findGlobal({ slug: "address", locale: locale as Locale }),
    payload.find({
      collection: "social-links",
      sort: "order",
      locale: locale as Locale,
    }),
  ]);

  const links = socialLinks.filter((link) => socialIcons[link.platform]);

  return (
    <footer className="text-night mt-10 sm:mt-15 md:mt-20 flex w-full flex-col gap-8 pb-8 text-[15px] leading-6">
      <div aria-hidden className="bg-night/20 h-px" />

      <Container className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col lg:order-2 lg:items-center lg:text-center">
          <span className="font-semibold">St. George HEMA School</span>
          {address.googleMap ? (
            <a
              href={address.googleMap}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-200 self-start transition-colors lg:self-center"
            >
              {address.addressLine}
            </a>
          ) : (
            <span>{address.addressLine}</span>
          )}
        </div>

        {(address.phone || links.length > 0) && (
          <ul className="flex flex-col gap-1.5 whitespace-nowrap lg:order-1 lg:self-baseline-last">
            {address.phone && (
              <li>
                <a
                  href={`tel:${address.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-gold-200 flex items-center gap-2 tabular-nums transition-colors"
                >
                  <PhoneIcon className="size-5 shrink-0" />
                  <span>{address.phone}</span>
                </a>
              </li>
            )}
            {links.map((link) => {
              const Icon = socialIcons[link.platform];

              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-200 flex items-center gap-2 transition-colors"
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{link.label || platformNames[link.platform]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {/* Shares the contacts' last baseline (both are aligned by last
            baseline), in the small grey of a note. */}
        <span className="text-asphalt text-xs lg:order-3 lg:self-baseline-last lg:justify-self-end">
          {t("credit")}
        </span>
      </Container>
    </footer>
  );
}
