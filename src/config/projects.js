export const projects = [
  {
    id: "01",
    name: "Laberry",
    url: "https://laberry.uz",
    category: "E-commerce",
    accent: "#ff003c",
    description:
      "Zamonaviy dizayn va qulay navigatsiyaga ega, barcha qurilmalarda mukammal ishlaydigan onlayn savdo sayti.",
  },
  {
    id: "02",
    name: "Chocoberry",
    url: "https://chocoberry-n1.uz",
    category: "E-commerce",
    accent: "#e11d48",
    description:
      "Shirinliklar brendi uchun yorqin va ishtahani ochuvchi interfeysga ega, tez yuklanadigan onlayn do'kon.",
  },
  {
    id: "03",
    name: "Ozbecross",
    url: "https://ozbecross-uz.vercel.app/",
    category: "Biznes sayt",
    accent: "#ff2d55",
    description:
      "Brendni professional tarzda taqdim etuvchi, aniq tuzilishga va responsive layoutga ega biznes veb-sayti.",
  },
  {
    id: "04",
    name: "Sofia Flowers",
    url: "https://sofia-flowers-77.vercel.app/",
    category: "Beauty & Flowers",
    accent: "#ff5c8a",
    description:
      "Gullar do'koni uchun nafis va ilhomlantiruvchi interfeys, mobil qurilmalarga to'liq moslashgan sayt.",
  },
  {
    id: "05",
    name: "London Wear",
    url: "https://london-wear.vercel.app/",
    category: "Fashion",
    accent: "#fb7185",
    description:
      "Kiyim-kechak brendi uchun zamonaviy, minimalistik va xaridga yo'naltirilgan fashion sayti.",
  },
  {
    id: "06",
    name: "Soft Shoes",
    url: "https://soft-shoes-9az6.vercel.app/",
    category: "Retail",
    accent: "#f43f5e",
    description:
      "Poyabzal do'koni uchun qulay katalog, toza dizayn va silliq foydalanuvchi tajribasiga ega retail sayt.",
  },
  {
    id: "07",
    name: "Medium",
    url: "https://medium-chi-one.vercel.app/",
    category: "Web Platform",
    accent: "#ff6b6b",
    description:
      "Maqola va kontentni qulay o'qish tajribasi bilan taqdim etuvchi zamonaviy kontent platformasi.",
  },
];

export const previewUrl = (url) =>
  `https://image.thum.io/get/width/1400/crop/900/noanimate/${url}`;

export const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};
