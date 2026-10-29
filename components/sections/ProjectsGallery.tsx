import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { CaseListItem } from "@/sanity/lib/fetchers";

export function ProjectsGallery({
  projects,
  showHeader = true,
}: {
  projects: CaseListItem[];
  showHeader?: boolean;
}) {
  return (
    <>
      {showHeader && (
        <header className="mb-12 flex flex-col items-center gap-5 text-center md:mb-16 md:gap-6">
          <h1 className="font-editorial text-foreground text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Projetos.
          </h1>
          <p className="text-muted max-w-xl text-base leading-relaxed sm:text-lg">
            Uma seleção de marcas que ajudamos a construir, reposicionar e
            comunicar.
          </p>
        </header>
      )}

      {projects.length === 0 ? (
        <p className="text-muted mt-16 text-center text-sm">
          Nenhum case cadastrado ainda.
        </p>
      ) : (
        <div
          className="projects-gallery__grid grid gap-x-5 gap-y-9 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-5"
          aria-live="polite"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug}
              services={project.services}
              brandColor={project.brandColor}
              cover={project.cover}
              year={project.year}
              number={projects.indexOf(project) + 1}
            />
          ))}
        </div>
      )}

      <div className="border-border mt-14 flex flex-col items-start justify-between gap-4 border-t pt-7 sm:mt-16 sm:flex-row sm:items-center sm:pt-8">
        <p className="text-muted text-sm sm:text-base">
          Tem uma marca para construir?
        </p>
        <Link href="/contato" className="ui-button ui-button-primary">
          Iniciar um projeto <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}
