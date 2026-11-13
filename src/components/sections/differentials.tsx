import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { differentials } from "@/data/home";

export function DifferentialsSection() {
  return (
    <Section id="diferenciais" tone="light">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Por que escolher a Pers Web Digital"
            title="Contrato claro, time que atende e gente que explica sem jargão"
            description="Nem todo fornecedor de TI erra por maldade. A maioria erra porque o cliente nunca soube o que estava contratando. Aqui cada item do escopo vem com responsável, prazo e indicador."
          />

          <div className="mt-8 space-y-4 rounded-2xl border border-navy-100 bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-tech-700">
              Compromissos que assinamos
            </p>
            <ul className="space-y-3 text-[0.95rem] leading-6 text-ink-soft">
              {[
                "Primeira resposta em até 1 hora útil — e menos de 8 minutos em incidente crítico.",
                "Relatório mensal com SLA cumprido, chamados e plano de correção.",
                "Escopo por item: você paga pelo que usa, sem pacote engessado.",
                "Documentação e acessos sempre em seu nome, sem dependência de fornecedor.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-aqua-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              size="md"
              variant="secondary"
              href="/sobre"
              icon="arrowRight"
              className="mt-2"
              event="cta_click"
              eventParams={{ location: "diferenciais" }}
            >
              Conhecer o time e a história
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {differentials.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="card-base card-hover flex h-full flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tech-50 to-aqua-50 text-tech-700 ring-1 ring-tech-100">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.08rem] font-bold leading-snug text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.93rem] leading-6 text-ink-soft">
                    {item.description}
                  </p>
                  <p className="mt-4 flex items-start gap-2 border-t border-navy-100 pt-4 text-xs font-medium leading-5 text-tech-700">
                    <Icon name="badge" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600" />
                    {item.proof}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
