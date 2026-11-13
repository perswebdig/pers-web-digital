import type { IconKey } from "@/components/ui/icon";
import type { Post } from "./posts";

/**
 * BLOG — artigos de aprofundamento (autoridade + SEO)
 * Mesmo formato de `posts.ts`. Datas sempre anteriores ao post em destaque
 * para preservar a ordem de listagem e o Schema.org.
 */

export const extraPosts: Post[] = [
  {
    slug: "ti-gerenciada-ou-chamado-avulso",
    title: "TI gerenciada ou chamado avulso: a conta de 12 meses que quase ninguém faz",
    excerpt:
      "Suporte avulso parece mais barato porque a fatura só chega quando algo quebra. Coloque na planilha 12 meses de chamados, horas ociosas, documentação inexistente e risco — e a comparação muda de lado.",
    category: "Gestão",
    tags: ["TI gerenciada", "suporte avulso", "custo de TI", "SLA", "break-fix"],
    date: "2026-09-12",
    author: "Equipe Pers Web Digital",
    role: "Gestão de infraestrutura",
    icon: "gauge" as IconKey,
    related: ["suporte-ti-empresas", "consultoria-ti", "backup-e-seguranca"],
    faq: [
      {
        question: "TI gerenciada é mais barata que suporte avulso?",
        answer:
          "Na mensalidade, quase nunca. Na conta anual, geralmente sim. O contrato gerenciado custa menos por ano do que o somatório de chamados, visitas e emergências de uma operação com 20 usuários ou mais, porque elimina ocorrências repetidas e desloca o custo para prevenção. Abaixo de 8 usuários, com tudo em nuvem e sem servidor local, o modelo avulso ainda pode ser o mais econômico.",
      },
      {
        question: "Empresa que já tem um profissional interno de TI precisa de TI gerenciada?",
        answer:
          "Sim, com outro papel. O time interno continua dono das prioridades e do contato com as áreas, e o contrato entra com turno estendido, monitoramento 24/7, especialidade pontual em segurança, rede ou nuvem, e cobertura de férias e licenças. É o modelo mais comum em empresas que cresceram e perceberam que uma pessoa só não vigia infraestrutura à noite.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "TI gerenciada e chamado avulso são vendidos como produtos parecidos: nos dois, alguém resolve o problema quando ele aparece. A diferença real está em quem assume o risco nos dias em que nada acontece — e é aí que a conta de 12 meses muda de lado.",
      },
      { t: "h2", v: "Os dois modelos, sem romantismo" },
      {
        t: "p",
        v: "No avulso, também chamado de break-fix, você paga por ocorrência: o técnico vem, conserta, emite a nota e vai embora. Nada é feito sem solicitação. No gerenciado, você paga um valor recorrente por usuário e recebe um escopo contínuo, desenhado para reduzir ocorrências.",
      },
      {
        t: "ul",
        v: [
          "Avulso: custo variável e visível. Você paga quando quebra e fica sem nada nos meses silenciosos.",
          "Avulso: responsabilidade difusa. Quando a lentidão envolve link, firewall, servidor e ERP, cada fornecedor aponta para o vizinho.",
          "Gerenciado: escopo contínuo com monitoramento 24/7, aplicação de patches, verificação diária de backup e gestão de acessos.",
          "Gerenciado: contrato com metas de resposta e resolução, o que permite cobrar e obriga o fornecedor a provar o serviço.",
        ],
      },
      { t: "h2", v: "A simulação de 12 meses com 30 usuários" },
      {
        t: "p",
        v: "Cenário: 30 usuários, um servidor físico com virtualização hospedando ERP e arquivo, dois switches, firewall com VPN, e-mail em nuvem e oito notebooks em campo, sem equipe interna de TI.",
      },
      { t: "h3", v: "Modelo A — somente chamados avulsos" },
      {
        t: "p",
        v: "Média comum nesse porte: 12 ocorrências por mês. Nove atendimentos remotos a R$ 180 e três visitas a R$ 450 fecham o mês em R$ 2.970. Quatro ocorrências ao ano caem fora do horário comercial e saem a R$ 680 cada. Total do ano: R$ 38.400 em notas fiscais.",
      },
      { t: "h3", v: "Modelo B — contrato de TI gerenciada" },
      {
        t: "p",
        v: "Para 30 usuários com escopo completo, a faixa de mercado é de R$ 75 por usuário ao mês: R$ 2.250 mensais e R$ 27.000 ao ano. Entram monitoramento, atualização de sistemas, backup verificado, gestão de acessos em entradas e saídas e visitas preventivas trimestrais. Somados R$ 3.600 de projetos pontuais, o ano fecha em R$ 30.600.",
      },
      { t: "h3", v: "O custo que não aparece em nota fiscal" },
      {
        t: "p",
        v: "É aqui que a comparação se decide. No modelo A, seis incidentes ao ano pararam a operação por 3 horas em média, com 18 pessoas bloqueadas: 324 horas pagas sem produção, R$ 14.580 ao custo-hora médio de R$ 45. No modelo B, o mesmo histórico cai para dois eventos de 1,5 hora, porque disco cheio, serviço travado e certificado expirado são detectados antes de virar parada.",
      },
      {
        t: "ul",
        v: [
          "Modelo A: R$ 38.400 contratados mais R$ 14.580 de hora ociosa, cerca de R$ 53.000 no ano.",
          "Modelo B: R$ 30.600 contratados mais R$ 2.430 de hora ociosa residual, cerca de R$ 33.000 no ano.",
          "Diferença de cerca de R$ 20.000 por ano. O número que importa não é o contrato, é quanto tempo a equipe perdeu esperando TI.",
        ],
      },
      { t: "h2", v: "Tempo de resposta e documentação" },
      {
        t: "p",
        v: "No avulso, o chamado entra na fila do profissional que tem outro cliente na frente: primeira resposta entre 4 e 8 horas úteis e, quando exige peça ou reinstalação, até três dias para resolver. No gerenciado com SLA por criticidade, um incidente de nível 1, servidor indisponível ou sistema fiscal parado, costuma ter primeira resposta em 15 minutos, contorno remoto em 2 horas e visita técnica em 8 horas úteis. O avulso mede o tempo do técnico; o gerenciado mede o tempo da sua operação.",
      },
      {
        t: "p",
        v: "Depois de dois anos pagando por chamado, pouca empresa responde a três perguntas: quantos ativos existem e qual a idade deles, quais backups são restauráveis, quais credenciais seguem ativas. Sem isso, todo investimento vira aposta. O contrato gerenciado entrega essa base como obrigação:",
      },
      {
        t: "ul",
        v: [
          "Inventário com fabricante, modelo, serial, data de compra e fim do suporte.",
          "Diagrama de rede com endereçamento, VLANs, uplinks e pontos de acesso.",
          "Matriz de acessos: quem tem privilégio administrativo, contas ativas e vencimento de licenças.",
          "Política de backup com RPO e RTO por sistema e registro dos testes de restauração.",
        ],
      },
      {
        t: "quote",
        v: "Chamado avulso resolve o incidente. TI gerenciada é medida pelos incidentes que não aconteceram — e é isso que precisa estar no contrato.",
      },
      { t: "h2", v: "Risco: quem fica com a conta quando dá errado" },
      {
        t: "p",
        v: "Um ataque de ransomware é o teste definitivo dos dois modelos. No avulso, o técnico chamado no dia restaura o que o backup permitir, e a discussão sobre responsabilidade começa depois do prejuízo. No gerenciado, cópia imutável, segmentação de rede, MFA nos acessos externos e teste de restauração do trimestre são obrigações contratuais auditáveis. Sem evidência de controles, a empresa também responde sozinha por um incidente sob a LGPD, e o seguro cibernético costuma negar cobertura por falta de comprovação técnica.",
      },
      { t: "h2", v: "Quando o avulso continua sendo a escolha certa" },
      {
        t: "ul",
        v: [
          "Equipe interna madura que precisa de especialidade pontual, como auditoria de segurança ou rede sem fio.",
          "Operação com até 8 usuários, tudo em nuvem, sem servidor local e sem equipamento crítico próprio.",
          "Transição: começar com monitoramento e horas avulsas para medir a demanda real antes de fechar escopo mensal.",
          "Demanda sazonal, em que o custo anual do gerenciado supera o pico de chamados de um trimestre.",
        ],
      },
      {
        t: "p",
        v: "A pergunta que decide não é qual modelo tem o chamado mais barato: é quanto custa passar um ano sem ninguém acompanhando a infraestrutura. Some os chamados dos últimos 12 meses, as horas perdidas e o que não foi feito por falta de tempo. Se a conta do avulso ficar 50% acima do contrato gerenciado, o avulso já é o mais caro dos dois.",
      },
    ],
  },
  {
    slug: "vmware-proxmox-hyperv-como-escolher",
    title: "VMware, Proxmox ou Hyper-V: como escolher a virtualização depois da mudança de licenças",
    excerpt:
      "A reprecificação do VMware tirou o sono de quem tinha dois hosts e licença de entrada. Antes de migrar por impulso, compare custo, suporte, curva de aprendizado, caminho de migração e compatibilidade com o seu backup.",
    category: "Infraestrutura",
    tags: ["virtualização", "VMware", "Proxmox", "Hyper-V", "licenciamento"],
    date: "2026-08-27",
    author: "Equipe Pers Web Digital",
    role: "Arquitetura de infraestrutura",
    icon: "layers" as IconKey,
    related: ["servidores-e-cloud", "backup-e-seguranca", "consultoria-ti"],
    faq: [
      {
        question: "Proxmox é confiável para ambiente de produção de empresa?",
        answer:
          "Sim, desde que exista competência operacional. O Proxmox VE é um hipervisor de código aberto baseado em KVM e Debian, usado em produção há anos, com cluster, alta disponibilidade e backup incremental nativo por meio do Proxmox Backup Server. A limitação não é técnica, é de suporte: não há um único fabricante para acionar em incidente crítico, então o contrato de manutenção precisa cobrir Linux, rede e armazenamento — ou a empresa assume esse trabalho com equipe própria.",
      },
      {
        question: "Dá para migrar as máquinas virtuais do VMware sem parar a operação?",
        answer:
          "Em boa parte dos casos, sim. Os caminhos habituais são a conversão de disco no nível do backup, a importação direta de datastores VMware disponível nas versões recentes do Proxmox e a réplica assíncrona entre hosts Hyper-V. Cada máquina ainda exige uma janela de consistência de banco de dados: pare o serviço, sincronize o último delta, valide e ligue no destino. Planeje uma janela por sistema, não uma parada única de fim de semana.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "A mudança de portfólio e de licenciamento do VMware transformou uma decisão técnica em decisão orçamentária. Empresas com dois ou três hosts e um kit de entrada hoje encontram apenas pacotes por núcleo, em assinatura, com valores de duas a quatro vezes acima do contrato anterior. É uma escolha legítima do fabricante, e deixa a PME no meio do caminho. Abaixo, os critérios para escolher entre VMware, Proxmox e Hyper-V sem migrar no pânico.",
      },
      { t: "h2", v: "O que mudou no licenciamento" },
      {
        t: "ul",
        v: [
          "Fim da licença perpétua: tudo virou assinatura, anual ou plurianual.",
          "Contagem por núcleo físico, com piso mínimo por processador. Host antigo com muitas threads custa mais, mesmo sem crescimento de carga.",
          "Kits de pequeno porte saíram de linha e as edições foram consolidadas em pacotes maiores, com recursos que ninguém usa.",
          "Preço referenciado em dólar: além do reajuste, há exposição ao câmbio a cada renovação.",
        ],
      },
      {
        t: "p",
        v: "Nada disso torna o VMware uma opção ruim. Ele segue com o ecossistema mais maduro de cluster, armazenamento, compatibilidade de backup e responsabilidade de suporte. O que mudou é que deixou de ser escolha automática de quem tem ambiente pequeno e previsível.",
      },
      { t: "h2", v: "Os cinco critérios que decidem" },
      { t: "h3", v: "1. Custo total em três anos" },
      {
        t: "p",
        v: "Compare assinatura do hipervisor, licenciamento do sistema convidado e suporte de hardware. Exemplo: dois hosts de 16 núcleos cada. No Hyper-V com Windows Server Datacenter, você paga os núcleos uma vez e ganha VMs de Windows ilimitadas. No Proxmox não há custo de licença, e o gasto relevante é a assinatura opcional de suporte, por processador. No VMware, o mesmo par é medido em núcleos por ano, com renovação indefinida. Em 36 meses, a diferença costuma passar de R$ 100 mil.",
      },
      { t: "h3", v: "2. Suporte com nome e horário" },
      {
        t: "p",
        v: "Pergunte quem atende às 3h da manhã quando o cluster perde quórum. O VMware tem fabricante com contrato e chamado por severidade. A Microsoft mantém suporte integrado ao Windows Server. O Proxmox tem comunidade técnica forte e suporte por assinatura, mas não há garantia de mercado local: quem sustenta o ambiente é a sua equipe ou o seu parceiro. Se não houver ninguém capaz de ler log do Debian, isso é custo real — de horas, não de licença.",
      },
      { t: "h3", v: "3. Curva de aprendizado" },
      {
        t: "p",
        v: "Hyper-V é a menor fricção para quem já administra Windows: console de gerenciamento, PowerShell e a mesma lógica de failover clustering. Proxmox exige conforto com Linux, redes em bridge e armazenamento compartilhado; em duas semanas de uso um técnico maduro opera bem, mas o time precisa querer ler documentação. VMware tem a base de conhecimento mais ampla do mercado, o que facilita encontrar profissional — e encarece esse profissional.",
      },
      { t: "h3", v: "4. Caminho de migração" },
      {
        t: "p",
        v: "Migração de hipervisor é projeto, não procedimento. As rotas possíveis são conversão de disco a partir do backup, importação direta das VMs VMware pelos utilitários do Proxmox e réplica entre hosts Hyper-V. Em todas, o gargalo é a janela de consistência por sistema, principalmente em banco de dados. Some o custo da dupla operação, a validação funcional e o teste de retorno. Se o plano não tem rollback escrito, não é plano: é esperança.",
      },
      { t: "h3", v: "5. Ecossistema de backup e monitoramento" },
      {
        t: "p",
        v: "É o critério mais esquecido. Seu software de backup garante consistência de aplicação no hipervisor de destino? O monitoramento enxerga o cluster, e não só a máquina física? Fabricantes de ERP e sistemas fiscais costumam exigir certificação de plataforma. Valide a compatibilidade do que você não pode perder antes de escolher o hipervisor.",
      },
      { t: "h2", v: "Cenário típico por porte" },
      {
        t: "ul",
        v: [
          "Até 15 VMs, um ou dois hosts, tudo Windows e sem alta disponibilidade: Hyper-V sobre Datacenter tem o menor custo. Na edição Standard, só duas VMs Windows por host são cobertas.",
          "De 15 a 60 VMs, dois ou três hosts com failover, equipe familiarizada com Linux e sensibilidade a custo: Proxmox com Backup Server é o desenho mais comum em PMEs industriais e distribuidores regionais.",
          "Acima de 60 VMs, vários hosts, armazenamento compartilhado e exigência de suporte auditável: renegociar o VMware tende a ser melhor do que migrar. Reduza núcleos ociosos e exclua do pacote o recurso que ninguém usa.",
        ],
      },
      {
        t: "quote",
        v: "Nunca migre hipervisor para economizar na renovação. Migre quando a nova plataforma reduzir risco, tiver backup validado e alguém souber operar aquilo no dia seguinte.",
      },
      { t: "h2", v: "Plano de 90 dias, quando a migração se justifica" },
      {
        t: "ul",
        v: [
          "Dias 1 a 15: inventário de VMs com CPU, memória, disco ocupado, sistema, aplicação crítica e dono do negócio. Meça o uso médio de 30 dias, não o pico histórico.",
          "Dias 16 a 30: prova de conceito com três VMs sem impacto, uma de arquivo, uma de aplicação interna e uma de banco. Valide backup, restauração e desempenho de disco.",
          "Dias 31 a 60: migração em ondas por área, com janela comunicada, validação funcional e rollback datado para cada onda.",
          "Dias 61 a 90: desligamento dos hosts antigos após um ciclo completo de backup, atualização da documentação e revisão do custo real.",
        ],
      },
      {
        t: "p",
        v: "Uma nota final: hipervisor não é nuvem. Muitos ambientes que saíram do VMware para o Proxmox economizaram licença e mantiveram a mesma infraestrutura local, com o mesmo desafio de energia, link e suporte de hardware. Se a renegociação elevou o custo, use a oportunidade para revisar o dimensionamento. Consolidar duas máquinas superdimensionadas em uma hospedagem bem planejada costuma economizar mais do que trocar de hipervisor.",
      },
    ],
  },
  {
    slug: "migricao-para-nuvem-checklist-30-dias",
    title: "Migração para a nuvem sem surpresa: o checklist dos 30 dias",
    excerpt:
      "Metade do fracasso em migração de nuvem acontece antes do primeiro disco copiado e a outra metade três meses depois, na fatura. Um checklist em três blocos: antes, durante e depois dos 30 dias.",
    category: "Nuvem",
    tags: ["migração para nuvem", "FinOps", "cloud", "rollback", "monitoramento"],
    date: "2026-08-05",
    author: "Equipe Pers Web Digital",
    role: "Arquitetura de nuvem",
    icon: "cloud" as IconKey,
    related: ["servidores-e-cloud", "backup-e-seguranca", "consultoria-ti"],
    faq: [
      {
        question: "Migrar para a nuvem deixa a TI mais barata?",
        answer:
          "Não por padrão. A nuvem troca investimento de capital por despesa operacional e cobra proporcional ao consumo. Ela economiza quando a carga é variável, quando se desliga o que não está em uso e quando o dimensionamento é revisado. Se você copia um servidor local superdimensionado para uma instância do mesmo tamanho e mantém tudo ligado 24 horas, a fatura sobe. Modele 12 meses de custo projetado antes de migrar o primeiro sistema.",
      },
      {
        question: "Quanto tempo leva uma migração para a nuvem?",
        answer:
          "Em uma PME típica, 30 dias úteis entre o levantamento e a revisão de custo. A parte que leva mais tempo não é copiar dado: é obter janelas aprovadas com as áreas, validar rotina de negócio no destino e acompanhar a fatura por um ciclo mensal completo. Projetos com ERP certificado, múltiplas filiais ou requisitos regulatórios podem exigir de oito a doze semanas.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "Projetos de migração raramente falham no dia do corte. Falham três semanas antes, quando ninguém mapeou dependências, e três meses depois, quando a fatura veio maior e não havia dono para aquele custo. O checklist abaixo organiza o trabalho em três blocos de dez dias, com o cenário típico de uma PME: 12 máquinas virtuais, banco de dados de 400 GB, servidor de arquivos, ERP com integração fiscal e uma filial.",
      },
      { t: "h2", v: "Antes — dias 1 a 10: inventário e dependências" },
      {
        t: "p",
        v: "Nada é criado na nuvem nesta fase. O objetivo é saber o que existe, o que depende de quê e o que precisa estar respondido antes de copiar.",
      },
      {
        t: "ul",
        v: [
          "Inventário por sistema, não por servidor: aplicação, dono na área, criticidade, uso médio de CPU e memória dos últimos 30 dias e espaço em disco.",
          "Mapa de dependências: quem acessa quem, portas abertas, integrações com bancos externos, certificados, pastas de rede mapeadas e chave de licença por hardware.",
          "Volume e tempo de transferência: 400 GB em link de 200 Mbps levam cerca de 4,5 horas em condição perfeita; reserve de 10 a 12 horas por rodada de sincronização.",
          "Janela por sistema, combinada com a área: ninguém deve descobrir a janela no dia. Considere fechamento de mês e obrigações fiscais.",
          "Rollback com gatilho objetivo: se a validação falhar até a hora marcada, volta-se ao ambiente antigo pelo caminho previsto.",
          "Licenciamento: verifique se é possível trazer a licença própria ou se o provedor fornece por locação. Em Windows Server, a diferença muda a conta mensal.",
          "Custo modelado em três cenários, mínimo, esperado e pico, incluindo armazenamento, backup e tráfego de saída.",
          "Identidade e conformidade: como o usuário entra, com diretório e MFA, onde os dados ficam hospedados e qual a base legal sob a LGPD.",
        ],
      },
      {
        t: "p",
        v: "Defina a política de etiquetas agora, porque ratear custo depois é trabalho dobrado. O mínimo é área, sistema, ambiente e dono: sem etiqueta, nenhum relatório responde quem gastou o quê.",
      },
      { t: "h2", v: "Durante — dias 11 a 20: validação e segurança" },
      {
        t: "p",
        v: "Migrar é copiar, validar e só então liberar o uso. Ter ambiente novo não significa ter ambiente disponível.",
      },
      {
        t: "ul",
        v: [
          "Ondas por criticidade: primeiro sistemas internos de baixo impacto, depois arquivos, por último ERP e banco.",
          "Validação funcional com a área: emissão de nota, faturamento, relatórios, impressão e integração bancária. Teste feito só pela TI não prova nada.",
          "Validação de dados: contagem de linhas por tabela, conferência de saldo e verificação dos arquivos maiores.",
          "Teste de carga antes do corte: 40 a 60 usuários simultâneos no horário de pico, medindo latência p95 e uso de disco. Dimensionamento confirmado em laboratório evita incidente em produção.",
          "Segurança antes de liberar tráfego: gerência inacessível para a internet, papéis com menor privilégio, chaves rotacionadas, trilha de auditoria, criptografia em repouso e proteção na frente do que fica exposto.",
          "Backup já configurado no destino e um restauro executado antes de desligar a fonte.",
          "Monitoramento e alertas desde o primeiro dia: disponibilidade, CPU, espaço em disco, fila de processamento e erro de aplicação.",
        ],
      },
      { t: "h2", v: "Depois — dias 21 a 30: custo e monitoramento" },
      {
        t: "p",
        v: "É aqui que a migração é julgada pela diretoria. Nos primeiros 30 dias, revise a fatura toda semana e trate desvio como incidente.",
      },
      {
        t: "ul",
        v: [
          "Redimensionamento: se a instância ficou abaixo de 20% de CPU por duas semanas, desça um tamanho. Em 12 máquinas, isso representa 30% do custo de computação.",
          "Higiene de armazenamento: snapshot antigo, disco desanexado e endereço público ocioso são os itens que mais inflacionam a fatura.",
          "Agendamento de ambientes não produtivos: homologação e treinamento ligados 24 horas custam até 60% mais do que ligados 45 horas por semana.",
          "Tráfego de saída: revise consultas e relatórios que atravessam a rede, integrações mal escritas e cópias de backup entre regiões.",
          "Alerta de orçamento por projeto, com notificação no canal da equipe, e não apenas no painel do provedor.",
          "Desconto por compromisso de uso só depois de 60 a 90 dias de linha de base estável, e só para carga que não será redimensionada.",
          "Backup revisitado: cópia imutável, retenção por sistema, teste trimestral documentado e RPO e RTO validados no ambiente novo.",
        ],
      },
      {
        t: "quote",
        v: "Migração para nuvem não termina quando o sistema liga no destino. Termina quando alguém explica a fatura do mês e prova que restaura o que migrou.",
      },
      { t: "h2", v: "Os três erros que estouram a fatura" },
      {
        t: "p",
        v: "Primeiro: copiar tudo sem redesenhar, transformando cada servidor local em uma máquina do mesmo tamanho e congelando o superdimensionamento acumulado em anos de compra de hardware. Segundo: ninguém é dono do custo, e o crescimento fica invisível até o fechamento. Terceiro: esquecer a filial. Latência de 60 a 90 milissegundos entre matriz e nuvem muda a experiência de quem trabalha em pasta de rede mapeada; às vezes a resposta certa é manter o serviço local.",
      },
      { t: "h2", v: "Quando a nuvem não é o destino" },
      {
        t: "p",
        v: "Carga previsível e densa em disco, próxima dos usuários; sistema legado amarrado a chave de hardware; contrato de manutenção de ERP que só certifica ambiente local. Nesses casos, servidor próprio bem dimensionado ou colocation continua sendo a decisão racional. A nuvem absorve variação, crescimento e recuperação de desastre; é ruim para o que nunca muda e precisa responder em milissegundos.",
      },
      {
        t: "p",
        v: "Com o checklist preenchido, migração deixa de ser aposta e passa a ser projeto com data de saída e critérios de aceitação. Se você não responde hoje qual seria o plano de rollback, o trabalho começa no dia 1.",
      },
    ],
  },
  {
    slug: "site-institucional-que-gera-lead",
    title: "Site institucional que gera lead: os 9 blocos que faltam no seu",
    excerpt:
      "Muitos sites institucionais são catálogos bem diagramados que não pedem nada ao visitante. São nove blocos de conversão, mais velocidade, SEO local e medição até o contrato fechado.",
    category: "Digital",
    tags: ["site institucional", "conversão", "SEO local", "lead", "formulário"],
    date: "2026-07-15",
    author: "Equipe Pers Web Digital",
    role: "Estratégia digital",
    icon: "target" as IconKey,
    related: ["criacao-de-sites", "landing-pages", "consultoria-ti"],
    faq: [
      {
        question: "Quantas páginas um site institucional precisa ter?",
        answer:
          "Menos do que se imagina e mais do que o padrão de cinco páginas. A regra é uma página por intenção de busca: cada serviço relevante merece uma URL própria, com título, descrição e conteúdo que respondem à pergunta de quem pesquisa. Uma empresa de TI com seis serviços costuma funcionar bem com dez a catorze páginas somando institucional, políticas e dois ou três conteúdos de dúvidas frequentes. Quantidade sem intenção não gera tráfego.",
      },
      {
        question: "Site institucional ou landing page: qual usar?",
        answer:
          "Os dois, com funções diferentes. O site institucional sustenta a marca, o SEO local e a confiança de quem chegou por indicação ou busca orgânica. A landing page é o destino de uma campanha específica, com uma única oferta e um único caminho de ação. Mandar anúncio para a home dilui a conversão; mandar todo mundo para landing page empobrece o posicionamento orgânico.",
      },
    ],
    blocks: [
      {
        t: "p",
        v: "Existe um padrão que se repete em sites de clínicas, escritórios de contabilidade, indústrias e empresas de serviço: design aprovado, fotos bonitas, texto correto e nenhuma solicitação de contato por mês. O problema não é estética nem tráfego: o site foi feito para descrever a empresa, não para levar o visitante a um próximo passo.",
      },
      { t: "h2", v: "Por que a maioria dos sites institucionais não converte" },
      {
        t: "p",
        v: "Três causas explicam quase tudo. Primeira: a promessa genérica, que poderia ser de qualquer concorrente. Segunda: a navegação como único caminho de informação, quando boa parte dos acessos começa em uma página interna ou no perfil de empresa, não na home. Terceira: nenhum pedido claro de ação. O visitante entende quem você é, não sabe o que fazer com isso e fecha a aba.",
      },
      { t: "h2", v: "Os 9 blocos que faltam" },
      { t: "h3", v: "1. Promessa específica acima da dobra" },
      {
        t: "p",
        v: "Uma frase que diga o que você resolve, para quem e com que diferencial, em linguagem de cliente. A frase soluções integradas em tecnologia não diz nada a ninguém; infraestrutura gerenciada para indústrias com até 200 colaboradores, com SLA de 2 horas, diz. Os primeiros cinco segundos decidem se a leitura continua.",
      },
      { t: "h3", v: "2. Prova específica" },
      {
        t: "p",
        v: "Números, tempo de mercado, certificações, volume de atendimentos e depoimentos com nome, cargo e empresa, quando houver autorização. Sem citar marcas é possível provar: mais de 40 clínicas atendidas, 98% dos chamados resolvidos no mesmo dia, dez anos sem perda de dados. Prova vaga é lida como falta de prova.",
      },
      { t: "h3", v: "3. Uma página por intenção de busca" },
      {
        t: "p",
        v: "Cada serviço precisa de URL própria, com título, descrição e conteúdo que responda preço, prazo, como funciona e para quem é. Quem pesquisa suporte de TI para empresas em São Paulo não encontra resposta em uma página que fala de inovação.",
      },
      { t: "h3", v: "4. Um caminho de ação por bloco" },
      {
        t: "p",
        v: "Toda seção deve terminar em um pedido claro, com oferta de baixo atrito: solicitar diagnóstico, ver orçamento em 24 horas, falar no WhatsApp, agendar quinze minutos. Um único botão repetido no site inteiro converte menos do que três ofertas escalonadas por nível de interesse.",
      },
      { t: "h3", v: "5. Formulário curto com qualificação" },
      {
        t: "p",
        v: "Cada campo extra derruba a conclusão do formulário. Nome, empresa, telefone e uma pergunta de qualificação, como número de máquinas ou urgência, bastam. Reduzir de nove para quatro campos costuma multiplicar o volume de solicitações, e a qualidade sobe quando a última pergunta é objetiva.",
      },
      { t: "h3", v: "6. Redução de risco" },
      {
        t: "p",
        v: "É o bloco que a PME mais esquece: endereço com mapa, CNPJ, horário, quem responde pela conta, política de prazos, garantia de retrabalho sem custo e página de equipe com fotos reais. Quem contrata um serviço que toca a operação inteira precisa saber contra quem contrata.",
      },
      { t: "h3", v: "7. Conteúdo que responde às perguntas do cliente" },
      {
        t: "p",
        v: "Dúvidas frequentes em cada página de serviço, mais artigos curtos que respondam às perguntas realmente pesquisadas, com dados estruturados de FAQ. É esse conteúdo que traz tráfego orgânico qualificado e faz o visitante chegar à primeira conversa com a dúvida principal resolvida.",
      },
      { t: "h3", v: "8. Presença local" },
      {
        t: "p",
        v: "Perfil de empresa no Google preenchido e conectado ao site, o mesmo nome, endereço e telefone em todas as páginas e diretórios, avaliações com resposta e páginas por cidade atendida. Em serviço prestado geograficamente, é o bloco de maior retorno por hora de trabalho.",
      },
      { t: "h3", v: "9. Camada de medição e retorno" },
      {
        t: "p",
        v: "Eventos de conversão configurados: envio de formulário, clique no WhatsApp e clique para ligar, metas no analítico, origem registrada no CRM e resposta ao interessado em até cinco minutos no horário comercial. Site que gera lead e ninguém responde em 24 horas é tão ruim quanto site sem lead.",
      },
      {
        t: "quote",
        v: "Site institucional não é brochure digital: é a primeira reunião de vendas. E, como em toda reunião, ou você pede o próximo passo, ou o visitante marca com o concorrente.",
      },
      { t: "h2", v: "Velocidade: o bloco invisível" },
      {
        t: "p",
        v: "Nenhum dos nove blocos funciona se a página demora. Cada segundo de carregamento derruba conversão e aumenta rejeição, sobretudo no celular, que costuma ser a maioria na busca local. O custo da lentidão raramente está no servidor: está na imagem de 3 MB exportada sem compressão, no vídeo automático e em três bibliotecas de terceiros carregadas no cabeçalho.",
      },
      {
        t: "ul",
        v: [
          "Maior elemento visual carregado abaixo de 2,5 segundos em rede móvel, interação abaixo de 100 milissegundos e deslocamento de layout próximo de zero.",
          "Imagens em formato moderno e comprimido, com dimensões declaradas e carregamento sob demanda abaixo da dobra.",
          "Nada de vídeo automático na tela inicial: imagem estática com botão de reprodução e player carregado por interação.",
          "Hospedagem com cache e protocolo atual. Site institucional pequeno não precisa de servidor dedicado, precisa de configuração correta.",
        ],
      },
      { t: "h2", v: "Medir até o contrato, não até o clique" },
      {
        t: "p",
        v: "O ciclo de melhoria é curto, mas começa pela métrica errada. Troque visitas e taxa de rejeição por solicitações válidas por canal, custo por lead qualificado e prazo entre envio e atendimento. Com 90 dias de histórico por página, a decisão fica óbvia: ampliar o que gera solicitação e desligar o que não gera. Site de tráfego modesto não precisa de volume alto: cinco contatos qualificados por mês sustentam uma operação de serviços, desde que alguém responda.",
      },
      {
        t: "p",
        v: "Se for revisar o site neste trimestre, comece pelo bloco 1 e pelo bloco 9: a promessa que diz para quem é e a medição que diz se funcionou. Os outros sete blocos são trabalho de semanas, e é assim que presença digital vira canal de vendas.",
      },
    ],
  },
];
