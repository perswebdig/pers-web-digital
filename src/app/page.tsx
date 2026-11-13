import { HomeHero } from "@/components/sections/home-hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { SolutionsSection } from "@/components/sections/solutions";
import { DifferentialsSection } from "@/components/sections/differentials";
import { ProcessSection } from "@/components/sections/process";
import { StatsBand } from "@/components/sections/stats-band";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CasesPreview } from "@/components/sections/cases-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import { homeFaq } from "@/data/home";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div id="conteudo">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            description: site.defaultDescription,
            publisher: { "@id": `${site.url}/#organization` },
            inLanguage: "pt-BR",
          },
          faqSchema(homeFaq),
        ]}
      />

      <HomeHero />
      <TrustBar />
      <SolutionsSection />
      <DifferentialsSection />
      <ProcessSection />
      <StatsBand />
      <TestimonialsSection />
      <CasesPreview />
      <FaqSection
        items={homeFaq}
        title="Perguntas frequentes"
        description="Dúvidas sobre escopo, contrato, prazos e responsabilidade. Se a sua ainda estiver aqui em branco, é só chamar no WhatsApp."
        side={
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
              Também publicamos
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { label: "Cases com problema, solução e resultado", href: "/cases" },
                { label: "Artigos técnicos e de negócio no blog", href: "/blog" },
                { label: "História, time e certificações", href: "/sobre" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 font-medium text-navy-800 transition-colors hover:bg-surface hover:text-tech-700"
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <FinalCta />
    </div>
  );
}

export const revalidate = false;
