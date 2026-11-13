# 02 — Mapa de mensagens (copy)

Registro das mensagens-mestre por página, do framework de conversão aplicado e de onde cada
texto mora no código. O texto integral está no repositório; aqui ficam a mensagem, a intenção e
o endereço no fonte — sem duplicar o site.

## 1. Tom de voz

Profissional, consultivo e próximo. Fala com o dono/gerente da empresa, não com o técnico.

| Princípio | Como se aplica |
|---|---|
| Concreto antes do adjetivo | "primeira resposta média em menos de 8 minutos" em vez de "atendimento ágil" |
| Dor nomeada antes da solução | cada bloco abre com o sintoma que o cliente reconhece |
| Segunda pessoa, plural quando institucional | "sua operação", "nós assumimos", "você escolhe" |
| Números com condição de validade | métricas sempre acompanhadas de contexto ("média nos contratos 24/7", "em 12 meses") |
| Sem jargão gratuito | siglas aparecem explicadas na frase (RTO, RPO, PDTI, SLA, NOC) |
| Autoridade sem arrogância | "dizemos quando não precisa contratar nada agora" (`differentials[0]`) |
| Compromisso operacional, não promessa de marketing | microcopy de prazo em todo CTA ("resposta em até 1 hora útil") |

Palavras que não entram: "soluções inovadoras", "referência em mercado", "sob medida" sem
contexto (o projeto usa "combinamos escopo por necessidade"), "parceria de sucesso", "excelência".
Nada de dado inventado: número sem evidência sai do ar, não é "ajustado".

## 2. Framework DOR → SOLUÇÃO → RESULTADO

O framework não é decorativo: ele é o **contrato de dados** das landings. Em
`src/data/services.ts` / `src/data/services.dev.ts`, o tipo `ServiceContent` obriga:

| Etapa | Campo do dado | Onde aparece na tela |
|---|---|---|
| Dor | `pain.title`, `pain.body`, `pain.items[]` | seção "A TI virou gargalo em vez de alavanca" e equivalentes |
| Solução | `solution.title`, `solution.body` + `deliverables[]` | método + o que é entregue, item por item |
| Resultado | `results[]` (`metric`, `title`, `description`) | faixa de métricas com prova |
| Prova | `proof` (citação, autor, cargo, empresa) | depoimento específico do serviço |
| Fechamento | `cta.title`, `cta.subtitle`, `cta.microcopy` | CTA final com formulário |

Na home a mesma lógica aparece em escalas menores: `differentials[].proof` (linha de prova por
diferencial), `processSteps[].deliverable` (resultado de cada etapa) e `cases[]` com
`problem` → `solution` → `result` + `metrics[]` (`src/data/home.ts`). Nos hubs
(`/infraestrutura`, `/desenvolvimento`), a estrutura é replicada no mapa `hubCopy` de
`src/components/sections/hub-page.tsx` (`introTitle`/`introText`, bullets, FAQ e `cta`).

## 3. Mensagens-mestre

| Mensagem | Teor | Fonte no código |
|---|---|---|
| Slogan | "TI sólida. Presença digital que converte." | `site.slogan` em `src/lib/site.ts` |
| Headline da home | "Infraestrutura de TI sólida e presença digital que converte." | `src/components/sections/home-hero.tsx` (`<h1>`) |
| Sub da home | proposta dupla + alívio ("você para de apagar incêndio e passa a ter plano, SLA e canal de vendas funcionando") | `home-hero.tsx` (`<p>`) |
| Eyebrow da home | "TI gerenciada + desenvolvimento digital, no mesmo fornecedor" | `home-hero.tsx` |
| CTA primário global | "Solicitar orçamento gratuito" / "Solicitar orçamento" (header, hero, page hero) | `home-hero.tsx`, `header.tsx`, `page-hero.tsx` |
| CTA de canal | "Falar no WhatsApp" (sempre pareado ao primário) | `home-hero.tsx`, `page-hero.tsx`, drawer mobile |
| Microcopy de confiança | "Resposta em até 1 hora útil · Diagnóstico sem compromisso" | `home-hero.tsx`, `page-hero.tsx`, `cta.microcopy` dos serviços |
| Promessa de entrada | "Diagnóstico gratuito com relatório de prioridades" | `differentials[0].proof` (`src/data/home.ts`) |
| CTA do formulário | "Quero o diagnóstico gratuito" (default), variantes "Quero meu diagnóstico" (exit-intent) | props `ctaLabel` em `src/components/forms/lead-form.tsx` e `conversion-widgets.tsx` |
| Fechamento do exit-intent | "Antes de sair · Leve um diagnóstico gratuito de TI" + oferta de 40 minutos | `conversion-widgets.tsx` |
| Recusa do exit-intent | "Não obrigada, só estava olhando" | `conversion-widgets.tsx` |
| Sucesso do envio | "Recebido! Já estamos analisando seu caso." + prazo de 1 hora útil | `lead-form.tsx` (título) e `src/app/api/lead/route.ts` (corpo) |
| Erro de envio | "Falha de conexão. Tente novamente ou chame no WhatsApp." com link de escape | `lead-form.tsx` |
| Consentimento de cookies | texto de finalidade + "Aceitar análise"/"Recusar" + "Nenhum dado é enviado a terceiros sem o seu aceite" | `src/components/layout/tracking.tsx` |
| Mega menu | "Não sabe por onde começar? Comece pelo diagnóstico gratuito." | `header.tsx` |
| Rodapé (abrangência) | "Atendimento em todo o Brasil" + `site.serviceAreas` | `footer.tsx` |

## 4. Mapa por página

Títulos e subtítulos estão citados de forma resumida; o texto literal está no arquivo indicado.

| Página | Headline (H1) | Sub / promessa | CTAs | Prova social | Fonte |
|---|---|---|---|---|---|
| `/` | Proposta dupla (TI + digital) | Um único parceiro estratégico: plano, SLA e canal de vendas | Orçamento → `/contato`; WhatsApp (`orcamento`) | 4 números, 4,9/5, 5 depoimentos, 3 cases, 8 selos | `home-hero.tsx` + `home.ts` |
| `/infraestrutura` | Infraestrutura que sustenta a operação sem improviso | Equipe certificada responsável pelo ambiente inteiro, com indicadores | Orçamento + WhatsApp (`infraestrutura`) | bullets de SLA/backup/monitoramento, FAQ | `hubCopy.infra` em `hub-page.tsx` |
| `/desenvolvimento` | Presença digital que gera demanda, não cartaz | Estratégia, design, engenharia e medição no mesmo contrato | Orçamento + WhatsApp (`desenvolvimento`) | bullets de Lighthouse, SEO, CRM | `hubCopy.dev` em `hub-page.tsx` |
| `/consultoria-ti` | Consultoria que acaba com o modo apaga-incêndio | Diagnóstico, PDTI e roadmap de 12 a 24 meses | Diagnóstico gratuito (`cta` do serviço) | `-28%` custo, `-54%` incidentes, depoimento | objeto `slug: "consultoria-ti"` em `services.ts` |
| `/servidores-e-cloud` | Servidores no ar, monitorados 24/7 | Patch, capacity, backup e resposta antes do usuário perceber | Orçamento + WhatsApp | 99,9% uptime, `< 8 min`, `-35%` nuvem | `services.ts` |
| `/redes-e-firewall` | Rede estável, segmentada e segura por padrão | Do cabeamento à política de firewall, com documentação | Review de conectividade | `-71%` chamados, 2 links, 95% cobertura | `services.ts` |
| `/backup-e-seguranca` | Backup que restaura e segurança que evita o incidente | 3-2-1 imutável, EDR, MFA, DR com RTO/RPO e LGPD | Avaliação de resiliência | RTO 4 h, RPO 15 min, 12 testes/ano | `services.ts` |
| `/suporte-ti-empresas` | Help desk e NOC com SLA em contrato | Time dedicado, sem fila e sem improviso | Proposta em 2 dias úteis | `< 8 min`, 96% SLA, `-40%` vs. avulso | `services.ts` |
| `/criacao-de-sites` | Sites que carregam rápido, aparecem no Google e vendem | Estratégia, copy, design, engenharia e medição | Orçamento + WhatsApp | Lighthouse 90+, SEO técnico, CRM | `services.dev.ts` |
| `/landing-pages` | Landing pages para transformar mídia paga em vendas | Pesquisa de mensagem, CRO, testes A/B e rastreio | Orçamento + WhatsApp | custo por lead, conversão, LCP | `services.dev.ts` |
| `/aplicativos-mobile` | Aplicativos que resolvem um problema real | Discovery, MVP, API, publicação e manutenção | Orçamento + WhatsApp | escopo, prazo, nota nas lojas | `services.dev.ts` |
| `/sobre` | Quem somos, time e história | Como pensamos TI e por que fazemos diferente | Contato + agendamento | valores, certificações, fundação (`site.foundedYear`) | `src/app/sobre/page.tsx` (bloco `values`) |
| `/cases` | Cases e portfólio | Problema, solução e resultado por setor | Falar com consultor | métricas por case, setores | `cases` de `home.ts` |
| `/blog` | Blog de TI e negócios digitais | Conteúdo técnico e de gestão | Contato por tema | autor, categoria, tempo de leitura | `src/data/posts.ts` / `posts.more.ts` |
| `/blog/<slug>` | Título do artigo | `excerpt` do post | CTA contextual (`related`) | autor/cargo, FAQ do artigo | objeto do post |
| `/contato` | Falar com um consultor | Canais diretos e prazo de resposta | Formulário, WhatsApp, telefone, Calendly, e-mail | selos e horário de atendimento | `src/app/contato/page.tsx` |
| `/obrigado` | Recebemos sua mensagem | Próximos passos em 4 etapas (triagem → proposta) | WhatsApp (`obrigado`), agendar | "Seus dados protegidos" | `src/app/obrigado/page.tsx` (`nextSteps`) |
| `/politica-de-privacidade` | Política de privacidade e LGPD | Coleta, uso, bases legais e direitos do titular | Canal do titular | — | `src/app/politica-de-privacidade/page.tsx` (`sections`) |

## 5. Microcopy obrigatório (regras de aplicação)

1. Todo CTA de captação carrega prazo ou condição: "Resposta em até 1 hora útil",
   "Sem compromisso", "Diagnóstico gratuito", "Proposta em até 2 dias úteis".
2. Campo opcional é marcado como opcional no rótulo, nunca descrito como obrigatório.
3. Mensagem de erro diz **o que fazer**, não o que está errado ("Confira os campos
   obrigatórios: nome, e-mail válido, telefone e empresa.").
4. Sucesso informa o próximo passo e a janela de tempo, com atalho para o canal síncrono.
5. Rótulos de formulário usam a linguagem do cliente ("Serviço desejado", "Como podemos ajudar?"),
   não a nossa ("Interest", "Lead source").
6. Página de política e de agradecimento não fazem oferta: mantêm o tom informativo.

## 6. Variantes para teste (A/B)

| Elemento | Controle | Variante | Onde trocar |
|---|---|---|---|
| H1 da home | "Infraestrutura de TI sólida e presença digital que converte." | "Sua TI sem susto e seu digital vendendo — com um único parceiro." | `home-hero.tsx` |
| Botão do formulário | "Quero o diagnóstico gratuito" | "Receber plano de prioridades" | prop `ctaLabel` (`lead-form.tsx`) |
| Ordem dos CTAs do hero | Orçamento → WhatsApp | WhatsApp → Orçamento | `home-hero.tsx` |
| Exit-intent | Oferta de diagnóstico | Oferta de avaliação de resiliência (backup/ransomware) | `conversion-widgets.tsx` |
| Headline de `/backup-e-seguranca` | "Backup que restaura de verdade…" | "Quanto tempo levaria para recuperar tudo?" | `services.ts` (`h1`) |

Medir uma mudança por vez, com `eventParams` já disponíveis (`location`, `purpose`, `form`) —
detalhes em `docs/05-formularios-e-integracoes.md`.
