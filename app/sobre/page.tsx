import type { Metadata } from "next";
import { ParallaxHero } from "@/components/ui/parallax-scrolling";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { MetroHouse } from "@/components/sections/MetroHouse";
import { Clientes } from "@/components/sections/Clientes";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Metodologia } from "@/components/sections/Metodologia";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Faq } from "@/components/sections/Faq";
import { ABOUT_HERO } from "@/lib/constants";
import { createSiteMetadata } from "@/lib/metadata";
import { getAllCases, getAllClients } from "@/sanity/lib/fetchers";

export const metadata: Metadata = createSiteMetadata({
  title: "Sobre — Metro Design",
  description:
    "Agência de branding e comunicação em Fortaleza. Falamos alto com tipografia, movemos para dizer algo e levamos a sério o trabalho.",
  path: "/sobre",
});

async function loadClients() {
  try {
    const clients = await getAllClients();
    return Array.isArray(clients) ? clients : [];
  } catch {
    return [];
  }
}

async function loadProjects() {
  try {
    const projects = await getAllCases();
    return Array.isArray(projects) ? projects.slice(0, 6) : [];
  } catch {
    return [];
  }
}

export default async function SobrePage() {
  const [clients, projects] = await Promise.all([
    loadClients(),
    loadProjects(),
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
      <Fazemos />
      <Metodologia />
      <MetroHouse />
      <Clientes clients={clients} />
      <SelectedProjects projects={projects} />
      <Faq />
      <CtaFinal />
    </>
  );
}
