const image = (
  id: string,
  width: number,
  height: number,
  cropFaces = false,
) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82${
    cropFaces ? "&crop=faces" : ""
  }`;

export type SobrePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const SOBRE_COLLAGE_PHOTOS: SobrePhoto[] = [
  {
    src: image("photo-1522071820081-009f0129c71c", 860, 1075, true),
    alt: "Equipe da Metro Design trabalhando junta no estúdio",
    caption: "Estúdio · Fortaleza",
  },
  {
    src: image("photo-1497366754035-f200968a6e72", 560, 700),
    alt: "Ambiente de trabalho criativo com divisórias de vidro e iluminação natural",
    caption: "Nosso espaço",
  },
];

export const SOBRE_STORY_PHOTO: SobrePhoto = {
  src: image("photo-1521737711867-e3b97375f902", 800, 1000, true),
  alt: "Equipe reunida em volta de uma mesa durante uma reunião de projeto",
  caption: "Reunião de projeto",
};
