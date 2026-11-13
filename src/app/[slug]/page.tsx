import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/sections/service-template";
import { buildMetadata } from "@/lib/seo";
import { serviceSlugs, services } from "@/data/catalog";

/** Gera as 8 landing pages de serviço em /consultoria-ti, /criacao-de-sites, etc. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    path: `/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return <ServiceTemplate slug={service.slug} />;
}
