import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site, waMessages } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Link do WhatsApp com mensagem pré-preenchida por contexto */
export function waLink(context: keyof typeof waMessages | string = "default") {
  const text = waMessages[context] ?? waMessages.default;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${site.phoneE164}`;
export const mailLink = `mailto:${site.email}`;

/** Slug a partir do nome — usado em blog/cases */
export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(date: string | Date, locale = "pt-BR") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function readingTime(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

/** URL canônica absoluta */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export const currentYear = new Date().getFullYear();
