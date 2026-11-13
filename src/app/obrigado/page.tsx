import type { Metadata } from "next";
import { Section } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { ConversionPing } from "@/components/seo/conversion-ping";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Recebemos sua mensagem | Pers Web Digital",
    description: "Confirmação de envio do formulário de diagnóstico.",
    path: "/obrigado",
    noindex: true,
  });
}

const nextSteps: { icon: IconKey; title: string; text: string; time: string }[] = [
  {
    icon: "clock",
    title: "Triagem comercial",
    text: "Um consultor lê seu contexto e prepara as duas ou três perguntas que faltam para direcionar o diagnóstico.",
    time: "até 1 hora útil",
  },
  {
    icon: "phone",
    title: "Contato pelo canal escolhido",
    text: `Ligamos, chamamos no WhatsApp ou respondemos por e-mail — do jeito que você preferir. Número ${site.phoneDisplay}.`,
    time: "mesmo dia útil",
  },
  {
    icon: "search",
    title: "Conversa de diagnóstico",
    text: "Reunião de 40 minutos por vídeo (ou visita, se estiver na nossa cobertura) para entender processo, risco e prioridade.",
    time: "agendada com você",
  },
  {
    icon: "file",
    title: "Proposta por escrito",
    text: "Escopo item por item, prazos, responsáveis e investimento, com alternativas de faseamento quando fizer sentido.",
    time: "até 5 dias úteis",
  },
];

export default function ObrigadoPage() {
  return (
    <div id="conteudo">
      <ConversionPing />

      <Section tone="gradient" className="overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-400/15 text-aqua-300 ring-1 ring-aqua-400/30">
            <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
          </span>
          <h1 className="mt-7 text-balance text-[2rem] font-extrabold leading-tight text-white sm:text-[2.6rem]">
            Mensagem recebida. Vamos falar com você.
          </h1>
          <p className="mt-4 text-[1.05rem] leading-8 text-navy-200">
            Obrigado pelo contato. Sua solicitação já está na fila do time técnico e será
            respondida em até <strong className="text-white">1 hora útil</strong> no
            horário comercial. Se quiser acelerar, chame agora no WhatsApp — a conversa é
            com um consultor, não com um robô.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              variant="whatsapp"
              href={waLink("obrigado")}
              event="whatsapp_click"
              eventParams={{ location: "obrigado" }}
            >
              Adiantar no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="on-dark"
              href={site.calendlyUrl}
              event="schedule_click"
              eventParams={{ location: "obrigado" }}
            >
              Já escolher horário
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-center text-[1.6rem] font-bold text-navy-900 sm:text-[2rem]">
          O que acontece agora
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[1.02rem] leading-7 text-ink-soft">
          Transparência desde o primeiro contato: este é o fluxo padrão entre seu envio e
          a proposta.
        </p>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tech-50 text-tech-700 ring-1 ring-tech-100">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-extrabold text-navy-100">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.text}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.1em] text-tech-700">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {step.time}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-4 rounded-3xl border border-navy-100 bg-surface p-6 sm:grid-cols-3 sm:p-8">
          {[
            {
              icon: "shield" as IconKey,
              title: "Seus dados protegidos",
              text: `Usamos seu contato apenas para este atendimento, conforme a LGPD e nossa política de privacidade.`,
              href: "/politica-de-privacidade",
              link: "Ver política",
            },
            {
              icon: "activity" as IconKey,
              title: "Enquanto isso",
              text: "Veja como estruturamos contratos de TI gerenciada e o que medimos em uptime e SLA.",
              href: "/suporte-ti-empresas",
              link: "TI gerenciada",
            },
            {
              icon: "code" as IconKey,
              title: "Ou se o assunto é digital",
              text: "Nossos projetos de site e landing page partem de arquitetura para conversão e busca.",
              href: "/criacao-de-sites",
              link: "Criação de sites",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col">
              <Icon name={item.icon} className="h-5 w-5 text-tech-600" />
              <p className="mt-3 font-semibold text-navy-900">{item.title}</p>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-ink-soft">{item.text}</p>
              <a
                href={item.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-tech-700 hover:text-tech-800"
              >
                {item.link} <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
