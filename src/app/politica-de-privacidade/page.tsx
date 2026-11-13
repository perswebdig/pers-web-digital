import type { Metadata } from "next";
import { Section } from "@/components/ui/layout";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumb } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { mailLink } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Política de Privacidade e LGPD",
    description: `Como a ${site.name} coleta, usa e protege dados pessoais no site, em conformidade com a LGPD (Lei 13.709/2018). Direitos do titular, cookies, prazo de retenção e canal do encarregado.`,
    path: "/politica-de-privacidade",
    noindex: false,
  });
}

const sections: { title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    title: "1. Quem somos e do que trata esta política",
    paragraphs: [
      `A ${site.legalName}, inscrita no CNPJ sob o nº ${site.cnpj}, com sede em ${site.address.street}, ${site.address.district}, ${site.address.city}/${site.address.state}, é controladora dos dados pessoais tratados neste site.`,
      "Esta política explica quais dados coletamos, com que finalidade, por quanto tempo os guardamos, com quem podemos compartilhá-los e como você exerce seus direitos previstos na Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
    ],
  },
  {
    title: "2. Dados que coletamos",
    paragraphs: ["Coletamos apenas o necessário para responder seu contato e melhorar o site:"],
    list: [
      "Dados fornecidos no formulário: nome, e-mail, telefone/WhatsApp, empresa, serviço de interesse e mensagem opcional.",
      "Dados de navegação: páginas visitadas, origem do acesso (campaign/UTM), dispositivo e navegador, tratados de forma agregada por ferramentas de mensuração.",
      "Dados de contato comercial: histórico de conversas por WhatsApp, telefone e e-mail, quando você inicia ou aceita o contato.",
      "Dados técnicos de segurança: endereço IP, user agent e carimbo de data/hora das solicitações, para prevenção a fraude e abuso.",
    ],
  },
  {
    title: "3. Finalidades e bases legais",
    paragraphs: [
      "Usamos seus dados para responder solicitações pré-contratuais (art. 7º, V, LGPD), cumprir obrigações legais e regulatórias (art. 7º, II), executar contrato quando você for cliente (art. 7º, V) e, quando aplicável, mediante consentimento para mensagens de marketing (art. 7º, I).",
      "A mensuração de audiência e a otimização de campanhas são feitas com base em legítimo interesse (art. 7º, IX) e no consentimento que você pode revogar a qualquer momento por nosso canal de contato.",
    ],
  },
  {
    title: "4. Cookies e tecnologias de rastreamento",
    paragraphs: [
      "Utilizamos cookies estritamente necessários (funcionamento do site e registro de consentimento) e, se você autorizar, cookies analíticos do Google Analytics 4 e de plataformas de mídia (Meta Pixel) para medir conversões.",
      "O consentimento é solicitado por banner na primeira visita, fica registrado e pode ser alterado quando você quiser. Sem aceite, nenhuma ferramenta de análise de terceiros é carregada.",
    ],
  },
  {
    title: "5. Compartilhamento e transferências",
    paragraphs: [
      "Podemos compartilhar dados apenas com operadores essenciais à prestação do serviço e sempre limitados à finalidade: plataforma de hospedagem, provedor de e-mail transacional, ferramenta de CRM escolhida pelo cliente e serviços de mensuração.",
      "Não vendemos nem alugamos dados pessoais. Fornecedores são contratados com cláusulas de confidencialidade e segurança, podendo haver transferência internacional quando o serviço for hospedado fora do Brasil, com as garantias adequadas previstas na LGPD.",
    ],
  },
  {
    title: "6. Retenção",
    paragraphs: [
      "Dados de leads são mantidos por até 24 meses após o último contato, para atendimento de questionamentos e histórico comercial. Dados de clientes ativos seguem o prazo do contrato e as obrigações fiscais aplicáveis (5 anos para documentos fiscais, quando houver).",
      "Depois desses prazos, registramos a exclusão ou a anonimização, salvo necessidade legal de preservação.",
    ],
  },
  {
    title: "7. Segurança",
    paragraphs: [
      "Mantemos medidas técnicas e administrativas proporcionais ao risco: controle de acesso por função, autenticação multifator, criptografia em trânsito (TLS 1.2+) e em repouso, registro de auditoria, backup testado periodicamente e política de senhas.",
      "Nenhuma transmissão é 100% segura. Em caso de incidente com risco relevante aos titulares, comunicamos conforme art. 48 da LGPD e à ANPD quando exigido.",
    ],
  },
  {
    title: "8. Seus direitos como titular",
    paragraphs: ["Você pode, a qualquer momento e gratuitamente:"],
    list: [
      "Confirmar a existência de tratamento e acessar seus dados.",
      "Corrigir dados incompletos, inexatos ou desatualizados.",
      "Pedir anonimização, bloqueio ou eliminação de dados desnecessários.",
      "Portar seus dados a outro prestador, mediante requisição.",
      "Revogar consentimento e optar por não receber comunicações de marketing.",
      "Solicitar informação sobre compartilhamento e revogar autorização de tratamento baseado em legítimo interesse.",
    ],
  },
  {
    title: "9. Como exercer seus direitos",
    paragraphs: [
      `Envie sua solicitação para ${site.email} com o assunto “LGPD — Titular”. Respondemos em até 15 dias, podendo haver verificação de identidade para proteger seus dados.`,
      "Se não ficarmos satisfeitos com a resposta, você pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD) ou aos órgãos de defesa do consumidor.",
    ],
  },
  {
    title: "10. Encarregado (DPO)",
    paragraphs: [
      `O encarregado pelo tratamento de dados pessoais pode ser contactado pelo e-mail ${site.email}, informando o assunto “Encarregado LGPD”.`,
      "⚠️ Placeholder: antes de publicar, nomeie formalmente o encarregado (interno ou terceirizado) e publique o canal oficial previsto no art. 41 da LGPD.",
    ],
  },
  {
    title: "11. Crianças e adolescentes",
    paragraphs: [
      "Este site destina-se a contratações empresariais. Não coletamos intencionalmente dados de crianças ou adolescentes. Se identificarmos tal coleta, eliminaremos os dados assim que comunicados.",
    ],
  },
  {
    title: "12. Alterações desta política",
    paragraphs: [
      "Podemos atualizar este documento para refletir mudanças legais, operacionais ou de produto. A versão vigente fica publicada nesta página, com data da última atualização abaixo.",
      "Alterações que reduzam proteções existentes serão comunicadas aos clientes por canal contratual.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div id="conteudo">
      <JsonLd
        data={[
          buildBreadcrumb([{ name: "Política de privacidade", url: "/politica-de-privacidade" }]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Privacidade",
            url: `${site.url}/politica-de-privacidade`,
            inLanguage: "pt-BR",
            isPartOf: { "@id": `${site.url}/#website` },
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <Section tone="light" className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-5 text-[2rem] font-extrabold leading-tight text-navy-900 sm:text-[2.4rem]">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-[1.05rem] leading-7 text-ink-soft">
            Última atualização:{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date())}
            . Esta política se aplica ao site {site.name.replace(/^https?:\/\//, "")} e aos
            canais de contato por ele iniciados.
          </p>

          <div className="mt-8 rounded-2xl border border-tech-200 bg-tech-50 p-5 text-sm leading-6 text-navy-800">
            <p className="font-semibold text-navy-900">Resumo em uma linha</p>
            <p className="mt-1.5">
              Coletamos o mínimo para responder seu contato, não vendemos dados, você
              controla cookies de análise e pode pedir acesso, correção ou exclusão a
              qualquer momento pelo e-mail{" "}
              <a href={mailLink} className="font-semibold underline">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div className="prose-article mt-10">
            {sections.map((section) => (
              <section key={section.title} id={section.title.slice(0, 2).trim()}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-navy-100 bg-surface p-6 text-sm leading-6 text-ink-soft">
            <p className="font-semibold text-navy-900">Aviso de implementação</p>
            <p className="mt-2">
              Este texto é um modelo profissional de referência para um site de serviços de
              tecnologia brasileiro. Antes da publicação do domínio definitivo, submeta a
              política à revisão de seu jurídico ou DPO, confirme as bases legais aplicáveis
              ao seu contrato e preencha os dados da empresa marcados como TODO em{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
                src/lib/site.ts
              </code>
              .
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
