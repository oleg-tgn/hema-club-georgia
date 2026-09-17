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
    // Moderators only ever have read/update access to their own account
    // (via the Account page in the top-right menu), so a browsable "Users"
    // list in the sidebar isn't useful to them.
    hidden: ({ user }) => user?.role !== "admin",
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
