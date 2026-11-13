import type { Metadata } from "next";
import { Section } from "@/components/ui/layout";
import { PageHero } from "@/components/sections/page-hero";
import { CasesGallery } from "@/components/sections/cases-gallery";
import { CasesPreview } from "@/components/sections/cases-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Cases e Portfólio de Projetos de TI e Digital | Pers Web Digital",
    description:
      "Cases reais de infraestrutura, nuvem, segurança, sites e aplicativos: problema, solução e resultado com indicadores. Migração de ERP, rede multi-filial, LGPD em clínica e landing pages com custo por lead reduzido.",
    keywords: [
      "cases ti",
      "portfólio desenvolvimento sites",
      "case migração nuvem",
      "case lgpd clinica",
      "resultados ti gerenciada",
    ],
    path: "/cases",
  });
}

export default function CasesPage() {
  return (
    <div id="conteudo">
      <JsonLd data={buildBreadcrumb([{ name: "Cases", url: "/cases" }])} />

      <PageHero
        eyebrow="Cases e portfólio"
        title="Resultados de quem trocou improviso por plano"
        subtitle="Cada case abaixo tem a mesma estrutura do nosso método: o problema diagnosticado, a solução executada e o resultado medido — em números que o cliente reconhece."
        bullets={[
          "Indústria, saúde, jurídico, logística e varejo",
          "Projetos de 6 semanas a contratos contínuos",
          "Escopo de TI e digital no mesmo fornecedor",
        ]}
        breadcrumbs={[{ name: "Cases", url: "/cases" }]}
        visual="none"
        primary={{ label: "Quero um diagnóstico", whatsapp: "default" }}
      />

      <Section tone="surface">
        <CasesGallery />
      </Section>

      <CasesPreview limit={3} />

      <FinalCta
        title="O próximo case pode ser o da sua empresa"
        subtitle="Conte o cenário atual — mesmo que pareça bagunçado. Em 40 minutos dizemos o que dá para melhorar, o que precisa de projeto e o que pode esperar."
        purpose="cases"
      />
    </div>
  );
}
