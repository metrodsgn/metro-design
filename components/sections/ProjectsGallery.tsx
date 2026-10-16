import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { CaseListItem } from "@/sanity/lib/fetchers";

export function ProjectsGallery({ projects }: { projects: CaseListItem[] }) {
  return (
    <>
      <header className="mb-10 flex flex-col gap-7 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <h1 className="font-editorial text-foreground max-w-3xl text-[clamp(2.75rem,8vw,4.5rem)] leading-[1.02] tracking-tight">
            Projetos.
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:mt-5 sm:text-lg">
            Uma seleção de marcas que ajudamos a construir, reposicionar e
            comunicar.
          </p>
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted mt-16 text-center text-sm">
          Nenhum case cadastrado ainda.
        </p>
      ) : (
        <div
          className="projects-gallery__grid grid gap-x-6 gap-y-16 sm:grid-cols-2 sm:gap-y-20"
          aria-live="polite"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug}
              category={project.category}
              services={project.services}
              showServices
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
