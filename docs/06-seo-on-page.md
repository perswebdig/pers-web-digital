# 06 — SEO on-page

Guia por página do que está implementado, de onde vem cada tag e do que ainda falta fazer.
Toda metadagem é gerada por `src/lib/seo.ts` → `buildMetadata()`; nenhuma página deve escrever
`<title>`/`<meta description>` à mão.

## 1. Arquitetura de metadados

| Camada | Arquivo | O que define |
|---|---|---|
| Base global | `src/app/layout.tsx` | `metadataBase` (`site.url`), `title.default` = `site.defaultTitle`, `title.template` = `%s \| Pers Web Digital`, description padrão, OG/Twitter padrão, ícones, manifest, `robots` index/follow, `google-site-verification` (via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), `viewport.themeColor` |
| Página | `generateMetadata()` de cada rota (`src/app/infraestrutura/page.tsx`, `src/app/desenvolvimento/page.tsx`, `src/app/[slug]/page.tsx`) | título, description, `keywords` e `path` (canonical) |
| Conteúdo de serviço | `seoTitle`, `seoDescription`, `keywords` em `src/data/services.ts` e `src/data/services.dev.ts` | copy de busca das 8 landings |
| Utilitários | `src/lib/seo.ts` + `absoluteUrl()` em `src/lib/utils.ts` | canonical absoluto, OG 1200×630, Twitter `summary_large_image`, `noindex` opcional |

O `| Pers Web Digital` final dos títulos das landings já vem escrito no dado, então o template
do layout não deve ser aplicado a elas (evita sufixo duplicado — revisar ao criar novas páginas).

## 2. Tabela mestre por página

Títulos e descriptions abaixo são os valores reais em código. Intenção = objetivo de busca que
a página atende.

| URL | Title | Meta description (resumo) | Intenção de busca |
|---|---|---|---|
| `/` | `site.defaultTitle` — "Pers Web Digital \| Consultoria de TI, Infraestrutura e Desenvolvimento" | `site.defaultDescription`: consultoria, servidores, redes, firewall, backup, sites, LPs, apps, TI gerenciada com SLA, diagnóstico gratuito | Navegacional + transacional de marca |
| `/infraestrutura` | "Consultoria de TI, Servidores, Redes, Firewall e Backup \| Pers Web Digital" | Frente de infraestrutura: consultoria, servidores Windows/Linux, redes, firewall, backup, LGPD, nuvem e suporte com SLA | Informacional/comercial ampla ("ti para empresas", "ti gerenciada") |
| `/desenvolvimento` | título da frente digital no `generateMetadata()` de `src/app/desenvolvimento/page.tsx` | Sites, landing pages e aplicativos com SEO e performance | Comercial ("empresa de criação de site", "desenvolvimento de aplicativo") |
| `/consultoria-ti` | "Consultoria em TI para PMEs \| Diagnóstico e Roadmap \| Pers Web Digital" | Diagnóstico técnico, inventário, roadmap 12–24 meses, redução de custos, primeira reunião gratuita | "consultoria em ti para pmes", "pdti", "diagnóstico de ti" |
| `/servidores-e-cloud` | "Gestão de Servidores e Nuvem (AWS, Azure, GCP) \| Pers Web Digital" | Windows Server/Linux, virtualização VMware/Proxmox/Hyper-V, migração e gestão em nuvem, monitoramento 24/7, SLA | "gestão de servidores", "migração para aws", "administração windows server" |
| `/redes-e-firewall` | "Redes Corporativas, Wi-Fi e Firewall Gerenciado \| Pers Web Digital" | LAN/WAN/VPN/Wi-Fi, firewall gerenciado, VLAN, SD-WAN e monitoramento | "firewall corporativo gerenciado", "wi-fi corporativo", "sd-wan" |
| `/backup-e-seguranca` | "Backup, Segurança da Informação e Adequação à LGPD \| Pers Web Digital" | Backup 3-2-1 imutável, testes de restauração, EDR, MFA, DR com RTO/RPO, LGPD | "backup para empresas", "ransomware", "lgpd pequenas empresas" |
| `/suporte-ti-empresas` | "Suporte de TI para Empresas com SLA \| Help Desk e NOC \| Pers Web Digital" | Help desk remoto/presencial, NOC 24/7, TI gerenciada mensal, chamados por WhatsApp | "suporte de ti para empresas", "ti gerenciada", "help desk terceirizado" |
| `/criacao-de-sites` | "Criação de Sites Profissionais e E-commerce \| Pers Web Digital" | Sites com conversão, design sob medida, SEO técnico, performance 90+, CRM e WhatsApp | "criação de sites", "site institucional para empresa" |
| `/landing-pages` | "Landing Pages de Alta Conversão para Tráfego Pago \| Pers Web Digital" | Pesquisa de mensagem, copy CRO, design, testes A/B, rastreamento, integração Ads/CRM | "landing page para tráfego pago", "empresa de landing pages" |
| `/aplicativos-mobile` | "Desenvolvimento de Aplicativos iOS e Android \| Pers Web Digital" | React Native, Flutter, Swift, Kotlin: discovery, MVP, API, publicação e manutenção | "desenvolvimento de aplicativo", "app para empresa" |
| `/sobre` | "Sobre a Pers Web Digital \| Time, História e Certificações" (`src/app/sobre/page.tsx`) | História, time, valores e forma de trabalhar | Autoridade / E-E-A-T |
| `/cases` | "Cases e Portfólio de Projetos de TI e Digital \| Pers Web Digital" (`src/app/cases/page.tsx`) | Problema → solução → resultado por setor | Consideração / prova |
| `/blog` | "Blog de TI e Negócios Digitais \| Pers Web Digital" (`src/app/blog/page.tsx`) | Artigos técnicos e de gestão | Informacional, topo de funil |
| `/blog/<slug>` | `` `${post.title} \| Blog ${post.category}` `` (`src/app/blog/[slug]/page.tsx`), com `type: "article"` | `excerpt` do post | Informacional de cauda longa |
| `/contato` | "Falar com um Consultor de TI \| Pers Web Digital" (`src/app/contato/page.tsx`) | Formulário, WhatsApp, telefone, agendamento | Transacional local |
| `/politica-de-privacidade` | "Política de Privacidade e LGPD" (`noindex: false`, indexável por exigência legal) | Controlador, bases legais, direitos do titular | Legal |
| `/obrigado` | "Recebemos sua mensagem \| Pers Web Digital" com `noindex: true` | Confirmação de envio | Fora de busca (conversão) |

## 3. Schema.org (JSON-LD) — o que já existe e onde

| Tipo | Função / origem | Onde é injetado |
|---|---|---|
| `Organization` + `LocalBusiness` | `organizationSchema()` em `src/lib/seo.ts` (nome, `legalName`, `taxID` = CNPJ, `foundingDate`, logo, telefone, e-mail, `address`, `geo`, `openingHoursSpecification`, `areaServed`, `sameAs`, `contactPoint`) | `<JsonLd>` no `src/app/layout.tsx` — presente em todas as páginas |
| `WebSite` | objeto inline em `src/app/page.tsx` com `publisher: {@id: …/#organization}` | home |
| `FAQPage` | `faqSchema(items)` em `src/lib/seo.ts` | home (`homeFaq` de `src/data/home.ts`, em `page.tsx`), hubs (`hubCopy[...].faq` em `hub-page.tsx`) e landings (`faq` do serviço em `service-template.tsx`) |
| `Service` | `serviceSchema(service)` em `src/lib/seo.ts` (`@id` por slug, `serviceType`, `provider` referenciando a organização, `areaServed: Brasil`, `audience` = campo `audience` do dado) | cada landing de serviço |
| `BreadcrumbList` | `buildBreadcrumb(items)` em `src/lib/seo.ts` | hubs e landings (`hub-page.tsx`, `service-template.tsx`), combinado com o `<Breadcrumbs>` visível de `src/components/ui/breadcrumbs.tsx` |
| `Article` | **ainda não implementado** — `buildMetadata` emite `openGraph.type = "article"` com `publishedTime`/`authors`, mas não há `articleSchema()` | adicionar `articleSchema(post)` em `src/lib/seo.ts` e chamá-lo na página do artigo (`headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`) |

Regra de consistência: o JSON-LD nunca contradiz o HTML visível (Google trata divergência de
FAQPage/Service como spam estruturado). Se o accordion foi removido da página, o `faqSchema`
respectivo sai junto.

## 4. Sitemap, robots e canonical

| Item | Arquivo | Comportamento |
|---|---|---|
| `sitemap.xml` | `src/app/sitemap.ts` | gerado de `services` (`src/data/catalog.ts`) e `posts` (`src/data/blog.ts`): home `priority 1`/weekly, hubs 0.9, landings 0.85/monthly, `/blog` 0.8, `/contato` 0.8, posts 0.6 com `lastModified` = data do artigo, `/politica-de-privacidade` 0.2 |
| `robots.txt` | `src/app/robots.ts` | libera tudo em produção; `disallow` de `/api/` e de `/obrigado` com query; se `VERCEL_ENV` não for produção, bloqueia o site inteiro (`disallow: "/"`) — preview não indexa |
| Canonical | `buildMetadata()` com `alternates.canonical` = `absoluteUrl(path)` | URL absoluta do domínio de `site.url` / `NEXT_PUBLIC_SITE_URL`; sem canonical duplicado por parâmetro de campanha |
| Link do rodapé | `footer.tsx` expõe `/sitemap.xml` | sinal para crawl e para o cliente |

Ação obrigatória no lançamento: cadastrar a propriedade no Google Search Console (verificação
por `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, já lida em `layout.tsx`) e enviar o sitemap.

## 5. Open Graph, Twitter e assets sociais

- Imagem padrão: `defaultOgImage = "/og/pers-web-digital-og.jpg"` (`src/lib/seo.ts`), 1200×630,
  `alt` = título da página. O arquivo está em `public/og/` — revisá-lo é item do checklist, não
  bloqueador de build.
- Twitter: `summary_large_image` com mesmo título, description e imagem.
- OG `locale: "pt_BR"`, `siteName: site.name`, `type: "website"` (ou `"article"` em post).
- Página de artigo deve sobrepor `ogImage` quando houver capa própria (`buildMetadata` aceita a
  chave `ogImage`).

## 6. SEO local

- Cidade e bairro aparecem no rodapé de todas as páginas: `site.address.district` +
  `site.address.city`/`site.address.state` na faixa legal de `src/components/layout/footer.tsx`,
  e o bloco de endereço completo (rua, bairro, cidade, horário) na coluna 1 do mesmo arquivo.
- `LocalBusiness` com `geo` (`site.geo`), `openingHoursSpecification` e `areaServed`
  (`site.serviceAreas`) — os três campos precisam ser substituídos pelos valores reais
  (`grep -rn "TODO" src/lib/site.ts`).
- Google Business Profile: mesmo nome, telefone (`site.phoneE164`), endereço e categoria
  ("Tecnologia da informação"/"Consultoria de TI"); links do perfil apontando para `/contato`;
  fotos e posts periódicos; respostas a avaliações com link para `/cases`.
- Conteúdo: enquanto a estratégia não pedir páginas por cidade, a cobertura local é sustentada
  por `serviceAreas`, rodapé e `areaServed` no Schema. Criação de páginas `/ti-em-<cidade>` só
  com conteúdo distinto por cidade — página duplicada por cidade prejudica o conjunto.

## 7. Performance como sinal de SEO

| Prática | Implementação | Status |
|---|---|---|
| Formato moderno de imagem | `next.config.mjs` → `images.formats: ["image/avif","image/webp"]` e `deviceSizes` de 360 a 1920 | ativo |
| Cache de assets | `headers()` em `next.config.mjs`: `max-age=31536000, immutable` para svg/jpg/png/webp/avif/ico/woff2 | ativo |
| Imagem LCP em prioridade | `priority` no `<Image>` do hero (`home-hero.tsx`, `page-hero.tsx`, `logo.tsx` em tamanho ≥ md) | ativo |
| Lazy loading | padrão do `next/image` fora da primeira dobra | ativo |
| Fontes sem request externo | `next/font/google` (Inter e Plus Jakarta Sans) com `display: "swap"` em `src/app/layout.tsx`; o Next auto-hospeda os arquivos no build | ativo — os `.woff` antigos em `src/app/fonts/` são resquício do template e podem ser removidos |
| JS mínimo | páginas de servidor; `"use client"` restrito a header, widgets, formulário, accordion, counter, reveal | ativo |
| Analytics condicionado ao aceite | `tracking.tsx` só injeta GA4/GTM/Meta após consentimento | ativo (mede sem cookie não essencial) |
| Meta por página estática | SSG via `generateStaticParams()` | ativo |
| Alvo | Lighthouse ≥ 90 em Performance, SEO, Acessibilidade e Boas Práticas (mobile e desktop), LCP < 2,5 s, CLS < 0,1 | medir no lançamento (`docs/07-checklist-lancamento.md`) |

## 8. Regras de on-page ao criar conteúdo novo

1. Um único `h1` por página; `h2` por seção; `h3` em cards e perguntas do accordion.
2. Title com 50–60 caracteres, keyword comercial no começo, marca no fim.
3. Description de 140–160 caracteres com benefício + prova + CTA implícito ("diagnóstico gratuito").
4. Keywords locais no array `keywords` do serviço (cidade quando fizer sentido).
5. Todo `<Image>` com `alt` descritivo e sem "imagem de"; ícone decorativo é `aria-hidden`.
6. Link interno obrigatório: blog → landing de serviço → `/contato`; landing → 3 serviços relacionados.
7. Página nova entra em `src/app/sitemap.ts` (ou nasce automaticamente do catálogo/post).
8. Não publicar página fina: sem conteúdo na `pain`/`solution`/`deliverables`, o slug fica fora.
9. Verificar preview de compartilhamento (OG) e o resultado do Rich Results Test antes de fechar o PR.
