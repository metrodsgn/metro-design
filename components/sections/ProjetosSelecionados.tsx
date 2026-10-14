import { Container } from "@/components/ui/Container";
import { getAllCases, getFeaturedCases } from "@/sanity/lib/fetchers";
import { SelectedProjectsGallery } from "@/components/sections/SelectedProjectsGallery";

export async function ProjetosSelecionados() {
  const featuredCases = await getFeaturedCases();
  const selectedCases = (
    featuredCases.length > 0 ? featuredCases : await getAllCases()
  ).slice(0, 3);

  return (
    <section id="jobs" className="py-12 md:py-16">
      <Container>
        <SelectedProjectsGallery projects={selectedCases} />
      </Container>
    </section>
  );
}
