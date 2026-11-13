/**
 * ═══════════════════════════════════════════════════════════════════════
 * CONFIGURAÇÃO CENTRAL DA MARCA — PERS WEB DIGITAL
 * ═══════════════════════════════════════════════════════════════════════
 * ⚠️  TODOS OS CAMPOS MARCADOS COM `// TODO` SÃO PLACEHOLDERS REALISTAS.
 *     Substitua pelos dados reais da empresa ANTES de publicar o domínio
 *     final. Basta editar este arquivo: ele alimenta todo o site
 *     (conteúdo, SEO, Schema.org, WhatsApp, rodapé e Google Business).
 *
 *     Uma busca rápida por `TODO` neste repositório lista todos os pontos
 *     de substituição:  grep -rn "TODO" src/
 * ═══════════════════════════════════════════════════════════════════════
 */

export const site = {
  name: "Pers Web Digital",
  shortName: "Pers Web",
  legalName: "Pers Web Digital Tecnologia LTDA", // TODO: razão social real
  cnpj: "42.318.907/0001-55", // TODO: CNPJ real
  foundedYear: 2016, // TODO: ano de fundação real
  slogan: "TI sólida. Presença digital que converte.",

  /** Domínio de produção — usado em canonical, sitemap e Open Graph */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://pers-web-digital.vercel.app", // TODO: domínio próprio (ex.: https://perswebdigital.com.br)

  defaultTitle: "Pers Web Digital | Consultoria de TI, Infraestrutura e Desenvolvimento",
  defaultDescription:
    "Consultoria em TI, gestão de servidores e nuvem, redes, firewall e backup, além de criação de sites, landing pages e aplicativos. TI gerenciada com SLA para PMEs. Diagnóstico gratuito.",

  /** ⚠️ PLACEHOLDER — troque por um número real com DDI 55 */
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE
    ? process.env.NEXT_PUBLIC_PHONE.replace("+55", "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
    : "(11) 4000-0000", // TODO
  phoneE164: process.env.NEXT_PUBLIC_PHONE ?? "+551140000000", // TODO
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? "5511999990000", // TODO: DDI + DDD + número

  /** ⚠️ PLACEHOLDER */
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contato@perswebdigital.com.br", // TODO
  emailSuporte: "suporte@perswebdigital.com.br", // TODO

  /** Agendamento de conversa (Calendly / Google Appointment) — ⚠️ PLACEHOLDER */
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/perswebdigital/diagnostico", // TODO

  address: {
    street: "Rua dos Pinheiros, 1.234 — 7º andar", // TODO
    district: "Pinheiros", // TODO: bairro (SEO local)
    city: "São Paulo", // TODO
    state: "SP", // TODO
    postalCode: "05422-000", // TODO
    country: "BR",
  },

  /** Coordenadas do escritório — ⚠️ PLACEHOLDER (usado no Schema LocalBusiness e no mapa) */
  geo: { lat: -23.5613, lng: -46.6883 }, // TODO

  hours: "Segunda a sexta, das 9h às 18h", // TODO
  slaResponse: "1 hora útil",

  social: {
    instagram: "https://instagram.com/perswebdigital", // TODO
    linkedin: "https://linkedin.com/company/perswebdigital", // TODO
    facebook: "https://facebook.com/perswebdigital", // TODO
    youtube: "https://youtube.com/@perswebdigital", // TODO
  },

  /** Abrangência de atendimento — alimenta SEO local e copy */
  serviceAreas: [
    "São Paulo e Grande SP",
    "Todo o Brasil (atendimento remoto)",
    "América Latina (projetos de desenvolvimento)",
  ],

  /** Selos exibidos na barra de confiança e no rodapé */
  certifications: [
    "Microsoft Certified: Azure Administrator",
    "AWS Certified Solutions Architect",
    "Google Cloud Certified",
    "ITIL 4 Foundation",
    "CompTIA Security+",
  ],

  /**
   * Logos de clientes/certificações da barra social proof.
   * ⚠️ PLACEHOLDER: nomes fictícios. Substitua por marcas reais e envie
   * os arquivos SVG em /public/clients/ usando o mesmo nome de `slug`.
   */
  clients: [
    { name: "Nortec Indústria", sector: "Indústria" },
    { name: "Clínica Vitalis", sector: "Saúde" },
    { name: "Ferraz Advocacia", sector: "Jurídico" },
    { name: "LogPar Transportes", sector: "Logística" },
    { name: "Vetor Contábil", sector: "Contabilidade" },
    { name: "Rede Bem-Estar", sector: "Varejo" },
    { name: "Ipê Cosméticos", sector: "E-commerce" },
    { name: "Studio Arkitet", sector: "Arquitetura" },
  ],

  nav: {
    solutions: [
      { label: "Infraestrutura e Consultoria de TI", href: "/infraestrutura" },
      { label: "Desenvolvimento Digital", href: "/desenvolvimento" },
      { type: "divider" as const },
      { label: "Consultoria em TI", href: "/consultoria-ti" },
      { label: "Servidores e Cloud", href: "/servidores-e-cloud" },
      { label: "Redes e Firewall", href: "/redes-e-firewall" },
      { label: "Backup e Segurança (LGPD)", href: "/backup-e-seguranca" },
      { label: "Suporte TI para Empresas", href: "/suporte-ti-empresas" },
      { type: "divider2" as const },
      { label: "Criação de Sites", href: "/criacao-de-sites" },
      { label: "Landing Pages", href: "/landing-pages" },
      { label: "Aplicativos Mobile", href: "/aplicativos-mobile" },
    ],
    main: [
      { label: "Soluções", href: "/infraestrutura", mega: true },
      { label: "Como trabalhamos", href: "/#como-trabalhamos" },
      { label: "Cases", href: "/cases" },
      { label: "Blog", href: "/blog" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
} as const;

/** Mensagens pré-preenchidas de WhatsApp por contexto de conversão */
export const waMessages: Record<string, string> = {
  default: "Olá, Pers Web Digital! Vim pelo site e gostaria de entender como vocês podem ajudar minha empresa.",
  orcamento:
    "Olá! Quero solicitar um orçamento. Pode me explicar como funciona o diagnóstico gratuito?",
  infraestrutura:
    "Olá! Tenho interesse nos serviços de infraestrutura e consultoria de TI (servidores, redes, cloud).",
  desenvolvimento:
    "Olá! Tenho interesse em desenvolvimento digital (site, landing page ou aplicativo).",
  suporte:
    "Olá! Preciso de suporte de TI para minha empresa. Podemos falar sobre o plano gerenciado?",
  obrigado: "Olá! Acabei de enviar o formulário do site e quero dar continuidade.",
};
