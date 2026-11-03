"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type SelectedProject = {
  title: string;
  slug: string;
  category: string;
  cover: string;
};

export function SelectedProjectsList({ projects }: { projects: SelectedProject[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  return (
    <div className="about-projects__list" onPointerLeave={() => setActive(null)}>
      {projects.map((project, index) => (
        <Link
          key={`${project.slug}-${project.title}`}
          href={`/projetos/${project.slug}`}
          className="about-projects__row"
          onPointerEnter={() => setActive(index)}
          onPointerMove={(event) => setPoint({
            x: Math.min(event.clientX + 24, window.innerWidth - 256),
            y: Math.min(event.clientY + 24, window.innerHeight - 192),
          })}
        >
          <span className="about-projects__name">{project.title}</span>
          {project.category ? <span className="about-projects__category">{project.category}</span> : null}
          <span className="about-projects__arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
      {active !== null && projects[active]?.cover ? (
        <div className="about-projects__preview" style={{ left: Math.max(8, point.x), top: Math.max(8, point.y) }} aria-hidden="true">
          <Image src={projects[active].cover} alt="" fill sizes="240px" className="object-cover" />
        </div>
      ) : null}
    </div>
  );
}
