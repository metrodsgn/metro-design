import type { Metadata } from "next";
import { ParallaxHero } from "@/components/ui/parallax-scrolling";
import { Somos } from "@/components/sections/Somos";
import { MetroHouse } from "@/components/sections/MetroHouse";
import { Clientes } from "@/components/sections/Clientes";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Faq } from "@/components/sections/Faq";
import { ABOUT_HERO } from "@/lib/constants";
import { createSiteMetadata } from "@/lib/metadata";
import { getAboutStoryPhoto, getAllCases, getMetroHousePhotos } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";
import { SOBRE_STORY_PHOTO, type SobrePhoto } from "@/data/sobre-fotos";

export const metadata: Metadata = createSiteMetadata({
  title: "Sobre — Metro Design",
  description:
    "Desde 2017, a Metro une estratégia, criatividade, design, comunicação e tecnologia para construir marcas mais fortes e negócios com mais valor.",
  path: "/sobre",
});

async function loadProjects() {
  try {
    const projects = await getAllCases();
    return Array.isArray(projects) ? projects.slice(0, 6) : [];
  } catch {
    return [];
  }
}

async function loadMetroHousePhotos() {
  try {
    const photos = await getMetroHousePhotos();
    return photos.map((photo) => ({
      id: photo._key,
      src: urlFor({ _type: "image", asset: photo.asset }).width(1600).auto("format").url(),
      alt: photo.alt ?? "Foto do escritório Metro Design",
      caption: photo.caption ?? "",
      description: photo.description ?? "",
      lqip: photo.lqip,
    }));
  } catch {
    return [];
  }
}

async function loadAboutStoryPhoto(): Promise<SobrePhoto> {
  try {
    const photo = await getAboutStoryPhoto();
    if (!photo?.asset) return SOBRE_STORY_PHOTO;

    return {
      src: urlFor({
        _type: "image",
        asset: photo.asset,
      })
        .width(1600)
        .fit("max")
        .auto("format")
        .url(),
      alt: "Foto institucional da equipe Metro Design",
      width: photo.dimensions?.width,
      height: photo.dimensions?.height,
    };
  } catch {
    return SOBRE_STORY_PHOTO;
  }
}

export default async function SobrePage() {
  const [projects, metroHousePhotos, storyPhoto] = await Promise.all([
    loadProjects(),
    loadMetroHousePhotos(),
    loadAboutStoryPhoto(),
  ]);

  return (
    <>
      <ParallaxHero
        title={ABOUT_HERO.wordmark}
        backgroundSrc="/fundosobre/fundo.png"
        backgroundAlt={ABOUT_HERO.backgroundAlt}
        titleAriaLabel={ABOUT_HERO.accessibleTitle}
      />

      <Somos photo={storyPhoto} />
      <MetroHouse photos={metroHousePhotos} />
      <Clientes />
      <SelectedProjects projects={projects} />
      <Faq />
      <CtaFinal />
    </>
  );
}
