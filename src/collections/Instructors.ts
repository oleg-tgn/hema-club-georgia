import type { CollectionConfig } from "payload";

export const Instructors: CollectionConfig = {
  slug: "instructors",
  defaultSort: "order",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Not localized - proper name.",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "weapons",
      type: "relationship",
      relationTo: "weapons",
      hasMany: true,
      admin: {
        description: "Weapons this instructor teaches.",
      },
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
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
      ],
    },
    {
      name: "hemaRatingUrl",
      type: "text",
      admin: {
        description: "Link to this instructor's HEMA Rating profile.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
