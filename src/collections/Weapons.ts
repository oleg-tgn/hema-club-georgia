import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

export const Weapons: CollectionConfig = {
  slug: "weapons",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdminOrModerator,
    delete: isAdmin,
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
  ],
};
