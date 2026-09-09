import { getTranslations } from "next-intl/server";

export default async function TournamentsPage() {
  const t = await getTranslations("TournamentPage");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg max-w-2xl mx-auto">{t("comingSoon")}</p>
      </div>
    </section>
  );
}
