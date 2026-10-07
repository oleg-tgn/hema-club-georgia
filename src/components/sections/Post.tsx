import { getLocale, getTranslations } from "next-intl/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Link } from "@/i18n/navigation";
import type { Post as PostDoc } from "@/payload-types";
import Heading from "../ui/Heading";
import PostDateline from "../ui/PostDateline";
import Tailpiece from "../ui/Tailpiece";

// Set like a book chapter in one narrow column: title, dateline, the lead
// a step larger than the text, the text, and a tailpiece to close it.
export default async function Post({ post }: { post: PostDoc }) {
  const locale = await getLocale();
  const t = await getTranslations("Blog");

  return (
    <article className="mx-auto flex w-full max-w-160 flex-col gap-8">
      <header className="flex flex-col items-center gap-4 text-center">
        <Heading as="h1">{post.title}</Heading>
        <PostDateline post={post} locale={locale} />
      </header>
      {post.lead && (
        <p className="text-night font-text text-lead">{post.lead}</p>
      )}
      <RichText data={post.content} className="post-body" />
      <Tailpiece />
      <Link
        href="/blog"
        className="text-night hover:text-gold-200 self-center text-sm font-medium transition-colors"
      >
        ← {t("allPosts")}
      </Link>
    </article>
  );
}
