import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Icon } from "@/components/ui/icon";
import { Accordion } from "@/components/ui/accordion";
import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb, faqSchema } from "@/lib/seo";
import { formatDate, waLink } from "@/lib/utils";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/lib/site";
import { posts, relatedPosts } from "@/data/blog";
import type { Block } from "@/data/posts";
import { getService } from "@/data/catalog";

function readingTime(blocks: Block[]) {
  const text = blocks
    .map((b) => (Array.isArray(b.v) ? b.v.join(" ") : String(b.v)))
    .join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

export function ArticleBody({
  post,
}: {
  post: NonNullable<ReturnType<typeof posts.find>>;
}) {
  const related = relatedPosts(post);
  const services = post.related.map(getService).filter(Boolean);
  const time = readingTime(post.blocks);

  return (
    <div id="conteudo">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": absoluteUrl(`/blog/${post.slug}#article`),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absoluteUrl(`/blog/${post.slug}`),
            },
            headline: post.title,
            description: post.excerpt,
            image: absoluteUrl("/og/pers-web-digital-og.jpg"),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "pt-BR",
            author: { "@type": "Organization", name: post.author, url: site.url },
            publisher: { "@id": `${site.url}/#organization` },
            articleSection: post.category,
            keywords: post.tags.join(", "),
          },
          buildBreadcrumb([
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
          ...(post.faq?.length ? [faqSchema(post.faq)] : []),
        ]}
      />

      <article>
        <header className="relative overflow-hidden bg-navy-950 pb-14 pt-10 text-white">
          <div
            className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-60"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_0%,rgba(37,99,235,.3)_0%,rgba(10,31,68,0)_70%)]"
            aria-hidden="true"
          />
          <Container className="relative">
            <Breadcrumbs
              tone="dark"
              items={[
                { name: "Blog", url: "/blog" },
                { name: post.category, url: "/blog" },
              ]}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="eyebrow-dark">{post.category}</span>
                <h1 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.12] sm:text-[2.5rem] lg:text-[2.9rem]">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-[1.05rem] leading-8 text-navy-200">
                  {post.excerpt}
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aqua-400/15 text-aqua-300 ring-1 ring-aqua-400/25">
                      <Icon name={post.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{post.author}</p>
                      <p className="text-xs text-navy-300">{post.role}</p>
                    </div>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
                    <div>
                      <dt className="text-2xs uppercase tracking-[0.12em] text-navy-400">
                        Publicado
                      </dt>
                      <dd className="mt-1 text-navy-100">{formatDate(post.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-2xs uppercase tracking-[0.12em] text-navy-400">Leitura</dt>
                      <dd className="mt-1 text-navy-100">{time} minutos</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-2xs font-medium text-navy-200"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </Container>
        </header>

        <Section tone="light" className="pt-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <div className="prose-article max-w-none">
                {post.blocks.map((block, index) => {
                  const key = `${index}-${block.t}`;
                  if (block.t === "h2")
                    return <h2 key={key}>{block.v}</h2>;
                  if (block.t === "h3") return <h3 key={key}>{block.v}</h3>;
                  if (block.t === "quote") return <blockquote key={key}>{block.v}</blockquote>;
                  if (block.t === "ul")
                    return (
                      <ul key={key}>
                        {block.v.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  return <p key={key}>{block.v}</p>;
                })}
              </div>

              {post.faq?.length ? (
                <div className="mt-12 rounded-2xl border border-navy-100 bg-surface p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-navy-900">
                    Dúvidas frequentes sobre este tema
                  </h2>
                  <div className="mt-6">
                    <Accordion items={post.faq} defaultOpen={null} />
                  </div>
                </div>
              ) : null}

              {/* Serviços relacionados */}
              <div className="mt-12">
                <h2 className="text-xl font-bold text-navy-900">
                  Serviços relacionados a este artigo
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {services.map((service) =>
                    service ? (
                      <Link
                        key={service.slug}
                        href={`/${service.slug}`}
                        className="group flex items-start gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-tech-300 hover:shadow-card-hover"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tech-50 text-tech-700 transition-colors group-hover:bg-tech-600 group-hover:text-white">
                          <Icon name={service.icon} className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-navy-900">
                            {service.navLabel}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-ink-muted">
                            {service.heroBullets[0]}
                          </span>
                        </span>
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-[radial-gradient(120%_100%_at_0%_0%,#152a54_0%,#0a1f44_55%,#050d1f_100%)] p-6 text-white">
                <div className="flex-1">
                  <p className="font-display text-lg font-bold">
                    Dúvida específica sobre o seu ambiente?
                  </p>
                  <p className="mt-1 text-sm text-navy-300">
                    Manda a pergunta no WhatsApp: respondemos em português claro, sem
                    orçamento automático.
                  </p>
                </div>
                <a
                  href={waLink("default")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1faa54] px-5 text-sm font-semibold text-white hover:bg-[#25D366]"
                >
                  <Icon name="message" className="h-5 w-5" />
                  Perguntar agora
                </a>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="font-display text-lg font-bold text-navy-900">
                    Receba a análise no seu caso
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    Este artigo é geral. O diagnóstico aplica os mesmos critérios ao seu
                    ambiente — e sai com prioridades e custos.
                  </p>
                  <div className="mt-5">
                    <LeadForm
                      purpose={`blog-${post.slug}`}
                      compact
                      ctaLabel="Quero o diagnóstico"
                      microcopy="Resposta em até 1 hora útil"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-navy-100 bg-surface p-6">
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
                    Continue lendo
                  </p>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="group block text-sm font-semibold leading-snug text-navy-900 hover:text-tech-700"
                        >
                          {item.title}
                          <span className="mt-1 block text-xs font-normal text-ink-muted">
                            {item.category} · {formatDate(item.date)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      </article>
    </div>
  );
}
