import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";
import { slugField, type CollectionConfig, type Field } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

// Settings of an image inserted in a post's text (click the image, then the
// pencil): how wide, where in the column, and a caption. They are stored
// with the post, not on the Media file, so one photo can be set differently
// in different posts. Rendered by components/ui/PostImage.tsx.
const imageFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "full",
    options: [
      { label: "Full column width", value: "full" },
      { label: "Medium", value: "medium" },
      { label: "Small", value: "small" },
    ],
  },
  {
    name: "position",
    type: "select",
    defaultValue: "center",
    options: [
      { label: "Centre", value: "center" },
      { label: "Left, text wraps around", value: "left" },
      { label: "Right, text wraps around", value: "right" },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.size !== "full",
      description: "On phones the image always takes the full width.",
    },
  },
  {
    name: "caption",
    type: "text",
  },
];

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
      name: "showContents",
      type: "checkbox",
      defaultValue: false,
      label: "Show contents",
      admin: {
        position: "sidebar",
        description:
          "For a long post: a list of its subheadings beside the text (above it on phones), to jump between sections.",
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({
            collections: {
              media: {
                fields: imageFields,
              },
            },
          }),
        ],
      }),
    },
  ],
};
