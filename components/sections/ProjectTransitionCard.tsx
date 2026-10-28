import Link from "next/link";
import type { ProjectLink } from "@/lib/project-detail";

type ProjectTransitionCardProps = {
  project: ProjectLink;
};

export function ProjectTransitionCard({ project }: ProjectTransitionCardProps) {
  const accessibleName = project.client
    ? `${project.client} — ${project.title}`
    : project.title;

  return (
    <Link
      href={`/projetos/${project.slug}`}
      aria-label={`Próximo projeto: ${accessibleName}`}
      className="project-next-card group"
    >
      <span className="project-next-card__copy">
        <span className="project-next-card__label">Próximo projeto</span>
        <span className="project-next-card__title">{project.title}</span>
      </span>
      <span className="project-next-card__arrow" aria-hidden="true" />
    </Link>
  );
}
