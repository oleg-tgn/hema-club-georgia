import type { GlobalConfig } from "payload";

export const Address: GlobalConfig = {
  slug: "address",
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
      name: "description",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "",
    },
    {
      name: "googleMap",
      type: "text",
      required: true,
      localized: false,
      defaultValue: "",
    },
    {
      name: "phone",
      type: "text",
      localized: false,
      admin: {
        description:
          "International format, shown as written, e.g. +995 591 01 59 07. Leave empty to hide.",
      },
    },
  ],
};
