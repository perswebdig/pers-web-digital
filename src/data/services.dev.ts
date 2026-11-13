import type { ServiceContent } from "./services";

/**
 * Frente B — DESENVOLVIMENTO DIGITAL
 * Landing pages SEO de sites, landing pages de conversão e aplicativos.
 * ⚠️ Métricas e depoimentos são placeholders: substitua por números reais
 * dos seus projetos antes de publicar.
 */
export const devServices: ServiceContent[] = [
  {
    slug: "criacao-de-sites",
    category: "dev",
    name: "Criação de Sites Institucionais e E-commerce",
    navLabel: "Criação de Sites",
    serviceType: "Website Development Service",
    icon: "code",
    seoTitle:
      "Criação de Sites Profissionais e E-commerce | Pers Web Digital",
    seoDescription:
      "Sites institucionais e lojas virtuais com foco em conversão: design sob medida, SEO técnico, performance 90+, integração com CRM e WhatsApp. Projeto, copy, desenvolvimento e manutenção.",
    keywords: [
      "criação de sites",
      "site institucional para empresa",
      "loja virtual e-commerce",
      "desenvolvimento de site com seo",
      "site profissional são paulo",
      "site que aparece no google",
    ],
    eyebrow: "Presença digital",
    h1: "Sites que carregam rápido, aparecem no Google e vendem todo dia",
    subtitle:
      "Não entregamos apenas um site bonito: entregamos uma página que entende de onde vem o visitante, o que ele precisa ler e qual é o próximo passo — com SEO técnico e performance medidos.",
    heroBullets: [
      "Lighthouse ≥ 90 em todas as páginas",
      "SEO técnico e dados estruturados inclusos",
      "Integração com CRM, WhatsApp e Analytics",
    ],
    pain: {
      title: "Site bonito que ninguém encontra não é ativo, é custo",
      body: "A maioria dos sites corporativos é uma versão digital do panfleto: bonito na reunião, invisível no Google e sem caminho para o contato.",
      items: [
        "Tráfego zero orgânico porque ninguém planejou as páginas de serviço",
        "Carregamento lento que derruba o anúncio pago antes da primeira dobra",
        "Formulário que não chega no CRM e telefone que ninguém atualiza",
        "Template genérico que parece o site do concorrente",
        "Sem manutenção: plugin desatualizado, certificado vencido, backup que não existe",
      ],
    },
    solution: {
      title: "Estratégia, design e engenharia no mesmo contrato",
      body: "Começamos pelo mapeamento de palavras e da concorrência, desenhamos a arquitetura de páginas que o Google precisa indexar, escrevemos a copy com seu time comercial e construímos com Next.js e Tailwind. Depois publicamos com medição: Analytics, Search Console e um plano de evolução contínua.",
    },
    deliverables: [
      {
        icon: "search",
        title: "Pesquisa de palavras-chave e arquitetura",
        description:
          "Mapa de páginas por intenção de busca, com páginas de serviço e blog estruturados para SEO local.",
      },
      {
        icon: "pen",
        title: "Copywriting de conversão",
        description:
          "Textos em português com estrutura dor → solução → resultado, CTA e microcopy de formulário.",
      },
      {
        icon: "layout",
        title: "UI design sob medida",
        description:
          "Identidade própria, componentes responsivos mobile-first e protótipo navegável antes do código.",
      },
      {
        icon: "rocket",
        title: "Desenvolvimento com Next.js + Tailwind",
        description:
          "Renderização estática, imagens otimizadas, acessibilidade AA e dados estruturados Schema.org.",
      },
      {
        icon: "plug",
        title: "Integrações de negócio",
        description:
          "Formulário → CRM, WhatsApp, Google Ads e Meta Pixel,Analytics com eventos de conversão e painel de métricas.",
      },
      {
        icon: "store",
        title: "E-commerce completo",
        description:
          "Catálogo, checkout, frete, meios de pagamento, ERP, nota fiscal e recuperação de carrinho abandonado.",
      },
      {
        icon: "wrench",
        title: "Manutenção e evolução",
        description:
          "Atualizações, backup, monitoramento de uptime, ajustes de conteúdo e relatórios de tráfego mensais.",
      },
    ],
    results: [
      {
        metric: "90+",
        title: "Lighthouse em todas as páginas",
        description:
          "Performance, acessibilidade, SEO e boas práticas medidas antes da publicação.",
      },
      {
        metric: "+180%",
        title: "Tráfego orgânico em 6 meses",
        description:
          "Média dos sites com plano de conteúdo em execução no período pós-lançamento.",
      },
      {
        metric: "3x",
        title: "Mais contatos que o site anterior",
        description:
          "Comparativo de leads por visita entre o site antigo e a nova estrutura orientada a conversão.",
      },
    ],
    proof: {
      quote:
        "O site novo virou canal de vendas: hoje recebemos pedidos por ele e sabemos exatamente quais páginas geram contato.",
      author: "Diretora Comercial", // ⚠️ PLACEHOLDER
      role: "Indústria de embalagens",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Quanto tempo leva para publicar um site institucional?",
        answer:
          "Um projeto típico de 5 a 10 páginas leva de 4 a 6 semanas: 1 semana de descoberta e arquitetura, 2 de design, 2 de desenvolvimento e ajustes, e 1 de testes, SEO final e publicação.",
      },
      {
        question: "O site é de quem? Fico preso a vocês?",
        answer:
          "Todo o código, domínios e contas são registrados em nome do cliente. Você recebe o repositório, o acesso à hospedagem e a documentação. A manutenção é opcional.",
      },
      {
        question: "Vocês fazem o conteúdo ou eu preciso enviar o texto?",
        answer:
          "Podemos escrever do zero com base em entrevistas com seu time, ou estruturar o conteúdo que você já tem. O plano básico inclui copy das páginas principais.",
      },
      {
        question: "Meu site vai aparecer no Google?",
        answer:
          "Trabalhamos com SEO técnico, conteúdo e dados estruturados — mas ranqueamento depende de concorrência, autoridade de domínio e constância. Entregamos a base correta e um plano de evolução; promessa de primeira posição é enganosa.",
      },
      {
        question: "Dá para editar o conteúdo depois?",
        answer:
          "Sim. Integramos um CMS leve (headless ou painel próprio) para que seu time troque textos, imagens e publique posts sem depender de programador.",
      },
    ],
    cta: {
      title: "Seu site atual gera contatos ou só existe?",
      subtitle:
        "Envie seu endereço atual e recebemos uma auditoria gratuita de performance, SEO e conversão com os primeiros ajustes recomendados.",
      microcopy: "Auditoria gratuita · Sem compromisso",
    },
    related: ["landing-pages", "aplicativos-mobile", "consultoria-ti"],
    audience: "PMEs, indústrias, clínicas, escritórios e comércios que precisam vender online",
  },
  {
    slug: "landing-pages",
    category: "dev",
    name: "Landing Pages de Alta Conversão",
    navLabel: "Landing Pages",
    serviceType: "Conversion Landing Page Development Service",
    icon: "target",
    seoTitle:
      "Landing Pages de Alta Conversão para Tráfego Pago | Pers Web Digital",
    seoDescription:
      "Landing pages focadas em conversão: pesquisa de mensagem, copy CRO, design, testes A/B, rastreamento de conversão e velocidade de carregamento. Integramos com Google Ads, Meta Ads e seu CRM.",
    keywords: [
      "landing page de alta conversão",
      "criar landing page para tráfego pago",
      "landing page para campanhas",
      "teste a b landing page",
      "otimização de conversão cro",
      "landing page com whatsapp",
    ],
    eyebrow: "Geração de leads",
    h1: "Landing pages feitas para transformar mídia paga em vendas",
    subtitle:
      "Você já paga pelo clique. Nosso trabalho é fazer cada clique render: mensagem certa, prova social, formulário curto e medição de conversão do anúncio ao CRM.",
    heroBullets: [
      "Testes A/B configurados desde a primeira versão",
      "Carregamento em menos de 2 segundos no 4G",
      "Conversão rastreada em GA4, Meta e no CRM",
    ],
    pain: {
      title: "O problema não é o tráfego — é a página",
      body: "Aumentar o orçamento antes de ajustar a página de destino é a forma mais cara de comprar a mesma falta de resultado.",
      items: [
        "Anúncio promete uma coisa, página fala de outra",
        "Formulário com dez campos e nenhum motivo para preencher",
        "Sem prova social, sem oferta, sem CTA claro acima da dobra",
        "Pixel e eventos mal configurados: você otimiza para o número errado",
        "Página que demora a abrir e perde metade do tráfego mobile",
      ],
    },
    solution: {
      title: "Método de CRO em ciclos curtos",
      body: "Pesquisamos o discurso do cliente, escrevemos a promessa central e desenhamos a página em blocos de decisão. Publicamos com eventos de conversão ligados, medimos por origem e iteramos a cada ciclo de 2 semanas com hipótese, variante e critério de vitória definidos.",
    },
    deliverables: [
      {
        icon: "search",
        title: "Pesquisa de mensagem",
        description:
          "Leitura de comentários, reviews e ligações de vendas para encontrar a dor e a linguagem que convertem.",
      },
      {
        icon: "pen",
        title: "Copy orientada a oferta",
        description:
          "Promessa, prova, objeções e CTA em hierarquia clara, com microcopy de formulário e mensagens de sucesso.",
      },
      {
        icon: "layout",
        title: "Design mobile-first",
        description:
          "Blocos que guiam a decisão, velocidade real no 4G e variações visuais prontas para teste.",
      },
      {
        icon: "flask",
        title: "Testes A/B e heatmaps",
        description:
          "Hipóteses priorizadas por impacto, leitura estatística e relatório do que venceu e por quê.",
      },
      {
        icon: "plug",
        title: "Rastreamento e integração",
        description:
          "GA4 com eventos, GTM, Meta Pixel, Google Ads, UTM padrão, webhook para CRM e lead scoring simples.",
      },
      {
        icon: "phone",
        title: "Conversão direta",
        description:
          "Botão de WhatsApp com mensagem pré-preenchida por campanha, clique para ligar e agendamento online.",
      },
    ],
    results: [
      {
        metric: "+42%",
        title: "Taxa de conversão média",
        description:
          "Ganho típico entre a primeira versão e a terceira iteração de testes em campanhas de leads.",
      },
      {
        metric: "< 2 s",
        title: "Tempo de carregamento mobile",
        description:
          "LCP objetivo em rede 4G, medido antes da veiculação do tráfego pago.",
      },
      {
        metric: "-31%",
        title: "Custo por lead",
        description:
          "Redução média com melhor taxa de conversão e envio de sinais qualificados ao algoritmo.",
      },
    ],
    proof: {
      quote:
        "Mantivemos o mesmo orçamento de mídia e passamos a receber quase o dobro de leads. A mudança foi a página, não o anúncio.",
      author: "Gerente de Marketing", // ⚠️ PLACEHOLDER
      role: "Rede de clínicas odontológicas",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Em quanto tempo a landing page fica pronta?",
        answer:
          "Uma landing page de campanha típica é publicada em 7 a 10 dias úteis, incluindo copy, design, desenvolvimento e configuração de rastreamento.",
      },
      {
        question: "Vocês fazem o tráfego pago também?",
        answer:
          "Criamos, medimos e otimizamos a página; a gestão de campanhas pode ser nossa parceira ou do seu time. Alinhamos a estrutura de UTMs e eventos para que qualquer gestor consiga operar.",
      },
      {
        question: "Quantos testes A/B são incluídos?",
        answer:
          "O pacote mensal inclui ciclos contínuos de teste com priorização por impacto. No projeto pontual, entregamos a versão principal e um plano de testes documentado para as duas iterações seguintes.",
      },
      {
        question: "Posso usar minha página atual como base?",
        answer:
          "Sim, mas normalmente reescrevemos a estrutura. Se a página atual tiver histórico de dados, mantemos o domínio e as UTMs para preservar o aprendizado do algoritmo.",
      },
      {
        question: "Como sei que a conversão é de qualidade?",
        answer:
          "Configuramos eventos de lead qualificado (não só envio de formulário) e enviamos o sinal ao CRM. Assim o algoritmo passa a buscar pessoas que viram cliente, não curiosos.",
      },
    ],
    cta: {
      title: "Pare de pagar por clique que não converte",
      subtitle:
        "Mande sua página atual e o resultado da última campanha: apontamos os três ajustes com maior potencial de conversão — sem custo.",
      microcopy: "Análise gratuita · Diagnóstico em até 2 dias úteis",
    },
    related: ["criacao-de-sites", "aplicativos-mobile", "consultoria-ti"],
    audience: "Negócios que investem em tráfego pago e precisam de leads qualificados",
  },
  {
    slug: "aplicativos-mobile",
    category: "dev",
    name: "Aplicativos Mobile (iOS e Android)",
    navLabel: "Aplicativos Mobile",
    serviceType: "Mobile Application Development Service",
    icon: "smartphone",
    seoTitle:
      "Desenvolvimento de Aplicativos iOS e Android | Pers Web Digital",
    seoDescription:
      "Aplicativos corporativos e de consumo em React Native, Flutter, Swift e Kotlin: discovery, MVP, integração com API, publicação nas lojas e manutenção com métricas.",
    keywords: [
      "criar aplicativo para empresa",
      "desenvolvimento de aplicativo android ios",
      "app corporativo",
      "mvp de aplicativo",
      "react native empresa",
      "aplicativo com api",
    ],
    eyebrow: "Produtos digitais",
    h1: "Aplicativos que resolvem um problema real — não um desejo de reunião",
    subtitle:
      "Começamos pelo processo que hoje funciona por planilha, WhatsApp ou papel. Do discovery ao lançamento na App Store e Google Play, com API, painel de gestão e métricas de uso desde a primeira versão.",
    heroBullets: [
      "Discovery pago e curto antes de desenvolver",
      "MVP publicável em 8 a 12 semanas",
      "Um código para iOS e Android (ou nativo quando faz sentido)",
    ],
    pain: {
      title: "O aplicativo morreu no meio do caminho",
      body: "Projetos de app costumam falhar por escopo mal definido, não por tecnologia. O resultado é orçamento estourado e uma versão que ninguém usa.",
      items: [
        "Escopo de dez funcionalidades quando uma resolveria o problema",
        "Sem definição de quem usa, quando e com que frequência",
        "Back-end improvisado que não aguenta o primeiro mês de uso",
        "Publicação nas lojas travada por requisitos e políticas",
        "Nenhum plano de manutenção, e o app morre com a próxima atualização do sistema",
      ],
    },
    solution: {
      title: "Discovery primeiro, código depois",
      body: "Em 2 semanas mapeamos fluxos, personas e restrições, e validamos a hipótese com protótipo navegável e estimativa de esforço. Só então desenvolvemos o MVP com backlog priorizado, ambiente de homologação com usuários reais e release controlado para as lojas.",
    },
    deliverables: [
      {
        icon: "compass",
        title: "Discovery e especificação",
        description:
          "Fluxos, personas, requisitos, protótipo navegável, arquitetura e estimativa de effort e custo.",
      },
      {
        icon: "smartphone",
        title: "Desenvolvimento multiplataforma",
        description:
          "React Native ou Flutter para um código em iOS e Android; Swift/Kotlin nativo quando performance exige.",
      },
      {
        icon: "plug",
        title: "API e painel administrativo",
        description:
          "Back-end escalável, autenticação, integração com ERP/CRM, painel web de gestão e controle de permissões.",
      },
      {
        icon: "rocket",
        title: "Publicação nas lojas",
        description:
          "App Store e Google Play com diretrizes, assets, screening, release faseado e telemetria de instalação.",
      },
      {
        icon: "bell",
        title: "Notificações e engajamento",
        description:
          "Push segmentado, campanhas in-app, profund links e métricas de retenção no painel.",
      },
      {
        icon: "chart",
        title: "Métricas e evolução",
        description:
          "Crash reporting, analytics de uso, roadmap pós-lançamento e pacotes mensais de manutenção e novas features.",
      },
      {
        icon: "lock",
        title: "Segurança e LGPD",
        description:
          "Armazenamento seguro de tokens, criptografia, consentimento, anonimização e exportação de dados do titular.",
      },
    ],
    results: [
      {
        metric: "12",
        title: "Semanas para o MVP",
        description:
          "Prazo típico entre discovery concluído e primeira versão pública com funcionalidade núcleo.",
      },
      {
        metric: "4,7",
        title: "Nota média nas lojas",
        description:
          "Base dos aplicativos publicados com monitoramento de qualidade e correção de crashes semanal.",
      },
      {
        metric: "-25%",
        title: "Tempo de processo interno",
        description:
          "Ganho médio em apps corporativos que substituem planilha e troca de mensagens entre equipes.",
      },
    ],
    proof: {
      quote:
        "O discovery nos fez cortar metade do escopo e lançar antes. O que ficou é exatamente o que os clientes passaram a usar toda semana.",
      author: "CEO", // ⚠️ PLACEHOLDER
      role: "Startup de logística",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Híbrido é menos profissional que nativo?",
        answer:
          "Em 2026 a diferença de qualidade para a maioria dos apps de negócio é pequena, e o custo cai bastante. Usamos nativo quando há exigência real de performance, hardware ou integração profunda com o sistema.",
      },
      {
        question: "Quanto custa desenvolver um aplicativo?",
        answer:
          "Depende do escopo. Um MVP de app corporativo com API e painel costuma partir de projetos de 3 a 6 meses de esforço dividido por squad. Depois do discovery você recebe a estimativa fechada por sprint, sem surpresa.",
      },
      {
        question: "Vocês já têm equipe interna de produto?",
        answer:
          "Montamos o squad com product owner técnico, designer, desenvolvedores mobile e back-end, com QA e DevOps compartilhados. Você fala com um ponto focal.",
      },
      {
        question: "E depois do lançamento?",
        answer:
          "Oferecemos contrato mensal de manutenção: correções, adaptação a novas versões do sistema, atualização de bibliotecas de segurança, evolução de features e leitura de métricas.",
      },
      {
        question: "O app pode integrar com meu ERP e meu site?",
        answer:
          "Sim — integrações via API são parte do escopo típico. Se seu sistema não tem API documentada, incluímos a camada de integração no projeto e no plano de manutenção.",
      },
    ],
    cta: {
      title: "Tire a ideia do papel com escopo e prazo definidos",
      subtitle:
        "Comece pelo discovery: em duas semanas você tem protótipo, arquitetura e orçamento fechado por sprint.",
      microcopy: "Discovery com preço fechado · Sem fidelidade",
    },
    related: ["criacao-de-sites", "landing-pages", "servidores-e-cloud"],
    audience: "Startups, indústrias, varejo e operações internas que precisam de app próprio",
  },
];
