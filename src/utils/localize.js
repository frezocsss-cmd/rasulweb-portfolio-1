import { additionalServices } from "../config/additionalServices";
import { faqs } from "../config/faq";
import { packages } from "../config/packages";
import { projects } from "../config/projects";
import { services } from "../config/services";

export function localizePackages(t) {
  return packages.map((pkg) => ({
    ...pkg,
    tagline: t.packages.items[pkg.id].tagline,
    summary: t.packages.items[pkg.id].summary,
    description: t.packages.items[pkg.id].summary,
    features: t.packages.items[pkg.id].features,
    priceNote: t.packages.perMonth,
    priceFull: `${pkg.priceLabel} ${pkg.currency} ${t.packages.perMonth}`,
  }));
}

export function localizeServices(t) {
  return services.map((service) => ({
    ...service,
    title: t.services.items[service.id].title,
    desc: t.services.items[service.id].desc,
  }));
}

export function localizeAdditionalServices(t) {
  return additionalServices.map((service) => ({
    ...service,
    title: t.additional.items[service.id].title,
    price: service.price ?? t.additional.items[service.id].price,
    description: t.additional.items[service.id].description,
    priceNote: t.additional.items[service.id].priceNote,
  }));
}

export function localizeProjects(t) {
  return projects.map((project) => ({
    ...project,
    category: t.projects.items[project.id].category,
    description: t.projects.items[project.id].description,
  }));
}

export function localizeFaqs(t) {
  return faqs.map((faq) => ({
    ...faq,
    question: t.faq.items[faq.id].question,
    answer: t.faq.items[faq.id].answer,
  }));
}
