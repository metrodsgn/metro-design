import { client } from "./client";
import {
  allCasesQuery,
  caseBySlugQuery,
  allTestimonialsQuery,
} from "./queries";

export type CaseListItem = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
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

export async function getAllCases(): Promise<CaseListItem[]> {
  return client.fetch(allCasesQuery);
}

export async function getCaseBySlug(slug: string): Promise<CaseFull | null> {
  return client.fetch(caseBySlugQuery, { slug });
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(allTestimonialsQuery);
}
