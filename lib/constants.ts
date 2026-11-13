export const SITE = {
  name: "Metro Design",
  description: "Transformamos negócios com design, comunicação e tecnologia. Desde 2017.",
  url: "https://metrodesign.com.br",
} as const;

export const CONTACT = {
  email: "oi@metrodesign.com.br",
  phone: "(85) 2010-0883",
  whatsapp: "5585991999229",
  address: "Av. Santos Dumont, 2088, sala 310, Aldeota, Fortaleza – CE, 60150-161",
  mapsUrl: "https://www.google.com/maps/place/Metro+Design+e+Comunica%C3%A7%C3%A3o/@-3.734214,-38.5080168,17z/data=!3m1!4b1!4m6!3m5!1s0x7c74894bc356ad5:0x8d3e5bc4012e50ed!8m2!3d-3.734214!4d-38.5054419!16s%2Fg%2F11f15m6y1b",
} as const;

/**
 * Número comercial usado nos links do WhatsApp.
 * Pode ser sobrescrito por `NEXT_PUBLIC_WHATSAPP_NUMBER` (somente dígitos,
 * com DDI). Caso a variável não exista, usa o número já configurado em CONTACT.
 */
export const WHATSAPP_NUMBER =
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "") ||
  CONTACT.whatsapp;

export const SOCIAL = [
  { name: "Instagram (@metrodsgn)", url: "https://instagram.com/metrodsgn" },
  { name: "TikTok (@metrodsgn)", url: "https://tiktok.com/@metrodsgn" },
  { name: "Behance (@metrodsgn)", url: "https://behance.net/metrodsgn" },
] as const;

export const FOOTER_LINKS = [
  { label: "Início", href: "/" },
  { label: "A Metro", href: "/sobre" },
  { label: "Fazemos", href: "/fazemos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Fale", href: "/contato" },
] as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Fazemos", href: "/fazemos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Fale Conosco", href: "/contato" },
] as const;

export const ABOUT = {
  label: "Somos",
  title: "Somos a Metro Design.",
  subtitle:
    "Desde 2017, unindo estratégia, criatividade e inovação para construir marcas mais fortes e negócios com mais valor.",
  paragraphs: [
    "Nascemos em Fortaleza com uma ideia que continua guiando nosso trabalho: design e comunicação precisam ir além de uma boa estética. Precisam fazer sentido para as pessoas e gerar resultados para os negócios.",
    "Somos uma agência de design, comunicação e tecnologia. Gostamos de entender o que está por trás de cada negócio, identificar oportunidades e transformar ideias em soluções criativas, bem pensadas e orientadas a resultados.",
    "Da construção de uma marca ao seu posicionamento no mercado, combinamos pensamento estratégico, criatividade e inovação com algo que valorizamos muito: proximidade. Afinal, os melhores projetos nascem de boas conversas, confiança e trabalho em conjunto.",
    "Para nós, construir marcas é muito mais do que torná-las conhecidas. É criar valor, conquistar relevância e fazer com que sejam lembradas, escolhidas e valorizadas.",
  ],
  facts: "Desde 2017 · Estratégia, design e tecnologia · De Fortaleza para todo o Brasil",
  signature: "Building brands. Every day.",
} as const;

export const ABOUT_HERO = {
  wordmark: "sobre",
  accessibleTitle: "Sobre",
  backgroundAlt: "Pessoas reunidas em uma mesa durante uma reunião.",
} as const;

export const SERVICES = {
  label: "O que fazemos",
  title: "Quatro frentes, um pensamento integrado.",
  description:
    "Branding, conteúdo, audiovisual e tecnologia. Diferentes especialidades que se complementam, porque acreditamos que uma marca precisa fazer sentido em tudo o que diz, mostra e entrega.",
  areas: [
    {
      title: "Branding & Design",
      items: [
        "Estratégia e posicionamento de marca",
        "Naming e criação de marcas",
        "Identidade visual",
        "Brand book e diretrizes de marca",
        "Redesign e evolução de marcas",
        "Sinalização e design de materiais gráficos",
      ],
    },
    {
      title: "Comunicação & Conteúdo",
      items: [
        "Planejamento de comunicação",
        "Gestão de redes sociais",
        "Produção de conteúdo",
        "Campanhas publicitárias",
        "Gestão de tráfego pago",
        "Treinamento de equipes em branding",
      ],
    },
    {
      title: "Audiovisual & Direção Criativa",
      items: [
        "Fotografia publicitária",
        "Produção audiovisual",
        "Vídeos institucionais e comerciais",
        "Conteúdo para redes sociais",
        "Direção criativa e de arte",
        "Cobertura de eventos",
      ],
    },
    {
      title: "Produtos Digitais & Tecnologia",
      items: [
        "Sites institucionais e landing pages",
        "E-commerces",
        "Portais e plataformas digitais",
        "Plataformas SaaS",
        "Sistemas web e aplicações internas",
        "MVPs e produtos sob demanda",
        "UX/UI Design",
        "Integrações e automações",
      ],
    },
  ],
} as const;
export const CLIENTS = {
  label: "Clientes",
  titleFirstLine: "Marcas que confiam",
} as const;

export const METODOLOGIA = {
  label: "metodologia metro.",
  // TODO: escrever a frase de metodologia aprovada pela Metro.
  statement: "",
  steps: [
    // TODO: preencher com texto real.
    { title: "Pesquisa e diagnóstico", description: "" },
    // TODO: preencher com texto real.
    { title: "Estratégia", description: "" },
    // TODO: preencher com texto real.
    { title: "Planejamento e organização", description: "" },
    // TODO: preencher com texto real.
    { title: "Execução", description: "" },
  ],
} as const;

export const FAQ = {
  title: "Aqui você pode tirar suas principais dúvidas",
  items: [
    // TODO: preencher com texto real.
    { question: "o que a Metro faz?", answer: "" },
    // TODO: preencher com texto real.
    { question: "quanto preciso investir?", answer: "" },
    // TODO: preencher com texto real.
    { question: "como funciona o atendimento?", answer: "" },
    // TODO: preencher com texto real.
    { question: "para quem é a Metro?", answer: "" },
  ],
} as const;

export const CONTACT_FAQ = {
  title: "Perguntas frequentes",
  items: [
    { question: "Vocês atendem fora de Fortaleza?", answer: "Sim. Nossa sede é em Fortaleza e atendemos clientes em todo o Brasil. Reuniões e aprovações acontecem online; produções presenciais são combinadas caso a caso." },
    { question: "Preciso contratar todas as frentes?", answer: "Não. Você pode começar por uma frente só. Quando faz sentido, integramos as outras para a marca falar a mesma língua em todos os pontos de contato." },
    { question: "Quanto custa um projeto?", answer: "Depende do escopo. Uma identidade visual, uma gestão mensal de redes e uma plataforma sob medida são projetos muito diferentes. Depois do diagnóstico, você recebe uma proposta com escopo, prazo e investimento." },
    { question: "Quanto tempo leva?", answer: "Depende da entrega. O cronograma sai do diagnóstico e fica definido antes de começar." },
    { question: "Como acompanho o andamento?", answer: "Cada projeto tem etapas, prazos e pontos de aprovação definidos. Você sabe o que está sendo feito e o que depende de você." },
    { question: "Trabalham por projeto ou por mês?", answer: "Os dois. Marcas, produções e sites costumam ser projetos fechados; comunicação e conteúdo costumam ser mensais." },
    { question: "Vocês fazem só a fotografia ou o vídeo, sem a gestão de redes?", answer: "Sim, a frente de audiovisual pode ser contratada sozinha, para campanhas, ações ou materiais institucionais." },
    { question: "Vocês cuidam do tráfego pago?", answer: "Sim. Planejamos e criamos campanhas como parte da frente de Comunicação & Conteúdo." },
    { question: "Preciso ter uma marca pronta para fazer o site?", answer: "Não. Se a marca ainda não existe ou precisa evoluir, criamos marca e site juntos, no mesmo projeto." },
    { question: "Vocês fazem o design e também desenvolvem?", answer: "Sim, cuidamos da estratégia, do UX/UI e do desenvolvimento. Se você já tem um time de tecnologia, entregamos só o design. Depois que o produto vai ao ar, oferecemos suporte e evolução." },
  ],
} as const;

export const ABOUT_CTA = {
  titleLines: ["Vamos transformar", "sua marca juntos?"],
  supportStart:
    "Toda marca tem um ponto de partida, uma história para contar e um lugar onde quer chegar. ",
  supportEmphasis:
    "Com estratégia, inovação e criatividade, a gente ajuda você a construir o novo ou fortalecer o que já existe.",
  signature: "Building brands. Every day.",
} as const;

export const TAGLINE = {
  text: "Building brands. Every day · Criatividade com método · Estratégia com emoção · Resultado com identidade",
} as const;
export const TESTIMONIALS = {
  label: "Clientes",
  title: "O que dizem sobre trabalhar com a Metro.",
  description: "",
} as const;
