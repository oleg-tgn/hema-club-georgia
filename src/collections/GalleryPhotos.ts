import type { CollectionConfig } from "payload";

export const GalleryPhotos: CollectionConfig = {
  slug: "gallery-photos",
  labels: {
    singular: "Gallery Photo",
    plural: "Gallery Photos",
  },
  defaultSort: "order",
  admin: {
    useAsTitle: "slug",
    defaultColumns: ["photo", "slug", "order"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Stable identifier, e.g. 'training-1'. Not localized.",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: {
        description: "Optional caption shown with the photo.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Controls display order in the gallery.",
      },
    },
  ],
};
