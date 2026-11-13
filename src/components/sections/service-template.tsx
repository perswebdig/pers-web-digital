import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "./page-hero";
import { FaqSection } from "./faq-section";
import { FinalCta } from "./final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb, serviceSchema } from "@/lib/seo";
import { getService, servicesOfCategory } from "@/data/catalog";
import type { ServiceContent } from "@/data/services";
import { trustSeals } from "@/data/home";

/**
 * Template único para as 8 landing pages de serviço (SEO).
 * Todo o conteúdo vem de src/data/services.ts e services.dev.ts.
 */
export function ServiceTemplate({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is ServiceContent => Boolean(s));

  const sameCategory = servicesOfCategory(service.category);

  return (
    <div id="conteudo">
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            slug: service.slug,
            serviceType: service.serviceType,
            audience: service.audience,
            description: service.seoDescription,
          }),
          buildBreadcrumb([
            { name: service.category === "infra" ? "Infraestrutura" : "Desenvolvimento", url: service.category === "infra" ? "/infraestrutura" : "/desenvolvimento" },
            { name: service.navLabel, url: `/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        subtitle={service.subtitle}
        bullets={service.heroBullets}
        visual={service.category === "infra" ? "infra" : "dev"}
        breadcrumbs={[
          {
            name: service.category === "infra" ? "Infraestrutura" : "Desenvolvimento",
            url: service.category === "infra" ? "/infraestrutura" : "/desenvolvimento",
          },
          { name: service.navLabel, url: `/${service.slug}` },
        ]}
        primary={{ label: "Quero um orçamento", whatsapp: service.category }}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          {trustSeals.slice(0, 3).map((seal) => (
            <span key={seal.label} className="inline-flex items-center gap-2 text-sm text-navy-200">
              <Icon name={seal.icon} className="h-4 w-4 text-aqua-400" />
              {seal.label}
            </span>
          ))}
        </div>
      </PageHero>

      {/* DOR */}
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="O problema"
              title={service.pain.title}
              description={service.pain.body}
            />
            <div className="mt-8 rounded-2xl border border-danger/20 bg-danger/5 p-6">
              <p className="flex items-start gap-2.5 text-sm leading-6 text-navy-800">
                <Icon name="cross" className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                <span>
                  Se você identificou dois ou mais destes sinais, o custo de continuar
                  assim já está no seu resultado — só que sem rótulo.
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-3.5">
              {service.pain.items.map((item, index) => (
                <Reveal key={item} delay={index * 0.05}>
                  <li className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-colors hover:border-tech-200">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-sm font-bold text-danger">
                      {index + 1}
                    </span>
                    <p className="text-[0.97rem] leading-6 text-ink-soft">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* SOLUÇÃO + ENTREGÁVEIS */}
      <Section tone="surface" id="o-que-fazemos">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Como resolvemos"
              title={service.solution.title}
              description={service.solution.body}
            />

            <div className="mt-8 space-y-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
                Para quem é
              </p>
              <p className="text-[0.95rem] leading-6 text-ink-soft">{service.audience}</p>
              <div className="border-t border-navy-100 pt-4">
                <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
                  Modelo de contratação
                </p>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  <li className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                    {service.category === "infra"
                      ? "Mensal (TI gerenciada) com SLA e relatório de indicadores"
                      : "Projeto com escopo e preço fechados, ou sprint mensal de evolução"}
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                    {service.category === "infra"
                      ? "Implantação assistida com transferência de conhecimento"
                      : "Entregas por fase com ambiente de homologação"}
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                    Documentação e acessos registrados em nome do cliente
                  </li>
                </ul>
              </div>
              <Button
                size="md"
                href="/contato"
                icon="arrowRight"
                event="cta_click"
                eventParams={{ location: "service_model", service: slug }}
              >
                Pedir proposta
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {service.deliverables.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} className="h-full">
                  <article className="card-base card-hover flex h-full flex-col">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tech-50 to-aqua-50 text-tech-700 ring-1 ring-tech-100">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[1.02rem] font-bold leading-snug text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-ink-soft">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* RESULTADO + PROVA SOCIAL */}
      <Section tone="light">
        <SectionHeading
          align="center"
          eyebrow="Resultado"
          title="O que muda depois que assumimos o serviço"
          description="Números de referência dos contratos ativos. No relatório mensal você vê os seus, medidos no seu ambiente."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {service.results.map((result, index) => (
            <Reveal key={result.title} delay={index * 0.07} className="h-full">
              <div className="relative h-full overflow-hidden rounded-2xl bg-[radial-gradient(120%_100%_at_50%_0%,#152a54_0%,#0a1f44_60%,#050d1f_100%)] p-7 text-white ring-1 ring-white/10">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-aqua-500/20 blur-3xl"
                  aria-hidden="true"
                />
                <p className="relative font-display text-[2.4rem] font-extrabold leading-none text-aqua-300">
                  {result.metric}
                </p>
                <p className="relative mt-3 text-sm font-bold uppercase tracking-[0.1em] text-white">
                  {result.title}
                </p>
                <p className="relative mt-2 text-sm leading-6 text-navy-300">
                  {result.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <figure className="mx-auto mt-12 max-w-3xl rounded-3xl border border-navy-100 bg-surface p-7 sm:p-9">
            <Icon name="quote" className="h-8 w-8 text-tech-200" />
            <blockquote className="mt-4 text-pretty font-display text-lg font-medium leading-relaxed text-navy-900 sm:text-[1.3rem] sm:leading-[1.5]">
              {service.proof.quote}
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-3 border-t border-navy-100 pt-5 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tech-600 to-aqua-500 text-xs font-bold text-white">
                {service.proof.author
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span>
                <span className="block font-semibold text-navy-900">{service.proof.author}</span>
                <span className="block text-ink-muted">
                  {service.proof.role} · {service.proof.company}
                </span>
              </span>
              <span className="ml-auto text-2xs uppercase tracking-[0.12em] text-ink-muted">
                Depoimento placeholder
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <FaqSection
        items={service.faq}
        title={`Perguntas frequentes sobre ${service.navLabel.toLowerCase()}`}
        eyebrow="Antes de contratar"
        description="As dúvidas que aparecem em quase toda reunião comercial sobre este serviço — respondidas sem enrolação."
      />

      {/* OUTROS SERVIÇOS DA FRENTE */}
      <Section tone="surface" padded={false} className="py-14">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">
              Outros serviços de {service.category === "infra" ? "infraestrutura e TI" : "desenvolvimento digital"}
            </h2>
            <Button
              size="sm"
              variant="secondary"
              href={service.category === "infra" ? "/infraestrutura" : "/desenvolvimento"}
            >
              Ver a frente completa
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(related.length ? related : sameCategory.filter((s) => s.slug !== slug))
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-tech-300 hover:shadow-card-hover"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tech-50 text-tech-700 transition-colors group-hover:bg-tech-600 group-hover:text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[0.98rem] font-bold text-navy-900">
                      {item.navLabel}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-ink-muted">
                      {item.subtitle.slice(0, 116)}…
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <FinalCta
        title={service.cta.title}
        subtitle={`${service.cta.subtitle} ${service.cta.microcopy}`}
        defaultService={service.slug}
        purpose={service.slug}
      />
    </div>
  );
}
