export type MetroHousePhoto = {
  id: string;
  src: string | null;
  alt: string;
  caption: string;
};

// Adicione as fotos reais em public/images/metro-house e informe o caminho
// em src (ex.: /images/metro-house/visao-geral.webp), revisando também o alt.
// Enquanto src for null, a galeria exibe um espaço reservado identificado.
export const METRO_HOUSE_PHOTOS: MetroHousePhoto[] = [
  {
    id: "visao-geral",
    src: null,
    alt: "Visão geral da Metro House",
    caption: "Nosso espaço",
  },
  {
    id: "estacoes",
    src: null,
    alt: "Mesas, estações de trabalho e equipamentos da Metro House",
    caption: "Onde as ideias ganham forma",
  },
  {
    id: "detalhes",
    src: null,
    alt: "Detalhes da arquitetura e dos espaços de colaboração da Metro House",
    caption: "Entre encontros e detalhes",
  },
];
