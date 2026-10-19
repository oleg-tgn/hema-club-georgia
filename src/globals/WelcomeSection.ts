import type { GlobalConfig } from "payload";

// Per-locale default title: Payload fills it in on read until an editor
// saves the global.
const DEFAULT_TITLE: Record<string, string> = {
  en: "Welcome",
  ru: "Добро пожаловать",
  ka: "მოგესალმებით",
};

export const WelcomeSection: GlobalConfig = {
  slug: "welcome-section",
  label: "Welcome Section",
  admin: {
    group: "Sections",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      defaultValue: ({ locale }) => DEFAULT_TITLE[locale ?? "en"],
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
