"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { CaseListItem } from "@/sanity/lib/fetchers";

export function SelectedProjectsGallery({
  projects,
}: {
  projects: CaseListItem[];
}) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const visibleProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <header className="mb-8 flex flex-col gap-6 border-b border-white/15 pb-6 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <span className="section-eyebrow">Jobs</span>
          <h2 className="font-editorial text-foreground mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
            Projetos selecionados.
          </h2>
          <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
            Uma seleção de marcas que ajudamos a construir, reposicionar e
            comunicar.
          </p>
        </div>

        {projects.length > 0 && (
          <div
            className="flex flex-wrap gap-2 md:max-w-[34rem] md:justify-end"
            role="group"
            aria-label="Filtrar projetos por categoria"
          >
            {["Todos", ...categories].map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className="project-filter-chip rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm"
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {projects.length === 0 ? (
        <p className="text-muted py-12 text-center text-sm">
          Nenhum case cadastrado ainda.
        </p>
      ) : (
        <div
          className="grid gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-y-14"
          aria-live="polite"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={`${activeCategory}-${project._id}`}
              title={project.title}
              slug={project.slug}
              category={project.category}
              brandColor={project.brandColor}
              cover={project.cover}
              year={project.year}
              number={projects.indexOf(project) + 1}
            />
          ))}
        </div>
      )}

      <div className="border-border mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:mt-12 sm:flex-row sm:items-center sm:pt-7">
        <p className="text-muted text-sm sm:text-base">
          Explore todos os nossos projetos.
        </p>
        <Link href="/projetos" className="ui-button ui-button-secondary">
          Todos os projetos <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}
