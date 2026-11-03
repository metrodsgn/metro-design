"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { CaseListItem } from "@/sanity/lib/fetchers";

interface HeroScrollAnimationProps {
  projects: CaseListItem[];
}

const GRID_PATTERN =
  "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_100%)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]";

function IntroSection() {
  return (
    <section className="bg-gradient-to-t to-[#dadada] from-[#ebebeb] sticky top-0 z-0 flex h-svh flex-col items-center justify-center overflow-hidden text-black">
      <div className={GRID_PATTERN} aria-hidden="true" />
      <h1 className="font-editorial relative z-10 px-6 text-center text-5xl leading-[110%] tracking-tight text-accent sm:text-6xl md:text-7xl 2xl:text-8xl 3xl:text-9xl">
        Role para descobrir <br /> como pensamos
      </h1>
    </section>
  );
}

function ProjectsSection({ projects }: HeroScrollAnimationProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1.2, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={reduceMotion ? undefined : { scale, rotate, y, opacity, transformOrigin: "top center" }}
      className="bg-gradient-to-t to-[#1a1919] from-background relative z-10 min-h-[100svh] text-white"
    >
      <div className={GRID_PATTERN} aria-hidden="true" />

      <Container className="relative z-10 pb-12 pt-16 md:pb-16 md:pt-24 lg:pt-32">
        <h2 className="font-editorial pb-6 text-3xl leading-[100%] tracking-tight sm:pb-8 sm:text-5xl md:pb-12 md:text-6xl">
          Forma, estratégia e detalhe <br /> em cada projeto
        </h2>

        {projects.length === 0 ? (
          <p className="text-muted py-12 text-center text-sm">
            Nenhum projeto para exibir.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:gap-8">
            {projects.map((project) => (
              <div key={project._id}>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="bg-surface group relative block aspect-[4/3] w-full overflow-hidden rounded-md"
                >
                  {project.cover?.asset?._ref ? (
                    <Image
                      src={urlFor(project.cover).width(1400).height(1050).url()}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-editorial text-muted/60 group-hover:text-accent text-8xl transition-colors duration-200">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 text-left transition-all duration-300 md:bottom-4 md:left-4 md:right-4 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {project.services?.find(Boolean) && (
                      <span className="label-mono text-white/80">
                        {project.services.find(Boolean)}
                      </span>
                    )}
                    <h3 className="font-editorial mt-1 text-base leading-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <span className="label-mono mt-1.5 block text-white/60 md:mt-2">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center md:mt-14">
          <ViewAllProjectsButton reduceMotion={!!reduceMotion} />
        </div>
      </Container>
    </motion.section>
  );
}

function ViewAllProjectsButton({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Link
      href="/projetos"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-4 py-4 text-sm font-semibold uppercase whitespace-nowrap text-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:gap-4 sm:px-10"
      style={reduceMotion ? { transitionDuration: "0ms" } : undefined}
      aria-label="Ver todos os projetos"
    >
      <span
        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
      <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
        Ver todos os projetos
      </span>
      <span
        className="absolute inset-0 origin-center scale-0 rounded-full bg-accent transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-100"
        aria-hidden="true"
      />
      <span
        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:opacity-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export default function HeroScrollAnimation({ projects }: HeroScrollAnimationProps) {
  return (
    <div className="relative h-auto overflow-x-clip bg-background">
      <IntroSection />
      <ProjectsSection projects={projects} />
    </div>
  );
}
