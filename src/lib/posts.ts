import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Locale } from "@/i18n/routing";
import type { Post } from "@/payload-types";

// A published post by its address, in the page's language. Cached per
// request, so the post page and its metadata fetch it once.
export const getPost = cache(async (slug: string, locale: string) => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 1,
    locale: locale as Locale,
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
  });
  return docs[0] ?? null;
});

// "7 October 2026" / "7 октября 2026 г." in the page's language. The date is
// picked as a whole day in Tbilisi, so it is read there too.
export function formatPostDate(post: Post, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tbilisi",
  }).format(new Date(post.publishedAt));
}

export function authorOf(post: Post): string | null {
  if (post.author && typeof post.author === "object") return post.author.name;
  return post.guestAuthor || null;
}

type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] };

function textOf(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(textOf).join("");
}

// What the blog list shows under the title: the post's lead, or else its
// first paragraph in full - never a sentence cut off with an ellipsis.
export function previewOf(post: Post): string | null {
  if (post.lead) return post.lead;
  const nodes = post.content.root.children as LexicalNode[];
  for (const node of nodes) {
    if (node.type !== "paragraph") continue;
    const text = textOf(node).trim();
    if (text) return text;
  }
  return null;
}
