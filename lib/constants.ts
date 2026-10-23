export const SITE = {
  name: "Metro Design",
  description: "Transformamos negócios com design e comunicação estratégica.",
  url: "https://metrodesign.com.br",
} as const;

export const CONTACT = {
  email: "contato@metrodesign.com.br",
  phone: "+55 85 99999-9999",
  whatsapp: "5585999999999",
  address: "Av. Santos Dumont, 2088 - Sl 310 - Aldeota, Fortaleza - CE, 60150-161",
} as const;

export const SOCIAL = [
  { name: "Instagram", url: "https://instagram.com/metrodesign" },
  { name: "TikTok", url: "https://tiktok.com/@metrodesign" },
  { name: "Behance", url: "https://behance.net/metrodesign" },
] as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Fale Conosco", href: "/contato" },
] as const;

export const CASE_CATEGORIES = [
  "Branding",
  "Audiovisual",
  "Comunicação",
  "Campanha",
  "Digital",
] as const;

export const ABOUT = {
  label: "Somos",
  title: "Transformamos negócios com design e comunicação estratégica.",
  paragraphs: [
    "Desde 2017, a Metro é uma agência sediada em Fortaleza com uma missão clara: impulsionar marcas e negócios através de estratégias criativas, planejamento estruturado e design com identidade.",
    "Com um time multidisciplinar, atuamos em todas as frentes da gestão de marca unindo branding, conteúdo e performance para gerar impacto real.",
    "Acreditamos em ideias com propósito, design com intenção e comunicação que conecta marcas e pessoas.",
  ],
} as const;

export const SERVICES = {
  label: "Fazemos",
  title: "Branding, conteúdo audiovisual. Estratégia do início ao fim.",
  description:
    "Na Metro, cada projeto nasce de um olhar estratégico. Trabalhamos com consistência, agilidade e profundidade criativa para construir marcas fortes, alinhadas com seus mercados e com seus públicos.",
  areas: [
    {
      title: "Branding & Design",
      items: [
        "Naming e criação de marcas",
        "Identidade visual",
        "Brand book",
        "Redesign de marcas",
      ],
    },
    {
      title: "Comunicação e Conteúdo",
      items: [
        "Planejamento estratégico",
        "Gestão de redes sociais",
        "Campanhas digitais",
        "Treinamento de equipes em branding",
      ],
    },
    {
      title: "Audiovisual & Direção Criativa",
      items: [
        "Fotografia publicitária e institucional",
        "Produção de vídeos",
        "Direção de arte para campanhas",
        "Sinalização e materiais gráficos",
      ],
    },
  ],
} as const;
export const CLIENTS = {
  label: "Clientes",
  title: "Marcas que confiam na Metro.",
} as const;
export const TAGLINE = {
  text: "Criatividade com método. Estratégia com emoção.",
} as const;
export const TESTIMONIALS = {
  label: "Clientes",
  title: "O que dizem sobre trabalhar com a Metro.",
  description:
    "Parcerias construídas com estratégia, confiança e bons resultados.",
} as const;
export const CONTACT_FORM = {
  label: "Fale Conosco",
  title: "Vamos construir algo juntos.",
  description:
    "Conte um pouco sobre o seu projeto. Respondemos em até 1 dia útil.",
  fields: {
    name: { label: "Como podemos te chamar?", placeholder: "Seu nome" },
    email: { label: "Qual o melhor e-mail?", placeholder: "voce@empresa.com" },
    company: {
      label: "Qual o nome da empresa?",
      placeholder: "Nome da empresa (opcional)",
    },
    message: {
      label: "Conta pra gente o que você precisa",
      placeholder: "Conte sobre o seu projeto...",
    },
  },
  submit: "Enviar mensagem",
} as const;
