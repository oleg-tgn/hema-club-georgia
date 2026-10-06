import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Tournaments from "@/components/sections/Tournaments";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tournaments">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tournaments" });

  return {
    title: `${t("title")} | Saint George's HEMA School`,
    description: t("metaDescription"),
  };
}

export default function TournamentsPage() {
  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Tournaments />
    </section>
  );
}
