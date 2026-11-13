# Pers Web Digital — site institucional

Site institucional da **Pers Web Digital**: consultoria de TI e infraestrutura gerenciada
de um lado, desenvolvimento de sites, landing pages, aplicativos e sistemas do outro.

Construído para conversão de leads e para SEO on-page, com conteúdo 100% data-driven,
design system próprio, animações discretas e integração de formulários pronta para plugar
no CRM.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · React Hook Form + Zod · Vercel.

---

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (29 páginas estáticas)
npm run start      # serve o build
npm run assets     # regenera favicons, OG e imagens otimizadas
```

Copie `.env.example` para `.env.local` e preencha o que for usar — nada é obrigatório
para o site funcionar em desenvolvimento.

## Estrutura

```
src/
  app/                    rotas (App Router)
    page.tsx              home
    [slug]/               8 landing pages de serviço (SEO)
    infraestrutura/       hub da frente de TI
    desenvolvimento/      hub da frente digital
    sobre/  cases/  contato/  blog/  blog/[slug]/
    politica-de-privacidade/  obrigado/
    api/lead/             endpoint de captura de leads
    sitemap.ts robots.ts  SEO dinâmico
  components/
    layout/               header (mega menu + drawer), footer, widgets de conversão
    sections/             seções de página (hero, soluções, processo, depoimentos…)
    ui/                   design system (button, card, accordion, reveal, counter…)
    forms/                formulário de lead com Zod + honeypot
    seo/                  JSON-LD, pings de conversão
  data/                   TODO conteúdo: services, catalog, home, posts
  lib/                    site.ts (dados da empresa), seo.ts, utils, analytics
public/                   marca, imagens, favicons, OG
docs/                     especificação, wireframes, design system, SEO, lançamento
```

## Onde editar o conteúdo

| Quero mudar                       | Arquivo                                   |
| --------------------------------- | ----------------------------------------- |
| Nome, CNPJ, endereço, contatos    | `src/lib/site.ts`                         |
| Serviços de TI                    | `src/data/services.ts`                    |
| Serviços digitais                 | `src/data/services.dev.ts`                |
| Home (hero, números, cases, FAQ)  | `src/data/home.ts`                        |
| Artigos do blog                   | `src/data/posts.ts` e `src/data/posts.more.ts` |
| Títulos e descriptions de SEO     | `src/lib/seo.ts` + metadata de cada página |

Todo texto marcado com `⚠️ PLACEHOLDER` ou `TODO` precisa ser substituído por dados reais
antes do go-live (números, depoimentos, cases, telefone, WhatsApp e endereço).

## Formulário de leads

`POST /api/lead` valida com Zod, aplica honeypot e rate limit por IP e distribui para:

- `LEAD_WEBHOOK_URL` — n8n / Make / Zapier / Google Sheets / RD Station;
- `HUBSPOT_API_KEY` + `HUBSPOT_PORTAL_ID` — criação de contato no HubSpot;
- `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` — e-mail de notificação ao comercial.

Sem variável configurada, o lead é registrado no log da função e o usuário vê a
confirmação normalmente. Após o envio, o visitante é levado a `/obrigado`, que dispara o
evento de conversão usado por Google Ads e Meta Ads.

## Deploy na Vercel

```bash
vercel        # preview
vercel --prod # produção
```

Ou conecte o repositório em *Vercel → Add New → Project*: framework detectado
automaticamente (Next.js), build command `npm run build`, output `.next`.
Defina `NEXT_PUBLIC_SITE_URL` com o domínio de produção para que canonical, sitemap e
Open Graph apontem para a URL correta.

## Licença

Código e conteúdo sob contrato de prestação de serviços — uso restrito ao cliente.
