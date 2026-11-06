"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProjectLink } from "@/lib/project-detail";

type ProjectTransitionCardProps = {
  project: ProjectLink;
  direction?: "previous" | "next";
};

export function ProjectTransitionCard({
  project,
  direction = "next",
}: ProjectTransitionCardProps) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const label = direction === "previous" ? "Projeto anterior" : "Próximo projeto";
  const accessibleName = project.client
    ? `${project.client} — ${project.title}`
    : project.title;

  return (
    <Link
      href={`/projetos/${project.slug}`}
      aria-label={`${label}: ${accessibleName}`}
      className={`project-next-card group${direction === "previous" ? " project-next-card--previous" : ""}`}
      onPointerMove={(event) =>
        setPoint({
          x: Math.min(event.clientX + 24, window.innerWidth - 256),
          y: Math.min(event.clientY + 24, window.innerHeight - 192),
        })
      }
    >
      <span className="project-next-card__copy">
        <span className="project-next-card__label">{label}</span>
        <span className="project-next-card__title">{project.title}</span>
      </span>
      <span className="project-next-card__arrow" aria-hidden="true" />
      {project.coverSrc && (
        <span
          className="project-transition-card__preview"
          style={{ left: Math.max(8, point.x), top: Math.max(8, point.y) }}
          aria-hidden="true"
        >
          <Image src={project.coverSrc} alt="" fill sizes="240px" className="object-cover" />
        </span>
      )}
    </Link>
  );
}
