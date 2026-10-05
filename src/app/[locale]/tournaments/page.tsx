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

// TEMPORARY: ?v=light|warm|old switches the card sheet,
// ?mark=sheet gives only upcoming tournaments a sheet, ?bg=rrggbb tries
// a colour for it, ?frame=1 adds a hairline frame and ?demo=1 shows sample
// tournaments, to compare the two variants. Drop once one is chosen.
export default async function TournamentsPage({
  searchParams,
}: PageProps<"/[locale]/tournaments">) {
  const { v, mark, bg, frame, demo } = await searchParams;

  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Tournaments
        variant={v === "light" || v === "warm" || v === "old" ? v : "plain"}
        mark={mark === "sheet" ? "sheet" : "label"}
        bg={
          typeof bg === "string" && /^[0-9a-f]{6}$/i.test(bg)
            ? `#${bg}`
            : undefined
        }
        frame={frame === "1"}
        demo={demo === "1"}
      />
    </section>
  );
}
