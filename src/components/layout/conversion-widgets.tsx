"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { site } from "@/lib/site";
import { telLink, waLink } from "@/lib/utils";
import { track } from "@/lib/analytics";

const SESSION_KEY = "pwd:ex…tent";

/** Botão flutuante de WhatsApp (desktop/tablet) */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={waLink("default")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "float" })}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="group fixed bottom-7 right-5 z-40 hidden h-14 items-center gap-3 rounded-full bg-wa-600 pl-4 pr-5 text-white shadow-[0_10px_30px_-8px_rgba(31,170,84,.65)] transition-colors hover:bg-wa-700 sm:inline-flex lg:bottom-8 lg:right-8"
          aria-label={`Falar com a ${site.name} no WhatsApp`}
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-wa-600/35 animate-pulse-ring" aria-hidden="true" />
          <MessageCircle className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[11rem] group-hover:opacity-100">
            Falar com um consultor
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

/** Barra fixa de conversão no mobile */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25 }}
          className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-navy-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden"
        >
          <Button
            size="md"
            variant="whatsapp"
            href={waLink("orcamento")}
            event="whatsapp_click"
            eventParams={{ location: "mobile_bar" }}
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </Button>
          <Button
            size="md"
            variant="secondary"
            href={telLink}
            event="phone_click"
            eventParams={{ location: "mobile_bar" }}
          >
            <Phone className="h-5 w-5" /> Ligar agora
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Pop-up de saída com oferta de diagnóstico gratuito.
 * Dispara uma vez por sessão: mouse que sai pelo topo da viewport (desktop)
 * ou 45 s sem rolagem depois de 40% da página (fallback mobile).
 */
export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const show = () => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      setDismissed(false);
      track("exit_intent_view", { offer: "diagnostico-gratuito" });
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.scrollY > 200) show();
    };

    let idleTimer = 0;
    const resetIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (window.scrollY > window.innerHeight * 0.4 && window.innerWidth < 1024) show();
      }, 45_000);
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", resetIdle, { passive: true });
    resetIdle();

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", resetIdle);
      window.clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && !dismissed ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-navy-900 to-navy-950 p-7 text-white shadow-card-hover sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar oferta"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-navy-200 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="eyebrow-dark">
              <Sparkles className="h-3.5 w-3.5" /> Antes de sair
            </span>
            <h2 id="exit-title" className="mt-4 text-2xl font-bold leading-tight text-white">
              Leve um diagnóstico gratuito de TI
            </h2>
            <p className="mt-2.5 text-sm leading-6 text-navy-200">
              Em 40 minutos, um consultor aponta os três riscos mais caros do seu
              ambiente e o que resolver primeiro — mesmo que você não contrate nada.
            </p>

            <div className="mt-6">
              <LeadForm
                purpose="exit-intent"
                compact
                tone="dark"
                ctaLabel="Quero meu diagnóstico"
                microcopy="Sem compromisso · Resposta em até 1 hora útil"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setDismissed(true);
              }}
              className="mt-4 w-full text-center text-xs text-navy-300 underline underline-offset-4 hover:text-navy-100"
            >
              Não obrigada, só estava olhando
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
