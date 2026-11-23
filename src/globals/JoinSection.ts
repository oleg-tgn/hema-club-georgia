import type { GlobalConfig } from "payload";

export const JoinSection: GlobalConfig = {
  slug: "join",
  label: "Join Section",
  admin: {
    group: "Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Section title",
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
