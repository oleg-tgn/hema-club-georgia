import type { Locale } from "@/i18n/routing";
import type { GalleryPhoto, Media } from "@/payload-types";
import { getLocale, getTranslations } from "next-intl/server";
import config from "@payload-config";
import { getPayload } from "payload";
import Heading from "../ui/Heading";
import PhotoGallery, { type GalleryImage } from "../ui/PhotoGallery";

export default async function Gallery() {
  const locale = await getLocale();
  const t = await getTranslations("Gallery");
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "gallery-photos",
    depth: 1,
    limit: 200,
    locale: locale as Locale,
    sort: "order",
  });

  const photos: GalleryImage[] = docs
    .filter(
      (doc): doc is GalleryPhoto & { photo: Media & { url: string } } =>
        typeof doc.photo === "object" && Boolean(doc.photo.url),
    )
    .map(({ id, photo, caption }) => ({
      id,
      url: photo.url,
      width: photo.width || 1280,
      height: photo.height || 720,
      caption: caption || photo.alt || "",
    }));

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <Heading size="lg" as="h1" className="mb-10 text-center">
        {t("title")}
      </Heading>

      <PhotoGallery photos={photos} title={t("title")} />
    </>
  );
}
