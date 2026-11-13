import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { waLink } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  bullets = [],
  breadcrumbs,
  primary,
  visual,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  breadcrumbs: Crumb[];
  primary?: { label: string; href?: string; whatsapp?: string; icon?: IconKey };
  visual?: "infra" | "dev" | "none";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(37,99,235,.32)_0%,rgba(10,31,68,0)_70%)]"
        aria-hidden="true"
      />

      <Container className="relative py-12 sm:py-14 lg:py-18">
        <Breadcrumbs items={breadcrumbs} tone="dark" />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className={visual && visual !== "none" ? "lg:col-span-7" : "lg:col-span-9"}>
            <span className="eyebrow-dark">{eyebrow}</span>
            <h1 className="mt-5 text-balance text-[2.05rem] font-extrabold leading-[1.08] text-white sm:text-[2.65rem] lg:text-[3.05rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[1.06rem] leading-8 text-navy-200">
              {subtitle}
            </p>

            {bullets.length ? (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[0.95rem] text-navy-100">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-aqua-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                href={primary?.whatsapp ? waLink(primary.whatsapp) : (primary?.href ?? "/contato")}
                icon={primary?.icon ?? "arrowRight"}
                event="cta_click"
                eventParams={{ location: "page_hero", title }}
              >
                {primary?.label ?? "Solicitar orçamento"}
              </Button>
              <Button
                size="lg"
                variant="whatsapp"
                href={waLink("default")}
                event="whatsapp_click"
                eventParams={{ location: "page_hero" }}
              >
                Falar no WhatsApp
              </Button>
            </div>

            <p className="mt-3.5 text-xs text-navy-400">
              Resposta em até 1 hora útil · Diagnóstico sem compromisso
            </p>

            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {visual === "infra" || visual === "dev" ? (
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-tech-600/25 to-aqua-500/20 blur-2xl" />
                <div className="relative rounded-[1.6rem] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md">
                  <Image
                    src={
                      visual === "infra"
                        ? "/images/hero-visual.png"
                        : "/images/monitoring-visual.png"
                    }
                    alt={
                      visual === "infra"
                        ? "Infraestrutura: servidor, firewall, nuvem e aplicações conectados"
                        : "Painel de monitoramento com gráficos, escudo de segurança e nuvem"
                    }
                    width={900}
                    height={675}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aqua-500/50 to-transparent" />
    </section>
  );
}
