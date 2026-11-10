import { client } from "./client";
import {
  allCasesQuery,
  featuredCasesQuery,
  caseBySlugQuery,
  allTestimonialsQuery,
  allClientsQuery,
  metroHousePhotosQuery,
  serviceFrontPhotosQuery,
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
  time: string;
};

export type ClientLogo = {
  _id: string;
  name: string;
  logo: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
};

export type MetroHouseImage = {
  _key: string;
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number };
  alt?: string;
  caption?: string;
  description?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
  lqip?: string;
};

export type ServiceFrontPhoto = {
  asset: { _ref: string; _type: string };
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width?: number; height?: number };
  lqip?: string;
};

export type ServiceFrontPhotos = {
  brandingDesign?: ServiceFrontPhoto;
  communicationContent?: ServiceFrontPhoto;
  audiovisualCreativeDirection?: ServiceFrontPhoto;
  digitalProductsTechnology?: ServiceFrontPhoto;
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
  const projects = await client.fetch<CaseListItem[]>(allCasesQuery);
  return projects.map(correctProjectNames);
}

export async function getFeaturedCases(): Promise<CaseListItem[]> {
  const projects = await client.fetch<CaseListItem[]>(featuredCasesQuery);
  return projects.map(correctProjectNames);
}

export async function getCaseBySlug(slug: string): Promise<CaseFull | null> {
  const project = await client.fetch<CaseFull | null>(caseBySlugQuery, {
    slug,
  });
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

export async function getAllClients(): Promise<ClientLogo[]> {
  return client.fetch(allClientsQuery);
}

export async function getMetroHousePhotos(): Promise<MetroHouseImage[]> {
  return (await client.fetch<MetroHouseImage[]>(metroHousePhotosQuery, {}, { next: { revalidate: 60 } })) ?? [];
}

export async function getServiceFrontPhotos(): Promise<ServiceFrontPhotos | null> {
  return (await client.fetch<ServiceFrontPhotos | null>(serviceFrontPhotosQuery, {}, { next: { revalidate: 60 } })) ?? null;
}
