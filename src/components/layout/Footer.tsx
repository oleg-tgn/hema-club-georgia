import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import PhoneIcon from "../icons/PhoneIcon";
import Container from "../ui/Container";

// Kept light: one hairline across the whole screen (the same tone as the
// FAQ dividers), then three columns inside the page container - contacts on
// the left, the school's name and address centred like a signature, the site
// credit on the right. On mobile they stack: name and address first.
export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const payload = await getPayload({ config });

  const contacts = await payload.findGlobal({
    slug: "contacts",
    locale: locale as Locale,
  });

  const links = [
    {
      url: contacts.instagram,
      label: contacts.instagramLabel || "Instagram",
      Icon: InstagramIcon,
    },
    {
      url: contacts.facebook,
      label: contacts.facebookLabel || "Facebook",
      Icon: FacebookIcon,
    },
  ].filter((link) => link.url);

  return (
    <footer className="text-night mt-10 flex w-full flex-col gap-8 pb-8 text-[15px] leading-6 sm:mt-15 md:mt-20">
      <div aria-hidden className="bg-night/20 h-px" />

      <Container>
        <div className="mx-auto flex max-w-160 flex-col gap-6 lg:grid lg:max-w-none lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col lg:order-2 lg:items-center lg:text-center">
            <span className="font-semibold">St. George HEMA School</span>
            {contacts.googleMap ? (
              <a
                href={contacts.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-200 self-start transition-colors lg:self-center"
              >
                {contacts.addressLine}
              </a>
            ) : (
              <span>{contacts.addressLine}</span>
            )}
          </div>

          {(contacts.phone || links.length > 0) && (
            <ul className="flex flex-col gap-1.5 whitespace-nowrap lg:order-1 lg:self-baseline-last">
              {contacts.phone && (
                <li>
                  <a
                    href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-gold-200 flex items-center gap-2 tabular-nums transition-colors"
                  >
                    <PhoneIcon className="size-5 shrink-0" />
                    <span>{contacts.phone}</span>
                  </a>
                </li>
              )}
              {links.map(({ url, label, Icon }) => (
                <li key={url}>
                  <a
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-200 flex items-center gap-2 transition-colors"
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Shares the contacts' last baseline (both are aligned by last
            baseline), in the small grey of a note. */}
          <span className="text-asphalt text-xs lg:order-3 lg:self-baseline-last lg:justify-self-end">
            {t("credit")}
          </span>
        </div>
      </Container>
    </footer>
  );
}
