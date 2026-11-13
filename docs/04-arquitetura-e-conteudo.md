# 04 — Arquitetura e conteúdo

Como o site é montado, de onde vem cada texto e o que fazer para adicionar serviço, case ou
artigo sem mexer em componente.

## 1. Stack real (lida de `package.json`)

| Camada | Item | Versão |
|---|---|---|
| Framework | Next.js (App Router) | `14.2.33` |
| Linguagem | TypeScript | `^5` |
| Estilo | Tailwind CSS | `^3.4.1` |
| Variantes de componente | class-variance-authority | `^0.7.1` |
| Merge de classes | clsx + tailwind-merge (helper `cn`) | — |
| Animação | framer-motion | `^14.13.0` |
| Ícones | lucide-react (via mapa próprio, `src/components/ui/icon.tsx`) | — |
| Formulário | react-hook-form + zod + @hookform/resolvers | `^7` / `^4.6.7` / `^7.0.6` |
| Imagens | sharp (otimização no build) | `^0.35.5` |
| Deploy | Vercel (`next build` / `next start`) | — |

Não há CMS, banco de dados nem autenticação: todo o conteúdo é código-fonte versionado.

## 2. Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx               # shell: fontes, header/footer, widgets, Schema Organization, metadata base
│   ├── page.tsx                 # HOME — ordem das 10 seções + WebSite e FAQPage em JSON-LD
│   ├── globals.css              # design system (.container-site, .card-base, .section-py, .prose-article…)
│   ├── [slug]/page.tsx          # 8 landing pages de serviço (SSG, dynamicParams = false)
│   ├── infraestrutura/page.tsx  # hub da frente A (HubPage category="infra")
│   ├── desenvolvimento/page.tsx # hub da frente B (HubPage category="dev")
│   ├── sobre/page.tsx           # história, valores, time e certificações
│   ├── cases/page.tsx           # portfólio com filtro por categoria
│   ├── blog/page.tsx            # listagem + destaque, a partir de blog.ts
│   ├── blog/[slug]/page.tsx     # artigo: blocks renderizados em .prose-article
│   ├── contato/page.tsx         # formulário completo + canais + endereço
│   ├── politica-de-privacidade/page.tsx  # seções de texto + breadcrumb
│   ├── obrigado/page.tsx        # pós-envio, com noindex: true
│   ├── not-found.tsx            # 404 com CTA
│   ├── robots.ts                # MetadataRoute.Robots (bloqueio em preview, sitemap, disallow /api/)
│   ├── sitemap.ts               # MetadataRoute.Sitemap gerado do catálogo e dos posts
│   └── api/lead/route.ts        # POST serverless: Zod, rate limit, webhook/HubSpot/Resend
├── components/
│   ├── forms/lead-form.tsx      # formulário reutilizável (purpose, compact, tone, ctaLabel)
│   ├── layout/                  # header, footer, conversion-widgets, tracking
│   ├── sections/                # home-hero, trust-bar, solutions, differentials, process,
│   │                            # stats-band, testimonials, cases-preview, faq-section,
│   │                            # final-cta, page-hero, service-template, hub-page
│   ├── seo/json-ld.tsx          # <JsonLd data={…} />
│   └── ui/                      # button, icon, logo, layout (Section/Container/Divider),
│                                # section-heading, accordion, breadcrumbs, counter, reveal
├── data/
│   ├── services.ts              # 5 serviços infra + interface ServiceContent
│   ├── services.dev.ts          # 3 serviços dev (mesmo contrato de ServiceContent)
│   ├── catalog.ts               # consolida, indexa e consulta os 8 serviços
│   ├── home.ts                  # differentials, processSteps, stats, testimonials, cases, homeFaq, trustSeals
│   ├── posts.ts                 # tipos Post/Block + artigos núcleo (corePosts)
│   ├── posts.more.ts            # extraPosts — artigos adicionais
│   └── blog.ts                  # índice: junta, deduplica por slug e ordena por data
└── lib/
    ├── site.ts                  # marca, contatos, endereço, nav, clients, certifications, waMessages
    ├── seo.ts                   # buildMetadata, buildBreadcrumb, faqSchema, organizationSchema, serviceSchema
    ├── analytics.ts             # track() para GA4/GTM/Meta e o tipo LeadEvent
    ├── utils.ts                 # cn, waLink, telLink, mailLink, slugify, formatDate, readingTime, absoluteUrl
    └── layout-helpers.ts        # defaultOgImageSafe + absoluteUrlFromSite
```

Estado atual das rotas: todas as URLs do sitemap têm arquivo próprio em `src/app/`. As páginas
internas (`sobre`, `cases`, `blog`, `blog/[slug]`, `contato`, `politica-de-privacidade`,
`obrigado`) compõem-se com os mesmos blocos de `src/components/` (`PageHero`, `Section`,
`LeadForm`, `JsonLd`, `buildMetadata`), e o 404 tem página própria (`not-found.tsx`). Cada
página nova segue a mesma receita: pasta com `page.tsx`, `generateMetadata()` chamando
`buildMetadata()` e conteúdo vindo de arquivo de dados — nunca texto solto em JSX quando o
trecho é editável pelo cliente.

## 3. Conteúdo é dado, não JSX

Princípio do projeto: **componente define estrutura; arquivo de dados define mensagem.**

- `src/data/services.ts` exporta `ServiceContent`; `src/data/services.dev.ts` reusa esse tipo.
  Os 8 serviços têm exatamente os mesmos campos, o que permite um único template.
- `src/data/catalog.ts` agrega e expõe `services`, `serviceSlugs`, `getService`,
  `servicesOfCategory`, `infraServicesList`, `devServicesList`. Página nenhuma importa
  `services.ts`/`services.dev.ts` diretamente.
- `src/data/home.ts` é a home inteira em arrays (`differentials`, `processSteps`, `stats`,
  `testimonials`, `cases`, `homeFaq`, `trustSeals`); os componentes de `sections/` só mapeiam.
- `src/lib/site.ts` (`site`) é a fonte única de marca, contatos, endereço, `nav`, `clients` e
  `certifications`; `waMessages`, no mesmo arquivo, centraliza as mensagens pré-preenchidas.
- `src/data/blog.ts` é o índice do blog: junta `corePosts` + `extraPosts`, deduplica por slug,
  ordena por data e expõe `getPost`, `featuredPost`, `postCategories`, `relatedPosts`.
- Ícones viajam como **string** (`IconKey`), não como componente: os dados continuam
  serializáveis e podem alimentar Client Components sem erro de hidratação.

Fluxo de uma landing de serviço:

```
services.ts ─────┐
                 ├→ catalog.ts → app/[slug]/page.tsx → generateStaticParams()
services.dev.ts ─┘                                            ↓
                                    ServiceTemplate(slug) → serviceSchema / faqSchema / buildBreadcrumb
                                            ↓
                              LeadForm (purpose = slug) → /api/lead
```

## 4. Renderização: SSG, SSR e o porquê de não haver CMS

| Tipo | Onde | Como renderiza |
|---|---|---|
| Estático (SSG) | home, hubs, landings de serviço | `next build` gera o HTML; a CDN serve sem servidor de origem. As landings usam `generateStaticParams()` com `dynamicParams = false`: slug fora do catálogo vira 404, nunca página órfã indexável |
| Estático em build | `sitemap.ts`, `robots.ts` | viram `/sitemap.xml` e `/robots.txt` gerados dos mesmos dados do site |
| Dinâmico | `api/lead/route.ts` | função serverless por requisição; valida com Zod no servidor |
| Client Components | `header`, `tracking`, `conversion-widgets`, `lead-form`, `accordion`, `counter`, `reveal`, `button` | marcados com `"use client"`; são ilhas pequenas sobre páginas de servidor |

Por que não CMS: (1) o catálogo tem 8 serviços e muda por trimestre, não por dia; (2) SSG puro
sustenta Lighthouse ≥ 90 sem chamada a API externa no tempo de render; (3) conteúdo versionado
em Git dá revisão, rollback e paridade entre preview e produção; (4) quem edita é o time do
site, com `docs/08-guia-de-uso.md` como manual. Um CMS passa a valer a pena quando a cadência
de publicação é semanal e o autor não tem acesso ao repositório.

## 5. Receitas (copiáveis)

### 5.1 Novo serviço

Adicione um objeto ao array `services` em `src/data/services.ts` (frente A) ou a `devServices`
em `src/data/services.dev.ts` (frente B). Rota, menu do header/footer, sitemap, select do
formulário e Schema.org se ajustam sozinhos.

```ts
// src/data/services.ts — dentro do array `services`
{
  slug: "monitoramento-24-7",           // vira /monitoramento-24-7 (kebab-case, sem acento)
  category: "infra",                    // "infra" | "dev"
  name: "Monitoramento 24/7 com NOC",
  navLabel: "Monitoramento 24/7",       // menu, footer e select do formulário
  serviceType: "Managed Monitoring Service", // vai para o Schema.org Service
  icon: "activity",                     // precisa existir em src/components/ui/icon.tsx
  seoTitle: "Monitoramento 24/7 com NOC para PMEs | Pers Web Digital",
  seoDescription: "NOC 24/7 com Zabbix e Grafana, alertas em tempo real, runbook e SLA de resposta.",
  keywords: ["monitoramento de servidores", "noc 24 horas"],
  eyebrow: "Operação contínua",
  h1: "Você dorme. O ambiente é vigiado.",
  subtitle: "Alerta antes da reclamação: monitoramento de servidores, rede, serviços e sites.",
  heroBullets: ["Coleta a cada 5 minutos", "Runbook por incidente", "Relatório mensal"],
  pain: { title: "…", body: "…", items: ["…", "…", "…", "…", "…"] },
  solution: { title: "…", body: "…" },
  deliverables: [{ icon: "activity", title: "…", description: "…" }], // 6 itens
  results: [{ metric: "< 8 min", title: "…", description: "…" }],     // 3 itens
  proof: { quote: "…", author: "PLACEHOLDER", role: "…", company: "…" },
  faq: [{ question: "…", answer: "…" }],                              // 4 a 5 pares
  cta: { title: "…", subtitle: "…", microcopy: "…" },
  related: ["servidores-e-cloud", "suporte-ti-empresas"],             // slugs existentes
  audience: "PMEs com operação crítica dependente de TI",
}
```

Checklist: o `slug` não pode colidir com rota existente (`/sobre`, `/blog`, `/contato`…);
`related` deve apontar para slugs reais; rode `npm run build` e abra `/monitoramento-24-7` e
`/sitemap.xml` — com `dynamicParams = false`, dado malformado aparece como 404 no build local.

### 5.2 Novo case

Cases vivem no array `cases` de `src/data/home.ts`, tipado por `CaseCard`. A home usa uma
prévia (`src/components/sections/cases-preview.tsx`); a listagem completa fica em `/cases`,
filtrada por `category`.

```ts
// src/data/home.ts — dentro do array `cases`
{
  slug: "varejo-cinco-lojas-em-nuvem",
  title: "Cinco lojas de varejo consolidadas em rede e nuvem com SLA",
  company: "Nome do cliente real",       // PLACEHOLDER até ter autorização por escrito
  sector: "Varejo",
  category: "cloud",                     // "infra" | "seguranca" | "cloud" | "web" | "apps"
  problem: "…",
  solution: "…",
  result: "…",
  metrics: [
    { value: "-32%", label: "custo de ponto de venda" },
    { value: "0 h", label: "de parada na Black Friday" },
    { value: "4 sem.", label: "de implantação" },
  ],
  services: ["Servidores e Cloud", "Redes e Firewall", "Suporte TI Empresas"],
  duration: "8 semanas",
}
```

### 5.3 Novo post do blog

Artigos novos entram em `src/data/posts.more.ts` (array `extraPosts`). `src/data/blog.ts` junta
com `corePosts`, remove slug repetido e ordena por `date`. O corpo é uma lista de blocos
discriminados — sem MDX, sem parser.

```ts
// src/data/posts.more.ts — dentro do array `extraPosts`
{
  slug: "como-calcular-o-custo-de-um-chamado-de-ti",
  title: "Como calcular o custo real de um chamado de TI",
  excerpt: "Tempo parado × pessoas afetadas × hora de trabalho: a conta que justifica o contrato.",
  category: "Gestão",                    // "Infraestrutura" | "Segurança" | "Nuvem" | "Digital" | "Gestão"
  tags: ["SLA", "custo de TI"],
  date: "2026-11-10",                    // ISO: define ordem, sitemap e publishedTime do Open Graph
  author: "Equipe Pers Web Digital",
  role: "Consultoria de gestão",
  icon: "wallet",
  related: ["suporte-ti-empresas", "consultoria-ti"],
  featured: false,                       // destaque é opcional; se dois tiverem featured, vence o primeiro
  faq: [{ question: "…", answer: "…" }], // opcional: vira accordion + FAQPage
  blocks: [
    { t: "p", v: "Primeiro parágrafo…" },
    { t: "h2", v: "A fórmula em três fatores" },
    { t: "ul", v: ["Fator 1…", "Fator 2…"] },
    { t: "quote", v: "Ninguém aumenta contrato por amor ao fornecedor; aumenta por medo da parada." },
    { t: "h3", v: "Exemplo numérico" },
    { t: "p", v: "…" },
  ],
}
```

Variações de bloco aceitas por `Block` (`src/data/posts.ts`): `p`, `h2`, `h3`, `ul`, `quote`.
Links internos no corpo para a landing do serviço citado são obrigatórios — é o que sustenta o
topic cluster descrito em `docs/06-seo-on-page.md`.

## 6. Convenções de código

1. **Alias `@/`** (`tsconfig.json` → `paths`): importar de `@/lib/…`, `@/data/…`,
   `@/components/…`; sem `../../`.
2. **Server Components por padrão**; `"use client"` só no que interage.
3. **`export function Nome`** para componentes; `export default` reservado a rotas e `layout`.
4. **Arquivos de dados não importam componentes**, exceto `import type { IconKey }`.
5. **Tipo exportado junto do dado**: `ServiceContent`/`ServiceCategory` (`services.ts`),
   `Post`/`Block` (`posts.ts`), `Differential`, `ProcessStep`, `Stat`, `Testimonial`,
   `CaseCard` (`home.ts`).
6. **`as const`** em `src/lib/site.ts` dá autocomplete nos itens de `nav` e nas chaves de `waMessages`.
7. **Classes compostas com `cn()`** (`src/lib/utils.ts`) para permitir override do chamador.
8. **Metadados sempre por `buildMetadata()`** (`src/lib/seo.ts`); artigo passa
   `type: "article"`, `publishedTime` e `authors`; página temporária passa `noindex: true`.
9. **Eventos de conversão só via `track()`**, tipado por `LeadEvent` (`src/lib/analytics.ts`);
   em botão, preferir a prop `event`.
10. **Placeholders sinalizados**: `// TODO` em `src/lib/site.ts` (dados da empresa) e marcador
    `PLACEHOLDER` nos comentários de `home.ts`, `services.ts` e `services.dev.ts`.
    Inventário: `grep -rn "TODO" src/` e `grep -rn "PLACEHOLDER" src/`.
11. **Rotas em kebab-case, sem acento**, derivadas do campo `slug` (`slugify()` converte título).
12. **Acessibilidade no padrão, não no improviso**: `aria-expanded`/`aria-controls` em
    `accordion.tsx`, `aria-current` em `breadcrumbs.tsx`, skip link em `header.tsx`,
    `aria-invalid` e `role="alert"` em `lead-form.tsx`.

## 7. Scripts, build e ambiente

`npm run dev` (localhost:3000) · `npm run build` (gera o HTML estático e as imagens otimizadas)
· `npm run start` · `npm run lint` (`eslint-config-next`). Nenhuma variável de ambiente é
obrigatória para o build: sem analytics e sem chaves de lead, o site funciona por completo e
não carrega script de terceiros. A lista de chaves está em
`docs/05-formularios-e-integracoes.md`; o passo a passo de publicação, em `docs/08-...`.
