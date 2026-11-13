import type { Metadata } from "next";
import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb, faqSchema } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { mailLink, telLink, waLink } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Falar com um Consultor de TI | Pers Web Digital",
    description:
      "Solicite orçamento, diagnóstico gratuito ou agende uma conversa de 40 minutos. WhatsApp, telefone, e-mail e formulário com resposta em até 1 hora útil. Atendimento em São Paulo e em todo o Brasil.",
    keywords: [
      "contato empresa de ti",
      "orçamento consultoria ti",
      "falar com consultor ti são paulo",
      "diagnóstico gratuito ti",
    ],
    path: "/contato",
  });
}

const channels: {
  icon: IconKey;
  title: string;
  text: string;
  action: { label: string; href: string; external?: boolean };
  note: string;
}[] = [
  {
    icon: "message",
    title: "WhatsApp comercial",
    text: "Para dúvida rápida, orçamento ou incidente. Mensagem já vem preenchida conforme o assunto.",
    action: { label: "Chamar agora", href: waLink("orcamento"), external: true },
    note: "Resposta média em menos de 8 minutos no horário comercial",
  },
  {
    icon: "phone",
    title: "Telefone",
    text: "Fala direto com um consultor — sem PABX de call center nem triagem de robô.",
    action: { label: site.phoneDisplay, href: telLink },
    note: site.hours,
  },
  {
    icon: "calendar",
    title: "Agendar conversa de 40 min",
    text: "Reunião por vídeo com diagnóstico inicial e lista de prioridades por escrito.",
    action: { label: "Escolher horário", href: site.calendlyUrl, external: true },
    note: "Sem compromisso e sem apresentação comercial longa",
  },
  {
    icon: "mail",
    title: "E-mail",
    text: "Para envio de escopo, RFP, contrato ou documentação técnica.",
    action: { label: site.email, href: mailLink },
    note: "Respondemos em até 1 hora útil",
  },
];

const contactFaq = [
  {
    question: "O que acontece depois que eu enviar o formulário?",
    answer:
      "Seu lead entra na fila do comercial com o assunto marcado (serviço escolhido e página de origem). Um consultor responde pelo canal preferido em até 1 hora útil, no horário comercial, normalmente com duas ou três perguntas para direcionar o diagnóstico.",
  },
  {
    question: "Preciso ter certeza do que quero antes de entrar em contato?",
    answer:
      "Não. A maioria dos contatos começa com um sintoma: “o ERP está lento”, “ninguém sabe quem cuida do backup”, “preciso de um site que venda”. O diagnóstico serve exatamente para transformar isso em escopo.",
  },
  {
    question: "Vocês atendem a minha cidade?",
    answer: `Sede em ${site.address.city} (${site.address.district}), com atendimento presencial na Grande ${site.address.city} e suporte remoto para todo o Brasil. Projetos de desenvolvimento digital são executados para todo o país e América Latina.`,
  },
  {
    question: "Como vocês tratam meus dados?",
    answer:
      "Os dados do formulário são usados apenas para responder seu contato e cumprir obrigações legais, conforme nossa política de privacidade e a LGPD. Não vendemos, não alugamos e não compartilhamos com terceiros para marketing.",
  },
];

export default function ContatoPage() {
  return (
    <div id="conteudo">
      <JsonLd
        data={[
          buildBreadcrumb([{ name: "Contato", url: "/contato" }]),
          faqSchema(contactFaq),
        ]}
      />

      <PageHero
        eyebrow="Contato"
        title="Fale com quem resolve, não com quem só responde"
        subtitle="Escolha o canal: WhatsApp, telefone, agendamento ou formulário. Em qualquer um deles, quem atende é um consultor — e a primeira resposta vem em até 1 hora útil."
        breadcrumbs={[{ name: "Contato", url: "/contato" }]}
        visual="none"
        primary={{ label: "Chamar no WhatsApp", href: waLink("orcamento") }}
      />

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          {channels.map((channel) => (
            <article
              key={channel.title}
              className="card-base flex h-full flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-tech-600 to-aqua-500 text-white shadow-glow-cyan">
                    <Icon name={channel.icon} className="h-5 w-5" />
                  </span>
                  <h2 className="text-[1.15rem] font-bold text-navy-900">{channel.title}</h2>
                </div>
                <p className="mt-4 text-[0.95rem] leading-6 text-ink-soft">{channel.text}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Button
                  size="md"
                  variant={channel.icon === "message" ? "whatsapp" : "primary"}
                  href={channel.action.href}
                  external={channel.action.external}
                  event={
                    channel.icon === "message"
                      ? "whatsapp_click"
                      : channel.icon === "phone"
                        ? "phone_click"
                        : "schedule_click"
                  }
                  eventParams={{ location: "contato_canais", canal: channel.title }}
                >
                  {channel.action.label}
                </Button>
                <p className="text-xs text-ink-muted">{channel.note}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light" id="formulario">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Formulário"
              title="Conte o cenário e recebemos com uma proposta de caminho"
              description="Quanto mais concreto o contexto, mais útil é a primeira resposta. Não precisa saber o nome técnico do problema — descreva o sintoma."
            />

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: "check" as IconKey,
                  text: "Nunca pedimos cartão, contrato ou cadastro para fazer o diagnóstico inicial.",
                },
                {
                  icon: "lock" as IconKey,
                  text: "Seus dados vão apenas para o time comercial da Pers Web Digital, conforme a LGPD.",
                },
                {
                  icon: "clock" as IconKey,
                  text: "Se preferir, envie pelo WhatsApp: a conversa é a mesma, só começa mais rápido.",
                },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                  <Icon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-aqua-500" />
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl border border-navy-100 shadow-card">
              <iframe
                title={`Mapa do escritório da ${site.name} em ${site.address.city}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${site.geo.lng - 0.012}%2C${site.geo.lat - 0.007}%2C${site.geo.lng + 0.012}%2C${site.geo.lat + 0.007}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`}
                loading="lazy"
                className="h-64 w-full border-0"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4">
                <p className="text-sm leading-6 text-ink-soft">
                  <span className="font-semibold text-navy-900">{site.legalName}</span>
                  <br />
                  {site.address.street} — {site.address.district}, {site.address.city}/{
                    site.address.state
                  } · {site.address.postalCode}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`,
                  )}`}
                  external
                >
                  Abrir no Google Maps
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card-hover sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold text-navy-900">
                    Solicitar diagnóstico gratuito
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-ink-soft">
                    Todos os campos com * são obrigatórios. Leva menos de um minuto.
                  </p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tech-50 text-tech-700 ring-1 ring-tech-100 sm:flex">
                  <Icon name="clipboard" className="h-6 w-6" />
                </span>
              </div>

              <LeadForm
                purpose="contato"
                microcopy="Resposta em até 1 hora útil · Sem compromisso · Seus dados não são compartilhados com terceiros"
              />
            </div>

            <p className="mt-4 text-center text-xs text-ink-muted">
              Preferiu não preencher? Copie nosso número e chame:{" "}
              <a href={waLink("default")} className="font-semibold text-tech-700 underline">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          align="center"
          eyebrow="Antes de enviar"
          title="Perguntas sobre o contato"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactFaq.map((item) => (
              <article key={item.question} className="card-base">
                <h3 className="text-[1rem] font-bold leading-snug text-navy-900">
                  {item.question}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-6 text-ink-soft">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
