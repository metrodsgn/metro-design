import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { urlFor } from "@/sanity/lib/image";

type ProjectCardProps = {
  title: string;
  slug: string;
  category: string;
  services?: string[];
  showServices?: boolean;
  brandColor?: string;
  year: number;
  number: number;
  total?: number;
  cover?: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
};

export function ProjectCard({
  title,
  slug,
  category,
  services,
  showServices = false,
  brandColor,
  year,
  number,
  total,
  cover,
}: ProjectCardProps) {
  const accentStyle = /^#[\da-f]{6}$/i.test(brandColor ?? "")
    ? ({ "--project-accent": brandColor } as CSSProperties)
    : undefined;

  return (
    <Link
      href={`/projetos/${slug}`}
      style={accentStyle}
      data-cursor="Ver ↗"
      className="projects-card group focus-visible:outline-accent block focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <div className="projects-card__frame border-border bg-surface relative isolate aspect-[4/3] overflow-hidden border">
        <div className="projects-card__media">
          {cover ? (
            <Image
              src={urlFor(cover).width(800).height(500).url()}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="projects-card__image object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-editorial text-muted/60 group-hover:text-accent text-8xl transition-colors duration-200">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="projects-card__overlay absolute inset-0 flex items-end justify-between p-4 sm:p-5">
          <span className="projects-card__cta inline-flex items-center gap-2 text-sm font-medium text-white">
            Ver projeto{" "}
            <span className="projects-card__arrow" aria-hidden="true">
              ↗
            </span>
          </span>
        </div>
        <span className="projects-card__year label-mono absolute top-3 left-3 z-10 rounded-sm bg-black/65 px-2.5 py-1 text-white/90">
          {year}
        </span>
      </div>

      <div className="projects-card__details mt-4 flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="projects-card__title font-display text-foreground text-base font-semibold tracking-tight break-words transition-colors sm:text-lg">
            <span className="projects-card__title-arrow" aria-hidden="true">→</span>
            <span>{title}</span>
          </h3>
          <p className="projects-card__tags text-muted mt-1 text-sm break-words">
            {(showServices && services?.filter(Boolean).length
              ? services.filter(Boolean)
              : [category]
            ).map((service, index) => (
              <span key={`${service}-${index}`}>
                {index > 0 && <span aria-hidden="true"> • </span>}
                {service}
              </span>
            ))}
          </p>
        </div>
        <span className="label-mono mt-1 shrink-0">
          {total
            ? `(${String(number).padStart(2, "0")} / ${String(total).padStart(2, "0")})`
            : String(number).padStart(2, "0")}
        </span>
      </div>
    </Link>
  );
}
