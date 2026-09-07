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
      name: "text",
      type: "textarea",
      required: true,
      localized: true,
      defaultValue:
        "We practice Historical European Martial Arts (HEMA). Historical fencing is a type of martial art distinguished by its specificity - the use of replicas of historical weaponry, similar in size, weight, and other characteristics to the originals, as well as the study of techniques from European martial arts passed down to us by masters of Medieval, Renaissance, and Modern times, such as Johannes Liechtenauer, Fiore dei Liberi, Camillo Agrippa, Alfred Hutton, and many others.",
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
          defaultValue: "Want to join?",
        },
        {
          name: "text",
          type: "textarea",
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
