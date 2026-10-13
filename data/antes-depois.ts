export type AntesDepoisItem = {
  cliente: string;
  segmento: string;
  entrega: string;
  resumo: string;
  antes?: string;
  depois: string;
  altAntes?: string;
  altDepois?: string;
};

const image = (id: string, saturation?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85${
    saturation === undefined ? "" : `&sat=${saturation}`
  }`;

export const ANTES_DEPOIS: AntesDepoisItem[] = [
  {
    cliente: "DEZA Arquitetura",
    segmento: "Arquitetura",
    entrega: "Redesign de marca",
    resumo:
      "Uma identidade mais precisa para traduzir a arquitetura contemporânea do escritório.",
    antes: image("photo-1600607687939-ce8a6c25118c", -80),
    depois: image("photo-1600607687939-ce8a6c25118c"),
    altAntes: "Interior de residência com tratamento visual em tons neutros",
    altDepois: "Interior contemporâneo iluminado de uma residência",
  },
  {
    cliente: "Salvo Burguer",
    segmento: "Gastronomia",
    entrega: "Identidade visual",
    resumo:
      "Uma linguagem mais marcante para deixar a experiência da casa tão memorável quanto o cardápio.",
    antes: image("photo-1568901346375-23c9450c58cd", -80),
    depois: image("photo-1568901346375-23c9450c58cd"),
    altAntes: "Hambúrguer artesanal em composição com cores dessaturadas",
    altDepois: "Hambúrguer artesanal com ingredientes frescos",
  },
  {
    cliente: "Kazui",
    segmento: "Gastronomia japonesa",
    entrega: "Redesign de marca",
    resumo:
      "Uma presença visual mais autoral, conectada à delicadeza da culinária japonesa.",
    antes: image("photo-1579871494447-9811cf80d66c", -80),
    depois: image("photo-1579871494447-9811cf80d66c"),
    altAntes: "Seleção de sushi em tons neutros",
    altDepois: "Seleção colorida de sushi e sashimi",
  },
  {
    cliente: "HiFive",
    segmento: "Fitness",
    entrega: "Identidade e comunicação",
    resumo:
      "Mais energia e consistência para acompanhar uma comunidade em movimento.",
    antes: image("photo-1534438327276-14e5300c3a48", -80),
    depois: image("photo-1534438327276-14e5300c3a48"),
    altAntes: "Academia com equipamentos em tons dessaturados",
    altDepois: "Academia ampla e iluminada com equipamentos de treino",
  },
  {
    cliente: "Crocobeach",
    segmento: "Turismo e lazer",
    entrega: "Redesign de marca",
    resumo:
      "Uma identidade renovada para expressar a atmosfera leve e vibrante da praia.",
    antes: image("photo-1507525428034-b723cf961d3e", -80),
    depois: image("photo-1507525428034-b723cf961d3e"),
    altAntes: "Praia em composição de cores neutras",
    altDepois: "Praia tropical de águas azuis e areia clara",
  },
  {
    cliente: "BM9 Photoshoot",
    segmento: "Audiovisual",
    entrega: "Direção de fotografia",
    resumo:
      "Um ensaio com luz e enquadramento pensados para apresentar a marca com personalidade.",
    depois: image("photo-1492684223066-81342ee5ff30"),
    altDepois: "Fotografia de evento com luzes e público ao fundo",
  },
];
