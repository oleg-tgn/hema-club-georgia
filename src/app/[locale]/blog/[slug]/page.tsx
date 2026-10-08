import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, previewOf } from "@/lib/posts";
import Post from "@/components/sections/Post";

export const revalidate = 60;

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
