import { client } from "./client";
import {
  allCasesQuery,
  caseBySlugQuery,
  featuredCasesQuery,
  allTestimonialsQuery,
} from "./queries";

export type CaseListItem = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  year: number;
  cover: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
  featured?: boolean;
};

export type CaseFull = CaseListItem & {
  gallery?: Array<{
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  }>;
  description?: Array<{
    _type: string;
    _key: string;
    children: Array<{ text: string }>;
  }>;
  services?: string[];
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

export async function getFeaturedCases(): Promise<CaseListItem[]> {
  return client.fetch(featuredCasesQuery);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(allTestimonialsQuery);
}