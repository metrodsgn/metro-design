import { groq } from "next-sanity";

// Busca todos os cases (para /projetos e grid da home)
export const allCasesQuery = groq`
  *[_type == "case"] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    brandColor,
    year,
    cover
  }
`;

export const featuredCasesQuery = groq`
  *[_type == "case" && featured == true] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    brandColor,
    year,
    cover
  }
`;

// Busca um case pelo slug (para /projetos/[slug])
export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    brandColor,
    year,
    cover,
    gallery[]{
      ...,
      "dimensions": asset->metadata.dimensions
    },
    description,
    services
  }
`;

// Busca todos os depoimentos ordenados
export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    name,
    company,
    role,
    quote,
    initial,
    time
  }
`;

export const allClientsQuery = groq`
  *[_type == "client" && defined(logo)] | order(order asc, name asc) {
    _id,
    name,
    logo
  }
`;

export const allBeforeAfterQuery = groq`
  *[_type == "beforeAfter" && defined(before.asset) && defined(after.asset)] | order(order asc, _createdAt desc) {
    _id,
    "cliente": client,
    "segmento": segment,
    "resumo": summary,
    "entrega": deliverable,
    "antes": before.asset->url,
    "depois": after.asset->url,
    "altAntes": before.alt,
    "altDepois": after.alt
  }
`;
