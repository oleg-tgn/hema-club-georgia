import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import type { Instructor, Media, Weapon } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import { Carousel, CarouselViewport, CarouselControls } from "../ui/Carousel";
import SocialLink from "../ui/SocialLink";
import InstagramIcon from "../icons/InstagramIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FacebookIcon from "../icons/FacebookIcon";
import ExternalIcon from "../icons/externalIcon";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  facebook: FacebookIcon,
};

export default async function Instructors() {
  const locale = await getLocale();
  const t = await getTranslations("Instructors");
  const payload = await getPayload({ config });

  const { docs: allInstructors } = await payload.find({
    collection: "instructors",
    depth: 1,
    limit: 50,
    locale: locale as Locale,
    sort: "order",
    where: {
      isActive: { equals: true },
    },
  });

  const instructors = allInstructors.filter(
    (instructor): instructor is Instructor & { photo: Media } =>
      typeof instructor.photo === "object" &&
      Boolean(instructor.photo.sizes?.thumbnail?.url || instructor.photo.url),
  );

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
        <div className="flex gap-10">
          {instructors.map((instructor) => {
            const photo = instructor.photo;
            const photoUrl = photo.sizes?.thumbnail?.url || photo.url;

            const weapons = (instructor.weapons ?? []).filter(
              (weapon): weapon is Weapon => typeof weapon === "object",
            );
            const socialLinks = instructor.socialLinks ?? [];

            return (
              <div
                key={instructor.id}
                className="flex w-80 flex-none flex-col gap-4 text-night"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={photoUrl!}
                    alt={photo.alt || instructor.name}
                    fill
                    sizes="(min-width: 640px) 288px, 320px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  {weapons.length > 0 && (
                    <div className="flex flex-wrap gap-x-6 text-sm">
                      {weapons.map((weapon) => (
                        <span
                          key={weapon.id}
                          className="text-base font-semibold"
                        >
                          {weapon.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-4xl font-normal leading-8 ">
                    {instructor.name}
                  </div>

                  {instructor.description && (
                    <p className="line-clamp-3 text-sm">
                      {instructor.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                  <div className="flex gap-2">
                    {socialLinks.map((link) => {
                      const Icon = socialIcons[link.platform];
                      if (!Icon) return null;

                      return (
                        <SocialLink
                          key={link.id ?? link.url}
                          href={link.url}
                          icon={Icon}
                          label={link.platform}
                        />
                      );
                    })}
                  </div>

                  {instructor.hemaRatingUrl && (
                    <a
                      href={instructor.hemaRatingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-normal text-night hover:text-gold-200"
                    >
                      {t("hemaRating")}
                      <ExternalIcon className="w-4 h4" />
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
