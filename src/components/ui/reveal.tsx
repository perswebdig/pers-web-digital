"use client";

import { createElement } from "react";
import { m, useReducedMotion } from "framer-motion";

type RevealTag = "div" | "li" | "article" | "span";

/**
 * Scroll reveal acessível: respeita `prefers-reduced-motion` e permite
 * renderizar o item como `li`/`article` para manter a semântica de listas
 * (`<ol>`/`<ul>` só podem ter `<li>` como filhos diretos).
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
}) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    return createElement(as, { className }, children);
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((item, i) => (
        <Reveal key={i} delay={i * stagger} className="h-full">
          {item}
        </Reveal>
      ))}
    </div>
  );
}
