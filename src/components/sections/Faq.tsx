import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import Accordion from "../ui/Accordion";
import Heading from "../ui/Heading";

export default async function Faq() {
  const locale = await getLocale();
  const t = await getTranslations("Faq");
  const payload = await getPayload({ config });

  const faq = await payload.findGlobal({
    slug: "faq-section",
    locale: locale as Locale,
  });

  const items = (faq.items ?? []).map((item, i) => ({
    id: item.id ?? String(i),
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className="flex w-full flex-col items-center gap-6 xl:gap-12">
      <Heading size="lg" as="h2" className="text-center">
        {t("title")}
      </Heading>
      <div className="w-full max-w-200">
        <Accordion items={items} />
      </div>
    </div>
  );
}
