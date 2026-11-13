import type { Metadata } from "next";
import { Section } from "@/components/ui/layout";
import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { posts } from "@/data/blog";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog de TI e Negócios Digitais | Pers Web Digital",
    description:
      "Artigos práticos sobre infraestrutura, nuvem, segurança, LGPD, sites e conversão — escritos por quem opera ambientes reais. Sem jargão e com números.",
    keywords: [
      "blog de ti",
      "artigos lgpd",
      "custo de ti para pme",
      "migração para nuvem",
      "site que gera leads",
    ],
    path: "/blog",
  });
}

export default function BlogPage() {
  return (
    <div id="conteudo">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${site.url}/blog#blog`,
            url: `${site.url}/blog`,
            name: `Blog ${site.name}`,
            description: site.defaultDescription,
            publisher: { "@id": `${site.url}/#organization` },
            inLanguage: "pt-BR",
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${site.url}/blog/${post.slug}`,
              datePublished: post.date,
              author: { "@type": "Organization", name: post.author },
              articleSection: post.category,
              keywords: post.tags.join(", "),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Blog", item: `${site.url}/blog` },
            ],
          },
        ]}
      />

      <PageHero
        eyebrow="Blog"
        title="Tecnologia explicada para quem decide, não para quem só configura"
        subtitle="Publicamos o que aprendemos operando ambientes de PMEs: custos, riscos, prazos e as decisões que realmente mudam o resultado. Conteúdo técnico em português, com números."
        bullets={[
          `${posts.length} artigos publicados e crescendo`,
          "Infraestrutura, nuvem, segurança, LGPD e digital",
          "Sem enrolação: cada artigo termina com o que fazer",
        ]}
        breadcrumbs={[{ name: "Blog", url: "/blog" }]}
        visual="none"
        primary={{ label: "Falar com um especialista", whatsapp: "default" }}
      />

      <Section tone="surface">
        <BlogList />
      </Section>

      <FinalCta
        title="Quer essa análise aplicada ao seu ambiente?"
        subtitle="Ler sobre o problema é o primeiro passo. O segundo é colocar número nele no seu caso — e é isso que fazemos no diagnóstico gratuito."
        purpose="blog"
      />
    </div>
  );
}
