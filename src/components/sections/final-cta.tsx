import { Section } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const promises: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "clock",
    title: "Resposta em até 1 hora útil",
    text: "Nada de formulário que vira silence. Um consultor responde, mesmo que seja para dizer que ainda não é a hora.",
  },
  {
    icon: "search",
    title: "Diagnóstico antes da proposta",
    text: "Primeiro entendemos o problema e o contexto; orçamento detalhado vem depois, por escrito.",
  },
  {
    icon: "file",
    title: "Escopo e preço fechados",
    text: "Proposta item por item, com alternativas de faseamento. Sem aditivo surpresa no meio do projeto.",
  },
];

export function FinalCta({
  title = "Pronto para blindar sua TI ou lançar seu projeto?",
  subtitle = "Escolha o caminho: diagnóstico gratuito de infraestrutura, orçamento de projeto digital ou uma conversa de 40 minutos com um consultor sênior.",
  defaultService = "",
  purpose = "final-cta",
}: {
  title?: string;
  subtitle?: string;
  defaultService?: string;
  purpose?: string;
}) {
  return (
    <Section tone="gradient" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-tech-600/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <span className="eyebrow-dark">Próximo passo</span>
          <h2 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.1] text-white sm:text-[2.6rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-7 text-navy-200">{subtitle}</p>

          <ul className="mt-9 space-y-5">
            {promises.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aqua-300 ring-1 ring-white/15">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-navy-300">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              variant="aqua"
              href={site.calendlyUrl}
              event="schedule_click"
              eventParams={{ location: "final_cta" }}
            >
              Agendar conversa de 40 min
            </Button>
            <Button
              size="lg"
              variant="on-dark"
              whatsapp="orcamento"
              event="whatsapp_click"
              eventParams={{ location: "final_cta" }}
            >
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-card-hover backdrop-blur-md sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    Solicite seu diagnóstico gratuito
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-navy-300">
                    Leva menos de um minuto. Preenchendo os campos, já adiantamos o
                    assunto certo na primeira conversa.
                  </p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-aqua-400/15 text-aqua-300 ring-1 ring-aqua-400/25 sm:flex">
                  <Icon name="sparkles" className="h-6 w-6" />
                </span>
              </div>

              <LeadForm
                tone="dark"
                purpose={purpose}
                defaultService={defaultService}
                microcopy="Sem compromisso · Resposta em até 1 hora útil · Seus dados não são compartilhados com terceiros"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
