import type { CollectionConfig } from "payload";

import { isAdmin, isAdminFieldLevel } from "@/access/isAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    // Admins can see/manage every account; moderators can only see/manage
    // their own so they don't need list access to the whole team.
    read: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      return { id: { equals: req.user.id } };
    },
    update: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      return { id: { equals: req.user.id } };
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "moderator",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
      ],
      access: {
        // Only an admin can promote/demote — a moderator editing their own
        // account can't grant themselves admin rights.
        update: isAdminFieldLevel,
      },
    },
  ],
};
