import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Faq from "@/components/sections/Faq";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });

  return {
    title: `${t("title")} | Saint George's HEMA School`,
    description: t("metaDescription"),
  };
}

export default function FaqPage() {
  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Faq />
    </section>
  );
}
