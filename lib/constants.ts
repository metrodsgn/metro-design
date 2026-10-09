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
export const REEL = {
  label: "Reel",
  videoSrc: "/videos/video.mp4",
  poster: "/videos/reel-poster.jpg",
} as const;
export const PROJECTS = {
  label: "Jobs",
  title: "Projetos selecionados.",
  cta: { label: "Ver mais cases", href: "/projetos" },
  items: [
    { slug: "bm9-photoshoot", title: "BM9 Photoshoot", category: "Audiovisual", initial: "B" },
    { slug: "deza-arquitetura", title: "DEZA Arquitetura", category: "Branding", initial: "D" },
    { slug: "flavio-rocha", title: "Flávio Rocha", category: "Branding", initial: "F" },
    { slug: "kazui", title: "Kazui", category: "Branding", initial: "K" },
    { slug: "salvo-burguer", title: "Salvo Burguer", category: "Branding", initial: "S" },
    { slug: "hifive", title: "HiFive", category: "Comunicação", initial: "H" },
    { slug: "nba-store", title: "NBA Store", category: "Campanha", initial: "N" },
    { slug: "crocobeach", title: "Crocobeach", category: "Branding", initial: "C" },
    { slug: "natessential", title: "NatEssential", category: "Branding", initial: "N" },
  ],
} as const;
export const METRUS = {
  label: "Metrus",
  title: "Aprovação de posts sem WhatsApp, sem e-mail, sem estresse.",
  description:
    "A Metrus é nossa ferramenta própria que centraliza a aprovação de conteúdo. O cliente vê os posts, comenta, aprova ou pede alteração — tudo em um lugar só, com histórico e sem ruído de comunicação.",
  cta: { label: "Fale conosco", href: "#contato" },
  mockups: [
    {
      title: "Campanha de lançamento",
      status: "approved" as const,
      statusLabel: "Aprovado",
    },
    {
      title: "Post institucional",
      status: "pending" as const,
      statusLabel: "Pendente",
    },
    {
      title: "Reels de produto",
      status: "changes" as const,
      statusLabel: "Alteração solicitada",
    },
  ],
} as const;
export const CLIENTS = {
  label: "Clientes",
  title: "Marcas que confiam na Metro.",
  items: [
    // Reais (9)
    "BM9 Photoshoot",
    "DEZA Arquitetura",
    "Flávio Rocha",
    "Kazui",
    "Salvo Burguer",
    "HiFive",
    "NBA Store",
    "Crocobeach",
    "NatEssential",
    // Placeholders (15) — trocar depois
    "Cliente 10",
    "Cliente 11",
    "Cliente 12",
    "Cliente 13",
    "Cliente 14",
    "Cliente 15",
    "Cliente 16",
    "Cliente 17",
    "Cliente 18",
    "Cliente 19",
    "Cliente 20",
    "Cliente 21",
    "Cliente 22",
    "Cliente 23",
    "Cliente 24",
  ],
} as const;
export const TAGLINE = {
  text: "Criatividade com método. Estratégia com emoção.",
  separator: "◆",
} as const;