import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { getAllCases } from "@/sanity/lib/fetchers";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "Projetos — Metro Design",
  description:
    "Conheça os projetos de branding, comunicação e audiovisual que a Metro Design já realizou.",
  path: "/projetos",
});

export default async function ProjetosPage() {
  const cases = await getAllCases();

  return (
    <section className="pt-section-lg pb-section-lg">
      <Container>
        <ProjectsGallery projects={cases} />
      </Container>
    </section>
  );
}
