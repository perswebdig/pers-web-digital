import type { IconKey } from "@/components/ui/icon";

/**
 * BLOG — conteúdo de autoridade + SEO
 * Os artigos são data-driven (sem CMS) para máxima performance.
 * Para publicar um novo artigo, adicione um objeto ao array `posts`
 * ou a `posts.more.ts` e defina `date`, `slug` e `blocks`.
 */

export type Block =
  | { t: "p"; v: string }
  | { t: "h2"; v: string }
  | { t: "h3"; v: string }
  | { t: "ul"; v: string[] }
  | { t: "quote"; v: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: "Infraestrutura" | "Segurança" | "Nuvem" | "Digital" | "Gestão";
  tags: string[];
  date: string; // ISO — alimenta a ordem de listagem e o Schema.org
  author: string;
  role: string;
  icon: IconKey;
  /** slugs de serviço relacionados exibidos como CTA no fim do artigo */
  related: string[];
  featured?: boolean;
  faq?: { question: string; answer: string }[];
  blocks: Block[];
}

export const corePosts: Post[] = [
  {
    slug: "custo-real-servidor-parado",
    title: "Quanto custa, em reais, um servidor parado por uma hora",
    excerpt:
      "A conta que quase ninguém faz antes de investir em infraestrutura: minutos de parada multiplicados por vendas, folha e reputação. Veja como calcular o seu e o que isso diz sobre o seu SLA.",
    category: "Infraestrutura",
    tags: ["uptime", "SLA", "custo de TI", "continuidade"],
    date: "2026-10-21",
    author: "Equipe Pers Web Digital",
    role: "Consultoria de infraestrutura",
    icon: "server",
    related: ["servidores-e-cloud", "suporte-ti-empresas", "backup-e-seguranca"],
    featured: true,
    faq: [
      {
        question: "O que é RTO e RPO?",
        answer:
          "RTO (Recovery Time Objective) é o tempo máximo aceitável para voltar a operar depois de um incidente. RPO (Recovery Point Objective) é a quantidade máxima de dados que você aceita perder, medida em tempo. Um RTO de 4 horas com RPO de 15 minutos significa recuperar o serviço em até 4 horas perdendo no máximo 15 minutos de lançamentos.",
      },
      {
        question: "Toda empresa precisa de RTO definido?",
        answer:
          "Toda empresa que tem um processo que para de gerar receita ou criar risco quando o sistema cai. Definir RTO por sistema — e não para a empresa inteira — é o que torna o investimento em infraestrutura proporcional ao problema.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "Quando um servidor para, a primeira reação técnica é medir o incidente em minutos de indisponibilidade. O problema é que a empresa não perde minutos: perde pedidos, horas de produção, faturamento de prazo e, em alguns setores, confiança de cliente. Este artigo mostra como transformar indisponibilidade em número — porque sem número não existe decisão de investimento em TI.",
      },
      { t: "h2", v: "A conta que quase ninguém faz" },
      {
        t: "p",
        v: "O custo de uma hora parada tem quatro camadas. Some todas e o resultado costuma ser bem maior do que a mensalidade do serviço que resolveria o problema.",
      },
      {
        t: "ul",
        v: [
          "Receita direta não realizada: vendas por hora em e-commerce, agendamentos, ordens de serviço ou notas emitidas. Em operação comercial, é a camada mais fácil de medir e a que mais assusta.",
          "Hora ociosa de quem não consegue trabalhar: uma equipe de 12 pessoas parada por 40 minutos consome 8 horas de trabalho pago sem produção.",
          "Retrabalho e recuperação: conciliar lançamentos perdidos, reenviar documentos, refazer apontamentos de produção e reabrir atendimentos.",
          "Custo reputacional: cliente que espera, fornecedor que reclama em grupo de WhatsApp e a perda de negociação futura que não aparece no relatório.",
        ],
      },
      {
        t: "quote",
        v: "Se você não sabe quanto custa uma hora de parada, não tem como dizer se o SLA de 4 horas é caro ou barato. A decisão sobre infraestrutura só é racional depois dessa conta.",
      },
      { t: "h2", v: "Exemplo prático: os três tipos de operação" },
      { t: "h3", v: "1. E-commerce com 250 pedidos/dia e ticket médio de R$ 180" },
      {
        t: "p",
        v: "São cerca de R$ 45 mil por dia e R$ 5.600 por hora em regime comercial. Uma parada de 90 minutos em horário de pico derruba R$ 8,4 mil de faturamento — sem contar o carrinho abandonado que não volta. Uma taxa de conversão que cai 10% no mês seguinte por percepção de instabilidade completa o estrago.",
      },
      { t: "h3", v: "2. Indústria com dois turnos e apontamento por coletor" },
      {
        t: "p",
        v: "Aqui a parada não é só venda: é linha. Se o apontamento de produção para, o estoque de semiacabados diverge, a ordem de produção perde sequência e o faturamento do lote atrasa. Em duas horas, o prejuízo combina hora extra para recuperar produção, frete emergencial para cumprir prazo e risco de multa contratual com o cliente.",
      },
      { t: "h3", v: "3. Clínica com 60 consultas/dia e prontuário eletrônico" },
      {
        t: "p",
        v: "Sem prontuário, o atendimento vira papel: recepcionista preenche, médico digita depois, e a clínica perde 3 a 5 consultas por turno em capacidade. Some o risco de erro de medicação e a exposição de dado sensível fora de sistema controlado — aí o custo deixa de ser só financeiro e passa a ser regulatório.",
      },
      { t: "h2", v: "Como transformar isso em orçamento de TI" },
      {
        t: "p",
        v: "Defina RTO e RPO por sistema, não para a empresa inteira. Depois compare o custo de cada hora parada com o custo anual de evitá-la.",
      },
      {
        t: "ul",
        v: [
          "Liste os sistemas que sustentam receita ou conformidade (ERP, e-commerce, prontuário, WMS, fiscal) e estime a receita ou a produtividade por hora de cada um.",
          "Estabeleça o RTO aceitável com a área de negócio, não com a TI. Se a resposta for “uma hora é inaceitável”, o desenho da solução muda completamente.",
          "Calcule o custo de alternativas: servidor com alta disponibilidade, replicação de banco, backup imutável com restauração testada, monitoramento 24/7 e link redundante.",
          "Compare o custo anual de cada alternativa com a perda esperada (probabilidade de parada × custo por hora). Aí a mensalidade de TI gerenciada deixa de parecer gasto.",
        ],
      },
      {
        t: "p",
        v: "Em contratos de TI gerenciada, essa conta costuma aparecer na primeira reunião. Não porque o cliente precise dela — mas porque é ela que define se o plano de ação começa por alta disponibilidade, por backup, por rede ou por suporte. Na dúvida, comece pelo que evita a parada e pelo que garante que você consegue voltar: monitoramento e teste de restauração.",
      },
    ],
  },
  {
    slug: "lgpd-para-pmes-nao-e-documento",
    title: "LGPD para PMEs não é documento na gaveta: são 7 controles técnicos",
    excerpt:
      "Adequação à LGPD costuma virar pilha de política que ninguém segue. O caminho inverso funciona melhor: comece pelos controles técnicos que reduzem risco real e depois documente.",
    category: "Segurança",
    tags: ["LGPD", "segurança da informação", "compliance", "dados sensíveis"],
    date: "2026-09-30",
    author: "Equipe Pers Web Digital",
    role: "Segurança e conformidade",
    icon: "scale",
    related: ["backup-e-seguranca", "redes-e-firewall", "consultoria-ti"],
    faq: [
      {
        question: "PME também precisa se adequar à LGPD?",
        answer:
          "Sim. A Lei Geral de Proteção de Dados se aplica a qualquer operação que trate dados pessoais de pessoas no Brasil, independentemente do porte ou do faturamento. O que muda é a proporcionalidade dos controles e o volume de obrigações documentais.",
      },
      {
        question: "Quem é o encarregado (DPO) em uma empresa pequena?",
        answer:
          "Pode ser um colaborador interno indicado formalmente ou um encarregado terceirizado. Em PMEs, o modelo mais comum é um DPO as a service, que atende solicitações de titulares, mantém o registro das operações e apóia em incidentes.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "Quando falamos de LGPD com donos de PME, a primeira associação costuma ser documento: política de privacidade, termo de consentimento, contrato de operador. Nada disso é inútil — mas, sozinho, não reduz o risco de um incidente. O que evita multa, vazamento e paralisação é um conjunto pequeno de controles técnicos que a maioria das empresas ainda não tem.",
      },
      { t: "h2", v: "Os 7 controles que importam antes da papelada" },
      {
        t: "ul",
        v: [
          "Inventário de dados: onde estão os dados pessoais (CRM, planilhas, pastas de rede, e-mails, WhatsApp corporativo, sistemas legados). Sem mapa, não há o que proteger.",
          "Controle de acesso por função: quem acessa o quê, com princípio do menor privilégio. Acesso de ex-funcionário e senha compartilhada são as portas de entrada mais comuns.",
          "MFA nos acessos externos: e-mail corporativo, VPN, painel administrativo e área financeira. Um e-mail comprometido abre caminho para a rede inteira.",
          "Criptografia e proteção de endpoint: disco cifrado em máquinas portáteis, EDR com resposta automatizada e política de atualização que não depende de alguém lembrar.",
          "Backup com cópia imutável e teste de restauração: no pior cenário, a escolha é restaurar ou negociar. Restaurar é sempre mais barato.",
          "Registro e retenção: logs de acesso, trilha de auditoria e prazo definido para cada tipo de dado. Excluir também é obrigação.",
          "Processo de atendimento ao titular: fluxo claro para pedido de acesso, correção e exclusão, com prazo e responsável. É o item mais fiscalizado e o mais improvisado.",
        ],
      },
      { t: "h2", v: "Onde a PME realmente erra" },
      {
        t: "p",
        v: "Não é no texto da política. É na planilha de clientes que circula entre cinco pessoas por WhatsApp, no servidor com RDP exposto à internet, na pasta de rede onde o RH guarda folha e laudo médico, e no backup que nunca foi restaurado para ver se funciona. Cada um desses pontos é incidente esperando horário comercial.",
      },
      {
        t: "quote",
        v: "A LGPD é a primeira vez que a empresa precisa provar, com evidência, o que a TI sempre afirmou fazer por cima.",
      },
      { t: "h2", v: "Um projeto proporcional, em 6 a 10 semanas" },
      {
        t: "p",
        v: "O desenho que funciona em PMEs começa com o inventário (1 a 2 semanas), segue para os controles técnicos prioritários (3 a 4 semanas), e só então documenta políticas, treinamentos e governança mínima. Termina com um plano de resposta a incidentes testado — porque no dia do incidente, o que salva é o que foi ensaiado.",
      },
      {
        t: "p",
        v: "Empresas que tratam dados sensíveis de saúde ou de folha exigem escopo maior, com avaliação de impacto (RIPD) e medidas reforçadas de segregação. Se esse é o seu caso, comece pelo fluxo de dados: é ele que revela onde está a exposição.",
      },
    ],
  },
];
