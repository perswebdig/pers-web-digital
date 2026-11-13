import { Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import { waLink } from "@/lib/utils";
import type { AccordionItem } from "@/components/ui/accordion";

export function FaqSection({
  items,
  title = "Perguntas frequentes",
  eyebrow = "Dúvidas comuns",
  description = "Respostas diretas sobre escopo, contrato, prazos e responsabilidade. Se a sua pergunta não estiver aqui, é só chamar.",
  tone = "light",
  schema = true,
  side,
}: {
  items: AccordionItem[];
  title?: string;
  eyebrow?: string;
  description?: string;
  tone?: "light" | "surface";
  schema?: boolean;
  side?: React.ReactNode;
}) {
  return (
    <Section id="faq" tone={tone}>
      {schema ? <JsonLd data={faqSchema(items)} /> : null}

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600 ring-1 ring-aqua-200">
                <Icon name="message" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">Ficou uma dúvida de fora?</p>
                <p className="mt-1 text-sm leading-6 text-ink-soft">
                  Fale direto com um consultor — sem robô de atendimento e sem fila de
                  call center. Média de primeira resposta: menos de 8 minutos em horário
                  comercial.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    variant="whatsapp"
                    href={waLink("default")}
                    event="whatsapp_click"
                    eventParams={{ location: "faq" }}
                  >
                    Chamar no WhatsApp
                  </Button>
                  <Button size="sm" variant="secondary" href="/contato">
                    Enviar mensagem
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {side ? <div className="mt-8">{side}</div> : null}
        </div>

        <div className="lg:col-span-7">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
