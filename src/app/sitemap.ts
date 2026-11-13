import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/catalog";
import { posts } from "@/data/blog";

/**
 * sitemap.xml gerado a partir do catálogo de dados.
 * priority/changeFrequency seguem a intenção comercial de cada página.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/infraestrutura`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/desenvolvimento`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/sobre`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
