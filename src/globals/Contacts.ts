import type { GlobalConfig } from "payload";

export const Contacts: GlobalConfig = {
  slug: "contacts",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "instagram",
      type: "text",
      required: true,
      localized: false,
    },
    {
      name: "instagramDirect",
      type: "text",
      required: false,
      localized: false,
    },
    {
      name: "facebook",
      type: "text",
      required: false,
      localized: false,
    },
    {
      name: "email",
      type: "text",
      required: false,
      localized: false,
    },
  ],
};
