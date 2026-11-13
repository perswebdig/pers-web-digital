"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Carrega o bundle de animações do Framer Motion uma única vez, de forma
 * tree-shakeable (`domAnimation`). Todos os componentes usam `m.*` em vez de
 * `motion.*`, o que reduz o JavaScript enviado no primeiro load e o tempo de
 * bloqueio da main thread — sem perder as animações de scroll, hover,
 * entrada/saída e os painéis animados do mega menu.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
