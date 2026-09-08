import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import type { Weapon } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import { Carousel, CarouselViewport, CarouselControls } from "../ui/Carousel";
import ArrowIcon from "../icons/ArrowIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FacebookIcon from "../icons/FacebookIcon";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  facebook: FacebookIcon,
};

export default async function Instructors() {
  const locale = await getLocale();
  const t = await getTranslations("Instructors");
  const payload = await getPayload({ config });

  const { docs: instructors } = await payload.find({
    collection: "instructors",
    depth: 1,
    limit: 50,
    locale: locale as Locale,
    sort: "order",
  });

  if (instructors.length === 0) {
    return null;
  }

  return (
    <Carousel options={{ loop: false, align: "start" }}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-8">
        <div />
        <Heading size="lg" as="h2" className="justify-self-center">
          {t("title")}
        </Heading>
        <CarouselControls className="justify-self-end" />
      </div>

      <CarouselViewport>
        <div className="flex gap-6">
          {instructors.map((instructor) => {
            const photo =
              instructor.photo && typeof instructor.photo === "object"
                ? instructor.photo
                : null;
            const photoUrl = photo?.sizes?.thumbnail?.url || photo?.url;

            const weapons = (instructor.weapons ?? []).filter(
              (weapon): weapon is Weapon => typeof weapon === "object",
            );
            const socialLinks = instructor.socialLinks ?? [];

            return (
              <div
                key={instructor.id}
                className="flex w-64 flex-none flex-col gap-4 sm:w-72"
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-paper-200">
                  {photoUrl && (
                    <Image
                      src={photoUrl}
                      alt={photo?.alt || instructor.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {weapons.length > 0 && (
                    <div className="flex flex-wrap gap-x-2 text-sm text-asphalt">
                      {weapons.map((weapon) => (
                        <span key={weapon.id}>{weapon.name}</span>
                      ))}
                    </div>
                  )}

                  <Heading size="sm" as="h3">
                    {instructor.name}
                  </Heading>

                  {instructor.description && (
                    <p className="line-clamp-3 text-sm text-asphalt">
                      {instructor.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                  <div className="flex gap-2">
                    {socialLinks.map((link) => {
                      const Icon = socialIcons[link.platform];
                      if (!Icon) return null;

                      return (
                        <a
                          key={link.id ?? link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-night transition-colors hover:bg-night-hover"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>

                  {instructor.hemaRatingUrl && (
                    <a
                      href={instructor.hemaRatingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1 text-sm font-medium text-night hover:underline"
                    >
                      {t("hemaRating")}
                      <ArrowIcon direction="up-right" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CarouselViewport>
    </Carousel>
  );
}
