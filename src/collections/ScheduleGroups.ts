import type { CollectionConfig, TextFieldSingleValidation } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

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
    defaultColumns: ["slug", "order", "weapon", "title"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "Stable identifier for this card, e.g. 'longsword', 'sparrings'. Not localized.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description:
          "Cards are listed in ascending order (lower numbers first).",
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
          'One row per group, e.g. Longsword: "Beginners" and "Advanced". A section with an empty Label is shown as "All levels".',
      },
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          admin: {
            description:
              'Group name shown next to this section\'s time slots, e.g. "Beginners". Leave empty to show "All levels".',
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
