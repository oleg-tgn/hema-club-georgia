import type { CollectionConfig } from "payload";

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
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
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
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
