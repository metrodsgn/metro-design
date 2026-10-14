import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseListItem } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

type ProjectTransitionCardProps = {
  project: CaseListItem;
  direction: "previous" | "next";
};

export function ProjectTransitionCard({
  project,
  direction,
}: ProjectTransitionCardProps) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Projeto anterior" : "Próximo projeto";
  const accentStyle = /^#[\da-f]{6}$/i.test(project.brandColor ?? "")
    ? ({ "--project-accent": project.brandColor } as CSSProperties)
    : undefined;

  return (
    <Link
      href={`/projetos/${project.slug}`}
      aria-label={`${label}: ${project.client} — ${project.title}`}
      style={accentStyle}
      className={`project-next-card group relative isolate flex min-h-[132px] items-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] sm:min-h-[148px] md:min-h-[160px] ${isPrevious ? "project-next-card--previous" : ""}`}
    >
      {project.cover && (
        <Image
          src={urlFor(project.cover).width(1800).height(900).quality(85).url()}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="project-next-card__image object-cover"
        />
      )}
      <div className="project-next-card__overlay absolute inset-0" />
      <div className="project-next-card__shine absolute inset-y-0 left-0" />
      <div className="relative z-10 flex min-h-[132px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[148px] sm:gap-4 sm:px-5 md:min-h-[160px] md:px-6">
        <div className="min-w-0 pr-2">
          <p className="project-next-card__label mb-1.5 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.14em] text-white/60 uppercase sm:text-[9px]">
            {label}
            <svg
              className="project-next-card__label-arrow size-3 text-accent"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={isPrevious ? "M13.5 8h-10m4 4-4-4 4-4" : "M2.5 8h10m-4-4 4 4-4 4"}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </p>
          <h2 className="font-display max-w-3xl text-[26px] leading-none font-extrabold tracking-[-0.04em] text-white [text-shadow:0_2px_20px_rgb(0_0_0_/_40%)] sm:text-[30px] md:text-4xl">
            {project.client}
          </h2>
          <p className="mt-1.5 text-[10px] font-medium tracking-[0.01em] text-white/65 sm:text-[11px]">
            {project.title} <span className="mx-1.5 text-white/35">•</span>{" "}
            {project.category} / {project.year}
          </p>
        </div>
        <span className="project-next-card__button relative z-10 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-white sm:size-10">
          <svg
            className="relative z-10 size-3.5 sm:size-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={isPrevious ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className="project-next-card__accent-line absolute inset-x-0 bottom-0" />
    </Link>
  );
}
