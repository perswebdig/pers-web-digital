# 05 — Formulários e integrações

Especificação do formulário de lead, do endpoint que o recebe, das integrações de CRM/e-mail,
de Calendly, WhatsApp e de todo o rastreamento de conversão.

## 1. Formulário de lead

Componente: `src/components/forms/lead-form.tsx` (`<LeadForm>`), reutilizado no CTA final da
home, nas landings, nos hubs, em `/contato` e no pop-up de saída.

| Prop | Efeito |
|---|---|
| `purpose` | identificador do formulário: vai no payload do lead, nos eventos de analytics e é usado nos `id`/`htmlFor` dos campos |
| `compact` | remove o campo de mensagem (4 campos) — usado no exit-intent |
| `tone` | `"light"`/`"dark"`: muda cores de label, borda, erro e painel de sucesso |
| `defaultService` | pré-seleciona o serviço (cada landing deveria passar o próprio `slug`) |
| `ctaLabel` / `microcopy` | texto do botão e da linha abaixo (default: "Quero o diagnóstico gratuito" / "Resposta em até 1 hora útil · Sem compromisso") |

### 1.1 Campos e validação (Zod)

Schema do cliente (`schema`, no topo do arquivo) e do servidor (`leadSchema`, em
`src/app/api/lead/route.ts`) — o servidor é a autoridade:

| Campo | Rótulo | Regra | Mensagem de erro |
|---|---|---|---|
| `name` | Nome completo | `min(2)`, `max(90)` | "Informe seu nome completo." / "Nome muito longo." |
| `email` | E-mail corporativo | `.email()` | "E-mail inválido. Confira o @ e o domínio." |
| `phone` | Telefone / WhatsApp | `min(10)`, `max(18)`, regex `^[0-9()+\-\s.]+$` | "Telefone com DDD, por favor." / "Telefone muito longo." / "Use apenas números, DDD e símbolos de telefone." |
| `company` | Empresa | `min(2)` (cliente) / `max(120)` (servidor) | "Informe o nome da empresa." |
| `service` | Serviço desejado | `min(1)`; select gerado de `services` (`src/data/catalog.ts`), com grupos *Consultoria e infraestrutura* e *Desenvolvimento digital* + opção `outro` | "Escolha o serviço que você precisa." |
| `message` | Como podemos ajudar? (opcional) | `max(1200)`; some quando `compact` | "Máximo de 1.200 caracteres." |
| `website` | — (honeypot) | `max(0)` | — |

Comportamento: `mode: "onBlur"` (só reclama depois que o usuário sai do campo), `noValidate`
no `<form>` para assumir a mensagem pt-BR, `aria-invalid` + `aria-describedby` ligando campo
ao erro, erros com `role="alert"`, `autoComplete` de `name`/`organization`/`email`/`tel`,
placeholders reais ("Maria Silva", "maria@empresa.com.br", "(11) 91234-5678") e um placeholder
de exemplo no texto livre ("Ex.: temos 3 servidores, 45 usuários e o ERP está lento no fim do
mês.").

### 1.2 Anti-spam

1. **Honeypot**: campo `website` renderizado fora da tela (`absolute left-[-9999px]`, `opacity-0`,
   `tabIndex={-1}`, `aria-hidden`). Preenchimento por bot é descartado silenciosamente — o
   endpoint responde `ok: true` com mensagem positiva para não ensinar o agressor.
2. **Rate limit por IP**: `MAX_ATTEMPTS = 5` janelas de `WINDOW_MS` = 10 minutos, em memória
   (`Map` no módulo), chave = primeiro valor de `x-forwarded-for`. Estouro devolve HTTP 429 com
   "Muitas tentativas em sequência. Aguarde alguns minutos ou fale com a gente pelo WhatsApp."
   Limitação conhecida: o contador é por instância serverless; se houver abuso real, migrar para
   um store compartilhado (Upstash/Redis) sem mudar o contrato do formulário.
3. Scripts de terceiros só carregam após consentimento (`src/components/layout/tracking.tsx`).

### 1.3 Mensagens de sucesso e erro

| Situação | Texto exibido | Origem |
|---|---|---|
| Enviando | botão desabilitado com "Enviando…" e spinner | `lead-form.tsx` |
| Sucesso (título) | "Recebido! Já estamos analisando seu caso." | `lead-form.tsx` |
| Sucesso (corpo) | texto vindo do servidor: "Recebido! Um consultor entra em contato pelo telefone ou e-mail informado em até 1 hora útil." — fallback local com prazo, horário comercial e atalho de WhatsApp | `route.ts` / `lead-form.tsx` |
| Ações pós-sucesso | "Chamar no WhatsApp" (mensagem `waMessages.obrigado`) e "Enviar outra mensagem" | `lead-form.tsx` |
| Falha de validação no servidor | "Confira os campos obrigatórios: nome, e-mail válido, telefone e empresa." (HTTP 422) | `route.ts` |
| Corpo inválido | "Requisição inválida." (HTTP 400) | `route.ts` |
| Falha de conexão | "Falha de conexão. Tente novamente ou chame no WhatsApp." + link direto de WhatsApp | `lead-form.tsx` |

## 2. Endpoint `POST /api/lead`

Arquivo: `src/app/api/lead/route.ts`. Fluxo: rate limit → parse JSON → Zod → honeypot → registro
→ integrações em paralelo (`Promise.allSettled`) → resposta. Nunca bloqueia o lead se uma
integração falhar (o erro vai para os logs).

Payload gravado (`record`): todos os campos do formulário + `serviceLabel` (tabela
`SERVICE_LABELS`, que converte slug em nome comercial), `receivedAt` (ISO), `ip`, `userAgent` e
`referrer`. O `console.log("[lead]", …)` é a trilha de auditoria mínima; integre o log da
Vercel ao seu alerta antes do go-live.

## 3. Integrações (ordem executada pelo código)

| # | Integração | Variáveis | O que faz |
|---|---|---|---|
| 1 | **Webhook genérico** | `LEAD_WEBHOOK_URL` | POST JSON do `record` para n8n, Make, Zapier, Google Sheets (Apps Script published as web app), RD Station ou qualquer endpoint. É o caminho recomendado: um único ponto de entrada, e o resto virou fluxo dentro do n8n/Make |
| 2 | **HubSpot** | `HUBSPOT_API_KEY` + `HUBSPOT_PORTAL_ID` | `POST https://api.hubapi.com/crm/v3/objects/contacts` com `email`, `firstname`/`lastname` (split do nome), `phone`, `company`, `hs_lead_status: "NEW"`, `hs_object_source_detail_1` = `purpose` e `property_lead_context` = rótulo do serviço. A propriedade customizada `property_lead_context` precisa existir no HubSpot, senão o valor é ignorado |
| 3 | **Resend (e-mail)** | `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` (+ `LEAD_FROM_EMAIL`) | notificação HTML para o comercial com assunto "Novo lead: <empresa> — <serviço>" e `reply_to` = e-mail do lead |

Como plugar os outros CRMs citados no briefing: **RD Station** → use `LEAD_WEBHOOK_URL` com o
endpoint de conversão/lead do RD (ou o n8n como meio, gravando também no RD); **Pipedrive** →
`LEAD_WEBHOOK_URL` apontando para um fluxo n8n/Make que cria `person` + `deal` com o
`serviceLabel` como produto; **Google Sheets** → Apps Script com `doPost(e)` gravando uma linha
e exposto como web app "Anyone", valor em `LEAD_WEBHOOK_URL`. Nenhuma dessas alternativas exige
alterar o código do site.

**Recomendação de configuração mínima para o lançamento**: `LEAD_WEBHOOK_URL` (CRM/planilha) +
`RESEND_API_KEY`/`LEAD_NOTIFY_EMAIL` (alerta humano) + GA4. Assim o lead nunca depende de uma
só integração.

### 3.1 Variáveis de ambiente

A referência é o arquivo `.env.example` na raiz do repositório: copie para `.env.local` em
desenvolvimento e reproduza as chaves no painel da Vercel (Production, Preview e Development).
Mapa de quem consome o quê:

| Chave | Lida por | Observação |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `src/lib/site.ts` → `site.url` (com default de fallback) | define todas as URLs absolutas: canonical, sitemap, robots, Open Graph e Schema.org |
| `NEXT_PUBLIC_GA4_ID` (`G-XXXXXXXXXX`) | `src/components/layout/tracking.tsx` | sem valor, o script não é injetado; o init usa `anonymize_ip` |
| `NEXT_PUBLIC_GTM_ID` (`GTM-XXXXXX`) | `tracking.tsx` | container pode assumir as tags; o site já empurra `dataLayer` |
| `NEXT_PUBLIC_META_PIXEL_ID` | `tracking.tsx` + `src/lib/analytics.ts` | `PageView` no load e `Lead` nos eventos de lead |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `src/app/layout.tsx` | meta de verificação do Search Console |
| `LEAD_WEBHOOK_URL` | `src/app/api/lead/route.ts` | n8n, Make, Zapier, Google Apps Script, RD Station |
| `HUBSPOT_API_KEY` + `HUBSPOT_PORTAL_ID` | `route.ts` | ambas precisam existir para a chamada rodar |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` (+ `LEAD_FROM_EMAIL`) | `route.ts` | remetente exige domínio verificado no Resend |
| `NEXT_PUBLIC_CALENDLY_URL` | **ainda não consumida pelo código** | `src/lib/site.ts` usa a constante `calendlyUrl`; escolha uma fonte só |
| `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_EMAIL` | **ainda não consumidas pelo código** | o site lê `whatsappNumber`, `phoneE164` e `email` de `src/lib/site.ts` |

Os valores de exemplo do `.env.example` (número, domínio, e-mail) ainda não são dados reais: são
os mesmos placeholders marcados como `TODO` em `src/lib/site.ts` e devem ser substituídos antes
de configurar a produção. Prefixo `NEXT_PUBLIC_` significa visível no navegador; as demais ficam
só no servidor, e toda mudança de env exige redeploy para entrar no build.

## 4. Agendamento e WhatsApp

- **Calendly**: `site.calendlyUrl` (`src/lib/site.ts`), link externo com `rel="noopener
  noreferrer"` no rodapé ("Agendar diagnóstico") e nos CTAs finais. Alternativa: embed do widget
  na página `/contato`; se embedar, adicione o evento `schedule_click` (ver §5.2) no clique do
  botão de confirmação do Calendly.
- **WhatsApp**: `waLink(context)` (`src/lib/utils.ts`) gera
  `https://wa.me/<site.whatsappNumber>?text=<mensagem codificada>`, onde o número é apenas
  dígitos com DDI 55. As mensagens por contexto estão em `waMessages` (`src/lib/site.ts`):
  `default`, `orcamento`, `infraestrutura`, `desenvolvimento`, `suporte` e `obrigado`. Cada
  página deve usar o contexto da própria frente — o `<Button whatsapp="…">` resolve o link
  sozinho. Pontos de uso hoje: botão flutuante, barra fixa mobile, header/drawer, hero, page
  hero, footer, painel de sucesso do formulário e mensagem de erro.

## 5. Rastreamento de conversão

Camada: `track(event, params)` em `src/lib/analytics.ts`. Cada chamada envia para GA4
(`gtag('event', …)`), GTM (`dataLayer.push` com `event`, `event_name`, `company`, `page_path` e
os parâmetros) e Meta Pixel. Eventos de lead (`generate_lead`, `form_submit`,
`exit_intent_submit`) viram `fbq('track','Lead',{content_name})`; os demais viram
`fbq('trackCustom', …)`.

### 5.1 Nomes exatos dos eventos

Tipados em `LeadEvent` (`src/lib/analytics.ts`):

| Evento | Status hoje | Onde é disparado | Parâmetros |
|---|---|---|---|
| `generate_lead` | ativo | sucesso do envio em `lead-form.tsx` | `purpose`, `service`, `form` (`full`/`compact`), `path` |
| `form_submit` | ativo **apenas na falha** | `catch` do envio, com `status: "error"` | `purpose`, `status` |
| `whatsapp_click` | ativo | flutuante (`location: "float"`), barra mobile (`mobile_bar`), footer, hero, page hero, sucesso do formulário (`form_success`) | `location`, e em botões com `event` o `label` do texto |
| `phone_click` | ativo | telefone do header (`header`) e botão "Ligar agora" da barra mobile (`mobile_bar`) | `location` |
| `cta_click` | ativo | CTAs de orçamento do hero (`hero`), header desktop (`header_desktop`), mega menu (`mega_menu`), drawer (`drawer`), page hero (`page_hero`) | `location`, `variant`, `label` |
| `exit_intent_view` | ativo | abertura do pop-up (`conversion-widgets.tsx`) | `offer: "diagnostico-gratuito"` |
| `exit_intent_submit` | **previsto, não disparado** | hoje o envio do pop-up dispara `generate_lead` com `purpose: "exit-intent"` | recomendação: para funil separado, emitir também `exit_intent_submit` quando `purpose === "exit-intent"` |
| `contact_click` | **previsto, não disparado** | — | usar em `/contato` para cliques em e-mail/mapa |
| `schedule_click` | **previsto, não disparado** | — | usar no clique de `site.calendlyUrl` (footer, CTAs finais, embed) |

Consentimento: `localStorage["pwd:cookie-consent"]`, evento custom `pwd:consent-change` e
reabertura do banner por `pwd:open-cookies` (`tracking.tsx`). Pop-up de saída dispara uma vez
por sessão (`sessionStorage["pwd:exit-intent"]`).

### 5.2 Configuração no GA4

1. Criar os eventos como **conversões**: `generate_lead`, `whatsapp_click`, `cta_click`,
   `form_submit`, `exit_intent_view`. Importar para o Google Ads como conversão principal.
2. Marcar `generate_lead` como compra/conversão e ativar atribuição baseada em dados.
3. No Meta: evento `Lead` já é enviado pela camada; validar com o Pixel Helper e criar o
   conjunto de anúncios otimizando para `Lead` (não para `PageView`).
4. GTM: as tags podem ser movidas para o container usando `dataLayer` — o site já empurra
   `event` e `event_name` para cada evento.

### 5.3 Taxa de conversão: metas e leitura

| Funil | Fórmula | Meta realista (B2B TI, tráfego misto) |
|---|---|---|
| Site → lead (formulário) | `generate_lead` ÷ sessões | 1,5% a 3% |
| Site → conversa (WhatsApp) | `whatsapp_click` ÷ sessões | 1% a 2,5% |
| Visita ao CTA → clique | `cta_click` ÷ views da seção | 8% a 15% |
| Formulário iniciado → enviado | envios ÷ interações no campo `name` | 45% a 65% |
| Landing de mídia paga | leads ÷ cliques do anúncio | 8% a 15% (com `compact`) |

Como melhorar sem mexer no design: pré-selecionar `defaultService` em cada landing, encurtar o
formulário do exit-intent (já é `compact`), testar `ctaLabel` ("Quero o diagnóstico gratuito"
vs. "Receber plano de prioridades"), e medir a origem com `purpose` + `source` (path) que já
chegam no `record` do lead.
