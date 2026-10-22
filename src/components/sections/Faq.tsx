import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";
import Heading from "../ui/Heading";
import Tailpiece from "../ui/Tailpiece";

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
    <div className="mx-auto flex w-full flex-col items-center gap-6">
      <Heading as="h1" className="mb-2 text-center md:mb-4">
        {t("title")}
      </Heading>
      {/* All answers stay open, like a newspaper's Q&A column: nothing is
          hidden behind a click. Pairs are parted by a short centred rule, the
          tailpiece's hairline, as a book parts sections; the tailpiece itself
          comes once, closing the page (rule: .faq-list in globals.css). */}
      <dl className="faq-list font-text text-body w-full max-w-160">
        {items.map((item) => (
          <div key={item.id}>
            <dt className="text-night font-medium">{item.question}</dt>
            <dd className="text-night/85 mt-2 whitespace-pre-line">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <Tailpiece />
      </div>
    </div>
  );
}
