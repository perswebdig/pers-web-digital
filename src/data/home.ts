import type { IconKey } from "@/components/ui/icon";

/**
 * CONTEÚDO DA HOME
 * ⚠️ Depoimentos, números e logos de clientes são PLACEHOLDERS realistas.
 * Substitua por dados comprováveis antes de publicar — ver docs/08.
 */

export interface Differential {
  icon: IconKey;
  title: string;
  description: string;
  proof: string;
}

export const differentials: Differential[] = [
  {
    icon: "compass",
    title: "Atendimento consultivo, de verdade",
    description:
      "Antes de vender qualquer coisa, entendemos o processo do seu negócio. Se a resposta for “não precisa de nada disso agora”, dizemos.",
    proof: "Diagnóstico gratuito com relatório de prioridades",
  },
  {
    icon: "zap",
    title: "SLA ágil, com penalidade em contrato",
    description:
      "Tempo de resposta e de solução definidos por criticidade, medidos e reportados todo mês. Se não cumprirmos, você não paga aquela faixa.",
    proof: "Primeira resposta média em menos de 8 minutos",
  },
  {
    icon: "badge",
    title: "Time certificado e multidisciplinar",
    description:
      "Infra, redes, nuvem, segurança, front-end e back-end no mesmo fornecedor — sem que você vire gerente de três contratos diferentes.",
    proof: "Certificações Microsoft, AWS, Google Cloud, ITIL e Security+",
  },
  {
    icon: "puzzle",
    title: "Solução sob medida, não pacote fechado",
    description:
      "Combinamos escopo por necessidade: servidores com suporte, ou site com manutenção, ou TI completa. Nada de contrato com 40 itens que você não usa.",
    proof: "Proposta técnica item por item, com alternativas de investimento",
  },
  {
    icon: "file",
    title: "Contrato mensal ou por projeto",
    description:
      "TI gerenciada com mensalidade previsível para a operação contínua, e escopo fechado por projeto para obras de tecnologia com começo, meio e fim.",
    proof: "Sem fidelidade obrigatória no primeiro trimestre",
  },
  {
    icon: "shield",
    title: "Segurança e LGPD desde o dia 1",
    description:
      "Backup testado, acessos com MFA, políticas documentadas e dados pessoais mapeados. Compliance é parte do serviço, não consultoria avulsa.",
    proof: "Teste de restauração trimestral com evidência anexada",
  },
];

export interface ProcessStep {
  number: string;
  icon: IconKey;
  title: string;
  duration: string;
  description: string;
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: "search",
    title: "Diagnóstico",
    duration: "Dias 1 a 3",
    description:
      "Conversa técnica com quem vive o problema no dia a dia, inventário do ambiente e leitura de riscos. Você recebe prioridades, não um catálogo de serviços.",
    deliverable: "Relatório de diagnóstico com riscos e quick wins",
  },
  {
    number: "02",
    icon: "file",
    title: "Proposta",
    duration: "Dias 4 a 7",
    description:
      "Escopo item por item, prazos, responsável, investimento e alternativas de faseamento. Sem letras miúdas nem aditivo obrigatório no meio do caminho.",
    deliverable: "Proposta técnica e comercial + cronograma",
  },
  {
    number: "03",
    icon: "rocket",
    title: "Execução",
    duration: "Semanas 2 a 8",
    description:
      "Implantação com janela definida, mudanças comunicadas antes de acontecer e testes registrados. Em projeto digital, design aprovado antes do código.",
    deliverable: "Ambiente implantado, testado e documentado",
  },
  {
    number: "04",
    icon: "activity",
    title: "Acompanhamento",
    duration: "Mês 1 a 3",
    description:
      "Monitoramento, ajustes de rota e transferência de conhecimento para seu time. Indicadores comparados com a linha de base do diagnóstico.",
    deliverable: "Dashboard de indicadores e atas de acompanhamento",
  },
  {
    number: "05",
    icon: "headset",
    title: "Suporte contínuo",
    duration: "Recorrente",
    description:
      "Help desk, NOC, manutenção evolutiva e reuniões mensais de melhoria. O que se repete vira plano de correção definitiva, não chamado novo.",
    deliverable: "Contrato de serviço com SLA e relatório mensal",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description: string;
}

export const stats: Stat[] = [
  {
    value: 120,
    suffix: "+",
    label: "empresas atendidas",
    description: "PMEs, indústrias, clínicas, escritórios e varejo desde 2016.",
  },
  {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "de uptime médio",
    description: "Medido mensalmente nos ambientes sob monitoramento 24/7.",
  },
  {
    value: 340,
    suffix: "+",
    label: "projetos entregues",
    description: "Entre migrações, implantações, sites, sistemas e aplicativos.",
  },
  {
    value: 8,
    suffix: " min",
    prefix: "<",
    label: "de primeira resposta",
    description: "Tempo médio de aceitação de incidentes críticos pelo NOC.",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  sector: string;
  initials: string;
}

/** ⚠️ PLACEHOLDERS — substitua por depoimentos reais com autorização por escrito */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Trocamos três fornecedores por um contrato só. O que mais mudou foi parar de apagar incêndio: hoje o servidor que dá problema é o do monitoramento, não o do meu time.",
    author: "Roberto Almeida",
    role: "Diretor de Operações",
    company: "Nortec Indústria",
    sector: "Indústria",
    initials: "RA",
  },
  {
    quote:
      "Dependemos de prontuário e nada pode cair no horário de consulta. Eles assumiram o servidor, o backup e o suporte — em um ano tivemos uma única parada, de minutos.",
    author: "Dra. Camila Ferraz",
    role: "Sócia-diretora",
    company: "Clínica Vitalis",
    sector: "Saúde",
    initials: "CF",
  },
  {
    quote:
      "O site antigo não gerava nada. Reescreveram a estrutura, as páginas de serviço e o formulário indo para o CRM. Agora sei de onde vem cada cliente que entra.",
    author: "André Tavares",
    role: "Sócio",
    company: "Ferraz Advocacia",
    sector: "Jurídico",
    initials: "AT",
  },
  {
    quote:
      "Tínhamos três filiais com link único e reclamação constante de Wi-Fi. Refizeram a rede por segmento, com redundância. O telefone da TI parou de tocar.",
    author: "Juliana Prado",
    role: "Coordenadora de TI",
    company: "LogPar Transportes",
    sector: "Logística",
    initials: "JP",
  },
  {
    quote:
      "A landing page nova reduziu nosso custo por lead em mais de um terço com o mesmo investimento em mídia. Testaram, mediram e ajustaram sem eu precisar pedir.",
    author: "Marcos Vinícius Rocha",
    role: "Gerente de Marketing",
    company: "Rede Bem-Estar",
    sector: "Varejo",
    initials: "MR",
  },
];

export interface CaseCard {
  slug: string;
  title: string;
  company: string;
  sector: string;
  category: "infra" | "seguranca" | "cloud" | "web" | "apps";
  problem: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
  services: string[];
  duration: string;
}

/** ⚠️ PLACEHOLDERS — troque por cases reais (ver docs/04 sobre estrutura de case) */
export const cases: CaseCard[] = [
  {
    slug: "industria-erp-sem-parada",
    title: "ERP industrial migrado para nuvem híbrida sem janela de parada",
    company: "Nortec Indústria",
    sector: "Indústria manufatureira",
    category: "cloud",
    problem:
      "Servidor físico de 8 anos sustentava o ERP e o apontamento de produção. Cada indisponibilidade parava dois turnos, e a backup falhava silenciosamente há meses.",
    solution:
      "Migração para ambiente híbrido com cluster de alta disponibilidade, firewall segmentado, replicação de banco e monitoramento 24/7. Execução em fases com testes de carga antes do corte.",
    result:
      "Produção sem interrupção no corte, recuperação de incidentes em minutos e fim das janelas de manutenção durante o dia.",
    metrics: [
      { value: "0 h", label: "parada não programada" },
      { value: "-41%", label: "custo de infra em 12 meses" },
      { value: "15 min", label: "tempo de recuperação (RTO)" },
    ],
    services: ["Servidores e Cloud", "Redes e Firewall", "Backup e Segurança"],
    duration: "10 semanas",
  },
  {
    slug: "clinica-quatro-unidades",
    title: "Quatro unidades de clínica integradas com prontuário estável e LGPD",
    company: "Clínica Vitalis",
    sector: "Saúde",
    category: "seguranca",
    problem:
      "Prontuário eletrônico com travamento em horário de pico, Wi-Fi com buracos nas salas de exame e dados sensíveis de pacientes sem inventário nem controle de acesso.",
    solution:
      "Reforma da rede com VLAN por função, servidor dedicado com replicação, MFA no acesso remoto, backup imutável e projeto de adequação à LGPD com inventário e políticas.",
    result:
      "Agenda sem travamento, equipe de enfermagem com acesso apenas ao necessário e documentação pronta para fiscalização.",
    metrics: [
      { value: "-92%", label: "chamados de prontuário" },
      { value: "100%", label: "acessos com MFA" },
      { value: "4", label: "unidades em painel único" },
    ],
    services: ["Redes e Firewall", "Backup e Segurança", "Suporte TI Empresas"],
    duration: "3 meses",
  },
  {
    slug: "escritorio-advocacia-site",
    title: "Escritório de advocacia sai do site-cartão e passa a gerar 40 leads/mês",
    company: "Ferraz Advocacia",
    sector: "Jurídico",
    category: "web",
    problem:
      "Site institucional de três páginas, sem páginas por área de atuação, sem rastreio e com formulário que chegava como e-mail perdido na caixa de entrada de um sócio.",
    solution:
      "Nova arquitetura com páginas por especialidade e por cidade, copy consultiva, blog técnico, integração com o CRM jurídico e eventos de conversão no GA4 e Meta.",
    result:
      "Tráfego orgânico qualificado crescendo mês a mês e visibilidade de quais páginas geram contrato, não só visita.",
    metrics: [
      { value: "40+", label: "leads qualificados por mês" },
      { value: "+210%", label: "tráfego orgânico em 6 meses" },
      { value: "94", label: "Lighthouse de performance" },
    ],
    services: ["Criação de Sites", "SEO técnico", "Integração com CRM"],
    duration: "7 semanas",
  },
  {
    slug: "varejo-landing-otimizada",
    title: "Rede de clínicas odontológicas corta custo por lead em 38%",
    company: "Rede Bem-Estar",
    sector: "Saúde / varejo de serviços",
    category: "web",
    problem:
      "Investimento em Meta Ads com landing page genérica, formulário longo e pixel mal configurado: a campanha otimizava para envio de formulário, não para cliente agendado.",
    solution:
      "Pesquisa de mensagem, landing page com prova social e CTA de WhatsApp, eventos de lead qualificado enviados ao CRM e ciclo de testes A/B quinzenal.",
    result:
      "Mesmo orçamento, mais agendamentos, e o algoritmo passou a buscar perfil de paciente que comparece à consulta.",
    metrics: [
      { value: "-38%", label: "custo por lead qualificado" },
      { value: "+62%", label: "taxa de conversão da página" },
      { value: "1,4 s", label: "LCP no mobile" },
    ],
    services: ["Landing Pages", "Rastreamento e GA4", "Testes A/B"],
    duration: "6 semanas + evolução contínua",
  },
  {
    slug: "logistica-app-roteirizacao",
    title: "Transportadora substitui planilha e WhatsApp por app de roteirização",
    company: "LogPar Transportes",
    sector: "Logística",
    category: "apps",
    problem:
      "Entregas combinadas por planilha em três filiais, comprovante por foto no WhatsApp e nenhum indicador confiável de pontualidade para o cliente.",
    solution:
      "Discovery de duas semanas, MVP em React Native com API integrada ao TMS, painel web de gestão, notificações e telemetria de entregas; publicação nas duas lojas.",
    result:
      "Rotas montadas em minutos, comprovante digital vinculado à ordem e indicador de pontualidade em tela para o cliente final.",
    metrics: [
      { value: "-25%", label: "tempo de planejamento de rota" },
      { value: "4,8", label: "nota dos motoristas no app" },
      { value: "12 sem.", label: "do discovery à primeira versão" },
    ],
    services: ["Aplicativos Mobile", "API e integrações", "Suporte TI Empresas"],
    duration: "12 semanas",
  },
  {
    slug: "contabil-backup-restaurado",
    title: "Escritório contábil sobrevive a ransomware sem pagar resgate",
    company: "Vetor Contábil",
    sector: "Contabilidade",
    category: "seguranca",
    problem:
      "Uma senha reutilizada em e-mail corporativo abriu caminho para criptografia em servidores de arquivos e estação fiscal. O backup existia, mas nunca havia sido testado.",
    solution:
      "Contenção remota das máquinas, isolamento de rede, restauração a partir da cópia imutável, hardening de acessos com MFA e simulado de crise com a equipe.",
    result:
      "Operação retomada em madrugada de sábado, sem pagamento de resgate, com plano de recuperação documentado e treinado.",
    metrics: [
      { value: "6 h", label: "para restaurar tudo" },
      { value: "R$ 0", label: "de resgate pago" },
      { value: "12/ano", label: "testes de restauração" },
    ],
    services: ["Backup e Segurança", "Servidores e Cloud", "Consultoria em TI"],
    duration: "Resposta em 24 h + projeto",
  },
];

export const homeFaq = [
  {
    question: "Que tamanho de empresa vocês atendem?",
    answer:
      "Nosso foco são PMEs e empresas de médio porte de 10 a 300 usuários — indústrias, clínicas, escritórios, startups, comércio e logística. Atendemos tanto quem tem equipe interna querendo apoio técnico quanto quem não tem ninguém de TI hoje.",
  },
  {
    question: "Qual a diferença entre TI gerenciada e projeto?",
    answer:
      "TI gerenciada é contrato mensal com escopo contínuo (suporte, servidores, redes, monitoramento, backup) e SLA. Projeto tem começo, meio e fim definidos, como migração de nuvem, implantação de firewall ou criação de um site. Muitas empresas combinam os dois.",
  },
  {
    question: "O diagnóstico é realmente gratuito?",
    answer:
      "Sim. A primeira conversa técnica e a lista de prioridades não têm custo nem obrigação de contratar. O que vira projeto de diagnóstico aprofundado (inventário completo, PDTI, plano de segurança) é orçado separadamente, com preço fechado.",
  },
  {
    question: "Vocês atendem fora de São Paulo?",
    answer:
      "Sim. Monitoramento, suporte remoto, consultoria e desenvolvimento são feitos para todo o Brasil. Atendimento presencial tem cobertura na Grande São Paulo e visitas programadas para outras regiões quando o escopo exige.",
  },
  {
    question: "Qual o prazo típico de resposta em um incidente?",
    answer:
      "Incidentes críticos (P1) têm primeira resposta média em menos de 8 minutos, dentro do plano com cobertura 24/7. Para chamados de usuário, o SLA típico é de 1 a 4 horas úteis, definido em contrato por criticidade.",
  },
  {
    question: "Como funciona o contrato e existe fidelidade?",
    answer:
      "Mensalidade por escopo, com ativos e nível de serviço listados no contrato. Não exigimos fidelidade no primeiro trimestre: após 30 dias de implantação você pode encerrar sem multa, e mantemos o ambiente documentado para transição.",
  },
  {
    question: "Posso contratar só o desenvolvimento, sem a parte de TI?",
    answer:
      "Pode. Site, landing page, aplicativo ou sistema web são projetos independentes. Mas muitos clientes somam a manutenção da infraestrutura — hospedagem, backup, monitoramento — porque isso afeta diretamente a estabilidade e a velocidade das páginas.",
  },
  {
    question: "Vocês têm responsabilidade legal em caso de incidente?",
    answer:
      "Trabalhamos com contrato de prestação de serviço com escopo, SLA e indicadores auditáveis, além de seguro de responsabilidade civil profissional. E, principalmente, com backup testado e plano de recuperação — prevenção antes de indenização.",
  },
  {
    question: "Como vocês lidam com LGPD na prática?",
    answer:
      "Inventário de dados pessoais, base legal, políticas de retenção e acesso, MFA nos acessos remotos, criptografia, registro de incidentes e apoio no atendimento a titulares. Para dados sensíveis de saúde, o escopo é maior e começa pelo mapa de fluxo de dados.",
  },
  {
    question: "Quanto custa começar?",
    answer:
      "Contratos de TI gerenciada para operações típicas de 20 a 50 usuários costumam partir de faixa equivalente a um técnico júnior meio período, com escopo fechado. Projetos digitais começam com discovery de preço fixo. O orçamento depende do ambiente — por isso o diagnóstico vem antes.",
  },
];

/** Selos de confiança exibidos na barra e no rodapé */
export const trustSeals = [
  { icon: "shield" as IconKey, label: "LGPD na prática" },
  { icon: "clock" as IconKey, label: "Desde 2016 no mercado" },
  { icon: "badge" as IconKey, label: "Profissionais certificados" },
  { icon: "activity" as IconKey, label: "Monitoramento 24/7" },
];
