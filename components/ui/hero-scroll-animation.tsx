"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import AnimatedText from "@/components/ui/animated-text";
import { urlFor } from "@/sanity/lib/image";
import type { CaseListItem } from "@/sanity/lib/fetchers";

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

interface HeroScrollAnimationProps {
  projects: CaseListItem[];
}

const GRID_PATTERN =
  "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]";

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const reduceMotion = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={reduceMotion ? undefined : { scale, rotate }}
      className="bg-gradient-to-t to-[#dadada] from-[#ebebeb] sticky top-0 z-10 flex h-[100svh] flex-col items-center justify-center text-black"
    >
      <div className={GRID_PATTERN} aria-hidden="true" />

      <h1 className="font-editorial px-6 text-center text-5xl leading-[110%] tracking-tight text-accent sm:text-6xl md:text-7xl 2xl:text-8xl 3xl:text-9xl">
        Role para descobrir <br /> como pensamos
      </h1>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps & { projects: CaseListItem[] }> = ({
  scrollYProgress,
  projects,
}) => {
  const reduceMotion = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={reduceMotion ? undefined : { scale, rotate }}
      className="bg-gradient-to-t to-[#1a1919] from-background relative z-10 h-[100svh] text-white"
    >
      <div className={GRID_PATTERN} aria-hidden="true" />

      <Container className="relative z-10 pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
        <h2 className="font-editorial pb-8 md:pb-12 text-4xl leading-[100%] tracking-tight sm:text-5xl md:text-6xl">
          Forma, estratégia e detalhe <br /> em cada projeto
        </h2>

        {projects.length === 0 ? (
          <p className="text-muted text-center py-12 text-sm">
            Nenhum projeto para exibir.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-[24rem] md:grid-cols-4">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projetos/${project.slug}`}
                className="bg-surface relative h-48 w-full overflow-hidden rounded-md sm:h-56 md:h-full group"
              >
                {project.cover ? (
                  <Image
                    src={urlFor(project.cover).width(900).height(600).url()}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-editorial text-muted/60 group-hover:text-accent text-8xl transition-colors duration-200">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="label-mono text-white/80">{project.category}</span>
                  <h3 className="font-editorial text-white mt-1 text-xl leading-tight sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="label-mono text-white/60 mt-2 block">{project.year}</span>
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
      className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-transparent px-10 py-4 text-sm font-semibold uppercase text-white whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <div ref={container} className="relative h-[200vh] bg-background">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} projects={projects} />
      </div>
      <WordmarkBand />
    </>
  );
}

function WordmarkBand() {
  return (
    <div className="@container relative z-20 h-[clamp(230px,38vw,400px)] overflow-hidden bg-background">
      <div className="absolute inset-0 flex flex-col">
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-[clamp(1.5rem,3vw,3rem)]">
          <AnimatedText
            text="metro design"
            className="font-sans text-accent max-w-full text-center text-[12cqw] leading-[1.05] font-semibold tracking-[-0.04em] whitespace-nowrap"
            animationType="letters"
            duration={0.6}
            staggerDelay={0.045}
            initialY={48}
            initialOpacity={0}
            repeat
          />
        </div>
        <div className="h-[18%] shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}
