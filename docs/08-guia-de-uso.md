# 08 — Guia de uso

Manual para quem vai manter o site sem ser desenvolvedor. Tudo que muda com frequência está em
**arquivos de texto simples** (`src/data/…` e `src/lib/site.ts`), não no desenho das páginas.

Fluxo de trabalho recomendado: abrir o repositório no GitHub → editar o arquivo → **Commit** →
a Vercel publica sozinha em 1–2 minutos. Se algo quebrar, o histórico permite reverter com um
clique (ver §6). Peça apoio do time de TI para a primeira semana de mudanças.

---

## 1. "Quero mudar este texto" — onde fica cada coisa

| O que você quer mudar | Arquivo | Campo |
|---|---|---|
| Telefone, WhatsApp, e-mail, endereço, horário, redes sociais | `src/lib/site.ts` | `phoneDisplay`, `phoneE164`, `whatsappNumber`, `email`, `emailSuporte`, `address`, `hours`, `social` |
| Razão social, CNPJ, ano de fundação, slogan | `src/lib/site.ts` | `legalName`, `cnpj`, `foundedYear`, `slogan` |
| Domínio oficial do site | `src/lib/site.ts` + painel da Vercel | `url` (e variável `NEXT_PUBLIC_SITE_URL`) |
| Título e descrição que aparecem no Google (home) | `src/lib/site.ts` | `defaultTitle`, `defaultDescription` |
| Texto do hero da home (headline, subtítulo, botões) | `src/components/sections/home-hero.tsx` | parágrafos dentro de `<h1>`, `<p>` e `<Button>` |
| Números da home (+120 empresas, 99,9%, etc.) | `src/data/home.ts` | `stats` (`value`, `suffix`, `label`, `description`) |
| Depoimentos | `src/data/home.ts` | `testimonials` (`quote`, `author`, `role`, `company`, `sector`, `initials`) |
| Cases (home e página de cases) | `src/data/home.ts` | `cases` (`title`, `company`, `problem`, `solution`, `result`, `metrics`, `duration`) |
| Diferenciais "por que escolher" | `src/data/home.ts` | `differentials` |
| Etapas "Como trabalhamos" | `src/data/home.ts` | `processSteps` (`number`, `title`, `duration`, `description`, `deliverable`) |
| Perguntas frequentes da home | `src/data/home.ts` | `homeFaq` (`question`, `answer`) |
| Selos de confiança (LGPD, 24/7…) | `src/data/home.ts` | `trustSeals` |
| Logos/certificações exibidos na barra | `src/lib/site.ts` | `clients` e `certifications` |
| Textos de uma página de serviço (todas as seções) | `src/data/services.ts` (infra) ou `src/data/services.dev.ts` (digital) | o objeto com aquele `slug` (`h1`, `subtitle`, `pain`, `solution`, `deliverables`, `results`, `proof`, `faq`, `cta`) |
| Título/descrição de serviço no Google | mesmos arquivos | `seoTitle`, `seoDescription`, `keywords` |
| Textos das páginas `/infraestrutura` e `/desenvolvimento` | `src/components/sections/hub-page.tsx` | mapa `hubCopy` (`infra` e `dev`) |
| Menus do topo e do rodapé | `src/lib/site.ts` | `nav.main`, `nav.solutions` |
| Mensagens pré-preenchidas do WhatsApp | `src/lib/site.ts` | `waMessages` (`default`, `orcamento`, `infraestrutura`, `desenvolvimento`, `suporte`, `obrigado`) |
| Link de agendamento (Calendly) | `src/lib/site.ts` | `calendlyUrl` |
| Texto do formulário (rótulos, botões, mensagens) | `src/components/forms/lead-form.tsx` | rótulos dos campos, `ctaLabel`, `microcopy`, bloco de sucesso |
| Artigo do blog | `src/data/posts.ts` (originais) e `src/data/posts.more.ts` (novos) | objeto do post: `title`, `excerpt`, `blocks`, `faq`, `related` |
| Valores e texto da página "Sobre" | `src/app/sobre/page.tsx` | lista `values` (ícone, título, texto) e os parágrafos de história |
| Cards de canal em `/contato` (WhatsApp, telefone, agenda, e-mail) | `src/app/contato/page.tsx` | lista de canais definida no topo do arquivo |
| Próximos passos exibidos após o envio | `src/app/obrigado/page.tsx` | lista `nextSteps` (`title`, `text`, `time`) |
| Texto da política de privacidade | `src/app/politica-de-privacidade/page.tsx` | lista `sections` (`title`, `paragraphs`, `list`) |
| Título e descrição de cada página interna no Google | o `generateMetadata()` do arquivo da página | chaves `title` e `description` |

Regras de escrita: manter o padrão DOR → SOLUÇÃO → RESULTADO (`docs/02-mapa-de-mensagens.md`),
frases curtas, sem jargão desnecessário, e nunca prometer número que não possa ser comprovado.

---

## 2. Substituir TODOS os dados placeholder (antes de publicar)

O projeto não esconde os placeholders: eles estão marcados no código. Faça as duas buscas abaixo
no repositório (ou pelo campo de busca do GitHub) e resolva cada linha:

```
grep -rn "TODO" src/           # dados da empresa, todos em src/lib/site.ts
grep -rn "PLACEHOLDER" src/    # depoimentos, cases, métricas e provas sociais
```

Checklist do que precisa virar dado real:

- [ ] `src/lib/site.ts`: `legalName`, `cnpj`, `foundedYear`, `phoneDisplay`, `phoneE164`,
      `whatsappNumber`, `email`, `emailSuporte`, `address` (rua, **bairro**, cidade, UF, CEP),
      `geo` (latitude/longitude do escritório), `hours`, `social` (4 redes), `url`/domínio,
      `calendlyUrl`.
- [ ] `src/lib/site.ts` → `clients`: trocar os 8 nomes fictícios por clientes reais que
      autorizou a usar (e enviar os SVG correspondentes — ver §4).
- [ ] `src/data/home.ts` → `testimonials`: 5 depoimentos reais, com nome, cargo, empresa e
      **autorização por escrito** para publicação.
- [ ] `src/data/home.ts` → `stats`: os 4 números (empresas atendidas, uptime, projetos,
      primeira resposta) precisam ser comprováveis.
- [ ] `src/data/home.ts` → `cases`: substituir os 6 cases fictícios por cases reais.
- [ ] `src/data/services.ts` e `src/data/services.dev.ts`: em cada um dos 8 serviços, revisar
      `results` (métricas), `proof` (depoimento marcado como PLACEHOLDER) e `faq` (prazos e
      valores citados: 2-3 semanas, 6-10 semanas, cobertura, RTO/RPO).
- [ ] `src/lib/site.ts` → `certifications`: listar apenas certificações vigentes da equipe.

Nada disso deve ser "melhorado com criatividade": número não comprovável em site de TI é
risco jurídico e comercial. Na dúvida, remova a métrica em vez de estimar.

---

## 3. Publicar um post de blog

1. Abra `src/data/posts.more.ts`.
2. Copie um objeto existente inteiro e cole no fim do array `extraPosts`.
3. Alterando sempre: `slug` (sem acento, com hífens), `title`, `excerpt`, `date` (AAAA-MM-DD,
   no futuro ele aparece primeiro na lista), `category` (uma das cinco existentes), `tags`,
   `author`, `role`, `icon`, `related` (slugs de serviço) e `blocks`.
4. `blocks` é o texto do artigo, bloco por bloco: `{ t: "p", v: "parágrafo…" }`,
   `{ t: "h2", v: "título" }`, `{ t: "h3", v: "subtítulo" }`, `{ t: "ul", v: ["item", "item"] }`,
   `{ t: "quote", v: "citação de destaque" }`.
5. Opcional: `faq` (pergunta e resposta que podem aparecer como destaque no Google) e
   `featured: true` para o post principal da página do blog.
6. Commite. A página passa a existir em `/blog/<slug>` e entra no `sitemap.xml` sozinha.

Modelo de artigo que converte: problema concreto → dados/erros comuns → solução em passos →
o que fazer agora (CTA para a landing do serviço). 900 a 1.400 palavras. Um serviço relacionado,
no máximo dois links internos por parágrafo.

## 4. Adicionar um case e trocar imagens

**Novo case** — `src/data/home.ts`, array `cases`: copie um objeto e preencha `slug`, `title`,
`company`, `sector`, `category` (`infra`, `seguranca`, `cloud`, `web` ou `apps`), `problem`,
`solution`, `result`, `metrics` (3 pares `value`/`label`) e `duration`. A home mostra alguns em
destaque; a página `/cases` lista todos com filtro.

**Trocar o logo** — o símbolo exibido no topo e no rodapé vem de `public/brand/pers-mark-192.png`
(fundo claro) e `public/brand/pers-mark-light-192.png` (fundo escuro), lidos por
`src/components/ui/logo.tsx`; `public/brand/pers-mark.png` é a arte em tamanho cheio
referenciada como `logo` no Schema.org (`src/lib/seo.ts`), e há ainda `pers-mark-96.png` /
`pers-mark-512.png` para ícone. Envie os novos arquivos com **exatamente os mesmos nomes** — o
wordmark "Pers Web Digital" continua sendo texto real (nítido em qualquer tela). Se quiser
mudar o tamanho do símbolo, é o `markSize` do componente.

**Trocar as ilustrações das páginas** — `public/images/hero-visual.png` (home e página de
infraestrutura) e `public/images/monitoring-visual.png` (desenvolvimento). Mantenha a proporção
(atributos `width`/`height` no código) e o nome do arquivo; substitua o conteúdo.

**Logos de clientes** — coloque os SVG em `public/clients/<slug>.svg` com o mesmo `slug` usado
em `site.clients` e ajuste a barra de prova social (`src/components/sections/trust-bar.tsx`)
para renderizar a imagem no lugar do texto.

**Favicon e capa de compartilhamento** — `public/og/pers-web-digital-og.jpg` (1200×630) é a
imagem que aparece no WhatsApp e no LinkedIn ao colar o link. Os ícones referenciados por
`src/app/layout.tsx` (`icon.svg`, `icon.png`, `favicon-32x32.png`, `favicon-16x16.png`,
`apple-icon.png` e `site.webmanifest`) já estão em `public/`: para trocar, mantenha
exatamente os mesmos nomes e medidas e confirme com um teste de envio de link pelo celular.

## 5. Publicar (o caminho do dia a dia)

1. Editou o arquivo no branch principal → `git add` + `git commit` + `git push` (ou o botão
   "Commit changes" do GitHub).
2. A Vercel detecta o push, roda `npm run build` e publica o preview em URL
   `https://<hash>.vercel.app` (não indexável) e, na `main`, o domínio de produção.
3. Abra o preview, confira a página alterada e o formulário. Só então compartilhe o link.
4. Mudanças estruturais (criar página, trocar serviço de lugar, mexer em componente) pedem
   revisão de quem fez o site; texto e dado não.

## 6. Onde ver erros e como reverter

- **Build quebrado**: painel da Vercel → projeto → **Deployments** → o deploy aparece vermelho →
  clique em **Build logs**. Erro mais comum em texto é apóstrofo ou aspas sem escape dentro de
  um dado (ex.: `"ele disse "oi""`) — use aspas simples internas ou `\`` e confira a linha
  indicada no log.
- **Página em branco no ar**: mesmo caminho, em **Runtime logs**; a aba **Observability** mostra
  requisições e funções (incluindo `/api/lead`).
- **Leads que não chegam**: veja §5 do `docs/05-formularios-e-integracoes.md` (variáveis de
  integração) e os logs da função `lead`.
- **Reverter**: no GitHub, abra o commit e escolha *Revert*; na Vercel, **Deployments → …→
  Promote** para voltar a um deploy anterior. Um push desfaz qualquer mudança de texto.
- **Rodar localmente** (para quem usa terminal): `npm install` e `npm run dev`, abrindo
  `http://localhost:3000`.

## 7. Rotina de manutenção sugerida

| Frequência | O que fazer |
|---|---|
| Semanal | publicar 1 artigo; responder avaliações do Google Business; testar o formulário |
| Mensal | revisar números/`stats`, cases novos, `homeFaq` (dúvidas que o comercial ouve), certificações |
| Trimestral | revisar preços/prazos citados nas FAQ das landings, remover case antigo, checar Search Console (consultas que subiram, páginas com erro) |
| Semestral | auditoria de LGPD (política, bases legais, lista de terceiros), revisão de velocidade (Lighthouse), limpeza de dependências |
