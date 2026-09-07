import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Contact");

  return (
    <footer className="container mx-auto px-10">
      <div className="py-4 flex items-center justify-center text-center">
        <span className="text-base leading-6 font-semibold text-asphalt">
          {t("address")}
        </span>
      </div>
    </footer>
  );
}
