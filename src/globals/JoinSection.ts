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
    {
      name: "topLeftText",
      type: "text",
      localized: true,
      admin: {
        description: "For example: 180 GEL/Month",
      },
    },
    {
      name: "topRightText",
      type: "text",
      localized: true,
      admin: {
        description: "For example: Classes in RU/EN/GE",
      },
    },
    {
      name: "bottomText",
      type: "text",
      localized: true,
      admin: {
        description: "For example: We provide training gear and steel weapons ",
      },
    },
  ],
};
