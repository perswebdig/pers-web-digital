import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { services } from "@/data/catalog";
import { waLink } from "@/lib/utils";

export default function NotFound() {
  return (
    <div id="conteudo">
      <Section tone="gradient" className="overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-40"
          aria-hidden="true"
        />
        <Container className="relative">
          <p className="font-display text-[4.5rem] font-extrabold leading-none text-white/10 sm:text-[6rem]">
            404
          </p>
          <h1 className="mt-2 text-[1.9rem] font-extrabold leading-tight text-white sm:text-[2.4rem]">
            Essa página saiu de manutenção
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-7 text-navy-200">
            O endereço não existe ou mudou de lugar. Acontece — e aqui tem atalho para o
            que você provavelmente procurava.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" href="/" icon="arrowRight" variant="aqua">
              Voltar para a home
            </Button>
            <Button
              size="lg"
              variant="on-dark"
              href={waLink("default")}
              event="whatsapp_click"
              eventParams={{ location: "404" }}
            >
              Pedir ajuda no WhatsApp
            </Button>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-2xs font-bold uppercase tracking-[0.16em] text-aqua-300">
              Serviços mais procurados
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-navy-100 transition-colors hover:border-aqua-400/40 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon
                      name={service.icon}
                      className="h-[18px] w-[18px] shrink-0 text-aqua-300"
                    />
                    <span className="truncate">{service.navLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </div>
  );
}
