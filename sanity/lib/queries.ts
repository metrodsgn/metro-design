import { groq } from "next-sanity";

// Busca todos os cases (para /projetos e grid da home)
export const allCasesQuery = groq`
  *[_type == "case"] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    services,
    year,
    cover,
    "coverDimensions": cover.asset->metadata.dimensions
  }
`;

export const featuredCasesQuery = groq`
  *[_type == "case" && featured == true] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    services,
    year,
    cover,
    "coverDimensions": cover.asset->metadata.dimensions
  }
`;

// Busca um case pelo slug (para /projetos/[slug])
export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    cover,
    "coverDimensions": cover.asset->metadata.dimensions,
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
    "avatarUrl": avatar.asset->url + "?w=160&h=160&fit=crop&auto=format",
    initial
  }
`;

export const metroHousePhotosQuery = groq`
  *[_type == "metroHouse" && _id == "metroHouse"][0].photos[defined(asset._ref)]{
    _key,
    asset,
    alt,
    caption,
    description,
    "lqip": asset->metadata.lqip
  }
`;

export const serviceFrontPhotosQuery = groq`
  *[_type == "serviceFrontPhotos" && _id == "serviceFrontPhotos"][0]{
    brandingDesign{asset, alt, crop, hotspot},
    communicationContent{asset, alt, crop, hotspot},
    audiovisualCreativeDirection{asset, alt, crop, hotspot},
    digitalProductsTechnology{asset, alt, crop, hotspot}
  }
`;

export const aboutStoryPhotoQuery = groq`
  *[_type == "aboutStoryPhoto" && _id == "aboutStoryPhoto"][0].photo{
    asset,
    "dimensions": asset->metadata.dimensions
  }
`;
