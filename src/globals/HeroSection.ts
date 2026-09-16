import type { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero",
  label: "Hero Section",
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
      type: "textarea",
      required: true,
      localized: true,
      defaultValue:
        "We study and practice the fighting systems recorded in historical treatises, guided by the same manuals used by masters of old.",
    },
  ],
};
