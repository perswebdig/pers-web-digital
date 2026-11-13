"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "pwd:cookie-consent";
export const CONSENT_EVENT = "pwd:consent-change";

const ids = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
};

const hasTracking = Boolean(ids.ga4 || ids.gtm || ids.meta);

function loadScripts() {
  if (typeof window === "undefined") return;

  if (ids.gtm && !document.getElementById("gtm-script")) {
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ids.gtm}');`;
    document.head.appendChild(s);
  }

  if (ids.ga4 && !document.getElementById("ga4-script")) {
    const s = document.createElement("script");
    s.id = "ga4-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ids.ga4}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${ids.ga4}',{anonymize_ip:true});`;
    document.head.appendChild(inline);
  }

  if (ids.meta && !document.getElementById("meta-pixel")) {
    const s = document.createElement("script");
    s.id = "meta-pixel";
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ids.meta}');fbq('track','PageView');`;
    document.head.appendChild(s);
  }
}

/**
 * Consentimento LGPD + carregamento de GA4, GTM e Meta Pixel.
 * Nenhum script de terceiros é carregado sem aceite prévio.
 * Se nenhuma ID de analytics estiver configurada, nada é exibido ou carregado.
 */
export function Tracking() {
  const [showBanner, setShowBanner] = useState(false);

  const apply = useCallback((value: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    if (value === "accepted") loadScripts();
    setShowBanner(false);
  }, []);

  useEffect(() => {
    if (!hasTracking) return;
    const stored = window.localStorage.getItem(CONSENT_KEY) as
      | "accepted"
      | "rejected"
      | null;
    if (stored === "accepted") {
      loadScripts();
    } else if (!stored) {
      // dá tempo de ler a página antes de interromper
      const t = setTimeout(() => setShowBanner(true), 1600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setShowBanner(true);
    window.addEventListener("pwd:open-cookies", reopen);
    return () => window.removeEventListener("pwd:open-cookies", reopen);
  }, []);

  if (!hasTracking || !showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-navy-200 bg-white/95 p-5 shadow-card-hover backdrop-blur",
        "sm:inset-x-6",
      )}
    >
      <p className="text-sm leading-6 text-ink-soft">
        <strong className="font-semibold text-navy-900">Privacidade (LGPD).</strong>{" "}
        Usamos cookies de análise apenas para entender quais conteúdos ajudam você e
        medir nossas campanhas. Você pode aceitar ou recusar — e mudar de ideia quando
        quiser.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="sm" variant="primary" onClick={() => apply("accepted")}>
          Aceitar análise
        </Button>
        <Button size="sm" variant="secondary" onClick={() => apply("rejected")}>
          Recusar
        </Button>
        <a
          href="/politica-de-privacidade"
          className="self-center text-sm font-medium text-tech-700 underline decoration-tech-200 underline-offset-4 hover:decoration-tech-600"
        >
          Política de privacidade
        </a>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        {site.name} · Nenhum dado é enviado a terceiros sem o seu aceite.
      </p>
    </div>
  );
}
