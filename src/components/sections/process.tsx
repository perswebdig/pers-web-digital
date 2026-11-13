import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/data/home";

export function ProcessSection() {
  return (
    <Section id="como-trabalhamos" tone="gradient" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40"
        aria-hidden="true"
      />

      <div className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Como trabalhamos"
          title="Cinco etapas, sem caixa-preta"
          description="Você sabe o que acontece em cada fase, quem executa, o que é entregue e quando. Do diagnóstico ao suporte contínuo."
        />

        <ol className="mt-14 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 0.08}
              className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-aqua-400/40 hover:bg-white/[0.09]"
            >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-white/15 transition-colors duration-300 group-hover:text-aqua-300/40">
                    {step.number}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-400/10 text-aqua-300 ring-1 ring-aqua-400/25">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-1 text-2xs font-semibold uppercase tracking-[0.12em] text-aqua-300/80">
                  {step.duration}
                </p>
                <p className="mt-3 text-sm leading-6 text-navy-300">{step.description}</p>

                <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-navy-200">
                  <Icon name="file" className="mt-0.5 h-4 w-4 shrink-0 text-tech-300" />
                  <span>
                    <span className="font-semibold text-white">Entrega:</span>{" "}
                    {step.deliverable}
                  </span>
                </p>

                {index < processSteps.length - 1 ? (
                  <Icon
                    name="arrowRight"
                    className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-white/20 lg:block"
                  />
                ) : null}
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left sm:p-7">
          <p className="text-[0.98rem] leading-7 text-navy-200">
            <span className="font-semibold text-white">Comece pela etapa 1, sem custo.</span>{" "}
            Agende um diagnóstico de 40 minutos com um consultor sênior e receba a lista
            de prioridades do que vale atacar primeiro.
          </p>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Button
              size="md"
              variant="aqua"
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "/contato"}
              event="schedule_click"
              eventParams={{ location: "process" }}
            >
              Agendar conversa
            </Button>
            <Button size="md" variant="on-dark" whatsapp="orcamento" event="whatsapp_click" eventParams={{ location: "process" }}>
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
