import { slugField, type CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

// Blog posts. Every post is written in English first; a language it isn't
// translated into shows the English text (Payload's locale fallback), so a
// post never disappears from one language of the site.
export const Posts: CollectionConfig = {
  slug: "posts",
  defaultSort: "-publishedAt",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "author", "_status"],
  },
  versions: {
    drafts: true,
  },
  access: {
    // Visitors only see published posts; drafts are for the editors.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: isAdminOrModerator,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slugField({ position: "sidebar" }),
    {
      name: "publishedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "instructors",
      admin: {
        position: "sidebar",
        description: "Leave empty and fill 'Guest author' for someone else.",
      },
    },
    {
      name: "guestAuthor",
      type: "text",
      localized: true,
      admin: {
        position: "sidebar",
        description: "Shown only when no instructor is picked above.",
      },
    },
    {
      name: "lead",
      type: "textarea",
      localized: true,
      admin: {
        description:
          "A short opening paragraph: what the post is about. Shown in the blog list and at the top of the post. Leave empty to use the post's first paragraph in the list.",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
