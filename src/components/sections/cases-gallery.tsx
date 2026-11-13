"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { Icon, type IconKey } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cases } from "@/data/home";
import { cn } from "@/lib/utils";

const filters: { key: string; label: string; icon: IconKey }[] = [
  { key: "todos", label: "Todos", icon: "sparkles" },
  { key: "infra", label: "Infraestrutura", icon: "server" },
  { key: "cloud", label: "Nuvem", icon: "cloud" },
  { key: "seguranca", label: "Segurança e LGPD", icon: "shield" },
  { key: "web", label: "Sites e landing pages", icon: "code" },
  { key: "apps", label: "Aplicativos", icon: "smartphone" },
];

export function CasesGallery() {
  const [active, setActive] = useState("todos");

  const visible = useMemo(
    () => (active === "todos" ? cases : cases.filter((c) => c.category === active)),
    [active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrar cases por tipo de projeto"
        className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((filter) => {
          const isActive = active === filter.key;
          const count =
            filter.key === "todos"
              ? cases.length
              : cases.filter((c) => c.category === filter.key).length;

          return (
            <button
              key={filter.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(filter.key)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "border-transparent bg-navy-900 text-white shadow-card"
                  : "border-navy-200 bg-white text-navy-700 hover:border-tech-300 hover:text-tech-700",
              )}
            >
              <Icon name={filter.icon} className="h-4 w-4" />
              {filter.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-2xs font-bold",
                  isActive ? "bg-white/15 text-aqua-200" : "bg-surface text-ink-muted",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-6">
        {visible.map((item, index) => (
          <m.article
            key={item.slug}
            id={item.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="scroll-mt-28 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 p-6 sm:p-8">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-tech-50 px-3 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-tech-700 ring-1 ring-tech-100">
                    {item.sector}
                  </span>
                  <span className="text-2xs font-medium text-ink-muted">{item.duration}</span>
                </div>

                <h3 className="mt-4 text-[1.35rem] font-bold leading-snug text-navy-900 sm:text-[1.55rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-ink-muted">{item.company}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-lg bg-surface px-2.5 py-1.5 text-2xs font-semibold text-navy-700"
                    >
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {item.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl bg-[radial-gradient(120%_100%_at_50%_0%,#152a54_0%,#0a1f44_60%,#050d1f_100%)] p-4 text-white"
                    >
                      <p className="font-display text-lg font-extrabold leading-none text-aqua-300">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-2xs leading-4 text-navy-300">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Block
                    tone="danger"
                    label="Problema"
                    icon="cross"
                    text={item.problem}
                  />
                  <Block
                    tone="tech"
                    label="Solução"
                    icon="wrench"
                    text={item.solution}
                  />
                  <Block
                    tone="success"
                    label="Resultado"
                    icon="trending"
                    text={item.result}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-navy-100 pt-5">
                  <Button
                    size="sm"
                    href="/contato"
                    icon="arrowRight"
                    event="cta_click"
                    eventParams={{ location: "cases_gallery", case: item.slug }}
                  >
                    Quero um resultado assim
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    whatsapp="default"
                    event="whatsapp_click"
                    eventParams={{ location: "cases_gallery" }}
                  >
                    Falar com um consultor
                  </Button>
                  <p className="text-xs text-ink-muted">
                    Case demonstrativo — substitua por dados reais autorizados pelo cliente.
                  </p>
                </div>
              </div>
            </div>
          </m.article>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-surface p-8 text-center text-sm text-ink-muted">
          Nenhum case nesta categoria ainda. Fale com a gente e conte o seu cenário:
          provavelmente já resolvemos algo parecido.
        </p>
      ) : null}
    </div>
  );
}

function Block({
  tone,
  label,
  icon,
  text,
}: {
  tone: "danger" | "tech" | "success";
  label: string;
  icon: IconKey;
  text: string;
}) {
  const tones = {
    danger: "border-danger/20 bg-danger/[0.04] text-danger",
    tech: "border-tech-200 bg-tech-50/60 text-tech-700",
    success: "border-success/20 bg-success/[0.04] text-success",
  } as const;

  return (
    <div className={cn("rounded-2xl border p-5", tones[tone])}>
      <p className="flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.12em]">
        <Icon name={icon} className="h-4 w-4" />
        {label}
      </p>
      <p className="mt-3 text-[0.9rem] leading-6 text-ink-soft">{text}</p>
    </div>
  );
}
