import type { CollectionConfig } from "payload";

export const Weapons: CollectionConfig = {
  slug: "weapons",
  defaultSort: "order",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Stable identifier, e.g. 'longsword'. Not localized.",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "label",
      type: "richText",
      localized: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Controls display order in the weapons panel.",
      },
    },
  ],
};
