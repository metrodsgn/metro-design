import { Container } from "@/components/ui/Container";
import { getAllCases, getFeaturedCases } from "@/sanity/lib/fetchers";
import { SelectedProjectsGallery } from "@/components/sections/SelectedProjectsGallery";

export async function ProjetosSelecionados() {
  const [allCases, featuredCases] = await Promise.all([
    getAllCases(),
    getFeaturedCases(),
  ]);
  const selectedCases = (featuredCases.length > 0 ? featuredCases : allCases).slice(
    0,
    3,
  );

  return (
    <section id="jobs" className="py-12 md:py-16">
      <Container>
        <SelectedProjectsGallery
          projects={allCases}
          featuredProjects={selectedCases}
        />
      </Container>
    </section>
  );
}
