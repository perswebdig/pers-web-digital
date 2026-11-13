import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Logo da Pers Web Digital: símbolo gerado como arte da marca +
 * wordmark tipográfico (texto real, nítido em qualquer DPI e
 * acessível para leitores de tela).
 */
export function Logo({
  variant = "dark",
  size = "md",
  href = "/",
  className,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
}) {
  const markSize = size === "sm" ? 28 : size === "lg" ? 44 : 34;
  const textSize =
    size === "sm" ? "text-[1.05rem]" : size === "lg" ? "text-2xl" : "text-[1.3rem]";

  const inner = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <Image
        src={variant === "light" ? "/brand/pers-mark-light-192.png" : "/brand/pers-mark-192.png"}
        alt=""
        width={192}
        height={192}
        priority={size !== "sm"}
        className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ width: markSize, height: markSize }}
      />
      <span
        className={cn(
          "font-display font-extrabold leading-none tracking-tight",
          textSize,
        )}
      >
        <span className={variant === "light" ? "text-white" : "text-navy-900"}>
          Pers
        </span>
        <span
          className={cn(
            "bg-gradient-to-r bg-clip-text text-transparent",
            variant === "light"
              ? "from-aqua-300 to-white"
              : "from-tech-600 to-aqua-500",
          )}
        >
          {" "}
          Web Digital
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );

  if (href === null) return inner;

  return (
    <Link href={href} aria-label={`${site.name} — página inicial`} className="inline-flex">
      {inner}
    </Link>
  );
}
