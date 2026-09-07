import type { GlobalConfig } from "payload";

export const WeaponsSection: GlobalConfig = {
  slug: "weapons-section",
  label: "Weapons Section",
  admin: {
    group: "Sections",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "provisions",
      label: "What we provide",
      type: "array",
      minRows: 1,
      maxRows: 2,
      admin: {
        description:
          "1-2 lines shown in the Weapons section, e.g. training steel and protective gear. The second row is optional.",
      },
      fields: [
        {
          name: "intro",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "highlight",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
