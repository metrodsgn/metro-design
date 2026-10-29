export type ProjectMediaOverride = {
  background?: string;
};

export type ProjectContentOverride = {
  media?: ProjectMediaOverride[];
};

export const PROJECT_CONTENT: Record<string, ProjectContentOverride> = {
  "deza-arquitetura": {
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
