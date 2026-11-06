"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { CaseListItem } from "@/sanity/lib/fetchers";

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

interface HeroScrollAnimationProps {
  projects: CaseListItem[];
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

const GRID_PATTERN =
  "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]";

function formatProjectName(name: string) {
  return name.replace(/\bfl[aàá]vio\b/gi, (part) =>
    part === part.toUpperCase() ? "FLÁVIO" : "Flávio",
  );
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.985 : 0.97]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -0.35 : -0.8]);

  return (
    <motion.section
      style={reduceMotion ? undefined : { scale, rotate }}
      className="bg-gradient-to-t to-[#dadada] from-[#ebebeb] sticky top-0 z-10 flex h-[100svh] flex-col items-center justify-center text-black"
    >
      <div className={GRID_PATTERN} aria-hidden="true" />

      <h1 className="type-h1 px-6 text-center text-accent">
        Projetos
      </h1>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps & {
  projects: CaseListItem[];
  sectionRef: React.RefObject<HTMLElement | null>;
}> = ({
  scrollYProgress,
  projects,
  sectionRef,
}) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.975 : 0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.35 : 2.2, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={reduceMotion ? undefined : { scale, rotate, transformOrigin: "top center" }}
      className="bg-gradient-to-t to-[#1a1919] from-background relative z-10 min-h-[100svh] text-white"
    >
      <div className={GRID_PATTERN} aria-hidden="true" />

      <Container className="relative z-10 pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
        <h2 className="type-h2 pb-6 sm:pb-8 md:pb-12">
          Forma, estratégia e detalhe em cada projeto.
        </h2>

        {projects.length === 0 ? (
          <p className="type-small text-muted text-center py-12">
            Nenhum projeto para exibir.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-8">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projetos/${project.slug}`}
                className="bg-surface group relative aspect-[4/3] w-full overflow-hidden rounded-md sm:aspect-[3/2]"
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
                    <span className="font-editorial text-muted/60 group-hover:text-accent text-[length:var(--type-display-glyph)] transition-colors duration-200">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 group-focus-visible:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <h3 className="project-home-card__title type-h3 max-w-full text-white uppercase">
                    {formatProjectName(project.client || project.title)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-10 md:mt-14 flex justify-center">
          <ViewAllProjectsButton reduceMotion={!!reduceMotion} />
        </div>
      </Container>
    </motion.section>
  );
};

function ViewAllProjectsButton({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Link
      href="/projetos"
      className="type-button group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-4 py-4 font-semibold uppercase text-white whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:gap-4 sm:px-10"
      style={
        reduceMotion
          ? { transitionDuration: "0ms" }
          : undefined
      }
      aria-label="Ver todos os projetos"
    >
      {/* Left arrow - slides in from left on hover */}
      <span
        className="relative flex-shrink-0 w-5 h-5 stroke-white fill-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1"
        aria-hidden="true"
        style={reduceMotion ? { transform: "translateX(0)" } : undefined}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>

      {/* Button text */}
      <span
        className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-0.5"
        style={reduceMotion ? { transform: "translateX(0)" } : undefined}
      >
        Ver todos os projetos
      </span>

      {/* Expanding circle background on hover */}
      <span
        className="absolute inset-0 bg-accent rounded-full scale-0 origin-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-100"
        aria-hidden="true"
        style={reduceMotion ? { transform: "scale(1)" } : undefined}
      />

      {/* Right arrow - slides out to right on hover */}
      <span
        className="relative flex-shrink-0 w-5 h-5 stroke-white fill-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:opacity-0"
        aria-hidden="true"
        style={reduceMotion ? { transform: "translateX(0)", opacity: 0 } : undefined}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export default function HeroScrollAnimation({ projects }: HeroScrollAnimationProps) {
  const projectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "start start"],
  });

  return (
    <div className="relative h-auto overflow-x-clip bg-background">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2
        sectionRef={projectsRef}
        scrollYProgress={scrollYProgress}
        projects={projects}
      />
    </div>
  );
}
