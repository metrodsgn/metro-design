export type ProjectMediaOverride = {
  background?: string;
};

export type ProjectContentOverride = {
  paragraphs?: string[];
  media?: ProjectMediaOverride[];
};

export const PROJECT_CONTENT: Record<string, ProjectContentOverride> = {
  "deza-arquitetura": {
    paragraphs: [
      "Projetar para um escritório de arquitetura é traduzir estética, conceito e assinatura visual com a mesma atenção que se dedica a um traço técnico.",
      "No trabalho com a DEZA Arquitetura, cada detalhe da identidade foi pensado para refletir o olhar autoral do escritório, o equilíbrio entre técnica e sensibilidade e a presença de uma marca que se posiciona com personalidade.",
      "Branding é construção. E aqui, começa com boas fundações.",
    ],
    media: [
      {
        background: "#2F403D",
      },
      {
        background: "#2F403D",
      },
      {
        background: "#221F1E",
      },
    ],
  },
};
