import type { Locale } from "@/i18n/routing";
import type { GalleryPhoto, Media } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Heading from "../ui/Heading";
import { Carousel, CarouselViewport, CarouselControls } from "../ui/Carousel";
import InstagramIcon from "../icons/InstagramIcon";

const INSTAGRAM_URL = "#";

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

  if (photos.length === 0) {
    return null;
  }

  return (
    <Carousel options={{ loop: false, align: "start" }}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group justify-self-start flex items-center gap-4 cursor-pointer text-night transition-colors duration-200 hover:text-night"
        >
          <span className="flex w-10 h-10 border border-black/20 rounded-full items-center justify-center transition-colors duration-200 group-hover:bg-night/5">
            <InstagramIcon className="w-6 h-6" />
          </span>
          <span className="text-xl font-medium">{t("instagramCta")}</span>
        </a>

        <Heading size="lg" as="h2" className="justify-self-center">
          {t("title")}
        </Heading>

        <CarouselControls className="justify-self-end" />
      </div>

      <CarouselViewport>
        <div className="flex gap-3">
          {photos.map(({ id, photo, caption }) => (
            <div
              key={id}
              className="h-168 rounded-lg overflow-hidden flex-none"
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
    </Carousel>
  );
}
