import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/data/home";

export function StatsBand() {
  return (
    <Section id="numeros" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Resultados e números"
            title="O que “TI confiável” significa, em números"
            description="Não prometemos milagre: publicamos os indicadores que medimos nos ambientes sob contrato — e que você recebe no relatório mensal, com evidência."
          />

          <div className="mt-8 space-y-3">
            {[
              {
                icon: "activity" as const,
                label: "Uptime medido, não estimado",
                value: "Monitoramento contínuo com histórico por sistema",
              },
              {
                icon: "clock" as const,
                label: "SLA auditável",
                value: "Tempo de resposta e solução por criticidade, com exceções justificadas",
              },
              {
                icon: "shield" as const,
                label: "Risco reduzido de forma comprovada",
                value: "Inventário, backup testado, acessos revisados e plano de contingência",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 shadow-card"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tech-50 text-tech-700">
                  <Icon name={item.icon} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{item.label}</p>
                  <p className="mt-0.5 text-xs leading-5 text-ink-muted">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.07} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-tech-100 to-aqua-100 opacity-70 blur-2xl"
                    aria-hidden="true"
                  />
                  <p className="relative font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-navy-900 sm:text-[3rem]">
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="relative mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-tech-700">
                    {stat.label}
                  </p>
                  <p className="relative mt-2 text-[0.9rem] leading-6 text-ink-soft">
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-5 text-xs leading-5 text-ink-muted">
              Indicadores de referência do portfólio de contratos ativos. Empresas sob
              contrato recebem o relatório mensal com seus próprios números.{" "}
              <span className="font-medium text-tech-700">
                ⚠️ Placeholder de demonstração — substitua por dados reais do seu
                histórico antes de publicar.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
