import type { GlobalConfig } from "payload";

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
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
