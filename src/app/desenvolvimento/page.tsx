import type { Metadata } from "next";
import { HubPage } from "@/components/sections/hub-page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Criação de Sites, Landing Pages e Aplicativos | Pers Web Digital",
    description:
      "Frente digital: sites institucionais, e-commerce, landing pages de alta conversão, aplicativos iOS/Android e sistemas web sob medida, com SEO técnico, performance 90+ e rastreamento de leads.",
    keywords: [
      "criação de sites",
      "landing page alta conversão",
      "aplicativo empresa",
      "sistema web sob medida",
      "seo técnico",
      "site para pme",
    ],
    path: "/desenvolvimento",
  });
}

export default function DesenvolvimentoPage() {
  return <HubPage category="dev" />;
}
