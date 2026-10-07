import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Post } from "@/payload-types";
import { previewOf } from "@/lib/posts";
import Heading from "../ui/Heading";
import PostDateline from "../ui/PostDateline";

// One entry of the list, like a line in a magazine's contents: dateline,
// title, the opening paragraph. No cards or covers; hairlines between.
function PostEntry({ post, locale }: { post: Post; locale: string }) {
  const preview = previewOf(post);

  return (
    <article className="border-night/15 flex flex-col gap-3 border-t py-8 first:border-t-0 first:pt-0">
      <PostDateline post={post} locale={locale} />
      <Heading as="h3">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-gold-200 transition-colors"
        >
          {post.title}
        </Link>
      </Heading>
      {preview && <p className="text-night font-text text-body">{preview}</p>}
    </article>
  );
}

export default async function Blog() {
  const locale = await getLocale();
  const t = await getTranslations("Blog");

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 200,
    sort: "-publishedAt",
    locale: locale as Locale,
    where: { _status: { equals: "published" } },
  });

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12">
      <Heading as="h1" className="text-center">
        {t("title")}
      </Heading>
      <div className="flex w-full max-w-160 flex-col">
        {docs.length === 0 && (
          <p className="text-asphalt text-center">{t("empty")}</p>
        )}
        {docs.map((post) => (
          <PostEntry key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
