import type { CollectionConfig, TextFieldSingleValidation } from "payload";

const validateTitle: TextFieldSingleValidation = (value, { siblingData }) => {
  const data = siblingData as { weapon?: unknown };
  if (!data?.weapon && !value) {
    return "Title is required when no weapon is set.";
  }
  return true;
};

export const ScheduleGroups: CollectionConfig = {
  slug: "schedule-groups",
  labels: {
    singular: "Schedule Card",
    plural: "Schedule Cards",
  },
  admin: {
    useAsTitle: "slug",
    defaultColumns: ["slug", "weapon", "title"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "Stable identifier that determines where this card is placed in the schedule layout, e.g. 'longsword', 'sparrings'. Not localized.",
      },
    },
    {
      name: "weapon",
      type: "relationship",
      relationTo: "weapons",
      admin: {
        description:
          "Leave empty for a card with no weapon (e.g. Sparrings) — set Title below instead.",
      },
    },
    {
      name: "title",
      type: "text",
      localized: true,
      admin: {
        description:
          'Card label used when Weapon is empty (e.g. "Sparrings"). Ignored when a weapon is set — the weapon\'s name is used instead.',
        condition: (data) => !data?.weapon,
      },
      validate: validateTitle,
    },
    {
      name: "sections",
      type: "array",
      minRows: 1,
      labels: {
        singular: "Section",
        plural: "Sections",
      },
      admin: {
        description:
          "One section with no Level for a plain card (e.g. Saber, Rapier, Sparrings), or two sections (Beginners / Advanced) for a split card (e.g. Longsword).",
      },
      fields: [
        {
          name: "level",
          type: "select",
          options: [
            { label: "Beginners", value: "beginners" },
            { label: "Advanced", value: "advanced" },
          ],
          admin: {
            description:
              "Sub-heading shown above this section's rows. Leave empty for a section with no subheading.",
          },
        },
        {
          name: "rows",
          type: "array",
          minRows: 1,
          labels: {
            singular: "Time slot",
            plural: "Time slots",
          },
          fields: [
            {
              name: "day",
              type: "select",
              required: true,
              options: [
                { label: "Monday", value: "monday" },
                { label: "Tuesday", value: "tuesday" },
                { label: "Wednesday", value: "wednesday" },
                { label: "Thursday", value: "thursday" },
                { label: "Friday", value: "friday" },
                { label: "Saturday", value: "saturday" },
                { label: "Sunday", value: "sunday" },
              ],
            },
            {
              name: "startTime",
              type: "date",
              required: true,
              admin: {
                date: {
                  pickerAppearance: "timeOnly",
                  timeFormat: "HH:mm",
                  timeIntervals: 15,
                },
              },
            },
            {
              name: "endTime",
              type: "date",
              required: true,
              admin: {
                date: {
                  pickerAppearance: "timeOnly",
                  timeFormat: "HH:mm",
                  timeIntervals: 15,
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
