import type { IconKey } from "@/components/ui/icon";

/**
 * CONTEÚDO DAS LANDING PAGES DE SERVIÇO (SEO)
 * Cada entrada gera uma página completa em /<slug> a partir do template
 * `ServiceTemplate`. Para criar um novo serviço, adicione um objeto aqui.
 *
 * ⚠️ Depoimentos, métricas e nomes de clientes são PLACEHOLDERS realistas —
 * substitua por dados comprováveis antes de publicar (ver docs/08-...).
 */

export type ServiceCategory = "infra" | "dev";

export interface ServiceContent {
  slug: string;
  category: ServiceCategory;
  name: string;
  navLabel: string;
  serviceType: string;
  icon: IconKey;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  subtitle: string;
  heroBullets: string[];
  pain: { title: string; body: string; items: string[] };
  solution: { title: string; body: string };
  deliverables: { icon: IconKey; title: string; description: string }[];
  results: { metric: string; title: string; description: string }[];
  proof: { quote: string; author: string; role: string; company: string };
  faq: { question: string; answer: string }[];
  cta: { title: string; subtitle: string; microcopy: string };
  related: string[];
  audience: string;
}

export const services: ServiceContent[] = [
  // ─────────────────────────────────────────────── A) CONSULTORIA & INFRA
  {
    slug: "consultoria-ti",
    category: "infra",
    name: "Consultoria Estratégica em TI",
    navLabel: "Consultoria em TI",
    serviceType: "IT Consulting Service",
    icon: "compass",
    seoTitle:
      "Consultoria em TI para PMEs | Diagnóstico e Roadmap | Pers Web Digital",
    seoDescription:
      "Consultoria estratégica em TI com diagnóstico técnico, inventário, roadmap de 12 a 24 meses e plano de redução de custos. Atendimento consultivo com time certificado. Primeira reunião gratuita.",
    keywords: [
      "consultoria em ti",
      "consultoria de ti para pequenas empresas",
      "diagnóstico de ti",
      "planejamento estratégico de ti",
      "pdti",
      "consultor de ti são paulo",
    ],
    eyebrow: "Consultoria estratégica",
    h1: "Consultoria em TI que acaba com o modo apaga-incêndio",
    subtitle:
      "Diagnosticamos sua operação, colocamos ordem no que existe e desenhamos um roadmap de 12 a 24 meses — com custo, prazo e responsabilidade definidos. Você para de decidir TI no achismo.",
    heroBullets: [
      "Diagnóstico técnico inicial gratuito",
      "Relatório executivo com prioridades e custos",
      "Time certificado, sem terceirizado genérico",
    ],
    pain: {
      title: "A TI virou gargalo em vez de alavanca",
      body: "Se cada decisão técnica depende de improviso, sua empresa paga a conta em parada, risco e retrabalho.",
      items: [
        "Ninguém sabe ao certo o que existe de hardware, licenças e serviços contratados",
        "O sistema cai na hora do pico e a resposta vira corrida atrás de um socorrista",
        "Cada fornecedor fala uma língua e ninguém assume a visão do todo",
        "Investimento em tecnologia acontece por emergência, não por plano",
        "LGPD, backup e segurança ficam para “quando der tempo”",
      ],
    },
    solution: {
      title: "Primeiro o mapa. Depois a execução.",
      body: "Começamos com um diagnóstico estruturado da sua infraestrutura, processos e riscos. O resultado é um PDTI (Plano Diretor de TI) enxuto: o que fazer, em que ordem, quanto custa e qual impacto esperado. A partir daí você escolhe se executa com nosso time ou acompanha internamente — sem ficar refém de ninguém.",
    },
    deliverables: [
      {
        icon: "clipboard",
        title: "Diagnóstico e inventário completo",
        description:
          "Mapeamento de servidores, redes, endpoints, licenças, nuvem e contratos, com nível de maturidade por área.",
      },
      {
        icon: "map",
        title: "Roadmap de 12 a 24 meses",
        description:
          "Priorização por risco e retorno, com cronograma, investimento estimado e responsável em cada fase.",
      },
      {
        icon: "wallet",
        title: "Revisão de custos e FinOps",
        description:
          "Análise de contratos de nuvem e licenças em busca de ociosidade, sobrecontratação e melhores planos.",
      },
      {
        icon: "file",
        title: "Políticas e documentação de TI",
        description:
          "Documentos de acesso, backup, segurança e continuidade escritos em linguagem que o time entende.",
      },
      {
        icon: "gauge",
        title: "Indicadores e governança",
        description:
          "Dashboard com uptime, chamados, SLA, custo por usuário e riscos — atualizado e apresentado mensalmente.",
      },
      {
        icon: "users",
        title: "Acompanhamento executivo",
        description:
          "Reuniões mensais com a diretoria para revisar progresso, orçamento e decisões pendentes.",
      },
    ],
    results: [
      {
        metric: "-28%",
        title: "Custo de nuvem e licenças",
        description:
          "Média de redução nos primeiros 6 meses após a revisão de contratos e dimensionamento.",
      },
      {
        metric: "-54%",
        title: "Incidentes recorrentes",
        description:
          "Queda no volume de chamados do mesmo tipo depois do plano de correção estrutural.",
      },
      {
        metric: "100%",
        title: "Inventário validado",
        description:
          "Ativos, licenças e contratos mapeados e documentados antes do fim do diagnóstico.",
      },
    ],
    proof: {
      quote:
        "Saímos do “a TI é um custo” para ter um plano anual com números. Em três meses paramos de levar susto com sistema fora do ar.",
      author: "Diretor de Operações", // ⚠️ PLACEHOLDER — substitua por nome real
      role: "Indústria de médio porte",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "O que é avaliado no diagnóstico de TI?",
        answer:
          "Infraestrutura (servidores, rede, storage), nuvem e licenças, segurança e backup, rotinas de suporte, processos de atendimento e conformidade com a LGPD. Entregamos um relatório com maturidade por área, riscos críticos e quick wins.",
      },
      {
        question: "Quanto tempo leva o diagnóstico?",
        answer:
          "Para PMEs de até 150 estações, entre 2 e 3 semanas, incluindo entrevistas com áreas-chave. O relatório executivo é apresentado em reunião com a diretoria.",
      },
      {
        question: "Preciso contratar a execução depois?",
        answer:
          "Não. O plano é seu e você pode executar internamente, com outro fornecedor ou com a gente. Trabalhamos com contrato por projeto ou TI gerenciada mensal.",
      },
      {
        question: "Vocês atendem empresas fora de São Paulo?",
        answer:
          "Sim. O diagnóstico tem etapa remota e, quando necessário, visitas técnicas programadas. Atendemos todo o Brasil em consultoria e monitoramento remoto.",
      },
    ],
    cta: {
      title: "Vamos colocar sua TI em um plano?",
      subtitle:
        "Comece pelo diagnóstico gratuito: 40 minutos com um consultor e uma lista de prioridades do que vale atacar primeiro.",
      microcopy: "Sem compromisso · Resposta em até 1 hora útil",
    },
    related: ["suporte-ti-empresas", "servidores-e-cloud", "backup-e-seguranca"],
    audience: "PMEs e empresas de médio porte com operação crítica dependente de TI",
  },
  {
    slug: "servidores-e-cloud",
    category: "infra",
    name: "Servidores, Virtualização e Cloud",
    navLabel: "Servidores e Cloud",
    serviceType: "Server and Cloud Management Service",
    icon: "server",
    seoTitle:
      "Gestão de Servidores e Nuvem (AWS, Azure, GCP) | Pers Web Digital",
    seoDescription:
      "Administração de Windows Server e Linux, virtualização com VMware, Proxmox e Hyper-V, migração e gestão em AWS, Azure e Google Cloud com monitoramento 24/7 e SLA de uptime.",
    keywords: [
      "gestão de servidores",
      "administração windows server",
      "migração para aws",
      "servidor azure empresa",
      "proxmox virtualização",
      "active directory gerenciado",
      "servidor linux administração",
    ],
    eyebrow: "Infraestrutura e nuvem",
    h1: "Servidores no ar, monitorados 24/7 — local, nuvem ou híbrido",
    subtitle:
      "Assumimos a administração dos seus servidores e ambientes de nuvem: patch, monitoramento, capacity, backups e resposta a incidentes antes que o usuário perceba.",
    heroBullets: [
      "Uptime médio contratado de 99,9%",
      "Monitoramento NOC 24/7 com alerta em tempo real",
      "Migração com janela e plano de rollback documentados",
    ],
    pain: {
      title: "Servidor parado custa caro por hora",
      body: "Sem administração dedicada, o ambiente acumula pendências invisíveis até o dia em que param tudo.",
      items: [
        "Atualizações de segurança adiadas por medo de quebrar algo",
        "Disco cheio e memória esgotada descobertos pelo usuário, não pelo alerta",
        "Migração de nuvem que virou segunda conta de custo sem controle",
        "Virtualização e Active Directory “de herança”, sem documentação",
        "Ninguém sabe qual é o RPO e o RTO reais do ambiente",
      ],
    },
    solution: {
      title: "Administração com método, não com sorte",
      body: "Entramos no ciclo de manutenção do seu ambiente: janela de patch, hardening, monitoramento com bases de referência, capacity planning, automação de tarefas repetitivas e relatórios mensais. Em nuvem, assumimos o desenho, a migração e a otimização de custo com tags, budgets e alertas.",
    },
    deliverables: [
      {
        icon: "monitor",
        title: "Windows Server e Active Directory",
        description:
          "GPOs, DFS, DNS, DHCP, RDS, WSUS, cluster de failover e gestão de identidades com princípio do menor privilégio.",
      },
      {
        icon: "terminal",
        title: "Linux corporativo",
        description:
          "Ubuntu Server, Rocky, RHEL e Debian: hardening, automação com Ansible, tuning de performance e logs centralizados.",
      },
      {
        icon: "layers",
        title: "Virtualização",
        description:
          "VMware vSphere, Proxmox VE e Hyper-V com alta disponibilidade, snapshots gerenciados e plano de capacity.",
      },
      {
        icon: "cloud",
        title: "Nuvem AWS, Azure e Google Cloud",
        description:
          "Landing zone, IAM, redes privadas, autoscaling, custos com budgets e alertas, IaC com Terraform.",
      },
      {
        icon: "activity",
        title: "Monitoramento 24/7",
        description:
          "Zabbix e Grafana com verificações de serviço, synthetics, thresholds por métrica e runbook de emergência.",
      },
      {
        icon: "rocket",
        title: "Migração e modernização",
        description:
          "Estudo de viabilidade, prova de conceito, execução com janela definida, teste de carga e rollback pronto.",
      },
    ],
    results: [
      {
        metric: "99,9%",
        title: "Uptime médio do ambiente gerenciado",
        description:
          "Medido em janela mensal, com exceções registradas e plano de correção em até 5 dias úteis.",
      },
      {
        metric: "< 8 min",
        title: "Tempo de primeira resposta",
        description:
          "Média de aceitação de incidentes críticos pelo NOC, em qualquer horário do contrato.",
      },
      {
        metric: "-35%",
        title: "Custo de nuvem após FinOps",
        description:
          "Direito de instância ociosa, armazenamento esquecido e famílias de VM mal dimensionadas.",
      },
    ],
    proof: {
      quote:
        "Trocamos um servidor físico antigo por um ambiente em nuvem gerenciado. Zero parada na janela de migração e o custo fixou no que estava no orçamento.",
      author: "Gerente de TI", // ⚠️ PLACEHOLDER
      role: "Clínica com 4 unidades",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Vocês assumem um ambiente que já existe, mesmo sem documentação?",
        answer:
          "Sim. Começamos com um inventário e uma validação de estado (health check), documentamos o que encontramos e só então executamos mudanças. Ambientes “de herança” são a maioria dos nossos contratos.",
      },
      {
        question: "Qual o tamanho mínimo de contrato de gestão de servidores?",
        answer:
          "Trabalhamos a partir de 2 servidores ou 1 ambiente em nuvem. O escopo é fechado por quantidade de ativos, criticidade e janela de cobertura (comercial ou 24/7).",
      },
      {
        question: "A migração para a nuvem pode causar parada?",
        answer:
          "O plano é desenhado para janelas curtas e fora do horário comercial, sempre com rollback testado. Em média, menos de 2% das migrações usam a janela de contingência.",
      },
      {
        question: "E se o problema acontecer de madrugada ou no fim de semana?",
        answer:
          "Contratos com cobertura 24/7 têm plantão de NOC com acionamento por telefone e escalonamento em 15 minutos para incidentes críticos.",
      },
      {
        question: "Vocês trabalham com VMware mesmo depois das mudanças de licença?",
        answer:
          "Sim, e também oferecemos migração para Proxmox ou Hyper-V quando o custo do VMware deixa de fazer sentido para o seu cenário. Fazemos a comparação antes de propor.",
      },
    ],
    cta: {
      title: "Quer um ambiente que não te acorda à noite?",
      subtitle:
        "Envie a relação dos seus servidores e recebemos com um plano de administração, monitoramento e custos em até 2 dias úteis.",
      microcopy: "Diagnóstico inicial gratuito · Contrato mensal ou por projeto",
    },
    related: ["redes-e-firewall", "backup-e-seguranca", "suporte-ti-empresas"],
    audience: "Empresas com servidores próprios, ambientes virtualizados ou em nuvem",
  },
  {
    slug: "redes-e-firewall",
    category: "infra",
    name: "Redes, Wi-Fi e Firewall Corporativo",
    navLabel: "Redes e Firewall",
    serviceType: "Network and Firewall Administration Service",
    icon: "network",
    seoTitle:
      "Redes Corporativas, Wi-Fi e Firewall Gerenciado | Pers Web Digital",
    seoDescription:
      "Projeto e administração de LAN, WAN, VPN e Wi-Fi corporativo com firewall gerenciado, segmentação por VLAN, SD-WAN e monitoramento. Rede estável, segura e dimensionada para crescer.",
    keywords: [
      "administração de redes",
      "firewall corporativo gerenciado",
      "wi-fi corporativo",
      "vpn site a site",
      "sd-wan",
      "segmentação vlan",
      "projeto de rede empresa",
    ],
    eyebrow: "Conectividade e perímetro",
    h1: "Rede corporativa estável, segmentada e segura por padrão",
    subtitle:
      "Do cabeamento à política de firewall: projetamos, implementamos e administramos a rede que sustenta ERP, telefonia, câmeras, lojas e trabalho híbrido — sem “melhora por uma semana”.",
    heroBullets: [
      "Site survey de Wi-Fi com mapa de calor",
      "Segmentação por VLAN e política por perfil",
      "Firewall com regras auditadas e log central",
    ],
    pain: {
      title: "Rede ruim é aquela que ninguém consegue explicar",
      body: "Lentidão intermitente, Wi-Fi que cai em uma sala específica e acesso liberado demais são sintomas de projeto sem segmentação.",
      items: [
        "Um único domínio plano, onde um notebook infectado derruba tudo",
        "Wi-Fi com buracos de cobertura apontados pelo usuário, não por medição",
        "Regras de firewall acumuladas por anos, sem dono e sem revisão",
        "VPN que cai e força gambiarra de acesso remoto",
        "Loja ou filial sem link redundante e sem plano B",
      ],
    },
    solution: {
      title: "Projeto, segmentação e política",
      body: "Modelamos a rede por função (servidores, corporativo, IoT/câmeras, convidados, lojas), definimos segmentação em VLAN, regras de firewall por perfil de acesso e links com balanceamento ou failover. Depois documentamos e monitoramos: se algo muda, você fica sabendo antes do usuário reclamar.",
    },
    deliverables: [
      {
        icon: "network",
        title: "LAN e WAN dimensionadas",
        description:
          "Switches gerenciados, cabeamento estruturado, trunks, QoS para voz e vídeo e balanceamento de links.",
      },
      {
        icon: "wifi",
        title: "Wi-Fi corporativo",
        description:
          "Site survey com mapa de calor, controladora, autenticação 802.1X, rede de convidados isolada e roaming entre APs.",
      },
      {
        icon: "shield",
        title: "Firewall e UTM gerenciado",
        description:
          "Fortinet, Sophos, pfSense/OPNsense e Microsoft: IPS, filtros de aplicação, regras revisadas e logs centralizados.",
      },
      {
        icon: "lock",
        title: "VPN e acesso remoto",
        description:
          "Site-to-site, cliente VPN com MFA e acesso zero-trust para quem trabalha fora do escritório.",
      },
      {
        icon: "git",
        title: "SD-WAN e multi-filial",
        description:
          "Orquestração de links, failover automático e visibilidade de performance por unidade em painel único.",
      },
      {
        icon: "activity",
        title: "Monitoramento e capacity",
        description:
          "NMS com alertas de latência, perda de pacotes, uso de banda e indisponibilidade de equipamento.",
      },
    ],
    results: [
      {
        metric: "-71%",
        title: "Chamados de conectividade",
        description:
          "Redução média no primeiro trimestre após segmentação e revisão de política de acesso.",
      },
      {
        metric: "2 links",
        title: "Redundância por unidade crítica",
        description:
          "Failover testado mensalmente para que a loja ou filial nunca dependa de um único circuito.",
      },
      {
        metric: "95%",
        title: "Cobertura de Wi-Fi útil",
        description:
          "Sinal e taxa garantidos nas áreas definidas no projeto, validados por mapa de calor.",
      },
    ],
    proof: {
      quote:
        "Nossa operação de depósito vivia caindo. Depois da segmentação e do link redundante, paramos de discutir culpa e voltamos a discutir processo.",
      author: "Coordenador de Logística", // ⚠️ PLACEHOLDER
      role: "Transportadora com 3 filiais",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Qual marca de firewall vocês recomendam?",
        answer:
          "Depende do cenário e do orçamento. Trabalhamos com Fortinet e Sophos para quem quer UTM completa, pfSense/OPNsense para custo controlado e Microsoft Azure Firewall para operações já em nuvem. A recomendação vem com comparativo de custo total, não de preferência de revenda.",
      },
      {
        question: "Dá para melhorar o Wi-Fi sem trocar todos os equipamentos?",
        answer:
          "Muitas vezes sim. Primeiro fazemos o site survey: posicionamento, canais, potência e autenticação explicam a maioria dos problemas. Troca de hardware vem depois, quando o mapa de calor justifica.",
      },
      {
        question: "Vocês documentam as regras e senhas de acesso?",
        answer:
          "Sim, e isso é parte do contrato. Topologia, endereçamento, VLANs, regras de firewall, acessos e procedure de contingência ficam em repositório controlado com histórico de mudanças.",
      },
      {
        question: "É possível implantar sem parar a operação?",
        answer:
          "Trabalhamos por fases com testes em segmento isolado e mudanças fora do horário de pico. Cada fase tem critério de sucesso e reversão definida.",
      },
    ],
    cta: {
      title: "Sua rede aguenta o crescimento planejado?",
      subtitle:
        "Faça um review de conectividade: analisamos topologia, firewall e cobertura e apontamos os três primeiros ajustes de maior impacto.",
      microcopy: "Review inicial gratuito · Relatório em até 5 dias úteis",
    },
    related: ["backup-e-seguranca", "servidores-e-cloud", "suporte-ti-empresas"],
    audience: "Escritórios, indústrias, clínicas, varejo e operações multi-site",
  },
  {
    slug: "backup-e-seguranca",
    category: "infra",
    name: "Backup, Segurança da Informação e LGPD",
    navLabel: "Backup e Segurança",
    serviceType: "Backup, Cybersecurity and Compliance Service",
    icon: "shield",
    seoTitle:
      "Backup, Segurança da Informação e Adequação à LGPD | Pers Web Digital",
    seoDescription:
      "Backup 3-2-1 com cópia imutável e testes de restauração, EDR contra ransomware, MFA, disaster recovery com RTO/RPO definidos e adequação à LGPD. Segurança e continuidade para PMEs.",
    keywords: [
      "backup para empresas",
      "plano de disaster recovery",
      "proteção contra ransomware",
      "lgpd pequenas empresas",
      "segurança da informação pmе",
      "relatório de impacto lgpd",
      "backup imutável",
    ],
    eyebrow: "Proteção e conformidade",
    h1: "Backup que restaura de verdade e segurança que evita o incidente",
    subtitle:
      "Ransomware não espera o melhor momento. Implantamos backup com cópia imutável, testes de restauração programados, proteção de endpoint e um plano de recuperação com RTO e RPO assinados.",
    heroBullets: [
      "Teste de restauração documentado a cada trimestre",
      "Cópia imutável isolada do domínio",
      "Adequação à LGPD com inventário de dados",
    ],
    pain: {
      title: "A pergunta que ninguém responde: quanto tempo para voltar?",
      body: "Ter backup não é o mesmo que conseguir recuperar. A maioria dos incidentes graves expõe justamente o plano que nunca foi testado.",
      items: [
        "Fita ou disco local no mesmo ambiente que pode ser criptografado",
        "Nenhum registro de restauração bem-sucedida desde a implantação",
        "Antivírus de assinatura antiga sem proteção comportamental",
        "Acesso remoto sem MFA compartilhando credenciais entre pessoas",
        "Dados pessoais espalhados sem responsável, base legal ou prazo de retenção",
      ],
    },
    solution: {
      title: "Defesa em camadas, recuperação testada",
      body: "Aplicamos a regra 3-2-1 com uma cópia imutável e offline, EDR com resposta automatizada, MFA em acessos expostos, segmentação de rede e princípio do menor privilégio. Para o pior dia, escrevemos e treinamos o plano de contingência — com papéis definidos, RTO por sistema e comunicação a clientes e autoridades.",
    },
    deliverables: [
      {
        icon: "database",
        title: "Backup 3-2-1 com cópia imutável",
        description:
          "Rotinas locais, em nuvem e offline, retenção por política, criptografia e verificação de integridade automática.",
      },
      {
        icon: "rotate",
        title: "Testes de restauração trimestrais",
        description:
          "Recuperação real de arquivos, VMs e bancos em ambiente isolado, com relatório de tempo e integridade.",
      },
      {
        icon: "cross",
        title: "Disaster recovery e continuidade",
        description:
          "RTO e RPO por sistema, failover documentado, plano de crise com papéis e simulado anual com a equipe.",
      },
      {
        icon: "shield",
        title: "Proteção de endpoint (EDR)",
        description:
          "Detecção comportamental de ransomware, isolamento remoto de máquina e painel de conformidade dos ativos.",
      },
      {
        icon: "key",
        title: "Identidades e MFA",
        description:
          "Microsoft 365/Entra ID, MFA obrigatório em acessos externos, gestão de privilégios e revisão periódica de acessos.",
      },
      {
        icon: "scale",
        title: "Adequação à LGPD",
        description:
          "Inventário de dados, RIPD, políticas de privacidade, tratamento de solicitações de titulares e treinamento do time.",
      },
    ],
    results: [
      {
        metric: "4 h",
        title: "RTO típico de sistemas críticos",
        description:
          "Janela de recuperação acordada em contrato e validada no último simulado.",
      },
      {
        metric: "15 min",
        title: "RPO de dados operacionais",
        description:
          "Perda máxima de dados aceitável com replicação e frequência de backup ajustadas ao negócio.",
      },
      {
        metric: "12",
        title: "Testes de restauração por ano",
        description:
          "Trimestrais para todos os contratos de gerenciamento, com evidência anexada ao relatório.",
      },
    ],
    proof: {
      quote:
        "Fomos testados de verdade: um ataque ao escritório de contabilidade vizinho nos fez acionar o plano. Restauramos em madrugada, sem pagar resgate.",
      author: "Sócio-administrador", // ⚠️ PLACEHOLDER
      role: "Escritório contábil",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Minha empresa é pequena demais para ser alvo de ransomware?",
        answer:
          "Não. Ataques são automatizados e PMEs são alvo frequente justamente por terem menos defesa e mais urgência de pagamento. A maioria dos incidentes que atendemos começou em um e-mail legítimo respondido por alguém distraído.",
      },
      {
        question: "Backup em nuvem substitui o backup local?",
        answer:
          "Nenhum dos dois substitui o outro. Mantemos cópia local para recuperação rápida, cópia em nuvem para contingência e uma terceira cópia imutável/offline para o cenário de criptografia generalizada.",
      },
      {
        question: "Quanto tempo leva adequar uma PME à LGPD?",
        answer:
          "Um projeto típico leva de 6 a 10 semanas: inventário, política, ajustes técnicos, treinamento e governança mínima. Empresas com dados sensíveis de saúde exigem escopo maior.",
      },
      {
        question: "Vocês respondem pela segurança ou é só consultoria?",
        answer:
          "Assumimos responsabilidade operacional no contrato gerenciado: monitoramento, correção, backup e escalonamento, com SLA e indicadores auditáveis. O que é decisão de negócio continua com você.",
      },
    ],
    cta: {
      title: "Você sabe quanto tempo levaria para recuperar tudo?",
      subtitle:
        "Peça uma avaliação de resiliência: analisamos backup, endpoints e acessos e dizemos, com números, qual é sua exposição real hoje.",
      microcopy: "Avaliação gratuita · Relatório com plano de ação priorizado",
    },
    related: ["servidores-e-cloud", "redes-e-firewall", "consultoria-ti"],
    audience: "Clínicas, escritórios, indústrias e comércios com dados sensíveis",
  },
  {
    slug: "suporte-ti-empresas",
    category: "infra",
    name: "Suporte de TI para Empresas (Help Desk e NOC)",
    navLabel: "Suporte TI Empresas",
    serviceType: "Managed IT Support Service",
    icon: "headset",
    seoTitle:
      "Suporte de TI para Empresas com SLA | Help Desk e NOC | Pers Web Digital",
    seoDescription:
      "Help desk remoto e presencial, NOC 24/7 e TI gerenciada mensal para PMEs. Chamados por WhatsApp ou portal, SLA por criticidade, inventário de ativos e relatórios mensais.",
    keywords: [
      "suporte de ti para empresas",
      "help desk terceirizado",
      "ti gerenciada",
      "noc 24 horas",
      "suporte ti com sla",
      "suporte técnico remoto empresa",
      "outsource ti pme",
    ],
    eyebrow: "TI gerenciada",
    h1: "Help desk e NOC com SLA em contrato — sem fila e sem improviso",
    subtitle:
      "Uma equipe dedicada para seus usuários e sua infraestrutura: atendimento remoto em minutos, presencial quando precisa, e monitoramento que resolve antes do chamado abrir.",
    heroBullets: [
      "Abertura de chamado por WhatsApp, portal ou telefone",
      "SLA por criticidade com relatório mensal",
      "Contrato mensal com escopo claro, sem surpresa na fatura",
    ],
    pain: {
      title: "Suporte avulso cobra em urgência o que não cobra em prevenção",
      body: "O modelo de “chamado avulso” cria um inimigo comum: quanto menos você usa, mais caro o dia em que precisa.",
      items: [
        "Técnico freelancer sem disponibilidade garantida nem documentação",
        "Problema que se repete toda semana porque ninguém ataca a causa",
        "Onboarding de funcionário novo virando dor de uma semana inteira",
        "Sem relatório, a diretoria não sabe se o investimento vale",
        "Backup, antivírus e atualização feitos “quando sobrar tempo”",
      ],
    },
    solution: {
      title: "Um time seu, custando menos que um generalista",
      body: "Você recebe help desk de N1 a N3, NOC monitorando servidores e rede, gestão de acessos e um ponto focal que conhece sua operação. O SLA é contratual, com prioridade por criticidade e revisão mensal de indicadores — e o que se repete entra no plano de correção definitiva.",
    },
    deliverables: [
      {
        icon: "headset",
        title: "Help desk remoto e presencial",
        description:
          "Atendimento a usuários para estação, celular, e-mail, ERP e impressoras, com visitas programadas na cobertura presencial.",
      },
      {
        icon: "activity",
        title: "NOC com monitoramento ativo",
        description:
          "Servidores, rede, serviços e sites monitorados, com correção iniciada antes da reclamação do usuário.",
      },
      {
        icon: "zap",
        title: "SLA por criticidade",
        description:
          "P1, P2, P3 e P4 com tempo de resposta e de solução definidos, escalonamento e exceções auditadas.",
      },
      {
        icon: "users",
        title: "Gestão de acessos e identidade",
        description:
          "Onboarding, transferência e offboarding com checklist, criação de contas, licenças e revogação de acesso.",
      },
      {
        icon: "clipboard",
        title: "Inventário e ciclo de vida",
        description:
          "Ativos cadastrados com garantia, locação e idade, alimentando o plano de substituição anual.",
      },
      {
        icon: "chart",
        title: "Relatório mensal executivo",
        description:
          "Chamados, SLA, principais causas, topologia de incidentes, pendências e recomendações em uma página.",
      },
    ],
    results: [
      {
        metric: "< 8 min",
        title: "Primeira resposta em P1",
        description:
          "Média de aceitação de incidente crítico pelo time de plantão, dentro ou fora do horário comercial.",
      },
      {
        metric: "96%",
        title: "SLA cumprido",
        description:
          "Percentual médio de chamados resolvidos dentro do tempo contratual nos últimos 12 meses.",
      },
      {
        metric: "-40%",
        title: "Custo vs. suporte avulso",
        description:
          "Redução típica comparando o contrato mensal com o histórico de chamados avulsos e horas emergenciais.",
      },
    ],
    proof: {
      quote:
        "O que mudou foi a previsibilidade: sei quem atende, quanto tempo leva e quanto vou pagar no fim do mês. Isso vale mais que o desconto.",
      author: "Head de Administrativo", // ⚠️ PLACEHOLDER
      role: "Escritório de advocacia",
      company: "Cliente Pers Web Digital",
    },
    faq: [
      {
        question: "Como funciona o contrato de TI gerenciada?",
        answer:
          "Mensalidade por escopo (número de estações, servidores e cobertura desejada), sem limite de chamados. O contrato define SLA, canal de atendimento, ativos cobertos e responsabilidade de cada parte.",
      },
      {
        question: "Vocês atendem presencialmente?",
        answer:
          "Sim, com cobertura presencial na Grande São Paulo e visitas programadas conforme o plano. Para outras regiões, atendimento remoto com envio de técnico parceiro ou visita agendada quando necessário.",
      },
      {
        question: "Existe limite de chamados por mês?",
        answer:
          "Não. O contrato é por escopo de ativos e nível de serviço. Se o volume de chamados estiver alto, investigamos a causa raiz — é nosso interesse reduzir chamados, não faturar por chamado.",
      },
      {
        question: "Dá para começar com um período de teste?",
        answer:
          "Sim. Trabalhamos com implantação de 30 dias sem fidelidade mínima: se após o primeiro mês completo o serviço não fizer sentido, você encerra sem multa.",
      },
      {
        question: "E meus softwares específicos (ERP, PACS, fiscal)?",
        answer:
          "Cuidamos do ambiente que roda esses sistemas — banco, servidor, rede, backup, acessos — e integramos o suporte às fabricantes quando o problema é de aplicação.",
      },
    ],
    cta: {
      title: "Troque o socorrista por um time dedicado",
      subtitle:
        "Envie o número de usuários e servidores e recebemos a proposta de TI gerenciada com SLA em até 2 dias úteis.",
      microcopy: "Sem limite de chamados · Implantação em 30 dias sem fidelidade",
    },
    related: ["servidores-e-cloud", "backup-e-seguranca", "consultoria-ti"],
    audience: "PMEs de 10 a 300 usuários que dependem de TI para operar",
  },
];
