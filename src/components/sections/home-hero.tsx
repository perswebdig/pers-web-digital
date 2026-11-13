import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Icon } from "@/components/ui/icon";
import { stats, testimonials } from "@/data/home";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* fundos em camadas: grid + brilhos radiais */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(37,99,235,.35)_0%,rgba(10,31,68,0)_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-aqua-500/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-tech-600/25 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-aqua-200 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-aqua-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-400" />
              </span>
              TI gerenciada + desenvolvimento digital, no mesmo fornecedor
            </div>

            <h1 className="mt-6 text-balance text-[2.35rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
              Infraestrutura de TI sólida e{" "}
              <span className="bg-gradient-to-r from-aqua-300 via-tech-300 to-white bg-clip-text text-transparent">
                presença digital que converte
              </span>
              .
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-navy-200">
              Consultoria, servidores, redes e desenvolvimento de sites, landing pages e
              apps — tudo sob um único parceiro estratégico. Você para de apagar incêndio
              e passa a ter plano, SLA e canal de vendas funcionando.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="xl"
                href="/contato"
                icon="arrowRight"
                event="cta_click"
                eventParams={{ location: "hero", variant: "orcamento" }}
              >
                Solicitar orçamento gratuito
              </Button>
              <Button
                size="xl"
                variant="whatsapp"
                whatsapp="orcamento"
                event="whatsapp_click"
                eventParams={{ location: "hero" }}
              >
                Falar no WhatsApp
              </Button>
            </div>

            <p className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-300">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-aqua-400" /> Resposta em até 1
                hora útil
              </span>
              <span className="hidden text-navy-500 sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-aqua-400" /> Diagnóstico sem
                compromisso
              </span>
            </p>

            <div className="mt-11 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-white sm:text-[1.7rem]">
                    {stat.prefix}
                    {stat.decimals ? stat.value.toFixed(stat.decimals).replace(".", ",") : stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-navy-300">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {testimonials.slice(0, 4).map((t) => (
                  <span
                    key={t.author}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-950 bg-gradient-to-br from-tech-600 to-aqua-500 text-xs font-bold text-white"
                  >
                    {t.initials}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-aqua-300" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-white">4,9/5</span>
                </div>
                <p className="text-xs text-navy-300">
                  Avaliação média de {stats[0].value}+ empresas atendidas
                </p>
              </div>
            </div>
          </div>

          {/* Visual + cartões flutuantes */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-tech-600/25 to-aqua-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md sm:p-6">
                <Image
                  src="/images/hero-visual.png"
                  alt="Ilustração isométrica de servidor, firewall, nuvem, site e aplicativo interligados"
                  width={1200}
                  height={900}
                  priority
                  className="h-auto w-full animate-float object-contain"
                />

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <FloatingChip
                    icon="activity"
                    label="Servidores"
                    value="Online · 99,98%"
                    tone="green"
                  />
                  <FloatingChip
                    icon="database"
                    label="Backup"
                    value="Testado há 3 dias"
                    tone="blue"
                  />
                  <FloatingChip
                    icon="rocket"
                    label="Site institucional"
                    value="Lighthouse 96"
                    tone="cyan"
                  />
                  <FloatingChip
                    icon="headset"
                    label="Chamado P1"
                    value="Aberto · 3 min"
                    tone="amber"
                  />
                </div>
              </div>

              <div className="absolute -top-5 right-6 hidden rounded-2xl border border-white/15 bg-navy-950/90 px-4 py-3 shadow-card-hover backdrop-blur sm:block">
                <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-aqua-300">
                  Um contrato
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  Infra + digital, sem 3 fornecedores
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-navy-400 sm:mt-16">
          {site.certifications.slice(0, 5).map((cert) => (
            <span key={cert} className="inline-flex items-center gap-2">
              <Icon name="badge" className="h-4 w-4 text-aqua-500/80" />
              {cert}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FloatingChip({
  icon,
  label,
  value,
  tone,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  tone: "green" | "blue" | "cyan" | "amber";
}) {
  const tones = {
    green: "text-emerald-300 bg-emerald-400/10 ring-emerald-400/25",
    blue: "text-tech-300 bg-tech-400/10 ring-tech-400/25",
    cyan: "text-aqua-300 bg-aqua-400/10 ring-aqua-400/25",
    amber: "text-amber-300 bg-amber-400/10 ring-amber-400/25",
  } as const;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ${tones[tone]}`}
    >
      <Icon name={icon} className="h-[18px] w-[18px] shrink-0" />
      <div className="min-w-0">
        <p className="text-2xs uppercase tracking-wide text-navy-400">{label}</p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
