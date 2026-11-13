"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Marca a visita à página /obrigado como conversão (evento de lead),
 * útil como destino de otimização de campanha no Google e no Meta.
 */
export function ConversionPing() {
  useEffect(() => {
    track("form_submit", { purpose: "thank-you-page", path: "/obrigado" });
  }, []);

  return null;
}
