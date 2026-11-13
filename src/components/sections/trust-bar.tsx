import { Container } from "@/components/ui/layout";
import { site } from "@/lib/site";

/**
 * Barra de prova social: nomes de clientes em marquee contínuo.
 * Para usar logos reais, coloque os SVGs em /public/clients/<slug>.svg
 * e troque o bloco de texto por <Image src={`/clients/${slug}.svg`} … />.
 */
export function TrustBar() {
  const items = [...site.clients, ...site.clients];

  return (
    <section className="border-y border-navy-100 bg-white py-10">
      <Container>
        <p className="text-center text-2xs font-bold uppercase tracking-[0.18em] text-ink-muted">
          Empresas que confiam a operação de TI e o digital para a {site.shortName}
        </p>
      </Container>

      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10 sm:gap-14">
          {items.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex shrink-0 items-center gap-3"
              aria-hidden={index >= site.clients.length}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 to-tech-700 text-2xs font-bold text-white">
                {client.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="whitespace-nowrap">
                <span className="block font-display text-[0.98rem] font-bold text-navy-800">
                  {client.name}
                </span>
                <span className="block text-2xs uppercase tracking-wide text-ink-muted">
                  {client.sector}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
