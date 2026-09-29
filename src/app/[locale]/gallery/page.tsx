import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Gallery from "@/components/sections/Gallery";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: `${t("title")} | Saint George's HEMA School`,
    description: t("metaDescription"),
  };
}

export default function GalleryPage() {
  return (
    <section className="md:pb -20 pb-10 sm:pb-15">
      <Gallery />
    </section>
  );
}
