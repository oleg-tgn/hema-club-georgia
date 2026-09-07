import { getLocale } from "next-intl/server";
import ArrowIcon from "../icons/ArrowIcon";

type CtaTileProps = {
  href: string;
  children: React.ReactNode;
  size: "lg" | "sm";
  external?: boolean;
  className?: string;
};

// ru/ka translations run longer than en, so those locales get the next
// size down to keep the label from overflowing the tile.
const textSizeClasses: Record<
  CtaTileProps["size"],
  Record<"default" | "compact", string>
> = {
  lg: {
    default: "text-4xl leading-none font-normal",
    compact: "text-2xl leading-none font-normal",
  },
  sm: {
    default: "text-xl leading-none font-medium",
    compact: "text-base leading-none font-medium",
  },
};

export default async function CtaTile({
  href,
  children,
  size,
  external = false,
  className = "",
}: CtaTileProps) {
  const locale = await getLocale();
  const sizeClass =
    textSizeClasses[size][locale === "en" ? "default" : "compact"];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex h-full w-full flex-col items-end justify-between overflow-hidden rounded-lg border border-gold-200 text-gold-200 transition-colors duration-300 hover:border-gold-100 hover:text-gold-100 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gold-200/0 transition-colors duration-300 group-hover:bg-gold-200/10"
      />
      <span className="relative mt-1 mr-1">
        <ArrowIcon
          external={external}
          className={`text-gold-200 transition-transform duration-300 group-hover:text-gold-100 ${external ? "group-hover:translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1"}`}
        />
      </span>
      <span
        className={`relative mb-3 w-full self-start px-2.5 lining-nums proportional-nums ${sizeClass}`}
      >
        {children}
      </span>
    </a>
  );
}
