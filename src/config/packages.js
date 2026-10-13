export const packages = [
  {
    id: "starter",
    name: "STARTER",
    price: 700000,
    tagline: "Boshlash uchun yengil va tezkor yechim",
    recommended: false,
    features: [
      "Sodda landing page",
      "Mobil va desktop uchun responsive layout",
      "Zamonaviy vizual dizayn",
      "Aloqa tugmalari",
      "Asosiy SEO sozlamalari",
      "Joylashtirishda yordam",
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    price: 1500000,
    tagline: "O'sayotgan biznes uchun to'liq sayt",
    recommended: true,
    features: [
      "Ko'p bo'limli biznes sayti",
      "Individual moslashtirilgan dizayn",
      "Responsive layout",
      "Aloqa yoki so'rov formasi",
      "Interaktiv animatsiyalar",
      "Asosiy SEO sozlamalari",
      "Joylashtirishda yordam",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 2500000,
    tagline: "Maksimal taassurot va imkoniyatlar",
    recommended: false,
    features: [
      "Murakkab individual sayt",
      "Premium motion dizayn",
      "Murakkabroq layout va komponentlar",
      "Talab bo'yicha API integratsiyasi",
      "Ilg'or responsive xatti-harakatlar",
      "Joylashtirish va yakuniy test",
    ],
  },
];

export const siteTypes = [
  "Landing Page",
  "Biznes sayti",
  "Internet do'kon",
  "Portfolio",
  "Maxsus web loyiha",
  "Boshqa",
];

export const formatPrice = (value) =>
  new Intl.NumberFormat("ru-RU").format(value).replace(/\u00a0/g, " ");
