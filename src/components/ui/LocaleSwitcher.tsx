"use client";

import { useLocale } from "next-intl";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const labels: Record<string, string> = {
  ru: "RU",
  ka: "GE",
  en: "EN",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-1 text-sm font-semibold text-asphalt outline-none hover:text-night"
          aria-label="Change language"
        >
          {labels[locale]}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.3535 7.35352L8 10.707L4.64648 7.35352L5.35352 6.64648L8 9.29297L10.6465 6.64648L11.3535 7.35352Z"
              fill="#A19D97"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-60 rounded-md border border-asphalt/20 bg-paper-100 py-1 px-2 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <DropdownMenu.Item
              key={loc}
              onSelect={() => router.replace(pathname, { locale: loc })}
              className={`cursor-pointer px-3 py-1.5 text-sm font-semibold outline-none transition-colors ${
                loc === locale ? "text-night" : "text-asphalt hover:text-night"
              }`}
            >
              {labels[loc]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
