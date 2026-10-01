import { getTranslations } from "next-intl/server";

export default async function TournamentsPage() {
  const t = await getTranslations("TournamentPage");

  return (
    <section className="py-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg">{t("comingSoon")}</p>
      </div>
    </section>
  );
}
