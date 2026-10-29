import { PROJECT_CONTENT } from "@/data/project-content";
import type { CaseFull, CaseListItem } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export type ProjectMedia = {
  src: string;
  alt: string;
  bg: string;
  width: number;
  height: number;
};

export type ProjectLink = {
  slug: string;
  title: string;
  client?: string;
};

export type ProjectDetailData = {
  slug: string;
  title: string;
  description: string[];
  media: ProjectMedia[];
  nextProject?: ProjectLink;
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function clean(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function hexColor(value: string | null | undefined) {
  const color = clean(value);
  return HEX_COLOR.test(color) ? color : undefined;
}

function descriptionToParagraphs(description: CaseFull["description"]) {
  return (description ?? [])
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join("")
        .trim()
    )
    .filter(Boolean);
}

export function buildProjectDetail(
  project: CaseFull,
  allCases: CaseListItem[]
): ProjectDetailData {
  const override = PROJECT_CONTENT[project.slug];
  const title = clean(project.title);
  const client = clean(project.client);
  const description = descriptionToParagraphs(project.description);

  const media: ProjectMedia[] = [];
  const coverOverride = override?.media?.[0];
  const coverImage = project.cover?.asset?._ref
    ? urlFor(project.cover).width(2200).fit("max").url()
    : "";
  if (coverImage) {
    const bg =
      hexColor(project.cover?.background) ||
      hexColor(coverOverride?.background) ||
      "#121212";
    const width = project.coverDimensions?.width ?? 1600;
    const height = project.coverDimensions?.height ?? 1000;

    media.push({
      src: coverImage,
      alt: `Capa do projeto ${title}, de ${client}`,
      bg,
      width,
      height,
    });
  }

  (project.gallery ?? []).forEach((image, index) => {
    if (!image?.asset?._ref) return;

    const imageSrc = urlFor(image).width(2200).fit("max").url();
    const mediaOverride = override?.media?.[index + (coverImage ? 1 : 0)];
    const bg =
      hexColor(image.background) ||
      hexColor(mediaOverride?.background) ||
      "#121212";
    const width = image.dimensions?.width ?? 1600;
    const height = image.dimensions?.height ?? 1000;

    media.push({
      src: imageSrc,
      alt: `${client} — ${title}, imagem ${index + 1}`,
      bg,
      width,
      height,
    });
  });

  const projectIndex = allCases.findIndex((item) => item.slug === project.slug);
  const next = projectIndex >= 0 ? allCases[projectIndex + 1] : undefined;

  return {
    slug: project.slug,
    title,
    description,
    media,
    nextProject: next
      ? {
          slug: next.slug,
          title: clean(next.title),
          client: clean(next.client),
        }
      : undefined,
  };
}
