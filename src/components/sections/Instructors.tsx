import type { Locale } from "@/i18n/routing";
import type { Instructor, Media, Weapon } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import ExternalIcon from "../icons/externalIcon";

function ProfileLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-night hover:text-gold-200 flex items-center gap-2"
    >
      {children}
      <ExternalIcon className="h-4 w-4" />
    </a>
  );
}

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

          return (
            <div key={instructor.id} className="text-night flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                <Image
                  src={photoUrl!}
                  alt={photo.alt || instructor.name}
                  fill
                  sizes="(min-width: 640px) 320px, min(448px, calc(100vw - 24px))"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                {weapons.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 text-sm font-medium">
                    {weapons.map((weapon) => (
                      <span key={weapon.id}>{weapon.name}</span>
                    ))}
                  </div>
                )}

                <Heading as="h3">{instructor.name}</Heading>

                {instructor.description && (
                  <p className="font-text text-body line-clamp-3">
                    {instructor.description}
                  </p>
                )}

                {(instructor.hemaRatingUrl || instructor.hemagonUrl) && (
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    {instructor.hemaRatingUrl && (
                      <ProfileLink href={instructor.hemaRatingUrl}>
                        HEMA Ratings
                      </ProfileLink>
                    )}
                    {instructor.hemagonUrl && (
                      <ProfileLink href={instructor.hemagonUrl}>
                        Hemagon
                      </ProfileLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
