import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb, faqSchema } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { stats } from "@/data/home";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sobre a Pers Web Digital | Time, História e Certificações",
    description:
      "Quem somos, como trabalhamos e no que acreditamos: uma empresa de consultoria de TI e desenvolvimento digital com time certificado, atendimento consultivo e contrato claro. Desde 2016.",
    keywords: [
      "quem somos empresa de ti",
      "empresa de ti são paulo",
      "time certificado aws microsoft",
      "história pers web digital",
    ],
    path: "/sobre",
  });
}

const values: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Diagnóstico antes de proposta",
    text: "Nunca enviamos orçamento antes de entender o processo afetado. Se a resposta for “não precisa disso agora”, falamos.",
  },
  {
    icon: "shield",
    title: "Segurança é premissa, não adicional",
    text: "Backup testado, acesso com MFA e documentação vêm em todo serviço. O que não pode falhar, não fica para a fase 2.",
  },
  {
    icon: "users",
    title: "Transferir conhecimento, criar dependência zero",
    text: "Runbook, topologia e acessos em nome do cliente. Nosso contrato se sustenta pelo resultado, não pelo sequestro de informação.",
  },
  {
    icon: "gauge",
    title: "Medir ou não prometer",
    text: "Uptime, SLA, custo por lead, tempo de restauração: se não dá para medir, não entra na proposta como compromisso.",
  },
  {
    icon: "phone",
    title: "Atendimento humano e próximo",
    text: "Você fala com quem executa. Um ponto focal por conta, sem ticket que ninguém dono.",
  },
  {
    icon: "file",
    title: "Clareza contratual",
    text: "Escopo por item, preço fechado e alternativas de faseamento. Sem letras miúdas para justificar aditivo depois.",
  },
];

/** ⚠️ Time placeholder — substitua por pessoas reais, com foto autorizada e LinkedIn */
const team: { name: string; role: string; focus: string; initials: string; creds: string[] }[] =
  [
    {
      name: "Anderson Persiano",
      role: "Sócio-fundador · Consultoria de TI",
      focus: "PDTI, governança e arquitetura de infraestrutura para PMEs industriais.",
      initials: "AP",
      creds: ["ITIL 4", "Azure Administrator", "15 anos em TI"],
    },
    {
      name: "Renata Okamoto",
      role: "Líder de Segurança e Conformidade",
      focus: "Resposta a incidentes, backup imutável e projetos de adequação à LGPD.",
      initials: "RO",
      creds: ["CompTIA Security+", "ISO 27001 Foundation"],
    },
    {
      name: "Diego Furtado",
      role: "Líder de Desenvolvimento Digital",
      focus: "Next.js, performance e arquitetura de sites orientados a conversão.",
      initials: "DF",
      creds: ["AWS Certified", "Core Web Vitals"],
    },
    {
      name: "Marina Albuquerque",
      role: "Product Owner · Aplicativos",
      focus: "Discovery, MVP e entrega contínua de apps corporativos e de consumo.",
      initials: "MA",
      creds: ["Scrum PMO", "React Native"],
    },
  ];

const timeline = [
  {
    year: "2016",
    title: "Começa como suporte de confiança",
    text: "Dois técnicos atendendo pequenas empresas de Pinheiros que não tinham ninguém para chamar quando o servidor caía. O diferencial desde o começo: documentar tudo.",
  },
  {
    year: "2019",
    title: "Primeiro contrato de TI gerenciada",
    text: "A demanda por previsibilidade virou modelo: mensalidade por escopo, SLA por criticidade e relatório mensal. Três clientes industriais no primeiro ano.",
  },
  {
    year: "2021",
    title: "Nasce a frente de desenvolvimento digital",
    text: "Clientes que já tinham sua TI pedindo site e landing page. Em vez de indicar terceiros, montamos time próprio de produto digital.",
  },
  {
    year: "2023",
    title: "Segurança e LGPD viram serviço",
    text: "Depois de atender incidentes de ransomware em clientes, estruturamos backup imutável, EDR e projetos de adequação à LGPD como oferta formal.",
  },
  {
    year: "2026",
    title: "Um contrato, duas frentes",
    text: "Mais de 120 empresas atendidas com infraestrutura e digital no mesmo fornecedor, com NOC próprio e squads de produto.",
  },
];

const aboutFaq = [
  {
    question: "Qual o tamanho da equipe da Pers Web Digital?",
    answer:
      "Time próprio com consultores de infraestrutura, especialistas em segurança, designers e desenvolvedores de produto digital, além de NOC com plantão. A estrutura é dimensionada por contrato para que cada cliente tenha um ponto focal identificado.",
  },
  {
    question: "Vocês são revenda de algum produto?",
    answer:
      "Somamos parcerias comerciais (nuvem e firewall) com independência técnica: a recomendação é por adequação ao cenário e custo total, não por comissão. Se a solução mais barata resolve, é ela que propomos.",
  },
];

export default function SobrePage() {
  return (
    <div id="conteudo">
      <JsonLd
        data={[
          buildBreadcrumb([{ name: "Sobre", url: "/sobre" }]),
          faqSchema(aboutFaq),
        ]}
      />

      <PageHero
        eyebrow="Sobre"
        title="TI e digital no mesmo lugar porque o seu negócio não está dividido"
        subtitle={`A ${site.name} nasceu em ${site.foundedYear} atendendo quem não tinha a quem chamar. Crescemos porque o problema dos clientes nunca foi só o servidor: era a falta de alguém que entendesse o negócio por trás da tecnologia.`}
        bullets={[
          "Sede em " + site.address.city + ", atendimento em todo o Brasil",
          "Time certificado em nuvem, redes, segurança e produto",
          "Mais de 120 empresas atendidas desde a fundação",
        ]}
        breadcrumbs={[{ name: "Sobre", url: "/sobre" }]}
        visual="infra"
        primary={{ label: "Conversar com o time", whatsapp: "default" }}
      />

      {/* Missão / visão */}
      <Section tone="surface">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: "compass" as IconKey,
              label: "Missão",
              title: "Tirar a tecnologia do caminho do negócio",
              text: "Entregar infraestrutura estável e presença digital eficaz para que empresas pequenas e médias operem com a mesma confiança das grandes — sem precisar de um departamento de TI caro para isso.",
            },
            {
              icon: "target" as IconKey,
              label: "Visão",
              title: "Ser o parceiro estratégico de longo prazo",
              text: "Queremos contratos contados em anos, não em incidentes. Isso só acontece quando o cliente entende o que paga, mede o que recebe e cresce com a gente.",
            },
            {
              icon: "badge" as IconKey,
              label: "Promessa",
              title: "Dizer a verdade técnica, inclusive quando incomoda",
              text: "Se o sistema atual está bom, dizemos para não trocar. Se o problema é processo e não tecnologia, entregamos o diagnóstico e indicamos o caminho. Confiança se constrói assim.",
            },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.07} className="h-full">
              <article className="card-base card-hover flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-tech-600 to-aqua-500 text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-2xs font-bold uppercase tracking-[0.16em] text-tech-700">
                    {item.label}
                  </span>
                </div>
                <h2 className="mt-5 text-[1.2rem] font-bold leading-snug text-navy-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-7 text-ink-soft">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* História */}
      <Section tone="light" id="historia">
        <SectionHeading
          eyebrow="Nossa história"
          title="De dez computadores administrados por um estagiário a 120 empresas com contrato"
          description="A linha do tempo abaixo explica por que trabalhamos do jeito que trabalhamos."
        />

        <ol className="mt-12 grid gap-5 lg:grid-cols-5">
          {timeline.map((item, index) => (
            <Reveal key={item.year} delay={index * 0.06}>
              <li className="relative h-full rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-extrabold text-tech-600">
                    {item.year}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-aqua-500" />
                </div>
                <h3 className="mt-3 text-[1.02rem] font-bold leading-snug text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-soft">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Números */}
      <Section tone="gradient" className="overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40"
          aria-hidden="true"
        />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              tone="dark"
              eyebrow="Em números"
              title="O que dez anos de operação acumularam"
              description="Números de referência do portfólio — substitua pelas suas métricas reais antes de publicar."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="aqua" size="md" href="/cases" icon="arrowRight">
                Ver cases concretos
              </Button>
              <Button variant="on-dark" size="md" href="/blog">
                Ler o blog técnico
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
              >
                <p className="font-display text-[2.2rem] font-extrabold leading-none text-white">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-aqua-300">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-navy-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section tone="light" id="valores">
        <SectionHeading
          align="center"
          eyebrow="Valores"
          title="Seis princípios que aparecem no contrato, não só no quadro da parede"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.05} className="h-full">
              <article className="card-base card-hover flex h-full gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600 ring-1 ring-aqua-200">
                  <Icon name={value.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.02rem] font-bold leading-snug text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-6 text-ink-soft">{value.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Time */}
      <Section tone="surface" id="time">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Time"
              title="Quem coloca a mão no seu ambiente"
              description="Nada de conta genérica: cada contrato tem ponto focal identificado, com nome, função e canal direto."
            />
            <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <p className="text-2xs font-bold uppercase tracking-[0.14em] text-tech-700">
                Certificações do time
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {site.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2.5 text-ink-soft">
                    <Icon name="badge" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs leading-5 text-ink-muted">
              Perfis ilustrativos de demonstração. Substitua por fotos e nomes reais com
              autorização por escrito.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06} className="h-full">
                <article className="card-base card-hover flex h-full gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 via-tech-600 to-aqua-500 text-lg font-bold text-white"
                  >
                    {member.initials}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold leading-tight text-navy-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-tech-700">{member.role}</p>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{member.focus}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {member.creds.map((cred) => (
                        <li
                          key={cred}
                          className="rounded-md bg-surface px-2 py-1 text-2xs font-semibold text-navy-700"
                        >
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-surface p-4 shadow-card">
              <Image
                src="/images/monitoring-visual.png"
                alt="Painel de monitoramento de infraestrutura com gráficos de disponibilidade"
                width={900}
                height={675}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Como é trabalhar com a gente"
              title="Um ponto focal, um painel e uma reunião por mês"
              description="Você não precisa entender de infraestrutura para acompanhar a sua. Toda operação tem um consultor responsável, um dashboard com os indicadores do contrato e uma reunião mensal de 30 minutos para decidir o que vem a seguir."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "headset" as IconKey,
                  title: "Ponto focal identificado",
                  text: "Nome, foto e WhatsApp direto de quem acompanha sua conta.",
                },
                {
                  icon: "chart" as IconKey,
                  title: "Indicadores abertos",
                  text: "Uptime, chamados, SLA, custo e risco em painel que você pode auditar.",
                },
                {
                  icon: "calendar" as IconKey,
                  title: "Ritual mensal",
                  text: "Reunião curta com pauta, decisões registradas e próximo passo marcado.",
                },
                {
                  icon: "file" as IconKey,
                  title: "Documentação viva",
                  text: "Topologia, acessos, runbooks e plano de contingência sempre atualizados.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-navy-100 bg-white p-5">
                  <Icon name={item.icon} className="h-5 w-5 text-tech-600" />
                  <p className="mt-3 font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-ink-soft">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" href="/contato" icon="arrowRight">
                Falar com um consultor
              </Button>
              <Button size="lg" variant="secondary" href="/infraestrutura">
                Ver frente de TI
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
