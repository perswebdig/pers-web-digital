import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/site";
import { currentYear, mailLink, telLink, waLink } from "@/lib/utils";
import { infraServicesList, devServicesList } from "@/data/catalog";
import { trustSeals } from "@/data/home";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-60"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-500/60 to-transparent" />

      <div className="container-site relative">
        {/* Faixa de selos de confiança */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-white/10 py-8">
          {trustSeals.map((seal) => (
            <div key={seal.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-aqua-300 ring-1 ring-white/10">
                <Icon name={seal.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-medium text-navy-100">{seal.label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-7 text-navy-300">
              Consultoria de TI, infraestrutura gerenciada e desenvolvimento digital para
              empresas que não podem parar. Um parceiro estratégico para a operação de
              hoje e para o crescimento de amanhã.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={telLink}
                className="flex items-center gap-2.5 text-navy-200 hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4 text-aqua-400" />
                {site.phoneDisplay}
              </a>
              <a
                href={mailLink}
                className="flex items-center gap-2.5 text-navy-200 hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4 text-aqua-400" />
                {site.email}
              </a>
              <p className="flex items-start gap-2.5 text-navy-300">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <span>
                  {site.address.street} — {site.address.district}, {site.address.city}/
                  {site.address.state}
                </span>
              </p>
              <p className="flex items-center gap-2.5 text-navy-300">
                <Icon name="clock" className="h-4 w-4 text-aqua-400" />
                {site.hours}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[
                { href: site.social.linkedin, label: "LinkedIn", Icone: LinkedInIcon },
                { href: site.social.instagram, label: "Instagram", Icone: InstagramIcon },
                { href: site.social.facebook, label: "Facebook", Icone: FacebookIcon },
                { href: site.social.youtube, label: "YouTube", Icone: YouTubeIcon },
              ].map(({ href, label, Icone }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} no ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-navy-200 transition-colors hover:border-aqua-400/50 hover:text-white"
                >
                  <Icone className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.16em] text-aqua-300">
                Consultoria e Infraestrutura
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/infraestrutura" className="text-navy-100 hover:text-white">
                    Visão geral da frente
                  </Link>
                </li>
                {infraServicesList.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="hover:text-white">
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.16em] text-aqua-300">
                Desenvolvimento Digital
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/desenvolvimento" className="text-navy-100 hover:text-white">
                    Visão geral da frente
                  </Link>
                </li>
                {devServicesList.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="hover:text-white">
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/cases" className="text-navy-100 hover:text-white">
                    Cases e portfólio
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-navy-100 hover:text-white">
                    Blog técnico
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-2xs font-bold uppercase tracking-[0.16em] text-aqua-300">
              Empresa
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/sobre" className="hover:text-white">
                  Sobre a {site.shortName}
                </Link>
              </li>
              <li>
                <Link href="/sobre#time" className="hover:text-white">
                  Time e certificações
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white">
                  Fale com um consultor
                </Link>
              </li>
              <li>
                <a
                  href={site.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Agendar diagnóstico
                </a>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-white">
                  Política de privacidade
                </Link>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">
                Atendimento em todo o Brasil
              </p>
              <p className="mt-1.5 text-xs leading-6 text-navy-300">
                {site.serviceAreas.join(" · ")}
              </p>
              <Button
                size="sm"
                variant="aqua"
                className="mt-4"
                whatsapp="default"
                event="whatsapp_click"
                eventParams={{ location: "footer" }}
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {site.legalName} · CNPJ {site.cnpj} · Todos os direitos
            reservados.
          </p>
          <nav aria-label="Rodapé — links legais" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/politica-de-privacidade" className="hover:text-navy-100">
              Privacidade
            </Link>
            <Link href="/sitemap.xml" className="hover:text-navy-100">
              Sitemap
            </Link>
            <a href={waLink("default")} target="_blank" rel="noopener noreferrer" className="hover:text-navy-100">
              WhatsApp
            </a>
            <span className="hidden sm:inline">
              {site.address.city} · {site.address.district}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
