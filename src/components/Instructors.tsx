import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import type { Locale } from "@/i18n/routing";

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  website: "Website",
  youtube: "YouTube",
};

export default async function Instructors() {
  const locale = await getLocale();
  const t = await getTranslations("Instructors");
  const payload = await getPayload({ config });

  const { docs: instructors } = await payload.find({
    collection: "instructors",
    depth: 1,
    limit: 50,
    locale: locale as Locale,
    sort: "order",
  });

  if (instructors.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">{t("title")}</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {instructors.map((instructor) => {
            const photo =
              instructor.photo && typeof instructor.photo === "object"
                ? instructor.photo
                : null;
            const photoUrl = photo?.sizes?.thumbnail?.url || photo?.url;

            return (
              <div key={instructor.id} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                  {photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={photo?.alt || instructor.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {instructor.name}
                </h3>
                {instructor.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {instructor.description}
                  </p>
                )}
                {instructor.socialLinks && instructor.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-3">
                    {instructor.socialLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline text-sm"
                      >
                        {platformLabels[link.platform] ?? link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
