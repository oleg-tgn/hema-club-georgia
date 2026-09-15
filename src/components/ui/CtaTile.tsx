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
      className={`group @container relative flex h-full flex-row-reverse items-center py-1 justify-between overflow-hidden rounded-lg border border-gold-200 text-gold-200 transition-colors duration-300 sm:flex-col sm:items-end sm:gap-0 sm:pb-2 hover:border-gold-100 hover:text-gold-100 ${className}`}
    >
      <span className="relative flex align-center sm:px-1">
        <ArrowIcon
          direction={"up-right"}
          className="h-8 w-8 text-gold-200 group-hover:text-gold-100"
        />
      </span>
      <span
        className={`relative w-max px-2.5 leading-none sm:self-start transition-transform duration-300 group-hover:translate-x-[calc(100cqw-100%-1.5rem)] sm:group-hover:translate-x-[calc(100cqw-100%)]`}
      >
        {children}
      </span>
    </a>
  );
}
