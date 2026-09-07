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
  ],
};
