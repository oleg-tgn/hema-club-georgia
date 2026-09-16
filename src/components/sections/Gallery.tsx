import type { Locale } from "@/i18n/routing";
import type { GalleryPhoto, Media } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import { Carousel, CarouselViewport, CarouselControls } from "../ui/Carousel";
import InstagramIcon from "../icons/InstagramIcon";

function InstagramLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  if (!href) return;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group text-night flex cursor-pointer items-center gap-4 justify-self-start ${className}`}
    >
      <span className="group-hover:bg-night-hover flex h-12.5 w-12.5 items-center justify-center rounded-full border border-black/40 transition-colors">
        <InstagramIcon className="h-8 w-8" />
      </span>
      <span className="text-xl font-medium">{label}</span>
    </a>
  );
}

export default async function Gallery() {
  const locale = await getLocale();
  const t = await getTranslations("Gallery");
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "gallery-photos",
    depth: 1,
    limit: 50,
    locale: locale as Locale,
    sort: "order",
  });

  const photos = docs.filter(
    (doc): doc is GalleryPhoto & { photo: Media & { url: string } } =>
      typeof doc.photo === "object" && Boolean(doc.photo.url),
  );

  const { docs: socialLinks } = await payload.find({
    collection: "social-links",
    where: { platform: { equals: "instagram" } },
    limit: 1,
  });

  const instagramUrl = socialLinks[0]?.url;

  if (photos.length === 0) {
    return null;
  }

  return (
    <Carousel options={{ loop: false, align: "start" }}>
      <div className="mb-5 grid grid-cols-2 items-end lg:grid-cols-[1fr_auto_1fr]">
        <InstagramLink
          href={instagramUrl}
          label={t("instagramCta")}
          className="hidden lg:flex"
        />

        <Heading
          size="lg"
          as="h2"
          className="justify-self-start lg:col-start-2 lg:justify-self-center"
        >
          {t("title")}
        </Heading>

        <CarouselControls className="justify-self-end lg:col-start-3" />
      </div>

      <CarouselViewport>
        <div className="flex gap-3">
          {photos.map(({ id, photo, caption }) => (
            <div
              key={id}
              className="h-49.25 flex-none overflow-hidden rounded-lg sm:h-99.75 md:h-106.5 lg:h-124 2xl:h-166.5"
            >
              <Image
                src={photo.url}
                alt={caption || ""}
                width={photo.width || 1280}
                height={photo.height || 720}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>
      </CarouselViewport>

      <div className="mt-5 flex">
        <InstagramLink
          href={instagramUrl}
          label={t("instagramCta")}
          className="flex lg:hidden"
        />
      </div>
    </Carousel>
  );
}
