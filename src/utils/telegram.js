const pad = (n) => String(n).padStart(2, "0");

export function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export function formatPhoneInput(value) {
  const d = digitsOnly(value).slice(0, 9);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
}

export function fullPhone(value) {
  const d = digitsOnly(value).slice(0, 9);
  if (!d) return "+998";
  return `+998 ${formatPhoneInput(d)}`;
}

export function isValidUzPhone(value) {
  return digitsOnly(value).length === 9;
}

export function formatOrderDate(date = new Date()) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function buildOrderMessage(data, copy = {}) {
  const { ism, familiya, telefon, saytTuri, paket, talablar, date } = data;
  const none = copy.none ?? "—";
  const client = [ism, familiya].filter(Boolean).join(" ").trim() || none;

  return [
    copy.title,
    "━━━━━━━━━━━━━━━━━━",
    "",
    `${copy.client}: ${client}`,
    `${copy.phone}: ${fullPhone(telefon)}`,
    "",
    `${copy.siteType}: ${saytTuri || none}`,
    `${copy.package}: ${paket ? paket.name : none}`,
    `${copy.packagePrice}: ${paket ? `${paket.priceLabel} ${paket.priceNote}` : none}`,
    "",
    copy.requirements,
    ...(paket ? paket.features.map((feature) => `• ${feature}`) : [`• ${none}`]),
    "",
    copy.extra,
    (talablar && talablar.trim()) || none,
    "",
    `${copy.date}: ${formatOrderDate(date)}`,
    "",
    "━━━━━━━━━━━━━━━━━━",
    copy.footer,
  ].join("\n");
}

export function telegramOrderLink(text, username = "rasulwebuz") {
  return `https://t.me/${username}?text=${encodeURIComponent(text)}`;
}
