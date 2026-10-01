import type { CollectionConfig } from "payload";

import { isAdminOrModerator } from "@/access/isAdminOrModerator";
import { isAdmin } from "@/access/isAdmin";

export const SocialLinks: CollectionConfig = {
  slug: "social-links",
  labels: {
    singular: "Social Link",
    plural: "Social Links",
  },
  defaultSort: "order",
  admin: {
    useAsTitle: "platform",
    defaultColumns: ["platform", "url", "order"],
  },
  access: {
    read: () => true,
    create: isAdminOrModerator,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  fields: [
    {
      name: "platform",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Instagram", value: "instagram" },
        { label: "Telegram", value: "telegram" },
        { label: "Facebook", value: "facebook" },
        { label: "YouTube", value: "youtube" },
        { label: "TikTok", value: "tiktok" },
        { label: "Website", value: "website" },
      ],
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "label",
      type: "text",
      admin: {
        description:
          "Account name shown in the footer, e.g. @st.george_hema_school. Leave empty to show the platform name.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
