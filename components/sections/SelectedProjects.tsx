import Link from "next/link";
import { SelectedProjectsList, type SelectedProject } from "@/components/sections/SelectedProjectsList";
import { Container } from "@/components/ui/Container";
import type { CaseListItem } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export function SelectedProjects({ projects }: { projects: CaseListItem[] }) {
  if (!projects.length) return null;

  const selected: SelectedProject[] = projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    category: project.services?.join(", ") ?? "",
    cover: project.cover ? urlFor(project.cover).width(900).fit("max").url() : "",
  }));

  return (
    <section className="about-projects bg-background py-20 text-foreground md:py-32">
      <Container>
        <h2 className="about-projects__heading">Trabalhos selecionados.</h2>
        <SelectedProjectsList projects={selected} />
        <Link href="/projetos" className="ui-button ui-button-accent mt-10">
          VER TODOS OS PROJETOS <span aria-hidden="true">↗</span>
        </Link>
      </Container>
    </section>
  );
}
