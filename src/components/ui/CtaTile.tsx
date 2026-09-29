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
      className={`border-gold-200 text-gold-200 hover:bg-gold-200/10 flex h-full flex-row-reverse items-center justify-between rounded-lg border py-1 transition-colors duration-200 sm:flex-col sm:items-end sm:gap-0 sm:pb-2 ${className}`}
    >
      <span className="flex sm:px-1">
        <ArrowIcon direction={"up-right"} className="h-8 w-8" />
      </span>
      <span className="w-max px-2.5 leading-none sm:self-start">
        {children}
      </span>
    </a>
  );
}
