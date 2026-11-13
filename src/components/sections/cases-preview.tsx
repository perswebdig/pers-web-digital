import Link from "next/link";
import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { cases } from "@/data/home";

const categoryIcon: Record<string, IconKey> = {
  infra: "server",
  seguranca: "shield",
  cloud: "cloud",
  web: "code",
  apps: "smartphone",
};

export function CasesPreview({ limit = 3 }: { limit?: number }) {
  return (
    <Section id="cases" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Cases"
          title="Problema → solução → resultado, na ordem em que aconteceu"
          description="Três exemplos do que entregamos quando a TI ou o digital estão no caminho do negócio."
        />
        <Button
          size="md"
          variant="secondary"
          href="/cases"
          icon="arrowRight"
          event="cta_click"
          eventParams={{ location: "cases_preview" }}
          className="mb-1"
        >
          Ver todos os cases
        </Button>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {cases.slice(0, limit).map((item, index) => (
          <Reveal key={item.slug} delay={index * 0.08} className="h-full">
            <article className="card-base card-hover flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-tech-50 px-3 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-tech-700 ring-1 ring-tech-100">
                  <Icon name={categoryIcon[item.category] ?? "sparkles"} className="h-3.5 w-3.5" />
                  {item.sector}
                </span>
                <span className="text-2xs font-medium text-ink-muted">{item.duration}</span>
              </div>

              <h3 className="mt-5 text-[1.15rem] font-bold leading-snug text-navy-900">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-ink-muted">{item.company}</p>

              <dl className="mt-5 space-y-3.5 text-[0.9rem] leading-6">
                <div>
                  <dt className="text-2xs font-bold uppercase tracking-[0.12em] text-danger/80">
                    Problema
                  </dt>
                  <dd className="mt-1 text-ink-soft">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-2xs font-bold uppercase tracking-[0.12em] text-tech-700">
                    Solução
                  </dt>
                  <dd className="mt-1 text-ink-soft">{item.solution}</dd>
                </div>
                <div>
                  <dt className="text-2xs font-bold uppercase tracking-[0.12em] text-success">
                    Resultado
                  </dt>
                  <dd className="mt-1 text-ink-soft">{item.result}</dd>
                </div>
              </dl>

              <ul className="mt-auto grid grid-cols-3 gap-2 border-t border-navy-100 pt-5">
                {item.metrics.map((metric) => (
                  <li key={metric.label}>
                    <p className="font-display text-[1.05rem] font-bold leading-none text-navy-900">
                      {metric.value}
                    </p>
                    <p className="mt-1.5 text-2xs leading-4 text-ink-muted">{metric.label}</p>
                  </li>
                ))}
              </ul>

              <Link
                href={`/cases#${item.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tech-700 hover:text-tech-800"
              >
                Ler o case completo
                <Icon name="arrowUpRight" className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-navy-100 bg-surface px-5 py-4 text-sm text-ink-soft">
          <Icon name="sparkles" className="h-4 w-4 text-aqua-600" />
          Cases com dados de clientes reais e autorização de publicação são adicionados em{" "}
          <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-navy-800">
            src/data/home.ts
          </code>{" "}
          — os textos atuais são placeholders de demonstração.
        </div>
      </Reveal>
    </Section>
  );
}
