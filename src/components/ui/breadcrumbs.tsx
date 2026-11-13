import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  url: string;
}

export function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <nav
      aria-label="Trilha de navegação"
      className={cn("text-sm", dark ? "text-navy-300" : "text-ink-muted", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            aria-label="Página inicial"
            className={cn(
              "inline-flex items-center gap-1 hover:text-tech-600",
              dark && "hover:text-aqua-300",
            )}
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              <ChevronRight className="h-4 w-4 opacity-50" aria-hidden="true" />
              {last ? (
                <span aria-current="page" className={dark ? "text-white" : "text-navy-800"}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className={cn("hover:text-tech-600", dark && "hover:text-aqua-300")}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
