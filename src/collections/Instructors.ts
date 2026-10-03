import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

export const Instructors: CollectionConfig = {
  slug: "instructors",
  defaultSort: "order",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isActive", "order"],
  },
  access: {
    read: () => true,
    create: isAdminOrModerator,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
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
      name: "hemaRatingUrl",
      type: "text",
      admin: {
        description: "Link to this instructor's HEMA Ratings profile.",
      },
    },
    {
      name: "hemagonUrl",
      type: "text",
      admin: {
        description: "Link to this instructor's Hemagon profile.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Uncheck to hide this instructor from the site, e.g. if they no longer teach.",
      },
    },
  ],
};
