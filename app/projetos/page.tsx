import type { Metadata } from "next";
import { createSiteMetadata } from "@/lib/metadata";
import { getAllCases } from "@/sanity/lib/fetchers";
import { Container } from "@/components/ui/Container";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import ProjectsHero3D from "@/components/sections/ProjectsHero3D";

export const metadata: Metadata = createSiteMetadata({
  title: "Projetos — Metro Design",
  description:
    "Conheça os projetos de branding, comunicação e audiovisual que a Metro Design já realizou.",
  path: "/projetos",
});

export default async function ProjetosPage() {
  const cases = await getAllCases();

  return (
    <>
      <ProjectsHero3D />
      <section className="pt-section-lg pb-section-lg">
        <Container>
          <ProjectsGallery projects={cases} />
        </Container>
      </section>
    </>
  );
}
