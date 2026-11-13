import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const allow = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;

  return {
    rules: allow
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/obrigado?"],
          },
        ]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
