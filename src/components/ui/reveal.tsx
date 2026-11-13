"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Scroll reveal acessível: respeita prefers-reduced-motion */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
  const reduce = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  if (reduce) return <div className={className}>{items}</div>;

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
