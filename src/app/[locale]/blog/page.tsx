import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Blog from "@/components/sections/Blog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: `${t("title")} | Saint George's HEMA School`,
    description: t("metaDescription"),
  };
}

export default function BlogPage() {
  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Blog />
    </section>
  );
}
