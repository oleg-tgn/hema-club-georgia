import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Instructors from "@/components/sections/Instructors";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/instructors">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Instructors" });

  return {
    title: `${t("title")} | Saint George's HEMA School`,
    description: t("metaDescription"),
  };
}

export default function InstructorsPage() {
  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Instructors />
    </section>
  );
}
