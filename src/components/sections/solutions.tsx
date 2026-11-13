import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { devServicesList, infraServicesList } from "@/data/catalog";
import type { ServiceContent } from "@/data/services";

export function SolutionsSection() {
  return (
    <Section id="solucoes" tone="surface">
      <SectionHeading
        align="center"
        eyebrow="Soluções"
        title="Duas frentes que resolvem a mesma pergunta: sua empresa para ou não?"
        description="De um lado, a infraestrutura que sustenta a operação. Do outro, o digital que traz cliente novo. Muitos fornecedores fazem um ou outro — nós entregamos os dois com o mesmo time e o mesmo contrato."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <SolutionCard
          tone="navy"
          eyebrow="Frente A"
          icon="server"
          title="Consultoria e Infraestrutura de TI"
          description="Servidores, redes, firewall, backup, nuvem e suporte com SLA. TI que roda e avisa antes de parar."
          services={infraServicesList}
          hubHref="/infraestrutura"
          hubLabel="Ver todos os serviços de TI"
          ctaContext="infraestrutura"
        />
        <SolutionCard
          tone="tech"
          eyebrow="Frente B"
          icon="code"
          title="Desenvolvimento Digital"
          description="Sites institucionais, e-commerce, landing pages de alta conversão, apps e sistemas sob medida."
          services={devServicesList}
          hubHref="/desenvolvimento"
          hubLabel="Ver todos os serviços digitais"
          ctaContext="desenvolvimento"
        />
      </div>

      <Reveal className="mt-10" delay={0.1}>
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:flex-row sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600 ring-1 ring-aqua-200">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy-900">
                Já tem TI e só precisa do digital? Ou o contrário?
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Fechamos escopo por necessidade — sem obrigar você a contratar o pacote
                inteiro para resolver um problema específico.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button size="md" href="/contato" icon="arrowRight" event="cta_click" eventParams={{ location: "solutions_footer" }}>
              Montar meu escopo
            </Button>
            <Button size="md" variant="secondary" href="/cases">
              Ver cases
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function SolutionCard({
  tone,
  eyebrow,
  icon,
  title,
  description,
  services,
  hubHref,
  hubLabel,
  ctaContext,
}: {
  tone: "navy" | "tech";
  eyebrow: string;
  icon: IconKey;
  title: string;
  description: string;
  services: ServiceContent[];
  hubHref: string;
  hubLabel: string;
  ctaContext: string;
}) {
  const dark = tone === "navy";

  return (
    <Reveal className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8 ${
          dark
            ? "bg-[radial-gradient(120%_100%_at_0%_0%,#152a54_0%,#0a1f44_55%,#050d1f_100%)] text-navy-200 ring-1 ring-white/10"
            : "border border-navy-100 bg-white text-ink-soft"
        }`}
      >
        <div
          className={
            dark
              ? "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-aqua-500/20 blur-3xl"
              : "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-tech-500/10 blur-3xl"
          }
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              dark
                ? "bg-white/10 text-aqua-300 ring-1 ring-white/15"
                : "bg-tech-50 text-tech-700 ring-1 ring-tech-200"
            }`}
          >
            <Icon name={icon} className="h-6 w-6" />
          </span>
          <span
            className={`text-2xs font-bold uppercase tracking-[0.16em] ${
              dark ? "text-aqua-300" : "text-tech-600"
            }`}
          >
            {eyebrow}
          </span>
        </div>

        <h3
          className={`relative mt-5 text-[1.45rem] font-bold leading-snug sm:text-[1.6rem] ${
            dark ? "text-white" : "text-navy-900"
          }`}
        >
          {title}
        </h3>
        <p className="relative mt-3 text-[0.98rem] leading-7">{description}</p>

        <ul className="relative mt-6 space-y-2.5">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`/${service.slug}`}
                className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  dark ? "hover:bg-white/[0.07]" : "hover:bg-surface"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    dark
                      ? "bg-white/10 text-aqua-300"
                      : "bg-tech-50 text-tech-600"
                  }`}
                >
                  <Icon name={service.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span
                    className={`block text-sm font-semibold ${dark ? "text-white" : "text-navy-900"}`}
                  >
                    {service.name}
                  </span>
                  <span className={`block text-xs leading-5 ${dark ? "text-navy-300" : "text-ink-muted"}`}>
                    {service.heroBullets[0]}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-7">
          <Button
            size="md"
            variant={dark ? "aqua" : "primary"}
            href={hubHref}
            icon="arrowRight"
            event="cta_click"
            eventParams={{ location: "solution_card", front: ctaContext }}
          >
            {hubLabel}
          </Button>
          <Button
            size="md"
            variant={dark ? "on-dark" : "secondary"}
            whatsapp={ctaContext}
            event="whatsapp_click"
            eventParams={{ location: "solution_card" }}
          >
            Tirar dúvida no WhatsApp
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
