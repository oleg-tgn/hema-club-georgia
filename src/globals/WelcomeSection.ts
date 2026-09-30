import type { GlobalConfig } from "payload";

// Per-locale defaults: Payload fills them in on read until an editor saves
// the global, so the section has friendly copy out of the box.
const DEFAULT_TITLE: Record<string, string> = {
  en: "Welcome",
  ru: "Добро пожаловать",
  ka: "მოგესალმებით",
};

const DEFAULT_TEXT: Record<string, string> = {
  en: "Welcome to St. George HEMA School! We practice historical European martial arts: we study old fencing treatises and learn to fight with the longsword, saber and rapier the way the masters of the past did. The club was founded in Tbilisi in 2022, and today fencers from all over the world train with us, brought together by a love of sport, history and swords. Never held a sword before? No problem - come to a trial class, we'd love to meet you!",
  ru: "Добро пожаловать в St. George HEMA School! Мы занимаемся историческим европейским фехтованием - HEMA: изучаем старинные трактаты и учимся работать длинным мечом, саблей и рапирой так, как это делали мастера прошлого. Клуб основан в Тбилиси в 2022 году, и сегодня у нас тренируются фехтовальщики из разных стран - всех нас объединяет любовь к спорту, истории и мечам. Никогда не держали меч в руках? Не страшно - приходите на пробную тренировку, мы будем рады знакомству!",
  ka: "მოგესალმებით St. George HEMA School-ში! ჩვენ ვმეცადინეობთ ისტორიულ ევროპულ ფარიკაობაში - HEMA: ვსწავლობთ ძველ ტრაქტატებს და ვვარჯიშობთ გრძელი ხმლით, საბლითა და რაპირით ისე, როგორც ამას წარსულის ოსტატები აკეთებდნენ. კლუბი თბილისში 2022 წელს დაარსდა და დღეს ჩვენთან სხვადასხვა ქვეყნის მოფარიკავეები ვარჯიშობენ - ყველას გვაერთიანებს სიყვარული სპორტის, ისტორიისა და ხმლების მიმართ. ხმალი არასდროს გჭერიათ ხელში? არაუშავს - მობრძანდით საცდელ ვარჯიშზე, სიამოვნებით გაგიცნობთ!",
};

export const WelcomeSection: GlobalConfig = {
  slug: "welcome-section",
  label: "Welcome Section",
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
      defaultValue: ({ locale }) => DEFAULT_TITLE[locale ?? "en"],
    },
    {
      name: "text",
      type: "textarea",
      required: true,
      localized: true,
      defaultValue: ({ locale }) => DEFAULT_TEXT[locale ?? "en"],
      admin: {
        description: "Line breaks are kept.",
      },
    },
  ],
};
