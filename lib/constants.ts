export const SITE = {
  name: "Metro Design",
  description:
    "Transformamos negócios com design e comunicação estratégica.",
  url: "https://metrodesign.com.br",
} as const;

export const CONTACT = {
  email: "contato@metrodesign.com.br",
  phone: "+55 85 99999-9999",
  whatsapp: "5585999999999",
  address: "Fortaleza - CE, Brasil",
} as const;

export const SOCIAL = [
  { name: "Instagram", url: "https://instagram.com/metrodesign" },
  { name: "TikTok", url: "https://tiktok.com/@metrodesign" },
  { name: "Behance", url: "https://behance.net/metrodesign" },
] as const;

export const NAV_LINKS = [
  { label: "Somos", href: "#somos" },
  { label: "Fazemos", href: "#fazemos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Fale Conosco", href: "#contato" },
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