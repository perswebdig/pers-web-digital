import type { Config } from "tailwindcss";

/**
 * Design tokens — Pers Web Digital
 * Paleta: azul-marinho profundo (#0A1F44) + azul-tech (#2563EB) + ciano (#06B6D4)
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f9",
          100: "#d8e0f0",
          200: "#adc0e1",
          300: "#7f9acf",
          400: "#4f6dad",
          500: "#2f4d8d",
          600: "#1e376b",
          700: "#152a54",
          800: "#0f2145",
          900: "#0a1f44",
          950: "#050d1f",
        },
        tech: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#2563eb",
        },
        aqua: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          DEFAULT: "#06b6d4",
        },
        surface: {
          DEFAULT: "#f6f8fc",
          alt: "#eef2f9",
        },
        /* Verde de ação WhatsApp: #078745 garante 4,6:1 com branco (AA) */
        wa: {
          50: "#e9f8ef",
          100: "#cdf0dc",
          200: "#9ee2bb",
          300: "#63cca0",
          400: "#2fb07d",
          500: "#129a5f",
          600: "#078745",
          700: "#066535",
          800: "#07512c",
          900: "#074326",
          DEFAULT: "#078745",
        },
        ink: {
          DEFAULT: "#0f172a",
          soft: "#334155",
          muted: "#64748b",
        },
        success: "#15803d",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      maxWidth: {
        container: "76rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,31,68,.06), 0 8px 24px -12px rgba(10,31,68,.12)",
        "card-hover":
          "0 1px 2px rgba(10,31,68,.08), 0 18px 40px -16px rgba(10,31,68,.22)",
        glow: "0 0 0 1px rgba(37,99,235,.16), 0 12px 40px -12px rgba(37,99,235,.35)",
        "glow-cyan": "0 12px 40px -12px rgba(6,182,212,.45)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(10,31,68,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,31,68,.06) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
        "radial-hero":
          "radial-gradient(60% 60% at 50% 0%, rgba(37,99,235,.28) 0%, rgba(10,31,68,0) 70%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: ".7" },
          "70%": { transform: "scale(1.7)", opacity: "0" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
