import type { Metadata } from "next";
import { site } from "./site";
import { absoluteUrl } from "./utils";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path: string;
  /** Palavras-chave locais/de serviço para SEO on-page */
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  ogImage?: string;
  noindex?: boolean;
}

export const defaultOgImage = "/og/pers-web-digital-og.jpg";

/**
 * Gera Metadata (title, description, canonical, Open Graph e Twitter Cards)
 * de forma padronizada para todas as páginas do site.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
  authors,
  ogImage,
  noindex,
}: BuildMetadataOptions): Metadata {
  const pageTitle = title ?? site.defaultTitle;
  const pageDescription = description ?? site.defaultDescription;
  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImage ?? defaultOgImage);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: type === "article" ? "article" : "website",
      url,
      title: pageTitle,
      description: pageDescription,
      siteName: site.name,
      locale: "pt_BR",
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, authors: authors ?? [site.name] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** BreadcrumbList (Schema.org) */
export function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Organization + LocalBusiness consolidados no layout raiz */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    taxID: site.cnpj,
    foundingDate: String(site.foundedYear),
    slogan: site.slogan,
    description: site.defaultDescription,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/pers-mark.png"),
    },
    image: absoluteUrl(defaultOgImage),
    telephone: site.phoneE164,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: site.serviceAreas.map((area) => ({
      "@type": "Text",
      name: area,
    })),
    sameAs: Object.values(site.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
  };
}

/** Service (Schema.org) para as landing pages de serviço */
export function serviceSchema(service: {
  name: string;
  description: string;
  slug: string;
  serviceType: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: service.audience
      ? { "@type": "BusinessAudience", name: service.audience }
      : undefined,
    url: absoluteUrl(`/${service.slug}`),
  };
}
