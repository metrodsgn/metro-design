"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { CaseListItem } from "@/sanity/lib/fetchers";

export function SelectedProjectsGallery({
  projects,
  featuredProjects,
}: {
  projects: CaseListItem[];
  featuredProjects: CaseListItem[];
}) {
  const featuredIds = new Set(featuredProjects.map((project) => project._id));
  const visibleProjects = [
    ...featuredProjects,
    ...projects.filter((project) => !featuredIds.has(project._id)),
  ].slice(0, 6);

  return (
    <div className="selected-projects">
      <header className="selected-projects__header mb-8 flex flex-col gap-6 pb-6 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <h2 className="font-editorial text-foreground text-3xl leading-tight tracking-tight md:text-5xl">
            Projetos selecionados.
          </h2>
          <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
            Uma seleção de marcas que ajudamos a construir, reposicionar e
            comunicar.
          </p>
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted py-12 text-center text-sm">
          Nenhum case cadastrado ainda.
        </p>
      ) : (
        <div
          className="selected-projects__grid grid gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-y-14"
          aria-live="polite"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug}
              category={project.category}
              brandColor={project.brandColor}
              cover={project.cover}
              year={project.year}
              number={index + 1}
              total={visibleProjects.length}
            />
          ))}
        </div>
      )}

      <div className="selected-projects__footer border-border mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:mt-12 sm:flex-row sm:items-center sm:pt-7">
        <p className="text-muted text-sm sm:text-base">
          Explore todos os nossos projetos.
        </p>
        <Link href="/projetos" className="ui-button ui-button-secondary">
          Todos os projetos <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
