import type { ElementType, ReactNode } from "react";

type HeadingSize = "lg" | "md" | "sm";

const sizeStyles: Record<HeadingSize, string> = {
  lg: "text-7xl leading-none",
  md: "text-6xl leading-none",
  sm: "text-3xl leading-none",
};

type HeadingProps = {
  size: HeadingSize;
  as: ElementType;
  className?: string;
  children?: ReactNode;
};

export default function Heading({
  size,
  as: Tag,
  className = "",
  children,
}: HeadingProps) {
  return (
    <Tag
      className={`font-serif font-normal tracking-[-0.03em] text-night ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
