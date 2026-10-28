import { client } from "./client";
import {
  allCasesQuery,
  featuredCasesQuery,
  caseBySlugQuery,
  allTestimonialsQuery,
  allClientsQuery,
} from "./queries";

export type CaseListItem = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  brandColor?: string;
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
  paragraphs?: string[];
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

export async function getAllCases(): Promise<CaseListItem[]> {
  return client.fetch(allCasesQuery);
}

export async function getFeaturedCases(): Promise<CaseListItem[]> {
  return client.fetch(featuredCasesQuery);
}

export async function getCaseBySlug(slug: string): Promise<CaseFull | null> {
  const project = await client.fetch<CaseFull | null>(caseBySlugQuery, {
    slug,
  });
  if (!project?.description) return project;

  return {
    ...project,
    description: project.description.map((block) => ({
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
