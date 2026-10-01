import type { Locale } from "@/i18n/routing";
import type { Instructor, Media, Weapon } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import SocialLinks from "../ui/SocialLinks";
import ExternalIcon from "../icons/externalIcon";

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
      Boolean(instructor.photo.url || instructor.photo.sizes?.thumbnail?.url),
  );

  if (instructors.length === 0) {
    return null;
  }

  return (
    <>
      <Heading as="h1" className="mb-10 text-center">
        {t("title")}
      </Heading>

      <div className="mx-auto grid max-w-md grid-cols-1 gap-x-10 gap-y-15 sm:max-w-2xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
        {instructors.map((instructor) => {
          const photo = instructor.photo;
          const photoUrl = photo.url || photo.sizes?.thumbnail?.url;

          const weapons = (instructor.weapons ?? []).filter(
            (weapon): weapon is Weapon => typeof weapon === "object",
          );

          const [firstName, ...lastNameParts] = instructor.name.split(" ");
          const lastName = lastNameParts.join(" ");

          return (
            <div key={instructor.id} className="text-night flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                <Image
                  src={photoUrl!}
                  alt={photo.alt || instructor.name}
                  fill
                  sizes="(min-width: 640px) 320px, 448px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                {weapons.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 text-sm">
                    {weapons.map((weapon) => (
                      <span key={weapon.id} className="text-base font-semibold">
                        {weapon.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-[34px] leading-8.5 font-normal">
                  {firstName}
                  <br />
                  {lastName}
                </div>

                {instructor.description && (
                  <p className="line-clamp-3 text-sm">
                    {instructor.description}
                  </p>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                <SocialLinks
                  links={instructor.socialLinks ?? []}
                  className="gap-2"
                />

                {instructor.hemaRatingUrl && (
                  <a
                    href={instructor.hemaRatingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-night hover:text-gold-200 flex items-center gap-2 text-sm font-normal"
                  >
                    {t("hemaRating")}
                    <ExternalIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
