export const projects = [
  { id: "01", name: "Laberry", url: "https://laberry.uz", accent: "#ff003c" },
  { id: "02", name: "Chocoberry", url: "https://chocoberry-n1.uz", accent: "#e11d48" },
  { id: "03", name: "Ozbecross", url: "https://ozbecross-uz.vercel.app/", accent: "#ff2d55" },
  { id: "04", name: "Sofia Flowers", url: "https://sofia-flowers-77.vercel.app/", accent: "#ff5c8a" },
  { id: "05", name: "London Wear", url: "https://london-wear.vercel.app/", accent: "#fb7185" },
  { id: "06", name: "Soft Shoes", url: "https://soft-shoes-9az6.vercel.app/", accent: "#f43f5e" },
  { id: "07", name: "Medium", url: "https://medium-chi-one.vercel.app/", accent: "#ff6b6b" },
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
