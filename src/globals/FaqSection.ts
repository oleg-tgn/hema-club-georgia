import type { GlobalConfig } from "payload";

export const FaqSection: GlobalConfig = {
  slug: "faq-section",
  label: "FAQ Section",
  admin: {
    group: "Sections",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "items",
      label: "Questions",
      type: "array",
      admin: {
        description: "Shown as an accordion, in this order.",
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
          localized: true,
          admin: {
            description: "Line breaks are kept.",
          },
        },
      ],
    },
  ],
};
