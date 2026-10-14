import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { getAllCases } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Projetos — Metro Design",
  description:
    "Conheça os projetos de branding, comunicação e audiovisual que a Metro Design já realizou.",
};

export default async function ProjetosPage() {
  const cases = await getAllCases();

  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
      <Container>
        <ProjectsGallery projects={cases} />
      </Container>
    </section>
  );
}
