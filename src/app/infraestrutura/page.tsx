import type { Metadata } from "next";
import { HubPage } from "@/components/sections/hub-page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Consultoria de TI, Servidores, Redes, Firewall e Backup | Pers Web Digital",
    description:
      "Frente de infraestrutura: consultoria estratégica, gestão de servidores Windows e Linux, redes e firewall, backup, LGPD, nuvem AWS/Azure/GCP e suporte com SLA. Diagnóstico gratuito.",
    keywords: [
      "consultoria de ti",
      "gestao de servidores",
      "redes e firewall",
      "backup lgpd",
      "ti gerenciada",
      "migração para nuvem",
      "suporte ti empresas",
    ],
    path: "/infraestrutura",
  });
}

export default function InfraestruturaPage() {
  return <HubPage category="infra" />;
}
