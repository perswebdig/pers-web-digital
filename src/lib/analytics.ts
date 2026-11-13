"use client";

/**
 * Camada de rastreamento de conversão.
 *
 * Envia eventos para:
 *  - Google Analytics 4 (window.gtag) — quando NEXT_PUBLIC_GA4_ID estiver definido
 *  - Google Tag Manager (window.dataLayer) — quando NEXT_PUBLIC_GTM_ID estiver definido
 *  - Meta Pixel (window.fbq) — quando NEXT_PUBLIC_META_PIXEL_ID estiver definido
 *
 * Os IDs ficam em variáveis de ambiente (ver .env.example). Sem ID,
 * nenhum script de terceiros é carregado — o site continua rápido e
 * em conformidade com a LGPD.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type LeadEvent =
  | "generate_lead"
  | "contact_click"
  | "whatsapp_click"
  | "schedule_click"
  | "form_submit"
  | "exit_intent_view"
  | "exit_intent_submit"
  | "cta_click"
  | "phone_click";

const LEAD_EVENTS: LeadEvent[] = ["generate_lead", "form_submit", "exit_intent_submit"];

export function track(event: LeadEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    event_name: event,
    company: "Pers Web Digital",
    page_path: window.location.pathname,
    ...params,
  };

  // GA4
  window.gtag?.("event", event, params);

  // GTM (dataLayer)
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  // Meta Pixel — só converte eventos de lead
  if (LEAD_EVENTS.includes(event)) {
    window.fbq?.("track", "Lead", { content_name: event, ...params });
  } else {
    window.fbq?.("trackCustom", event, params);
  }
}
