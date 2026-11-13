"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Icon, type IconKey } from "@/components/ui/icon";
import { site } from "@/lib/site";
import { cn, telLink } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { infraServicesList, devServicesList } from "@/data/catalog";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLink =
    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.94rem] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-tech-700";

  const secondaryNav = [
    { label: "Cases", href: "/cases" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-navy-100 bg-white/95 shadow-[0_2px_16px_-8px_rgba(10,31,68,.18)] backdrop-blur-lg"
          : "border-b border-transparent bg-white",
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="container-site flex items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((v) => !v)}
              className={cn(navLink, solutionsOpen && "text-tech-700")}
            >
              Soluções
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  solutionsOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {solutionsOpen ? (
                <m.div
                  initial={{ opacity: 0, y: 8, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.99 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 w-[52rem] max-w-[92vw] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white p-3 shadow-card-hover">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <MegaGroup
                        title="Consultoria e Infraestrutura"
                        href="/infraestrutura"
                        items={infraServicesList.map((s) => ({
                          label: s.navLabel,
                          href: `/${s.slug}`,
                          icon: s.icon,
                          description: s.name,
                        }))}
                      />
                      <MegaGroup
                        title="Desenvolvimento Digital"
                        href="/desenvolvimento"
                        items={devServicesList.map((s) => ({
                          label: s.navLabel,
                          href: `/${s.slug}`,
                          icon: s.icon,
                          description: s.name,
                        }))}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                      <p className="text-sm text-ink-soft">
                        Não sabe por onde começar? Comece pelo diagnóstico gratuito.
                      </p>
                      <Button
                        size="sm"
                        href="/contato"
                        icon="arrowRight"
                        event="cta_click"
                        eventParams={{ location: "mega_menu" }}
                      >
                        Falar com um consultor
                      </Button>
                    </div>
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>

          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(navLink, pathname === item.href && "text-tech-700")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink}
            onClick={() => track("phone_click", { location: "header" })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-tech-700"
          >
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <Button
            size="md"
            href="/contato"
            event="cta_click"
            eventParams={{ location: "header_desktop" }}
          >
            Solicitar orçamento
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu de navegação"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-200 text-navy-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-card-hover lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
                <Logo size="sm" href={null} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy-200 text-navy-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-8">
                <MobileGroup
                  title="Consultoria e Infraestrutura"
                  hubHref="/infraestrutura"
                  items={infraServicesList.map((s) => ({
                    label: s.navLabel,
                    href: `/${s.slug}`,
                    icon: s.icon,
                  }))}
                />
                <MobileGroup
                  title="Desenvolvimento Digital"
                  hubHref="/desenvolvimento"
                  items={devServicesList.map((s) => ({
                    label: s.navLabel,
                    href: `/${s.slug}`,
                    icon: s.icon,
                  }))}
                />

                <div className="mt-6">
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2.5 text-base font-semibold text-navy-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="safe-bottom space-y-3 border-t border-navy-100 bg-surface px-5 py-4">
                <Button
                  fullWidth
                  size="lg"
                  href="/contato"
                  icon="arrowRight"
                  event="cta_click"
                  eventParams={{ location: "drawer" }}
                >
                  Solicitar orçamento
                </Button>
                <Button fullWidth size="lg" variant="whatsapp" whatsapp="orcamento">
                  Falar no WhatsApp
                </Button>
              </div>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MegaGroup({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { label: string; href: string; icon: IconKey; description: string }[];
}) {
  return (
    <div className="rounded-xl p-2">
      <div className="mb-1 flex items-center justify-between px-2">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-muted">{title}</p>
        <Link href={href} className="text-xs font-semibold text-tech-700 hover:text-tech-800">
          Ver frente
        </Link>
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tech-50 text-tech-700 transition-colors group-hover:bg-tech-600 group-hover:text-white">
                <Icon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy-900">{item.label}</span>
                <span className="block text-xs leading-5 text-ink-muted">{item.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileGroup({
  title,
  hubHref,
  items,
}: {
  title: string;
  hubHref: string;
  items: { label: string; href: string; icon: IconKey }[];
}) {
  return (
    <div className="border-b border-navy-100 py-5">
      <div className="flex items-baseline justify-between">
        <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-muted">{title}</p>
        <Link href={hubHref} className="text-xs font-semibold text-tech-700">
          Ver tudo
        </Link>
      </div>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-lg py-2.5 text-[0.95rem] font-medium text-navy-800 hover:bg-surface"
            >
              <Icon name={item.icon} className="h-[18px] w-[18px] text-tech-600" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
