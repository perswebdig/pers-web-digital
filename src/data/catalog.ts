import { services as infraServices, type ServiceContent } from "./services";
import { devServices } from "./services.dev";

/** Catálogo consolidado de todos os serviços (landing pages de SEO) */
export const services: ServiceContent[] = [...infraServices, ...devServices];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesOfCategory(category: "infra" | "dev"): ServiceContent[] {
  return services.filter((s) => s.category === category);
}

export const infraServicesList = servicesOfCategory("infra");
export const devServicesList = servicesOfCategory("dev");
