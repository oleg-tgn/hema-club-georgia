import Image from "next/image";
import type { SerializedUploadNode } from "@payloadcms/richtext-lexical";
import type { Media } from "@/payload-types";

type Size = "full" | "medium" | "small";
type Position = "center" | "left" | "right";

// The settings an editor gives an image in a post (see the `content` field
// in collections/Posts.ts). Images inserted before they existed have none
// and stay full width.
type ImageSettings = {
  size?: Size | null;
  position?: Position | null;
  caption?: string | null;
};

// Rendered width on a wide screen as a share of the 640px column, so the
// browser picks a file of the right size.
const COLUMN = 640;
const SHARE: Record<Size, number> = { full: 1, medium: 0.6, small: 0.4 };

// An image in a blog post, set like an illustration in a book: full column
// width, or narrower - centred, or to one side with the text running
// around it - with an optional caption under it.
export default function PostImage({ node }: { node: SerializedUploadNode }) {
  const media = node.value as Media | number | string;
  if (typeof media !== "object" || !media.url) return null;

  const settings = (node.fields ?? {}) as ImageSettings;
  const size = settings.size ?? "full";
  const position = size === "full" ? "center" : (settings.position ?? "center");
  const caption = settings.caption?.trim();

  return (
    <figure
      className={`post-figure post-figure-${size} post-figure-${position}`}
    >
      <Image
        src={media.url}
        alt={media.alt ?? ""}
        width={media.width ?? 1600}
        height={media.height ?? 1200}
        sizes={`(min-width: 640px) ${Math.round(COLUMN * SHARE[size])}px, 100vw`}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
