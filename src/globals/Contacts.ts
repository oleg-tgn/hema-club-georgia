import type { GlobalConfig } from "payload";

export const Contacts: GlobalConfig = {
  slug: "contacts",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "addressLine",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "",
    },
    {
      name: "googleMap",
      type: "text",
      required: true,
      defaultValue: "",
    },
    {
      name: "phone",
      type: "text",
      admin: {
        description:
          "International format, shown as written, e.g. +995 591 01 59 07. Leave empty to hide.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "instagram",
          type: "text",
          admin: { description: "Profile URL. Leave empty to hide." },
        },
        {
          name: "instagramLabel",
          type: "text",
          admin: {
            description:
              "Account name shown in the footer. Leave empty to show “Instagram”.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "facebook",
          type: "text",
          admin: { description: "Page URL. Leave empty to hide." },
        },
        {
          name: "facebookLabel",
          type: "text",
          admin: {
            description:
              "Page name shown in the footer. Leave empty to show “Facebook”.",
          },
        },
      ],
    },
  ],
};
