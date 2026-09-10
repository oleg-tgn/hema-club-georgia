import ArrowIcon from "../icons/ArrowIcon";

type CtaTileProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export default async function CtaTile({
  href,
  children,
  external = false,
  className = "",
}: CtaTileProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group @container relative flex  h-full flex-col items-end justify-between overflow-hidden rounded-lg border border-gold-200 text-gold-200 transition-colors duration-300 hover:border-gold-100 hover:text-gold-100 ${className}`}
    >
      <span className="relative mt-1 mr-1">
        <ArrowIcon
          direction={"up-right"}
          className="text-gold-200 group-hover:text-gold-100"
        />
      </span>
      <span
        className={`relative mb-3 w-max self-start px-2.5 lining-nums proportional-nums transition-transform duration-300 group-hover:translate-x-[calc(100cqw-100%)]`}
      >
        {children}
      </span>
    </a>
  );
}
