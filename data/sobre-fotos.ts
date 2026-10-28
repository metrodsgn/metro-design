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

export const SOBRE_STORY_PHOTO: SobrePhoto = {
  src: image("photo-1521737711867-e3b97375f902", 800, 1000, true),
  alt: "Equipe reunida em volta de uma mesa durante uma reunião de projeto",
  caption: "Reunião de projeto",
};
