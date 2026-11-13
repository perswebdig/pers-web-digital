"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accordion acessível (padrão APG): um item aberto por vez,
 * navegação por teclado nativa e aria-expanded/controls.
 * Também beneficia o SEO quando combinado com FAQPage em Schema.org.
 */
export function Accordion({
  items,
  tone = "light",
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  tone?: "light" | "dark";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const dark = tone === "dark";

  return (
    <div className="divide-y divide-navy-100 border-y border-navy-100">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-b-${index}`;
        const panelId = `${baseId}-p-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 py-5 text-left text-base font-semibold transition-colors",
                  dark
                    ? "text-white hover:text-aqua-200"
                    : "text-navy-900 hover:text-tech-700",
                )}
              >
                <span>{item.question}</span>
                <Plus
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-45",
                    dark ? "text-aqua-300" : "text-tech-600",
                  )}
                  strokeWidth={2}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "pb-6 pr-10 text-[0.98rem] leading-7",
                      dark ? "text-navy-200" : "text-ink-soft",
                    )}
                  >
                    {item.answer}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
