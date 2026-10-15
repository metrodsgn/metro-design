"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CASE_CATEGORIES } from "@/lib/constants";
import type { CaseListItem } from "@/sanity/lib/fetchers";

export function ProjectsGallery({ projects }: { projects: CaseListItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = Array.from(
    new Set([...CASE_CATEGORIES, ...projects.map((project) => project.category)]),
  );
  const visibleProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <header className="mb-10 flex flex-col gap-7 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <span className="section-eyebrow">
            Jobs
          </span>
          <h1 className="font-editorial text-foreground mt-3 max-w-3xl text-[clamp(2.75rem,8vw,4.5rem)] leading-[1.02] tracking-tight">
            Projetos.
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:mt-5 sm:text-lg">
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
                  className="project-filter-chip min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm"
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {projects.length === 0 ? (
        <p className="text-muted mt-16 text-center text-sm">
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
