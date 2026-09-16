import type { Locale } from "@/i18n/routing";
import type { GalleryPhoto, Media } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import { Carousel, CarouselViewport, CarouselControls } from "../ui/Carousel";
import InstagramIcon from "../icons/InstagramIcon";

function InstagramLink({href, label, className}: {href: string,  label: string, className: string}) {
  if (!href) return;
  return (  
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group justify-self-start flex items-center gap-4 cursor-pointer text-night ${className}`}
    >
      <span className="flex w-12 h-12 border border-black/20 rounded-full items-center justify-center transition-colors group-hover:bg-night-hover">
        <InstagramIcon className="w-6 h-6" />
      </span>
      <span className="text-xl font-medium">{label}</span>
    </a>
  )
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
      <div className="grid grid-cols-2 items-center mb-5 lg:grid-cols-[1fr_auto_1fr]">
        <InstagramLink href={instagramUrl} label={t("instagramCta")} className="hidden lg:flex" />

        <Heading size="lg" as="h2" className="justify-self-start lg:col-start-2 lg:justify-self-center">
          {t("title")}
        </Heading>

        <CarouselControls className="justify-self-end lg:col-start-3" />
      </div>

      <CarouselViewport>
        <div className="flex gap-3">
          {photos.map(({ id, photo, caption }) => (
            <div
              key={id}
              className="h-65.5  rounded-lg overflow-hidden flex-none sm:h-99.75 md:h-106.5 lg:h-124 2xl:h-166.5"
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

      <div className="flex mt-5">
        <InstagramLink href={instagramUrl} label={t("instagramCta")} className="flex lg:hidden" />
      </div>
    </Carousel>
  );
}
