# 03 — Style Guide

Guia de estilo do site **Pers Web Digital**. Todos os valores abaixo foram lidos do
próprio repositório — não é um guia genérico: cada token tem origem em
[tailwind.config.ts](../tailwind.config.ts), [src/app/globals.css](../src/app/globals.css)
ou nos componentes de `src/components/`. Se um valor precisar mudar, mude no token, não na tela.

Direção de arte: moderno, tech, limpo e confiável (referências citadas no briefing: Stripe,
Vercel, Cloudflare, Rocketseat, Alura). Fundo claro na maior parte do conteúdo, blocos escuros
para hero, números, depoimentos e rodapé. Autoridade técnica sem frieza: muito espaço em branco,
tipografia forte nos títulos, acentos azul/ciano usados com parcimônia.

---

## 1. Paleta de cores

Definida em `tailwind.config.ts` → `theme.extend.colors`. As escalas `navy`, `tech` e `aqua`
são completas; `surface`, `ink`, `success` e `danger` são tokens semânticos.

### 1.1 Navy (azul-marinho profundo — base da marca)

| Token | Hex | Uso típico |
|---|---|---|
| `navy-50` | `#eef2f9` | hover de botões ghost, faixas sutis |
| `navy-100` | `#d8e0f0` | bordas padrão (`border-navy-100` é o default global) |
| `navy-200` | `#adc0e1` | bordas de input, separadores, texto claro sobre navy-900 |
| `navy-300` | `#7f9acf` | texto secundário em blocos escuros |
| `navy-400` | `#4f6dad` | texto terciário em blocos escuros (ver §7 — cuidado com contraste) |
| `navy-500` | `#2f4d8d` | uso raro; ícones decorativos |
| `navy-600` | `#1e376b` | variações de gradiente escuro |
| `navy-700` | `#152a54` | texto de navegação, tom de gradiente |
| `navy-800` | `#0f2145` | labels de formulário, headings escuros |
| `navy-900` | `#0a1f44` | **cor-base da marca**: títulos, seções escuras, gradiente primário |
| `navy-950` | `#050d1f` | hero e rodapé (fundo mais escuro) |

### 1.2 Tech (azul de ação)

| Token | Hex | Uso típico |
|---|---|---|
| `tech-50` | `#eff6ff` | fundo do `.eyebrow`, blocos de ícone |
| `tech-200` | `#bfdbfe` | borda do `.eyebrow`, `decoration` de links |
| `tech-300` | `#93c5fd` | hover de borda em botões secundários |
| `tech-500` | `#3b82f6` | meio do `.text-gradient`, `focus:ring-tech-500` |
| `tech-600` | `#2563eb` | **ação primária**, anel de foco, ícones de destaque |
| `tech-700` | `#1d4ed8` | links em fundo claro, texto do `.eyebrow`, fim do gradiente do botão |
| `tech-800` | `#1e40af` | hover de `variant="link"` |
| `tech-900` | `#1e3a8a` | reserva |
| `tech` (DEFAULT) | `#2563eb` | permite `bg-tech`, `text-tech` |

### 1.3 Aqua (ciano — acento de tecnologia)

| Token | Hex | Uso típico |
|---|---|---|
| `aqua-200` | `#a5f3fc` | texto do `.eyebrow-dark` |
| `aqua-300` | `#67e8f9` | acento sobre navy (selos, labels do rodapé, ícones) |
| `aqua-400` | `#22d3ee` | ícones de contato no rodapé, hover de bordas |
| `aqua-500` | `#06b6d4` | **acento-base da marca**: `.text-gradient`, botão `aqua`, citações |
| `aqua-600` | `#0891b2` | reserva (DEFAULT da escala) |
| `aqua-700` | `#0e7490` | ciano legível sobre branco |

### 1.4 Tokens semânticos

| Token | Hex | Uso |
|---|---|---|
| `surface` | `#f6f8fc` | fundo alternativo de seção (`tone="surface"`) |
| `surface-alt` | `#eef2f9` | segunda variação de fundo claro |
| `ink` | `#0f172a` | cor do corpo do texto (`body` usa `text-ink`) |
| `ink-soft` | `#334155` | parágrafos longos, `.prose-article` |
| `ink-muted` | `#64748b` | legendas, microcopy, descrições secundárias |
| `success` | `#16a34a` | estados de sucesso do formulário |
| `danger` | `#dc2626` | borda de campo inválido, mensagem de erro |
| verde WhatsApp | `#1faa54` → hover `#25d366` | fora da escala Tailwind: aplicado via classe arbitrária em `button.tsx` e `conversion-widgets.tsx` (ver §7) |

**Regras de uso**

1. Fundo de página é branco ou `surface`. `navy-900`/`navy-950` aparecem em seções inteiras, nunca em blocos pequenos espalhados.
2. `aqua` é acento: ícone, borda, label, meio de gradiente. Não é cor de texto sobre fundo claro (2,43:1 com `aqua-500` sobre branco).
3. Verde WhatsApp é exclusividade de ações de WhatsApp. Não vira cor institucional.
4. Se alternância claro/escuro quebra a leitura, o problema é ordem de seção — não a paleta.

---

## 2. Tipografia

### 2.1 Famílias

| Papel | Fonte | Variável CSS | Classe Tailwind |
|---|---|---|---|
| Texto corrido / UI | **Inter** | `--font-inter` | `font-sans` (aplicada no `body` em `globals.css`) |
| Títulos, números, wordmark | **Plus Jakarta Sans** | `--font-jakarta` | `font-display` |

`tailwind.config.ts` → `theme.extend.fontFamily`: `display` cai em `--font-jakarta` e, se ela
não carregar, em `--font-inter`; `sans` cai em `--font-inter` e depois em `system-ui`.
As duas variáveis vêm do carregamento via `next/font` (fontes auto-hospedadas, sem request a
CDN de terceiros — ver `docs/06-seo-on-page.md` §6). Títulos herdam `font-display` e
`text-navy-900` pela regra base de `h1, h2, h3, h4` em `globals.css`, com `text-wrap: balance`.

### 2.2 Escala tipográfica (valores em uso no código)

| Nível | Classes | Aprox. em px | Peso / entrelinha |
|---|---|---|---|
| Display (H1 do hero) | `text-[2.35rem] sm:text-5xl lg:text-[3.55rem]` | 37,6 → 48 → 56,8 | `font-extrabold`, `leading-[1.06]`, `tracking-tight` |
| H1 de página interna | `text-[2.1rem] sm:text-4xl lg:text-[2.9rem]` (faixa dos templates) | 33,6 → 36 → 46,4 | `font-bold`, `leading-[1.1]` |
| H2 de seção | `text-[1.75rem] sm:text-4xl lg:text-[2.6rem]` (`section-heading.tsx`) | 28 → 36 → 41,6 | `font-bold`, `leading-[1.15]` |
| Números / destaques | `text-2xl sm:text-[1.7rem]`, `text-[1.6rem]` | 24 → 27,2 / 25,6 | `font-display font-bold` |
| Título de card | `text-lg` / `text-xl` | 18 / 20 | `font-bold` |
| Parágrafo de introdução | `text-lg leading-8` (hero), `text-[1.05rem] sm:text-lg` (H2 descritivo) | 18 / 16,8 | regular |
| Corpo | `text-[1.0625rem] leading-7` (`.prose-article`) | 17 | 1,64 |
| Corpo padrão de UI | `text-[0.98rem]`, `text-[0.95rem]`, `text-base` | 15,7 / 15,2 / 16 | 1,6–1,75 |
| Secundário | `text-sm leading-6` | 14 | 1,57 |
| Legendas e microcopy | `text-xs leading-5` | 12 | 1,66 |
| Label de eyebrow / métrica | `text-2xs` (`0.6875rem`, único token custom de `fontSize`) | 11 | `font-semibold uppercase tracking-[0.14em]` |

Regras: nunca desça de `text-2xs`. Texto corrido legível começa em 15–17px. Corpos longos
(blog, política) usam `.prose-article` em vez de classes avulsas.

### 2.3 Entrelinha e ritmo de texto

| Contexto | Valor |
|---|---|
| Títulos grandes | `leading-[1.06]` a `leading-[1.15]` |
| Subtítulos e cards | `leading-6` / `leading-7` |
| Corpo de artigo | `leading-7` (1,64) |
| Microcopy | `leading-5` |
| Navegação | padrão (sem leading explícito) |

---

## 3. Espaçamento, grid e container

### 3.1 Ritmo vertical

Utilitário `.section-py` em `globals.css` (`@layer utilities`): **64px / 80px / 112px** de
padding vertical (`py-16 sm:py-20 lg:py-28`). É o ritmo padrão de toda seção clara ou escura.
O hero da home usa `py-16 sm:py-20 lg:py-24 xl:py-28` (quatro breakpoints porque o bloco é mais
alto). Seções âncora usam `scroll-mt-20` para não ficarem escondidas sob o header fixo.

| Nível | Tokens usados | Quando |
|---|---|---|
| Seção | `.section-py` (64/80/112) | todas as seções de página |
| Entre títulos e conteúdo | `mt-4` a `mt-9` | bloco de heading + grid |
| Grade de cards | `gap-6 sm:gap-8`, `gap-10`, `gap-12`, `gap-14` | `gap-14` só no hero |
| Empilhamento interno | `space-y-3`, `space-y-4`, `space-y-2.5` | listas, formulário |
| Itens inline | `gap-1.5`, `gap-2`, `gap-2.5`, `gap-3` | ícone+texto, botões lado a lado |

### 3.2 Container e grid de 12 colunas

- `.container-site` (`globals.css`): `mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8`.
  `max-w-container` = **76rem (1216px)**, de `tailwind.config.ts` → `theme.extend.maxWidth`.
- O componente `<Container>` (`src/components/ui/layout.tsx`) aplica a classe; `<Section>`
  combina `container-site` + `.section-py` + tom de fundo e aceita `bleed` para grades
  full-bleed.
- Grid de 12 colunas nos breakpoints `lg`: hero `lg:grid-cols-12` com `lg:col-span-7` (texto)
  e `lg:col-span-5` (visual); rodapé `lg:grid-cols-12` em 4 / 5 / 3; listas de soluções em
  `sm:grid-cols-2`, `lg:grid-cols-3` conforme densidade.
- Abaixo de `lg` tudo colapsa em coluna única (`grid-cols-1`), sem truncar hierarquia.

### 3.3 Tons de seção (`<Section tone>`)

| `tone` | Fundo | Texto |
|---|---|---|
| `light` (default) | `#ffffff` | `ink` |
| `surface` | `#f6f8fc` | `ink` |
| `surface-alt` | `#eef2f9` | `ink` |
| `dark` | `navy-900` | `navy-100` |
| `gradient` | radial `#152a54 → #0a1f44 → #050d1f` | `navy-100` |

Padrão de alternância da home: `gradient` (hero) → `light` → `surface` → `light` → `dark`
(números/depoimentos) → `surface` → `light` → `gradient`/`dark` (CTA final) → rodapé `navy-950`.

---

## 4. Raios, sombras e fundos texturizados

### 4.1 Raios

| Classe | Valor | Uso |
|---|---|---|
| `rounded-lg` | 8px | tiles de ícone, chips, botões sociais do rodapé (com `rounded-xl`) |
| `rounded-xl` | 12px | **botões**, inputs, selects, avisos |
| `rounded-2xl` | 16px | `.card-base`, painéis, mega menu, banner de cookies |
| `rounded-3xl` | 24px | modal de exit-intent |
| `rounded-[1.75rem]` / `rounded-[2rem]` | 28px | moldura do visual do hero e seu halo |
| `rounded-full` | 9999px | `.eyebrow`, selos, avatares, anéis de pulso |
| `rounded-r-xl` | só à direita | citação da `.prose-article` |

### 4.2 Sombras (`tailwind.config.ts` → `boxShadow`)

| Token | Valor | Uso |
|---|---|---|
| `shadow-card` | `0 1px 2px rgba(10,31,68,.06), 0 8px 24px -12px rgba(10,31,68,.12)` | elevação padrão de card e botão secundário |
| `shadow-card-hover` | `0 1px 2px rgba(10,31,68,.08), 0 18px 40px -16px rgba(10,31,68,.22)` | estado hover (`.card-hover`) e painéis flutuantes |
| `shadow-glow` | `0 0 0 1px rgba(37,99,235,.16), 0 12px 40px -12px rgba(37,99,235,.35)` | botão primário — halo azul |
| `shadow-glow-cyan` | `0 12px 40px -12px rgba(6,182,212,.45)` | botão `aqua` — halo ciano |

Sombras usam o navy da marca como pigmento (`rgba(10,31,68,…)`), nunca preto puro. O header em
scroll aplica `0 2px 16px -8px rgba(10,31,68,.18)` + `backdrop-blur-lg`; o botão flutuante de
WhatsApp usa halo verde próprio (`0 10px 30px -8px rgba(31,170,84,.65)`).

### 4.3 Texturas e gradientes

- `bg-grid-light` / `bg-grid-dark` com `bg-grid` (44px) — malha técnica sobre hero, CTA e
  rodapé, sempre em camada decorativa com `pointer-events-none` e `aria-hidden="true"`.
- `bg-radial-hero` e os radiais inline do hero/`tone="gradient"` para profundidade.
- `.text-gradient` = `from-tech-600 via-tech-500 to-aqua-500` (`bg-clip-text`). Usar apenas em
  display grande: a cauda ciano perde contraste sobre branco.
- Glassmorphism contido: `bg-white/[0.06]` + `border-white/12` + `backdrop-blur-md` no painel
  do hero e `bg-white/95` + `backdrop-blur` em banner de cookies e barra mobile.

---

## 5. Componentes utilitários (`@layer components` em `globals.css`)

| Classe | O que faz | Onde vive |
|---|---|---|
| `.container-site` | container de 1216px com padding responsivo | `ui/layout.tsx` (`<Container>`) |
| `.eyebrow` | pill claro: borda `tech-200`, fundo `tech-50`, texto `tech-700`, `text-2xs` uppercase | `ui/section-heading.tsx` |
| `.eyebrow-dark` | mesma pílula para fundo escuro (`border-white/15`, `bg-white/10`, `text-aqua-200`) | `conversion-widgets.tsx` (exit-intent) |
| `.text-gradient` | gradiente azul→ciano aplicado a texto | títulos de destaque |
| `.card-base` | card: `rounded-2xl`, borda `navy-100`, branco, `p-6`, `shadow-card`, transição 300ms | cards de solução, diferenciais, cases |
| `.card-hover` | eleva 4px, borda `tech-200`, `shadow-card-hover` no hover | sempre em dupla com `.card-base` |
| `.prose-article` | corpo de artigo: 17px/1,64 + estilos de `h2`, `h3`, `p`, `ul`, `li`, `a`, `strong`, `blockquote` | página do blog e política de privacidade |
| `.no-scrollbar` | esconde scrollbar de trilhos horizontais de mobile | filtros de cases, carrossel de depoimentos |
| `.safe-bottom` | `padding-bottom: env(safe-area-inset-bottom)` | barra fixa mobile e rodapé do drawer |

Outros componentes de interface, já implementados:

| Componente | Arquivo | Papel no design system |
|---|---|---|
| `<Button>` | `src/components/ui/button.tsx` | variantes, tamanhos, ícones e rastreamento |
| `<Icon>` | `src/components/ui/icon.tsx` | mapa de ícones Lucide (chave string → componente) |
| `<Logo>` | `src/components/ui/logo.tsx` | marca + wordmark tipográfico (`font-display` extrabold), variantes `dark`/`light` e tamanhos `sm`/`md`/`lg` (28/34/44px) |
| `<Section>` / `<Container>` / `<Divider>` | `src/components/ui/layout.tsx` | ritmo vertical, tom de fundo, divisor em gradiente |
| `<SectionHeading>` | `src/components/ui/section-heading.tsx` | eyebrow + título + descrição, alinhamento e tom |
| `<Accordion>` | `src/components/ui/accordion.tsx` | FAQ acessível (um item aberto por vez, `aria-expanded`/`controls`) |
| `<Breadcrumbs>` | `src/components/ui/breadcrumbs.tsx` | trilha com `aria-current="page"` |
| `<Counter>` | `src/components/ui/counter.tsx` | contagem animada com formatação `Intl` pt-BR |
| `<Reveal>` / `<RevealGroup>` | `src/components/ui/reveal.tsx` | entrada em scroll com stagger |

### 5.1 Ícones

Lucide React, sempre através de `<Icon name="…" />`. Padrão visual: `strokeWidth 1.6`
(default do componente), `aria-hidden="true"` (ícone nunca carrega informação sozinho).
Tamanhos em uso: `h-[18px] w-[18px]` (tiles e navegação), `h-4 w-4` (inline em texto/botão),
`h-5 w-5` (botões grandes), `h-6 w-6` (default). As chaves disponíveis (`activity`, `server`,
`shield`, `cloud`, `rocket`, `headset`, `wallet`, `scale`, …) estão listadas no mapa de
`src/components/ui/icon.tsx` — o tipo `IconKey` é o que as páginas de dados usam em
`src/data/services.ts`, `services.dev.ts` e `home.ts`.

---

## 6. Botões

`buttonVariants` em `src/components/ui/button.tsx` (class-variance-authority).
Default: `variant="primary"` + `size="lg"`.

| Variante | Aparência | Uso |
|---|---|---|
| `primary` | gradiente `tech-600 → tech-700`, branco, `shadow-glow` | CTA principal (orçamento, diagnóstico) |
| `aqua` | `aqua-500`, texto `navy-950`, `shadow-glow-cyan` | CTA secundário de destaque em blocos escuros |
| `whatsapp` | verde `#1faa54` → hover `#25d366`, branco | ação de WhatsApp |
| `secondary` | branco, borda `navy-200`, texto `navy-900` | CTA coadjuvante em fundo claro |
| `on-dark` | `bg-white/5` + borda `white/25` + blur | CTA coadjuvante em fundo escuro |
| `ghost` | texto `navy-700`, hover `navy-50` | links-ação discretos |
| `ghost-dark` | texto `white/80` | idem, em fundo escuro |
| `link` | sem padding, `tech-700` | "ver detalhes", links de sucesso do formulário |

| Tamanho | Altura | Padding | Fonte |
|---|---|---|---|
| `sm` | 36px | `px-3.5` | 14px |
| `md` | 44px | `px-5` | 15,2px |
| `lg` (default) | 48px | `px-6` | 16,3px |
| `xl` | 56px | `px-7` | 16px → 16,8px em `sm` |

Estado: `rounded-xl`, `font-semibold`, transição de 200ms; hover com leve clareamento do
gradiente; `active:translate-y-px` (feedback de toque); `disabled:opacity-60` com cursor
proibido; `fullWidth` para CTA de formulário. Ícones entram por `icon` (direita, desliza 2px
no hover do grupo) ou `iconLeft`. Propriedades `href`, `external` e `whatsapp` transformam o
botão em link — `whatsapp` resolve a mensagem pré-preenchida via `waLink()` (`src/lib/utils.ts`)
— e `event` dispara o rastreio de conversão (§6 do `docs/05-formularios-e-integracoes.md`).

Alvo de toque mínimo: 44px. Botões de 36px (`sm`) só dentro de blocos com espaçamento
generoso (painel de sucesso, mega menu).

---

## 7. Acessibilidade e contraste (WCAG 2.2 AA)

### 7.1 Estados de foco

Regra global em `globals.css`: `:focus-visible { outline: none; ring-2 ring-tech-600
ring-offset-2 ring-offset-white }` — anel azul de 2px com offset de 2px, visível em teclado
(WCAG 2.4.7). Links "pular para o conteúdo" (`header.tsx`) usam `sr-only focus:not-sr-only` e
aparecem exatamente quando há foco. Campos de formulário reforçam o estado com
`focus:border-tech-500` + `focus:ring-2 focus:ring-tech-500/30` (`lead-form.tsx`).
`::selection` em `tech-600` sobre branco.

### 7.2 Contraste medido (fundo → texto)

| Par | Razão | AA (16px normal) |
|---|---|---|
| `ink` `#0f172a` sobre branco | 17,85:1 | OK |
| `ink-soft` sobre branco | 10,35:1 | OK |
| `ink-muted` sobre branco | 4,76:1 | OK (margem pequena) |
| `ink-muted` sobre `surface` | 4,48:1 | **limítrofe** — usar só em texto ≥14px semântico ou escurecer |
| `navy-900` sobre branco | 16,25:1 | OK |
| `tech-700` sobre branco | 6,70:1 | OK (é a cor de link, não `tech-600`) |
| `tech-600` sobre branco | 5,17:1 | OK |
| `aqua-500` sobre branco | 2,43:1 | **não usar como texto** |
| branco sobre `tech-700` | 6,70:1 | OK |
| branco sobre gradiente `tech-600→tech-700` | ≥5,17:1 | OK |
| `navy-100` sobre `navy-900` | 12,26:1 | OK |
| `navy-200` sobre `navy-950` | 10,52:1 | OK |
| `navy-300` sobre `navy-900` | 5,75:1 | OK |
| `aqua-300` sobre `navy-900` | 11,21:1 | OK |
| `navy-400` sobre `navy-950` (barra legal do rodapé) | 3,80:1 | **reprovado para texto pequeno** — subir para `navy-300` |
| branco sobre WhatsApp `#1faa54` | 3,03:1 | **reprovado para texto pequeno** |
| branco sobre WhatsApp `#25d366` (hover) | 1,98:1 | **reprovado** |
| `navy-950` sobre WhatsApp `#1faa54` | 6,40:1 | OK |

Ações corretas para os três itens marcados (a justificar no ajuste pós-lançamento):
usar texto `navy-950` sobre o verde (6,40:1) **ou** escurecer o verde de repouso para
`#15803d` (5,02:1 com branco), mantendo `#1faa54` apenas como fundo de ícone/borda; e trocar
`text-navy-400` por `text-navy-300` na faixa legal do rodapé. Até lá, nenhum texto informativo
essencial deve depender desses pares — ícones e rótulos repetem a informação em outro lugar.

### 7.3 Movimento reduzido

- Bloco `@media (prefers-reduced-motion: reduce)` em `globals.css`: `scroll-behavior: auto` e
  animações/transições reduzidas a 0,01ms em todos os elementos.
- `<Reveal>` e `<Counter>` consultam `useReducedMotion()` do Framer Motion e devolvem conteúdo
  estático (sem opacidade 0, sem contagem) quando o usuário pede menos movimento — o texto
  nunca fica invisível.
- Pulso do botão flutuante (`animate-pulse-ring`) e flutuação do hero (`animate-float`) são
  decorativos e caem sob a mesma mídia de redução.

### 7.4 Semântica obrigatória

Um único `h1` por página; hierarquia `h2` por seção e `h3` em cards/FAQ (o `<Accordion>` envolve
o botão em `h3`). Regiões com `role`/`aria-label`: `<header>`, `<nav aria-label="Navegação
principal">`, `<footer>`, `role="dialog"` + `aria-modal` no drawer e no exit-intent,
`aria-current="page"` na trilha, `role="alert"` em erros de formulário, `aria-invalid` nos
campos inválidos, `aria-describedby` ligando campo ao erro. Ícones `aria-hidden`. Imagens com
`alt` descritivo (ver `docs/07-checklist-lancamento.md`).

---

## 8. Checklist de aplicação (antes de abrir PR)

- [ ] Novos fundos usam um dos cinco `tone` de `<Section>` — nenhum hex solto.
- [ ] Título novo usa `<SectionHeading>`; se precisar fugir disso, mantém `font-display` e a escala de §2.2.
- [ ] Cards somam `.card-base` (+ `.card-hover` se clicáveis).
- [ ] CTA é `<Button>` com variante existente; não se cria `bg-blue-600` avulso.
- [ ] Cor de texto sobre fundo escuro passa em 4,5:1 (teste os pares de §7.2).
- [ ] Nada de `aqua` como texto sobre branco.
- [ ] Animações novas respeitam `prefers-reduced-motion` (usar `<Reveal>`/`<Counter>`).
- [ ] Conteúdo não essencial decorativo está com `aria-hidden="true"` e `pointer-events-none`.
- [ ] Alvo de toque ≥ 44px; foco visível em todos os elementos interativos.
- [ ] Ícone novo entra no mapa de `src/components/ui/icon.tsx` como chave, e só depois é usado nos dados.
