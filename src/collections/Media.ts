import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    // Moderators still upload/pick media through the upload fields on
    // Instructors/GalleryPhotos — they don't need the standalone library
    // in the sidebar.
    hidden: ({ user }) => user?.role !== "admin",
  },
  access: {
    read: () => true,
    create: isAdminOrModerator,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  upload: {
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
    },
  ],
};
