"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";
import type { VariantProps as CvVariantProps } from "class-variance-authority";
import { Icon, type IconKey } from "./icon";
import { cn, waLink } from "@/lib/utils";
import { track, type LeadEvent } from "@/lib/analytics";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-tech-600 to-tech-700 text-white shadow-glow hover:from-tech-500 hover:to-tech-600 hover:shadow-card-hover active:translate-y-px",
        aqua: "bg-aqua-500 text-navy-950 shadow-glow-cyan hover:bg-aqua-400 active:translate-y-px",
        whatsapp:
          "bg-wa-600 text-white shadow-card hover:bg-wa-700 active:translate-y-px",
        secondary:
          "border border-navy-200 bg-white text-navy-900 shadow-card hover:border-tech-300 hover:text-tech-700 active:translate-y-px",
        "on-dark":
          "border border-white/25 bg-white/5 text-white backdrop-blur hover:border-aqua-300/60 hover:bg-white/10 active:translate-y-px",
        ghost: "text-navy-700 hover:bg-navy-50 hover:text-tech-700",
        "ghost-dark": "text-white/80 hover:bg-white/10 hover:text-white",
        link: "px-0 text-tech-700 hover:text-tech-800",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-12 px-6 text-[1.02rem]",
        xl: "h-14 px-7 text-base sm:text-[1.05rem]",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "lg", fullWidth: false },
  },
);

type ButtonAppearance = Partial<
  Pick<CvVariantProps<typeof buttonVariants>, "variant" | "size" | "fullWidth">
>;

export interface ButtonProps extends ButtonAppearance {
  children: React.ReactNode;
  href?: string;
  /** Abre em nova aba (apenas para links externos) */
  external?: boolean;
  /** Contexto da mensagem pré-preenchida do WhatsApp (ver waMessages em src/lib/site.ts) */
  whatsapp?: string;
  icon?: IconKey;
  iconLeft?: IconKey;
  /** Evento de conversão disparado no clique */
  event?: LeadEvent;
  eventParams?: Record<string, unknown>;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  external,
  whatsapp,
  icon,
  iconLeft,
  event,
  eventParams = {},
  type = "button",
  onClick,
  disabled,
  className,
  ariaLabel,
  ...variants
}: ButtonProps) {
  const classes = cn(buttonVariants(variants), className);

  const resolvedHref = whatsapp && !href ? waLink(whatsapp) : href;

  const handleClick = () => {
    if (event) track(event, { label: typeof children === "string" ? children : "cta", ...eventParams });
    onClick?.();
  };

  const content = (
    <>
      {iconLeft ? <Icon name={iconLeft} className="h-5 w-5 shrink-0" /> : null}
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (resolvedHref) {
    const isExternal = external ?? resolvedHref.startsWith("http");
    const common = {
      className: classes,
      onClick: handleClick,
      "aria-label": ariaLabel,
      ...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {}),
    };

    if (isExternal) {
      return <a href={resolvedHref} {...common}>{content}</a>;
    }
    return (
      <Link href={resolvedHref} {...common}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
