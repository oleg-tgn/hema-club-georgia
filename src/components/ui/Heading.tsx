import type { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

// The size follows the level: h1 is the page title (the school's name on the
// home page), a step above the h2 section headings, so it stays the largest
// line on the page; h3 heads small blocks such as schedule cards. Tablets
// get a middle step: up to lg the page is still one narrow column.
const tagStyles: Record<HeadingTag, string> = {
  h1: "text-[42px] sm:text-[52px] lg:text-[64px]",
  h2: "text-4xl sm:text-[44px] lg:text-[52px]",
  h3: "text-[26px] sm:text-[28px] lg:text-3xl",
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
      className={`text-night font-serif leading-none font-normal tracking-tight ${tagStyles[Tag]} ${className}`}
    >
      {children}
    </Tag>
  );
}
