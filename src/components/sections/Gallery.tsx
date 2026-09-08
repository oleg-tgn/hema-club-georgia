import type { Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import GalleryCarousel from "./GalleryCarousel";

export default async function Gallery() {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "gallery-photos",
    depth: 1,
    limit: 50,
    locale: locale as Locale,
    sort: "order",
  });

  const photos = docs
    .filter((doc) => doc.photo && typeof doc.photo === "object")
    .map((doc) => {
      const photo = doc.photo as { url?: string | null; width?: number | null; height?: number | null };
      return {
        id: doc.id,
        src: photo.url || "",
        width: photo.width || 1280,
        height: photo.height || 720,
        caption: doc.caption,
      };
    })
    .filter((photo) => photo.src);

  if (photos.length === 0) {
    return null;
  }

  return <GalleryCarousel photos={photos} />;
}
