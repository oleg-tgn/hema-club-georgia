import type { ElementType, ReactNode } from "react";

type HeadingSize = "lg" | "sm";

const sizeStyles: Record<HeadingSize, string> = {
  lg: "text-[42px] leading-9.5 sm:text-7xl sm:leading-16",
  sm: "text-3xl leading-9.5",
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
