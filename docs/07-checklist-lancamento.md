# 07 — Checklist de lançamento

Marque cada item com data e responsável. O site só recebe tráfego pago/SEO depois da seção
"Bloqueadores".

**Bloqueadores (sem isto, não publicar no domínio final)**

- [ ] Todos os `// TODO` de `src/lib/site.ts` substituídos por dados reais
      (conferir com `grep -rn "TODO" src/` — hoje há ocorrências de cadastrais e contatos).
- [ ] Depoimentos, cases e métricas com `PLACEHOLDER` revisados e comprovados
      (`grep -rn "PLACEHOLDER" src/`), com autorização por escrito dos clientes citados.
- [ ] `src/app/politica-de-privacidade/page.tsx` revisada pelo jurídico: nome do controlador,
      CNPJ, canal do titular, prazo de resposta e identificação do **encarregado (DPO)**.
- [ ] `LEAD_WEBHOOK_URL` (ou HubSpot/Resend) configurado e **testado com envio real**.
- [ ] Formulário de produção testado ponta a ponta (lead chegou no CRM + e-mail ao comercial).
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO (mobile e desktop).
- [ ] Zero erro de console, zero 404 interno, links de WhatsApp e telefone funcionando.

---

## 1. Domínio, DNS e SSL

- [ ] Domínio registrado e com titularidade da empresa (não de agência/pessoa física).
- [ ] Registro no painel da Vercel (Domains) ou DNS apontado: `A`/`AAAA` para o apex e
      `CNAME cname.vercel-dns.com` para `www`.
- [ ] `www` → apex (ou vice-versa) com **redirect 301** configurado na Vercel, e o host
      escolhido registrado como domínio de produção.
- [ ] SSL emitido e válido (Vercel usa Let's Encrypt automaticamente); testar
      `https://` e confirmar que `http://` redireciona.
- [ ] `NEXT_PUBLIC_SITE_URL` = domínio final (Production, Preview e Development) e o default de
      `site.url` em `src/lib/site.ts` atualizado — canonical, sitemap, robots e Open Graph
      dependem desse valor.
- [ ] Teste: `curl -I https://dominio/` mostra 200 e o `Location` do redirect está correto.

## 2. Variáveis de ambiente

- [ ] Copiar `.env.example` para `.env.local` em desenvolvimento e conferir chave a chave.
- [ ] No painel da Vercel: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`,
      `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- [ ] Leads: `LEAD_WEBHOOK_URL`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, `RESEND_API_KEY`,
      `HUBSPOT_API_KEY`, `HUBSPOT_PORTAL_ID` (só o que for usar).
- [ ] `NEXT_PUBLIC_CALENDLY_URL` / `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_PHONE` /
      `NEXT_PUBLIC_EMAIL`: atenção — o código hoje lê `site.calendlyUrl`, `site.whatsappNumber`
      e `site.phoneE164` de `src/lib/site.ts`. Definir **uma** fonte e alinhar no lançamento.
- [ ] Variáveis com valor sensível (tokens) marcadas como *Sensitive* e nunca commitadas
      (`.gitignore` já cobre `.env*`).
- [ ] Redeploy após qualquer alteração (env só entra no build).

## 3. Analytics, pixels e medição

- [ ] GA4 criado, tag instalada via `NEXT_PUBLIC_GA4_ID` (ou GTM) e teste em tempo real.
- [ ] Eventos marcados como conversão: `generate_lead`, `whatsapp_click`, `cta_click`,
      `form_submit`, `exit_intent_view` (nomes completos em `docs/05-formularios-e-integracoes.md`).
- [ ] Meta Pixel com evento `Lead` validado pelo Meta Pixel Helper; campanha otimizando para Lead.
- [ ] GTM: container publicado, variáveis de ambiente e gatilhos conferidos; remover tags
      duplicadas se GA4 já for carregado pelo site.
- [ ] UTM tagging padrão acordado com o time de mídia (`purpose` + `source` já viajam no lead).
- [ ] Dashboards: GA4 (sessões → `generate_lead`), CRM (lead → oportunidade) e uma planilha
      semanal de custo por lead.
- [ ] Consentimento LGPD testado: com "Recusar", nenhum request a googleanalytics/facebook;
      com "Aceitar", os eventos aparecem; limpar o `localStorage` para revalidar o banner.

## 4. Search Console e SEO

- [ ] Propriedade Domain no Google Search Console verificada via
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (meta lida em `src/app/layout.tsx`).
- [ ] Enviar `sitemap.xml` (gerado por `src/app/sitemap.ts`) e conferir cobertura após 48h.
- [ ] Bing Webmasters (opcional, custo zero).
- [ ] Google Business Profile reclamado e completo: categoria, telefone, endereço com bairro,
      horário, site, fotos, produtos/serviços e link para `/contato`.
- [ ] Checar `robots.txt` de produção: `/api/` bloqueada, `disallow: "/"` **só** em preview
      (lógica por `VERCEL_ENV` em `src/app/robots.ts`).
- [ ] Rich Results Test: Organization/LocalBusiness, Service (8 landings), FAQPage, Breadcrumb.
- [ ] Validar títulos/descriptions das 17 URLs da tabela de `docs/06-seo-on-page.md`.
- [ ] Redirecionamentos de URLs antigas (se havia site anterior) mapeados em `next.config.mjs`.

## 5. LGPD e privacidade

- [ ] Política de privacidade publicada e linkada no rodapé e no microcopy do formulário.
- [ ] Banner de cookies funcionando sem ID de analytics configurado (deve ficar oculto).
- [ ] Registro de bases legais por finalidade: contato comercial (legítimo interesse),
      métricas (consentimento), obrigação fiscal/contratual quando houver contrato.
- [ ] Encarregado/DPO nomeado com e-mail oficial; fluxo de request do titular documentado com
      prazo (consulta, correção, anonimização, eliminação).
- [ ] Lista de operadores/terceiros com país e finalidade (Vercel EUA, Google, Meta, HubSpot,
      Resend, Calendly) e revisão de transferências internacionais.
- [ ] Política de retenção: prazo de guarda dos leads no CRM e na planilha; logs com IP.
- [ ] Aviso de gravação/agendamento nas reuniões de diagnóstico e consentimento de depoimento
      arquivado por escrito.
- [ ] Página `/obrigado` com `noindex` (já em `src/app/obrigado/page.tsx`) e fora do sitemap.

## 6. Conteúdo e assets

- [ ] `public/og/pers-web-digital-og.jpg` (1200×630) revisada e testada no LinkedIn/WhatsApp.
- [ ] Ícones presentes em `public/` (`icon.svg`, `icon.png`, `favicon-16/32`, `apple-icon.png`,
      `site.webmanifest`) conforme referenciado em `src/app/layout.tsx`.
- [ ] Logos de clientes reais em `public/clients/<slug>.svg` para a barra de prova social
      (enquanto fictícios, remover ou substituir — risco de alegação falsa).
- [ ] Imagens `public/images/hero-visual.png` e `monitoring-visual.png` com `alt` correto e
      versão exportada de alta qualidade guardada fora do repositório.
- [ ] Remover os `.woff` do template em `src/app/fonts/` (Geist) se nada os referencia.
- [ ] Ler cada página em device real: headlines, numbers, prazos e FAQ sem contradição.

## 7. Testes de conversão

- [ ] Envio de formulário em 3 cenários: válido, com erro de campo, com rate limit (429).
- [ ] Lead aparece no destino com `serviceLabel`, `purpose` e `source` corretos.
- [ ] Exit-intent: dispara uma vez por sessão, formulário compacto envia com `purpose=exit-intent`,
      botão de fechamento e `Esc` funcionam.
- [ ] WhatsApp: todos os links abrem com a mensagem certa por contexto (desktop e mobile).
- [ ] Telefone/e-mail: `tel:` e `mailto:` abrem o app certo no iOS e no Android.
- [ ] Calendly: agenda de verdade, sem questionário quebrado, e o e-mail de confirmação chega.
- [ ] 404: `/rota-inexistente` cai em `src/app/not-found.tsx` com CTA e sem quebrar layout.

## 8. Acessibilidade (WCAG 2.2 AA)

- [ ] Navegação 100% por teclado: skip link, mega menu, drawer, accordion, modal, formulário.
- [ ] Foco visível em todos os elementos (anel `ring-tech-600` de `globals.css`) sem sobreposição.
- [ ] Contraste conferido — resolver os três pontos já identificados em `docs/03-style-guide.md`:
      branco sobre verde WhatsApp (3,03:1), hover `#25d366` (1,98:1) e `navy-400` sobre `navy-950`
      na barra legal do rodapé e no microcopy do page hero (3,80:1).
- [ ] Leitor de tela (NVDA/VoiceOver): um `h1` por página, erros anunciados com `role="alert"`,
     `aria-invalid` e `aria-describedby`; ícones decorativos silenciados.
- [ ] `prefers-reduced-motion` testado: contadores e reveals exibem conteúdo estático.
- [ ] Idioma `pt-BR` declarado (`<html lang="pt-BR">` em `src/app/layout.tsx`) e textos alt em
      todas as imagens informativas.
- [ ] Alvos de toque ≥ 44px e sem armadilha de foco no modal de saída.

## 9. Responsivo e navegadores

- [ ] iOS Safari: barra fixa de CTA não cobre o botão de envio (`safe-bottom` + respiro de
      `h-20`), sem zoom horizontal indesejado, drawer fecha corretamente.
- [ ] Android Chrome: mesmo teste, mais autofill de telefone/e-mail no formulário.
- [ ] Desktop 1280/1440/1920: mega menu, grids 12 colunas e imagens sem distorção.
- [ ] 320px de largura sem overflow horizontal em nenhuma página.
- [ ] Firefox e Edge: accordion, backdrop-blur e estados de foco.
- [ ] Impressão e "adicionar à tela inicial" (manifest) testados se o cliente usar.

## 10. Performance

- [ ] Lighthouse ≥ 90 (mobile) com LCP < 2,5 s, CLS < 0,1, TBT baixo.
- [ ] PageSpeed Insights de campo (CWV) monitorado 28 dias após o lançamento.
- [ ] Home: imagem do hero com `priority`; nada de imagem acima da dobra sem `priority`.
- [ ] Fontes com `display: swap` e sem FOIT; sem request a CDN de terceiros para fontes.
- [ ] Bundle de cliente enxuto: só header, widgets, formulário, accordion, counter e reveal.
- [ ] Cache: headers de `next.config.mjs` validados (`immutable` para assets, HTML revalidado).
- [ ] Nenhuma source map pública com segredo; `poweredByHeader: false` confirmado.

## 11. Segurança

- [ ] Headers hoje ativos em `next.config.mjs`: `X-Content-Type-Options: nosniff`,
      `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`.
- [ ] Adicionar `Strict-Transport-Security` e `Permissions-Policy` antes do go-live.
- [ ] Avaliar CSP restritiva (o site injeta GA4/GTM/Meta por `innerHTML` em `tracking.tsx`;
      uma CSP rígida precisa desses domínios na allowlist).
- [ ] `/api/lead`: confirmar que honeypot e rate limit respondem como esperado e que o endpoint
      não devolve dado de outro lead.
- [ ] Tokens de integração com escopo mínimo (HubSpot private app só para CRM) e rotação anual.
- [ ] Dependências: `npm audit` limpo e `next`/`react` em versão mantida.

## 12. Monitoramento e operação

- [ ] Uptime do domínio (Vercel ou serviço externo) a cada 1-5 min, com alerta por e-mail/WhatsApp.
- [ ] Alerta de erro em `/api/lead` (5xx) e no build (`next build` failing on PR).
- [ ] Teste sintético mensal do formulário em produção, com lead de marcação "TESTE".
- [ ] Backup: repositório Git privado + export mensal dos leads (CRM/planilha) + originais de
      design fora do repositório.
- [ ] Runbook de incidente simples: quem responde, como reverter deploy, como pausar mídia.

## 13. Comunicação interna e pós-lançamento

- [ ] Aviso interno: data/hora da virada, o que muda, onde cai o lead, quem responde primeiro.
- [ ] Treinamento de 30 min com o comercial: leitura de `purpose`/`serviceLabel`, SLA de 1 hora
      útil, roteiro de resposta padrão (o que dizer no primeiro contato).
- [ ] Acesso combinado: quem pode editar conteúdo (Git/Vercel), quem aprova texto novo.
- [ ] Publicar a mudança no LinkedIn/Instagram com 2-3 cases reais (não placeholders).
- [ ] Revisão de 7 dias: cobertura no Search Console, eventos no GA4, leads no CRM, erros.
- [ ] Revisão de 30 dias: páginas com mais cliques de CTA, perguntas de FAQ que viraram objeção
      real, custo por lead por landing, backlog de conteúdo para os próximos 90 dias.
