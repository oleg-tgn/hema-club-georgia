import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs, previewOf } from "@/lib/posts";
import Post from "@/components/sections/Post";

export const revalidate = 60;

// Without this list the route is rendered on every request and never
// cached. With it, published posts are built ahead (and refreshed every
// minute); a post published later is built on its first visit and cached
// from then on.
export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) return {};

  return {
    title: `${post.title} | Saint George's HEMA School`,
    description: previewOf(post) ?? undefined,
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) notFound();

  return (
    <section className="pb-10 sm:pb-15 md:pb-20">
      <Post post={post} />
    </section>
  );
}
