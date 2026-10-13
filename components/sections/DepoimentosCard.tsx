"use client";

import { useState } from "react";
import type { Testimonial } from "@/sanity/lib/fetchers";

export function DepoimentosCard({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  if (total === 0) return null;

  const active = testimonials[activeIndex];
  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  return (
    <div className="border-border bg-surface w-full overflow-hidden rounded-[var(--radius-card)] border">
      <figure
        key={active._id}
        aria-live="polite"
        aria-atomic="true"
        className="grid md:min-h-64 md:grid-cols-[1fr_280px]"
      >
        <blockquote className="relative flex items-center p-6 pt-14 text-xl leading-relaxed font-medium sm:p-9 sm:pt-16 md:p-12 md:pt-16 md:text-3xl">
          <span
            className="text-accent font-editorial absolute top-5 left-6 text-6xl leading-none sm:top-6 sm:left-9 md:top-8 md:left-12"
            aria-hidden="true"
          >
            “
          </span>
          <span className="text-foreground">{active.quote}</span>
        </blockquote>

        <figcaption className="bg-background border-border flex items-center gap-4 border-t p-6 md:border-t-0 md:border-l md:px-8">
          <div className="border-border-strong bg-surface text-foreground flex size-12 shrink-0 items-center justify-center rounded-full border text-lg font-semibold">
            {active.initial}
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-semibold">
              {active.name}
            </p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              {[active.role, active.company].filter(Boolean).join(" · ")}
            </p>
          </div>
        </figcaption>
      </figure>

      <div className="border-border flex items-center justify-between gap-4 border-t px-5 py-4 sm:px-8">
        <span className="text-muted font-mono text-xs">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        {total > 1 && (
          <div
            className="flex flex-1 justify-center gap-2 px-4"
            aria-label="Escolher depoimento"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial._id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Mostrar depoimento ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`size-2 rounded-full transition-colors duration-150 ${index === activeIndex ? "bg-accent" : "bg-border-strong hover:bg-muted"}`}
              />
            ))}
          </div>
        )}

        {total > 1 && (
          <div className="flex gap-2" aria-label="Navegação dos depoimentos">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="ui-icon-button size-10"
              aria-label="Depoimento anterior"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="ui-icon-button size-10"
              aria-label="Próximo depoimento"
            >
              <Arrow direction="right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
