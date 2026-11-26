import type { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

// The size follows the level: h1 is the page title (the school's name on the
// home page), a step above the h2 section headings, so it stays the largest
// line on the page; h3 heads small blocks such as schedule cards. Tablets
// get a middle step, and h1/h2 one more at lg, so they don't leap to the
// desktop size at xl in one go (h3 changes little, it has none). The
// sizes are theme tokens (globals.css). Weight 350: a touch lighter than the
// text, so the large sizes don't turn heavy.
const tagStyles: Record<HeadingTag, string> = {
  h1: "text-h1 sm:text-h1-sm lg:text-h1-lg xl:text-h1-xl",
  h2: "text-h2 sm:text-h2-sm lg:text-h2-lg xl:text-h2-xl",
  h3: "text-h3 sm:text-h3-sm xl:text-h3-xl",
};

type HeadingProps = {
  as: HeadingTag;
  className?: string;
  children?: ReactNode;
};

export default function Heading({
  as: Tag,
  className = "",
  children,
}: HeadingProps) {
  return (
    <Tag
      className={`text-night font-serif leading-none font-[350] tracking-tight ${tagStyles[Tag]} ${className}`}
    >
      {children}
    </Tag>
  );
}
