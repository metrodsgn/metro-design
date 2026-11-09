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
import { getAllCases, getMetroHousePhotos } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = createSiteMetadata({
  title: "Sobre — Metro Design",
  description:
    "Agência de branding e comunicação em Fortaleza. Falamos alto com tipografia, movemos para dizer algo e levamos a sério o trabalho.",
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

export default async function SobrePage() {
  const [projects, metroHousePhotos] = await Promise.all([
    loadProjects(),
    loadMetroHousePhotos(),
  ]);

  return (
    <>
      <ParallaxHero
        title={ABOUT_HERO.wordmark}
        backgroundSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80"
        backgroundAlt={ABOUT_HERO.backgroundAlt}
        titleAriaLabel={ABOUT_HERO.accessibleTitle}
      />

      <Somos />
      <MetroHouse photos={metroHousePhotos} />
      <Clientes />
      <SelectedProjects projects={projects} />
      <Faq />
      <CtaFinal />
    </>
  );
}
