import Link from "next/link";
import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "./page-hero";
import { FaqSection } from "./faq-section";
import { FinalCta } from "./final-cta";
import { ProcessSection } from "./process";
import { servicesOfCategory } from "@/data/catalog";
import type { ServiceCategory } from "@/data/services";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb, faqSchema } from "@/lib/seo";

const hubCopy: Record<
  ServiceCategory,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    bullets: string[];
    introTitle: string;
    introText: string;
    faqTitle: string;
    faq: { question: string; answer: string }[];
    purpose: string;
  }
> = {
  infra: {
    eyebrow: "Consultoria e infraestrutura de TI",
    title: "Infraestrutura de TI que sustenta a operação — sem susto e sem improviso",
    subtitle:
      "Consultoria estratégica, servidores, redes, firewall, backup, nuvem e suporte com SLA. Uma equipe certificada responsável pelo ambiente inteiro, com indicadores que a diretoria entende.",
    bullets: [
      "Diagnóstico gratuito com lista de prioridades",
      "Monitoramento 24/7 e resposta média em menos de 8 minutos",
      "Backup testado e plano de recuperação documentado",
      "Contrato mensal ou projeto com escopo fechado",
    ],
    introTitle: "O que assumimos quando cuidamos da sua TI",
    introText:
      "Cada frente abaixo pode ser contratada isoladamente ou dentro de um contrato único de TI gerenciada. Na prática, combinamos escopo por criticidade: o que para a operação recebe monitoramento e plantão; o que é risco recebe plano de correção com prazo.",
    faqTitle: "Perguntas frequentes sobre infraestrutura de TI",
    faq: [
      {
        question: "Vocês atendem ambiente legado ou só nuvem?",
        answer:
          "Ambos. Boa parte dos nossos contratos é justamente servidor físico on-premises com Active Directory antigo. Fazemos o health check, documentamos o estado e propomos o caminho — que pode ser modernizar local, migrar para nuvem ou operar híbrido.",
      },
      {
        question: "Qual o número mínimo de usuários para TI gerenciada?",
        answer:
          "Trabalhamos a partir de 10 usuários. Abaixo disso, o modelo que faz sentido costuma ser consultoria por hora mais monitoramento automatizado, e dizemos isso na proposta.",
      },
      {
        question: "Como vocês cobram visitas presenciais?",
        answer:
          "Planos com cobertura presencial incluem um pacote de visitas mensais na Grande São Paulo; o excedente é agendado com valor por visita informado em contrato. Fora da região, atendimento remoto com deslocamento programado.",
      },
      {
        question: "E se eu já tiver um técnico interno?",
        answer:
          "Ótimo cenário. Atuamos como N2/N3 e como dono do processo de infraestrutura, enquanto seu time cuida do dia a dia com nosso runbook. Muitos clientes começam assim.",
      },
      {
        question: "Como medem o uptime que prometem?",
        answer:
          "Com verificações de serviço em dois pontos (interno e externo), histórico por sistema e relatório mensal. Você pode auditar os dados direto no painel de monitoramento.",
      },
    ],
    purpose: "hub-infra",
  },
  dev: {
    eyebrow: "Desenvolvimento digital",
    title: "Presença digital construída para gerar negócio — não apenas existir",
    subtitle:
      "Sites institucionais, e-commerce, landing pages de alta conversão, aplicativos e sistemas web sob medida. SEO técnico, performance e rastreamento de conversão desde o primeiro dia.",
    bullets: [
      "Lighthouse ≥ 90 em todas as páginas entregues",
      "Copy e arquitetura orientadas a conversão",
      "Integração com CRM, WhatsApp, GA4 e pixels",
      "Código e contas em seu nome, sem dependência",
    ],
    introTitle: "Quatro frentes, um mesmo padrão de entrega",
    introText:
      "Todo projeto digital começa por descoberta: quem visita, o que decide, de onde vem o tráfego e o que precisa acontecer depois do clique. Só então desenhamos e programamos. O padrão é o mesmo para site, landing page, app ou sistema — pesquisa, protótipo aprovado, desenvolvimento mediado e evolução contínua.",
    faqTitle: "Perguntas frequentes sobre projetos digitais",
    faq: [
      {
        question: "Qual a diferença entre site institucional e landing page?",
        answer:
          "O site institucional constrói autoridade e captura busca orgânica ao longo do tempo; a landing page converte tráfego pago em uma campanha específica. A maioria das empresas precisa dos dois, operando juntos.",
      },
      {
        question: "Vocês usam WordPress ou código próprio?",
        answer:
          "Construímos com Next.js e React por padrão: performance, segurança e custo de manutenção melhores. Quando o cliente precisa de WordPress por restrição interna, executamos com as mesmas regras de performance e SEO.",
      },
      {
        question: "Quem mantém o site depois de publicado?",
        answer:
          "Você decide. Entregamos painel de edição para conteúdo, documentação e treinamento. O plano de manutenção cobre atualizações, backup, monitoramento de uptime, ajustes e evolução de conversão.",
      },
      {
        question: "Dá para integrar com meu ERP ou CRM?",
        answer:
          "Sim — integrações via API são parte do escopo típico. Se seu sistema não tem API documentada, incluímos a camada de integração e estimamos o esforço antes de fechar o orçamento.",
      },
      {
        question: "Como vocês medem se o projeto deu resultado?",
        answer:
          "Com baseline antes do lançamento e metas depois: tráfego orgânico, posição por palavra-alvo, taxa de conversão, custo por lead e volume de contatos qualificados no CRM. Relatório mensal em linguagem de negócio.",
      },
    ],
    purpose: "hub-dev",
  },
};

export function HubPage({ category }: { category: ServiceCategory }) {
  const copy = hubCopy[category];
  const list = servicesOfCategory(category);
  const hubPath = category === "infra" ? "/infraestrutura" : "/desenvolvimento";

  return (
    <div id="conteudo">
      <JsonLd
        data={[
          faqSchema(copy.faq),
          buildBreadcrumb([{ name: copy.eyebrow, url: hubPath }]),
        ]}
      />

      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        bullets={copy.bullets}
        visual={category === "infra" ? "infra" : "dev"}
        breadcrumbs={[
          {
            name: category === "infra" ? "Infraestrutura" : "Desenvolvimento",
            url: hubPath,
          },
        ]}
        primary={{
          label: category === "infra" ? "Agendar diagnóstico" : "Pedir orçamento de projeto",
          whatsapp: category,
        }}
      />

      <Section tone="surface">
        <SectionHeading eyebrow="Serviços" title={copy.introTitle} description={copy.introText} />

        <div className="mt-12 space-y-5">
          {list.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06}>
              <article className="group grid gap-6 rounded-3xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:border-tech-200 hover:shadow-card-hover lg:grid-cols-12 lg:p-8">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-tech-600 to-aqua-500 text-white shadow-glow-cyan">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                      {service.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.3rem] font-bold leading-snug text-navy-900 sm:text-[1.45rem]">
                    <Link href={`/${service.slug}`} className="hover:text-tech-700">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-ink-soft">
                    {service.subtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      href={`/${service.slug}`}
                      icon="arrowRight"
                      event="cta_click"
                      eventParams={{ location: "hub_card", service: service.slug }}
                    >
                      Ver detalhes
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      whatsapp={category}
                      event="whatsapp_click"
                      eventParams={{ location: "hub_card" }}
                    >
                      Tirar dúvida
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
                    O que está incluso
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {service.deliverables.slice(0, 5).map((item) => (
                      <li key={item.title} className="flex items-start gap-2.5 text-ink-soft">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                        {item.title}
                      </li>
                    ))}
                    {service.deliverables.length > 5 ? (
                      <li className="pl-6.5 text-xs font-medium text-ink-muted">
                        + {service.deliverables.length - 5} outros itens no escopo detalhado
                      </li>
                    ) : null}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <div className="h-full rounded-2xl bg-[radial-gradient(120%_100%_at_50%_0%,#152a54_0%,#0a1f44_60%,#050d1f_100%)] p-5 text-white ring-1 ring-white/10">
                    <p className="text-2xs font-bold uppercase tracking-[0.12em] text-aqua-300">
                      Resultado típico
                    </p>
                    {service.results.slice(0, 2).map((result) => (
                      <div key={result.title} className="mt-3 border-t border-white/10 pt-3 first:border-0 first:pt-0">
                        <p className="font-display text-xl font-extrabold leading-none">
                          {result.metric}
                        </p>
                        <p className="mt-1.5 text-xs leading-5 text-navy-300">{result.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProcessSection />

      <FaqSection
        items={copy.faq}
        title={copy.faqTitle}
        schema={false}
        description="Respostas de quem opera ambientes e projetos de verdade — se restar dúvida técnica, um consultor responde antes de qualquer proposta."
      />

      <FinalCta
        title={
          category === "infra"
            ? "Vamos olhar seu ambiente antes que ele fale por você?"
            : "Vamos transformar presença digital em canal de vendas?"
        }
        subtitle={
          category === "infra"
            ? "Comece pelo diagnóstico gratuito: 40 minutos com um consultor sênior e uma lista de prioridades do que resolver primeiro."
            : "Envie o link do seu site atual ou a ideia do projeto e recebemos um plano de escopo, prazo e investimento."
        }
        purpose={copy.purpose}
      />
    </div>
  );
}
