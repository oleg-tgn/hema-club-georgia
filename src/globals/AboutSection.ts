import type { GlobalConfig } from "payload";

export const AboutSection: GlobalConfig = {
  slug: "about",
  label: "About Section",
  admin: {
    group: "Sections",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "About",
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "join",
      type: "group",
      admin: {
        description:
          "Teaser block shown inside the About section, linking to the Join section further down the page.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Want to join?",
        },
        {
          name: "text",
          type: "textarea",
          required: true,
          localized: true,
          defaultValue:
            "Message us on Instagram or just drop by the gym during any of our scheduled class times.",
        },
        {
          name: "buttonLabel",
          type: "text",
          localized: true,
          defaultValue: "Join the club",
        },
      ],
    },
  ],
};
