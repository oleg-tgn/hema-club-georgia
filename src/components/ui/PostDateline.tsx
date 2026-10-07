import type { Post } from "@/payload-types";
import { authorOf, formatPostDate } from "@/lib/posts";

// Dateline over a post's title: "7 October 2026 · Author". Used in the blog
// list and on the post itself.
export default function PostDateline({
  post,
  locale,
  className = "",
}: {
  post: Post;
  locale: string;
  className?: string;
}) {
  const author = authorOf(post);

  return (
    <p
      className={`text-night text-sm font-semibold tracking-wider uppercase ${className}`}
    >
      {formatPostDate(post, locale)}
      {author && <span className="text-asphalt"> · {author}</span>}
    </p>
  );
}
