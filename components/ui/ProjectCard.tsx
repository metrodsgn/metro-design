import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { urlFor } from "@/sanity/lib/image";

type ProjectCardProps = {
  title: string;
  slug: string;
  category: string;
  brandColor?: string;
  year: number;
  number: number;
  cover?: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
};

export function ProjectCard({
  title,
  slug,
  category,
  brandColor,
  year,
  number,
  cover,
}: ProjectCardProps) {
  const accentStyle = /^#[\da-f]{6}$/i.test(brandColor ?? "")
    ? ({ "--project-accent": brandColor } as CSSProperties)
    : undefined;

  return (
    <Link
      href={`/projetos/${slug}`}
      style={accentStyle}
      className="projects-card group focus-visible:outline-accent block rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <div
        className="projects-card__frame border-border bg-surface relative isolate aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border"
        onPointerMove={(event) => {
          if (
            event.pointerType !== "mouse" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            return;
          }

          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            "--pointer-x",
            `${event.clientX - bounds.left}px`,
          );
          event.currentTarget.style.setProperty(
            "--pointer-y",
            `${event.clientY - bounds.top}px`,
          );
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.removeProperty("--pointer-x");
          event.currentTarget.style.removeProperty("--pointer-y");
        }}
      >
        {cover ? (
          <Image
            src={urlFor(cover).width(600).height(450).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="projects-card__media object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-editorial text-muted/60 group-hover:text-accent text-8xl transition-colors duration-200">
              {title.charAt(0)}
            </span>
          </div>
        )}

        <span className="projects-card__light absolute inset-0" aria-hidden="true" />
        <div className="projects-card__overlay absolute inset-0 flex items-end justify-between p-4 sm:p-5">
          <span className="projects-card__cta inline-flex items-center gap-2 text-sm font-medium text-white">
            Ver projeto <span className="projects-card__arrow" aria-hidden="true">↗</span>
          </span>
        </div>
        <span className="projects-card__year absolute top-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] tracking-wide text-white/90 backdrop-blur sm:text-[11px]">
          {year}
        </span>
      </div>

      <div className="mt-4 flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="projects-card__title font-display text-foreground text-base font-semibold tracking-tight break-words transition-colors sm:text-lg">
            {title}
          </h3>
          <p className="text-muted mt-1 text-sm break-words">{category}</p>
        </div>
        <span className="text-muted mt-1 shrink-0 font-mono text-xs">
          {String(number).padStart(2, "0")}
        </span>
      </div>
    </Link>
  );
}
