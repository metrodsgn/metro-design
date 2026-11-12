import { client } from "./client";
import {
  allCasesQuery,
  featuredCasesQuery,
  caseBySlugQuery,
  allTestimonialsQuery,
  metroHousePhotosQuery,
  serviceFrontPhotosQuery,
  aboutStoryPhotoQuery,
} from "./queries";

export type CaseListItem = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  cover?: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    background?: string;
  };
  coverDimensions?: { width: number; height: number; aspectRatio: number };
  gallery?: Array<{
    _key?: string;
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    dimensions?: { width: number; height: number; aspectRatio: number };
    background?: string;
  }>;
  description?: Array<{
    _type: string;
    _key: string;
    children?: Array<{ text?: string }>;
  }>;
  services?: string[];
};

export type CaseFull = Omit<CaseListItem, "description"> & {
  description?: Array<{
    _type: string;
    _key: string;
    children: Array<{ text: string }>;
  }>;
};

export type Testimonial = {
  _id: string;
  name: string;
  company: string;
  role?: string;
  quote: string;
  avatarUrl?: string;
  initial: string;
};

export type MetroHouseImage = {
  _key: string;
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
  description?: string;
  lqip?: string;
};

export type ServiceFrontPhoto = {
  asset: { _ref: string; _type: string };
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width?: number; height?: number };
};

export type ServiceFrontPhotos = {
  brandingDesign?: ServiceFrontPhoto;
  communicationContent?: ServiceFrontPhoto;
  audiovisualCreativeDirection?: ServiceFrontPhoto;
  digitalProductsTechnology?: ServiceFrontPhoto;
};

export type AboutStoryPhoto = {
  asset: { _ref: string; _type: string };
  dimensions?: { width: number; height: number; aspectRatio: number };
};

function correctProjectAccent(value: string | undefined): string | undefined {
  return value?.replace(/\bfl[aàá]vio\b/gi, (name) =>
    name === name.toUpperCase() ? "FLÁVIO" : "Flávio",
  );
}

function correctProjectNames<T extends CaseListItem>(project: T): T {
  return {
    ...project,
    title: correctProjectAccent(project.title) ?? project.title,
    client: correctProjectAccent(project.client) ?? project.client,
  };
}

export async function getAllCases(): Promise<CaseListItem[]> {
  const projects = await client.fetch<CaseListItem[]>(allCasesQuery, {}, {
    next: { revalidate: 60 },
  });
  return projects.map(correctProjectNames);
}

export async function getFeaturedCases(): Promise<CaseListItem[]> {
  const projects = await client.fetch<CaseListItem[]>(featuredCasesQuery, {}, {
    next: { revalidate: 60 },
  });
  return projects.map(correctProjectNames);
}

export async function getCaseBySlug(slug: string): Promise<CaseFull | null> {
  const project = await client.fetch<CaseFull | null>(caseBySlugQuery, {
    slug,
  }, { next: { revalidate: 60 } });
  if (!project) return null;

  const correctedProject = correctProjectNames(project);
  if (!correctedProject.description) return correctedProject;

  return {
    ...correctedProject,
    description: correctedProject.description.map((block) => ({
      ...block,
      children: block.children.map((child) => ({
        ...child,
        text: (child.text ?? "").replace(/\bcraçao\b/gi, "criação"),
      })),
    })),
  };
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(allTestimonialsQuery);
}

export async function getMetroHousePhotos(): Promise<MetroHouseImage[]> {
  return (await client.fetch<MetroHouseImage[]>(metroHousePhotosQuery, {}, { next: { revalidate: 60 } })) ?? [];
}

export async function getServiceFrontPhotos(): Promise<ServiceFrontPhotos | null> {
  return (await client.fetch<ServiceFrontPhotos | null>(serviceFrontPhotosQuery, {}, { next: { revalidate: 60 } })) ?? null;
}

export async function getAboutStoryPhoto(): Promise<AboutStoryPhoto | null> {
  return (await client.fetch<AboutStoryPhoto | null>(aboutStoryPhotoQuery, {}, { next: { revalidate: 60 } })) ?? null;
}
