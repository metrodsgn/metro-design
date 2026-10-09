import { groq } from "next-sanity";

// Busca todos os cases (para /projetos e grid da home)
export const allCasesQuery = groq`
  *[_type == "case"] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    year,
    cover,
    featured
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
    year,
    cover,
    gallery,
    description,
    services,
    featured
  }
`;

// Busca os cases em destaque (para a home)
export const featuredCasesQuery = groq`
  *[_type == "case" && featured == true] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    year,
    cover
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