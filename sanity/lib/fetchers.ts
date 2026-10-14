import { client } from "./client";
import {
  allCasesQuery,
  featuredCasesQuery,
  caseBySlugQuery,
  allTestimonialsQuery,
  allClientsQuery,
  allBeforeAfterQuery,
} from "./queries";
import type { AntesDepoisItem } from "@/data/antes-depois";

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
  };
  gallery?: Array<{
    _key?: string;
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    dimensions?: { width: number; height: number; aspectRatio: number };
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
  return client.fetch(caseBySlugQuery, { slug });
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(allTestimonialsQuery);
}

export async function getAllClients(): Promise<ClientLogo[]> {
  return client.fetch(allClientsQuery);
}

export async function getBeforeAfterItems(): Promise<
  (AntesDepoisItem & { _id: string })[]
> {
  try {
    return await client.fetch(allBeforeAfterQuery);
  } catch (error) {
    console.error("Não foi possível carregar os comparativos do Sanity:", error);
    return [];
  }
}
