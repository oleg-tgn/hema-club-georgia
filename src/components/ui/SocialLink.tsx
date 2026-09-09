import type { ComponentType } from "react";

export default function SocialLink({
  href,
  icon: Icon,
  label,
  className = "h-8 w-8",
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center text-night transition-colors hover:text-gold-200"
    >
      <Icon className={className} />
    </a>
  );
}
