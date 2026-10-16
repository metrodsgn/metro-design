import Link from "next/link";
import type { CaseListItem } from "@/sanity/lib/fetchers";

type ProjectTransitionCardProps = {
  project: CaseListItem;
  direction: "previous" | "next";
};

export function ProjectTransitionCard({
  project,
  direction,
}: ProjectTransitionCardProps) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Anterior" : "Próximo";
  return (
    <Link
      href={`/projetos/${project.slug}`}
      aria-label={`${label}: ${project.client} — ${project.title}`}
      className={`project-next-card group ${isPrevious ? "project-next-card--previous" : ""}`}
    >
      {isPrevious && (
        <span className="project-next-card__arrow project-next-card__arrow--previous" aria-hidden="true" />
      )}
      <span className="project-next-card__copy">
        <span className="project-next-card__label">{label}</span>
        <span className="project-next-card__title">{project.title}</span>
      </span>
      {!isPrevious && <span className="project-next-card__arrow" aria-hidden="true" />}
    </Link>
  );
}
