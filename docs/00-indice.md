# 00 — Índice da documentação

Documentação do site institucional **Pers Web Digital** (Next.js 14 App Router + TypeScript +
Tailwind CSS), construído para geração de leads de consultoria de TI, infraestrutura e
desenvolvimento digital. Este pacote atende aos oito entregáveis pedidos no briefing
(wireframes, copy, style guide, código, formulários/integrações, SEO on-page, checklist de
lançamento e documentação de uso).

## Entregáveis

| Documento | O que responde | Para quem |
|---|---|---|
| [01 — Wireframes textuais](./01-wireframes.md) | Ordem, objetivo de conversão, conteúdo e comportamento mobile de cada seção de todas as páginas | Design, conteúdo, dev |
| [02 — Mapa de mensagens](./02-mapa-de-mensagens.md) | Headline, sub, CTA, microcopy e prova social por página; framework DOR → SOLUÇÃO → RESULTADO; tom de voz; onde cada texto mora no código | Marketing, copy, direção |
| [03 — Style guide](./03-style-guide.md) | Paleta com hex, tipografia, escala, espaçamento, raios, sombras, grid, componentes, botões, foco acessível e movimento reduzido | Dev, design |
| [04 — Arquitetura e conteúdo](./04-arquitetura-e-conteudo.md) | Estrutura de pastas real, conteúdo data-driven, SSG, templates e receitas para criar serviço, case e post | Dev, manutenção |
| [05 — Formulários e integrações](./05-formularios-e-integracoes.md) | Campos, validação Zod, honeypot, `/api/lead`, rate limit, CRM/webhook/e-mail, Calendly, WhatsApp, variáveis de ambiente e eventos de conversão | Dev, RevOps |
| [06 — SEO on-page](./06-seo-on-page.md) | Tabela URL → title → description → intenção, Schema.org por tipo, sitemap/robots/canonical, OG, SEO local e performance | SEO, conteúdo |
| [07 — Checklist de lançamento](./07-checklist-lancamento.md) | Domínio/DNS/SSL, env, analytics, Search Console, LGPD, testes, acessibilidade, performance, segurança, monitoramento e pós-lançamento | Projeto/gestor |
| [08 — Guia de uso](./08-guia-de-uso.md) | Manual do cliente: onde trocar cada texto, como eliminar os placeholders, publicar post/case, trocar imagens e fazer deploy | Cliente, time interno |

## Como navegar

Comece pelo **08** se você vai apenas editar textos; pelo **07** se vai publicar; pelo **04** se
vai estender o site (novo serviço, case, artigo) e pelo **03** sempre que criar um componente.
Os documentos não se duplicam por design: o **02** registra a mensagem-mestre e aponta o arquivo
de código onde ela vive; o **01** define a estrutura da tela; o **06** define como cada página
aparece no Google.

## Fatos que atravessam todos os documentos

- Conteúdo é dado, não JSX: mensagens vêm de `src/lib/site.ts`, `src/data/home.ts`,
  `src/data/services.ts`, `src/data/services.dev.ts`, `src/data/catalog.ts`,
  `src/data/posts.ts`, `src/data/posts.more.ts` e `src/data/blog.ts`.
- Design tokens ficam em `tailwind.config.ts` e `src/app/globals.css`; componentes de interface
  em `src/components/ui/`; blocos de página em `src/components/sections/`; moldura global em
  `src/components/layout/`.
- Leads: `src/components/forms/lead-form.tsx` → `src/app/api/lead/route.ts` (Zod, honeypot, rate
  limit, webhook/HubSpot/Resend). Rastreio: `src/lib/analytics.ts` + `src/components/layout/tracking.tsx`
  (só com consentimento).
- SEO: `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` e `src/components/seo/json-ld.tsx`.
- Dados cadastrais, depoimentos, cases e métricas ainda marcados como `TODO`/`PLACEHOLDER` no
  código **não são reais**. Antes de publicar: `grep -rn "TODO" src/` e
  `grep -rn "PLACEHOLDER" src/` (instruções no `docs/08-guia-de-uso.md`).

## Convenções desta documentação

Português do Brasil, tom consultivo e direto. Caminhos de arquivo são relativos à raiz do
repositório (`/home/ubuntu/pers-web-digital`). Nenhum dado do cliente foi inventado: telefone,
CNPJ, endereço, certificações, clientes e depoimentos permanecem "a configurar" até a troca dos
placeholders.
