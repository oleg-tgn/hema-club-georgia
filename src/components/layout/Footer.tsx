import config from "@payload-config";
import type { ComponentType, ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import PhoneIcon from "../icons/PhoneIcon";
import TelegramIcon from "../icons/TelegramIcon";
import Container from "../ui/Container";

const AUTHOR = "Oleg Stelmakh";

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

// Newspaper-style label: small caps, grey, above its value.
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-asphalt text-xs font-semibold tracking-[0.12em] uppercase">
      {children}
    </span>
  );
}

// Set like a newspaper's imprint: a grey thick-and-thin double rule across
// the whole screen, then - inside the page container - the school's name and
// labelled columns of contact details in a smaller size, spread edge to
// edge, then a fine-print line.
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
    <footer className="text-night mt-20 flex w-full flex-col gap-8 pb-8 text-[15px] leading-6">
      <div aria-hidden className="flex flex-col gap-0.75">
        <div className="bg-night/30 h-0.75" />
        <div className="bg-night/30 h-px" />
      </div>

      <Container className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:flex lg:justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-2xl leading-7 tracking-tight">
              St. George HEMA School
            </span>
            <span className="text-asphalt max-w-70">{t("tagline")}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("address")}</Label>
            <div className="flex flex-col gap-0.5">
              <span>{address.addressLine}</span>
              {address.googleMap && (
                <a
                  href={address.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-200 hover:text-gold-100 self-start transition-colors"
                >
                  {t("openInMaps")}
                </a>
              )}
            </div>
          </div>

          {(address.phone || links.length > 0) && (
            <div className="flex flex-col gap-2">
              <Label>{t("contacts")}</Label>
              <ul className="flex flex-col gap-1.5">
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
                        <span>
                          {link.label || platformNames[link.platform]}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="text-asphalt flex flex-col gap-1 text-xs sm:flex-row sm:items-baseline sm:justify-between">
          <span>© {new Date().getFullYear()} St. George HEMA School</span>
          <span>
            {t("credit")} {AUTHOR}
          </span>
        </div>
      </Container>
    </footer>
  );
}
