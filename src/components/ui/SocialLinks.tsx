import type { ComponentType } from "react";
import InstagramIcon from "../icons/InstagramIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FacebookIcon from "../icons/FacebookIcon";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  facebook: FacebookIcon,
};

export interface SocialLinkItem {
  id?: string | null;
  platform: string;
  url: string;
}

export default function SocialLinks({
  links,
  className = "",
}: {
  links: SocialLinkItem[];
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = socialIcons[link.platform];
        if (!Icon) return null;

        return (
          <a
            key={link.id ?? link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="flex items-center justify-center text-night transition-colors hover:text-gold-200"
          >
            <Icon className="h-6 w-6" />
          </a>
        );
      })}
    </div>
  );
}
