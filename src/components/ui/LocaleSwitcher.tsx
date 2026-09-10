"use client";

import { useLocale } from "next-intl";
import { Menu } from "@base-ui/react/menu";
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
    <Menu.Root>
      <Menu.Trigger
        className="flex items-center gap-1 text-base font-semibold text-black/40 outline-none hover:text-black"
        aria-label="Change language"
      >
        {labels[locale]}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M11.3535 7.35352L8 10.707L4.64648 7.35352L5.35352 6.64648L8 9.29297L10.6465 6.64648L11.3535 7.35352Z"
            fill="#A19D97"
          />
        </svg>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner align="center" sideOffset={8} className="z-60">
          <Menu.Popup className="rounded-md border border-black/40 bg-paper-100  shadow-lg">
            {routing.locales.map((loc) => (
              <Menu.Item
                key={loc}
                onClick={() =>
                  router.replace(pathname, { locale: loc, scroll: false })
                }
                className={`cursor-pointer text-base font-semibold outline-none transition-colors py-2 px-3 ${
                  loc === locale
                    ? "text-black bg-night/10 hover:bg-night/10"
                    : "text-black/40 hover:text-black/60 hover:bg-night/5"
                }`}
              >
                {labels[loc]}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
