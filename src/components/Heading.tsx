import type { ElementType, ReactNode } from "react";

type HeadingSize = "lg" | "md" | "sm";

const baseStyles =
  "font-serif font-normal leading-none tracking-tight text-night";

const sizeStyles: Record<HeadingSize, string> = {
  lg: "text-7xl",
  md: "text-6xl",
  sm: "text-3xl",
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
    <Tag className={`${baseStyles} ${sizeStyles[size]} ${className}`}>
      {children}
    </Tag>
  );
}
