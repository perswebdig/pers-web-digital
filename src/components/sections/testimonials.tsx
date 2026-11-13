"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { testimonials } from "@/data/home";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused]);

  const active = testimonials[index];

  return (
    <Section id="depoimentos" tone="light">
      <SectionHeading
        align="center"
        eyebrow="Depoimentos"
        title="Quem contratou, resume em uma frase"
        description="Selecionamos relatos de perfis diferentes — indústria, saúde, jurídico, logística e varejo — porque a dor muda de um setor para o outro."
      />

      <div
        className="relative mx-auto mt-12 max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-surface to-white p-7 shadow-card sm:p-10">
          <Quote className="absolute right-6 top-6 h-16 w-16 text-tech-100" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <m.blockquote
              key={active.author}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <div
                className="flex items-center gap-1 text-aqua-600"
                role="img"
                aria-label="Nota 5 de 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="mt-5 text-pretty font-display text-lg font-medium leading-relaxed text-navy-900 sm:text-[1.35rem] sm:leading-[1.55]">
                “{active.quote}”
              </p>

              <footer className="mt-7 flex items-center gap-4 border-t border-navy-100 pt-6">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-tech-600 to-aqua-500 text-base font-bold text-white"
                >
                  {active.initials}
                </span>
                <div>
                  <p className="font-semibold text-navy-900">{active.author}</p>
                  <p className="text-sm text-ink-muted">
                    {active.role} · {active.company}
                  </p>
                </div>
                <span className="ml-auto hidden rounded-full bg-white px-3 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-tech-700 ring-1 ring-navy-100 sm:inline-block">
                  {active.sector}
                </span>
              </footer>
            </m.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
            }
            aria-label="Depoimento anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-800 transition-colors hover:border-tech-400 hover:text-tech-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Depoimento de ${t.author}`}
                onClick={() => setIndex(i)}
                className="group flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-tech-600"
                      : "w-2 bg-navy-200 group-hover:bg-navy-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            aria-label="Próximo depoimento"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-800 transition-colors hover:border-tech-400 hover:text-tech-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <Container>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-ink-muted">
            Relatos ilustrativos de portfólio, marcados como placeholder no código.
            Substitua por depoimentos reais com autorização por escrito dos clientes.
          </p>
        </Container>
      </div>
    </Section>
  );
}
