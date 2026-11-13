# 01 — Wireframes textuais

Especificação seção por seção de todas as páginas: **ordem**, **objetivo de conversão**,
**conteúdo (com a fonte no código)** e **comportamento mobile**.

Convenções: grade de 12 colunas, container `max-w-container` (1216px), ritmo vertical
`.section-py` (64/80/112px). Breakpoints: mobile < 640px, `sm` ≥ 640, `lg` ≥ 1024.
Cores/tipografia em `docs/03-style-guide.md`; textos-mestre em `docs/02-mapa-de-mensagens.md`.

```
┌──────────────────────────────────────────────────────────────┐
│ Header fixo: logo | Soluções▾ | Cases Blog Sobre Contato     │
│              | telefone | CTA "Solicitar orçamento"          │
├──────────────────────────────────────────────────────────────┤
│ 01 Seção escura (gradiente) — hero / page hero              │
│ 02..N  claras e surface, alternando fundo                    │
│ N  CTA final com formulário                                  │
├──────────────────────────────────────────────────────────────┤
│ Footer navy-950: selos | colunas 4/5/3 | barra legal         │
└──────────────────────────────────────────────────────────────┘
  Flutuantes: WhatsApp (desktop) · barra WhatsApp+Ligar (mobile)
  · pop-up de saída · banner de cookies (só com analytics ativo)
```

Componentes globais, renderizados em todas as páginas por `src/app/layout.tsx`:

| Bloco | Arquivo | Papel de conversão |
|---|---|---|
| Header + mega menu + drawer | `src/components/layout/header.tsx` | navegação por serviço; CTA persistente |
| Footer (4/5/3) | `src/components/layout/footer.tsx` | SEO local, links de serviço, WhatsApp, Calendly |
| WhatsApp flutuante | `src/components/layout/conversion-widgets.tsx` (`WhatsAppFloat`) | escape de conversa em desktop |
| Barra fixa mobile | idem (`MobileCtaBar`) | mantém WhatsApp + Ligar sempre tocáveis |
| Pop-up de saída | idem (`ExitIntentPopup`) | recupera visita que vai embora |
| Consentimento + pixels | `src/components/layout/tracking.tsx` | LGPD; carrega GA4/GTM/Meta após aceite |
| Formulário de lead | `src/components/forms/lead-form.tsx` | captura reutilizada em CTA final, contato, exit-intent |

---

## HOME (`/`)

Ordem fixa definida em `src/app/page.tsx`.

**01 — Hero** · objetivo: declarar a proposta dupla (TI + digital) e captar intenção em 5s
- Conteúdo: eyebrow; H1 "Infraestrutura de TI sólida e presença digital que converte.";
  subtítulo; dois CTAs (`Solicitar orçamento gratuito` → `/contato`; `Falar no WhatsApp` →
  mensagem `orcamento` de `src/lib/site.ts`); microcopy "Resposta em até 1 hora útil ·
  Diagnóstico sem compromisso"; faixa de 4 números (`src/data/home.ts` → `stats`); avatares +
  nota 4,9/5; painel visual com 4 chips de status e selos (`site.certifications`).
  Fonte: `src/components/sections/home-hero.tsx`.
- Mobile: coluna única (texto acima do visual), CTAs empilhados em largura cheia, números em
  2×2 (4 em linha a partir de `sm`), chip flutuante "-1 contrato" oculto abaixo de `sm`.

**02 — Barra de logos e selos** · objetivo: baixar o risco percebido antes de explicar o serviço
- Conteúdo: `trustSeals` de `src/data/home.ts` + faixa rolante com os 8 clientes de
  `site.clients` (nomes PLACEHOLDER; SVGs reais vão em `public/clients/<slug>.svg`).
  Fonte: `src/components/sections/trust-bar.tsx`.
- Mobile: rolagem horizontal sem barra (`no-scrollbar`), animação `marquee` desligada em
  movimento reduzido; selos em duas linhas.

**03 — Soluções (duas frentes)** · objetivo: segmentar a intenção (infra × digital)
- Conteúdo: dois painéis — Consultoria/Infraestrutura e Desenvolvimento Digital — com os cards
  dos 5 e 3 serviços de `src/data/catalog.ts` (ícone, `navLabel`, `name`, link para a landing)
  e CTA "Ver frente". Fonte: `src/components/sections/solutions.tsx`.
- Mobile: painéis empilhados; cards 1 coluna (2 em `sm`); área de toque ≥ 44px.

**04 — Diferenciais** · objetivo: justificar a troca de fornecedor
- Conteúdo: 6 cards de `home.ts` → `differentials` (título, descrição, linha de prova).
  Fonte: `src/components/sections/differentials.tsx`.
- Mobile: 1 coluna, 2 em `sm`; entrada escalonada via `RevealGroup` em `src/components/ui/reveal.tsx`.

**05 — Como trabalhamos** · objetivo: tornar o processo tangível (reduz medo de contratar)
- Conteúdo: 5 etapas de `home.ts` → `processSteps` — Diagnóstico, Proposta, Execução,
  Acompanhamento, Suporte — com duração e entregável por etapa; âncora `#como-trabalhamos`
  usada no menu. Fonte: `src/components/sections/process.tsx`.
- Mobile: stepper vertical com linha de conexão; duração e entregável em linhas próprias.

**06 — Números** · objetivo: autoridade quantificada
- Conteúdo: os 4 `stats` com contador animado (`src/components/ui/counter.tsx`) e descrição.
  Fonte: `src/components/sections/stats-band.tsx`.
- Mobile: 2×2; valor final exibido de imediato com `prefers-reduced-motion`.

**07 — Depoimentos** · objetivo: prova social por setor igual ao do visitante
- Conteúdo: 5 depoimentos de `home.ts` → `testimonials` (citação, autor, cargo, empresa, setor,
  iniciais como avatar). Fonte: `src/components/sections/testimonials.tsx`.
- Mobile: trilho horizontal com scroll-snap e `no-scrollbar`, um card e meio visíveis.

**08 — Cases (prévia)** · objetivo: levar ao portfólio com resultado mensurável
- Conteúdo: 3 itens de `home.ts` → `cases` (título, setor, problema → solução → resultado,
  3 métricas) + link `/cases`. Fonte: `src/components/sections/cases-preview.tsx`.
- Mobile: 1 coluna; métricas em 3 mini-colunas.

**09 — FAQ** · objetivo: tratar objeções e capturar rich snippets
- Conteúdo: as 10 perguntas de `home.ts` → `homeFaq` em accordion + card lateral "Também
  publicamos" (cases, blog, sobre) + CTA de WhatsApp. Fonte:
  `src/components/sections/faq-section.tsx` e `src/components/ui/accordion.tsx`.
- Mobile: accordion em largura total, card lateral abaixo, um item aberto por vez.

**10 — CTA final** · objetivo: última captura antes do rodapé
- Conteúdo: bloco escuro com headline de fechamento, subtítulo, formulário compacto
  (`lead-form.tsx`) e CTAs de WhatsApp e agendamento (`site.calendlyUrl`).
  Fonte: `src/components/sections/final-cta.tsx`.
- Mobile: formulário em coluna, CTA em largura cheia, microcopy de LGPD visível.

**11 — Footer** · objetivo: SEO local + rotas de saída — ver componente global.

---

## `/infraestrutura` e `/desenvolvimento` (hubs de frente)

Ambas renderizadas por `HubPage` (`src/components/sections/hub-page.tsx`), com copy local no
mapa `hubCopy` do mesmo arquivo (eyebrow, título, subtítulo, bullets, intro, FAQ e `purpose`
do formulário) e metadados em `src/app/infraestrutura/page.tsx` / `src/app/desenvolvimento/page.tsx`.

**01 — PageHero** · confirmar que a frente certa foi escolhida
- Conteúdo: breadcrumbs, eyebrow, H1, subtítulo, bullets de prova, CTA primário + WhatsApp,
  microcopy de resposta e painel visual (`visual="infra"` ou `"dev"`).
  Fonte: `src/components/sections/page-hero.tsx`.
- Mobile: H1 32,8px, CTAs empilhados, visual removido abaixo de `lg`.

**02 — Introdução da frente** · enquadramento executivo antes da lista
- Conteúdo: `hubCopy[category].introTitle` + `introText`. Fonte: `hub-page.tsx`.
- Mobile: bloco de texto único, sem colunas.

**03 — Grade de serviços da frente** · levar à landing certa
- Conteúdo: cards de `servicesOfCategory(category)` (`src/data/catalog.ts`).
  Fonte: grade interna de `hub-page.tsx`.
- Mobile: 1 → 2 (`sm`) → 3 (`lg`) colunas.

**04 — Como trabalhamos** · mesmo processo aplicado à frente
- Conteúdo: reuso de `ProcessSection`. Fonte: `src/components/sections/process.tsx`.
- Mobile: stepper vertical.

**05 — FAQ da frente** · objeções específicas (cobertura, contrato, urgência)
- Conteúdo: `hubCopy[category].faq` + `faqSchema` de `src/lib/seo.ts`.
- Mobile: accordion full-width.

**06 — CTA final** · captura com `purpose` da frente (rastreável no lead)
- Conteúdo: reuso de `FinalCta`. Mobile: idem à home.

---

## As 8 landing pages de serviço

`/consultoria-ti`, `/servidores-e-cloud`, `/redes-e-firewall`, `/backup-e-seguranca`,
`/suporte-ti-empresas`, `/criacao-de-sites`, `/landing-pages`, `/aplicativos-mobile`.

Mesma estrutura para as oito: `ServiceTemplate`
(`src/components/sections/service-template.tsx`) alimentado por um objeto de
`src/data/services.ts` (5 infra) ou `src/data/services.dev.ts` (3 dev). A rota
`src/app/[slug]/page.tsx` gera tudo no build (`generateStaticParams`, `dynamicParams = false`).

| # | Seção | Objetivo de conversão | Conteúdo (campo do objeto de dados) | Mobile |
|---|---|---|---|---|
| 01 | PageHero | qualificar a intenção e dar prova em 5s | `eyebrow`, `h1`, `subtitle`, `heroBullets`, CTA `/contato`, CTA WhatsApp, breadcrumbs | H1 32,8px; bullets empilhados; sem visual abaixo de `lg` |
| 02 | Dor | fazer o visitante se reconhecer | `pain.title`, `pain.body`, `pain.items` (5 sintomas) | 1 coluna com marcadores |
| 03 | Solução | apresentar o método | `solution.title`, `solution.body` | texto + card de resumo |
| 04 | O que entregamos | tangibilizar escopo | `deliverables` (6 itens: ícone, título, descrição) | 1 → 2 → 3 colunas |
| 05 | Resultados | provar com números | `results` (3 métricas) | métrica em destaque, empilhada |
| 06 | Prova social | reduzir risco | `proof.quote` + `author`, `role`, `company` | citação maior, autor abaixo |
| 07 | FAQ | remover objeções + snippet | `faq` (4–5 pares) com `faqSchema` | accordion |
| 08 | Relacionados | cross-sell e sessão | `related` (3 slugs) | trilho horizontal |
| 09 | CTA final | captura contextual | `cta.title`, `cta.subtitle`, `cta.microcopy` + formulário com `purpose` = slug | CTA largura cheia |

A única diferença entre as 8 páginas está nos dados — decisão de projeto para manter
consistência de conversão com um único template para todo o conjunto.

---

## `/sobre` (`src/app/sobre/page.tsx`)

**01 — PageHero**: quem somos, sem visual, breadcrumbs. **02 — História**: linha do tempo a
partir de `site.foundedYear` (`src/lib/site.ts`) e marcos editáveis. **03 — Como trabalhamos**:
reuso de `ProcessSection`. **04 — Time e certificações** (âncora `#time`, linkada no footer):
`site.certifications` + cards de pessoas (nome, cargo, especialidade, foto) — dados a
preencher. **05 — Números**: reuso de `stats`. **06 — Cases**: prévia com link `/cases`.
**07 — Dúvidas sobre contratação** + **08 — CTA final** com `purpose="sobre"`.
Mobile: linha do tempo vertical, cards de time em coluna, `scroll-mt-20` nas âncoras.

## `/cases` (`src/app/cases/page.tsx`)

**01 — PageHero** (prova de capacidade). **02 — Filtros por categoria** (`infra`, `seguranca`,
`cloud`, `web`, `apps`) como chips com `?categoria=` para URL indexável. **03 — Grade de
cases**: todos os itens de `home.ts` → `cases` com problema → solução → resultado e 3 métricas.
**04 — Conversão** "Seu case pode ser o próximo", com formulário `purpose="cases"` e WhatsApp.
**05 — Footer**. Mobile: filtros em trilho `no-scrollbar`; cards empilhados; métricas compactas.

## `/blog` (`src/app/blog/page.tsx`)

**01 — PageHero**. **02 — Destaque**: `featuredPost` de `src/data/blog.ts`, com categoria,
data e excerpt. **03 — Filtros** por `postCategories` (Infraestrutura, Segurança, Nuvem,
Digital, Gestão). **04 — Grade de posts**: título, excerpt, categoria, data (`formatDate` de
`src/lib/utils.ts`), tempo de leitura (`readingTime`) e autor. **05 — CTA de contato** com
`purpose="blog"`. Mobile: 1 coluna, filtros em trilho. Ordenação por data decrescente já é
resolvida em `src/data/blog.ts`.

## `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`)

**01 — Breadcrumbs + categoria + data + leitura**. **02 — H1 e excerpt**. **03 — Autor** (nome
e cargo do post). **04 — Corpo** renderizado de `blocks` (`p`, `h2`, `h3`, `ul`, `quote`)
dentro de `.prose-article`. **05 — FAQ do artigo** (`faq`, quando existir) com `faqSchema`.
**06 — CTAs intermediários** (WhatsApp + formulário `purpose="blog-<slug>"`).
**07 — Serviços relacionados** (`related`). **08 — Outros artigos** (`relatedPosts` de
`src/data/blog.ts`). **09 — Metadados** `type="article"` com `publishedTime` e `authors` via
`buildMetadata` (`src/lib/seo.ts`). Mobile: corpo `max-w-3xl`, 17px/1,64; barra fixa mantém o
WhatsApp acessível.

## `/contato` (`src/app/contato/page.tsx`)

**01 — PageHero** curto (a página já é o CTA). **02 — Formulário principal**: nome, empresa,
e-mail, telefone, serviço, mensagem, com `purpose="contato"`, honeypot, microcopy de SLA e
link da política. Fonte: `src/components/forms/lead-form.tsx`. **03 — Canais alternativos**:
WhatsApp (`waLink`), telefone (`telLink`), e-mail (`mailLink`) e agendamento
(`site.calendlyUrl`). **04 — Endereço e horário**: `site.address` (rua, bairro, cidade/UF,
CEP), `site.hours`, `site.serviceAreas` e mapa. **05 — Prova social compacta**: selos e
números. Mobile: formulário acima dos dados; a barra fixa não cobre o botão porque o layout
reserva 80px de altura (`div` com `h-20 lg:hidden` em `src/app/layout.tsx`).

## `/politica-de-privacidade` (`src/app/politica-de-privacidade/page.tsx`)

**01 — PageHero** discreto. **02 — Corpo** em `.prose-article`: controlador, dados coletados
(formulário, cookies de análise, logs), base legal (legítimo interesse para contato comercial;
consentimento para métricas), finalidades, compartilhamento (CRM, e-mail, analytics), retenção,
direitos do titular e canal de solicitação, transferências internacionais, encarregado/DPO,
alterações e data de revisão. **03 — Links úteis** (contato, WhatsApp). **04 — Footer**.
Nada de CTA agressivo aqui — é página de confiança. Mobile: índice de seções colapsado acima
do texto, âncoras com `scroll-mt-20`.

## `/obrigado` (`src/app/obrigado/page.tsx`)

Destino pós-envio (e página de conversão de campanhas). Bloco único: confirmação, prazo de
resposta ("até 1 hora útil"), botão de WhatsApp com `waMessages.obrigado`, agendamento
(`site.calendlyUrl`) e dois links de conteúdo (um case, um artigo), além dos próximos passos em
quatro etapas. Já nasce com `noindex: true` no `buildMetadata` da própria página e é excluída do
rastreamento de conteúdo pelo `disallow` de
conteúdo pelo `disallow` de `src/app/robots.ts`. Mobile: coluna única, CTAs full-width.

---

## Estados transversais exigidos pelo wireframe

| Estado | Onde | Comportamento |
|---|---|---|
| Enviando | `lead-form.tsx` | botão desabilitado com spinner "Enviando…" |
| Sucesso | `lead-form.tsx` | bloco verde com mensagem do servidor + WhatsApp + "Enviar outra mensagem" |
| Erro de rede/validação | `lead-form.tsx` + `src/app/api/lead/route.ts` | `role="alert"` com mensagem e atalho de WhatsApp |
| Rate limit (429) | `route.ts` | "Muitas tentativas em sequência…" |
| Drawer aberto | `header.tsx` | scroll do body travado, painel com 88% da largura, fecha ao trocar de rota |
| Banner de cookies | `tracking.tsx` | surge 1,6s após o load, apenas se houver ID de analytics |
| Âncora interna | `Section` (`ui/layout.tsx`) | `scroll-mt-20` + rolagem suave (auto com movimento reduzido) |
