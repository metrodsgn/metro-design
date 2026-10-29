"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import type { ProjectDetailData } from "@/lib/project-detail";
import { ProjectTransitionCard } from "@/components/sections/ProjectTransitionCard";

export function ProjectDetail({ project }: { project: ProjectDetailData }) {
  const rootRef = useRef<HTMLElement>(null);
  const description = project.description ?? [];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-project-reveal]")
    );

    const revealAll = () => {
      items.forEach((item) => {
        item.dataset.visible = "true";
      });
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <article ref={rootRef} className="bg-background text-foreground">
      <Container variant="detail" className="pb-[7.5rem]">
        <header className="pt-32 text-center md:pt-44">
          <h1
            data-project-reveal
            className="project-detail-reveal text-foreground font-editorial text-[clamp(3.25rem,9vw,7rem)] leading-[1.05] font-normal tracking-normal text-balance break-words"
          >
            {project.title}
          </h1>

          {description.length > 0 && (
            <div className="mx-auto mt-10 flex max-w-[44rem] flex-col gap-10">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  data-project-reveal
                  className={`project-detail-reveal m-0 font-sans text-[15px] leading-[1.5] font-light text-pretty text-[#BDBDBD] md:text-base`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </header>

        {project.media.length > 0 && (
          <section
            aria-labelledby="project-gallery-title"
            className="mt-[7.5rem] flex flex-col gap-12 md:gap-[4.6875rem]"
          >
            <h2 id="project-gallery-title" className="sr-only">
              Galeria do projeto {project.title}
            </h2>

            {project.media.map((media, index) => (
              <figure
                key={`${media.src}-${index}`}
                data-project-reveal
                className="project-detail-reveal relative isolate w-full overflow-hidden"
                style={{ backgroundColor: media.bg }}
              >
                <Image
                  src={media.src}
                  alt=""
                  fill
                  sizes="(max-width: 1296px) 100vw, 1296px"
                  aria-hidden="true"
                  className="pointer-events-none z-0 scale-110 object-cover opacity-40 blur-2xl"
                />
                <div
                  className="relative z-10 mx-auto"
                  style={{
                    width: `min(100%, ${(media.width / media.height) * 88}svh)`,
                  }}
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    width={media.width}
                    height={media.height}
                    sizes="(max-width: 1296px) 100vw, 1296px"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="block h-auto w-full"
                  />
                </div>
              </figure>
            ))}
          </section>
        )}

        {project.nextProject && (
          <nav
            aria-label="Navegação entre projetos"
            className="border-border mt-[7.5rem] border-t"
          >
            <div className="project-navigation__links">
              <ProjectTransitionCard project={project.nextProject} />
            </div>
          </nav>
        )}

        <div className="mx-auto mt-8 flex max-w-6xl justify-center sm:justify-start">
          <Link href="/projetos" className="project-back-button">
            <span className="project-back-button__circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="project-back-button__text">Todos os projetos</span>
          </Link>
        </div>
      </Container>
    </article>
  );
}
