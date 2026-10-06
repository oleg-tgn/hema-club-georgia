import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { isAdminOrModerator } from "@/access/isAdminOrModerator";

// The name is not localized: tournaments are named in English on every
// language of the site.
// Upcoming vs past is not stored: the site splits tournaments by date, so an
// upcoming tournament moves to the past on its own once it is over.
export const Tournaments: CollectionConfig = {
  slug: "tournaments",
  defaultSort: "-startDate",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "startDate", "location"],
  },
  access: {
    read: () => true,
    create: isAdminOrModerator,
    update: isAdminOrModerator,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "banner",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Tournament poster or banner. Shown at its own proportions.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "startDate",
          type: "date",
          required: true,
          admin: {
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
          },
        },
        {
          name: "endDate",
          type: "date",
          admin: {
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description: "Leave empty for a one-day tournament.",
          },
        },
      ],
    },
    {
      name: "location",
      type: "text",
      localized: true,
      admin: {
        description: "City or venue, e.g. 'Tbilisi'.",
      },
    },
    {
      name: "links",
      type: "group",
      admin: {
        description: "All optional; only filled links are shown.",
      },
      fields: [
        {
          name: "website",
          type: "text",
          admin: { description: "The tournament's own website." },
        },
        {
          name: "hemaRatings",
          type: "text",
          admin: { description: "Event page on HEMA Ratings." },
        },
        {
          name: "hemagon",
          type: "text",
          admin: { description: "Event page on Hemagon." },
        },
        {
          name: "photos",
          type: "text",
          admin: { description: "Photo album, e.g. on Facebook or VK." },
        },
      ],
    },
  ],
};
