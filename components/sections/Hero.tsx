"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const reduceMotion = useReducedMotion();
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-background relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* O vídeo continua como elemento principal da composição. */}
      <motion.div
        style={{ y: reduceMotion ? 0 : videoY }}
        className="absolute inset-0 -z-20 h-[118%] w-full"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradientes deixam o texto legível sem apagar o vídeo. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.16)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.48)_0%,transparent_38%,rgba(0,0,0,0.18)_100%)]"
        aria-hidden="true"
      />

      <Container className="py-24 md:py-28">
        <div className="max-w-4xl">
          <p className="text-foreground/80 mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.24em] uppercase md:text-sm">
            <span className="bg-accent h-px w-8" aria-hidden="true" />
            Estratégia · Branding · Conteúdo
          </p>

          <h1
            id="hero-title"
            className="font-display text-foreground max-w-4xl text-[clamp(2.75rem,6.2vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.055em]"
          >
            Transformamos negócios com design e comunicação{" "}
            <span className="text-accent">estratégica.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:mt-8 md:text-lg">
            Criamos marcas e experiências que aproximam negócios de pessoas e
            ajudam ideias a ganhar espaço.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 md:mt-10">
            <Link href="/projetos" className="ui-button ui-button-accent">
              Ver projetos
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contato" className="ui-button ui-button-secondary">
              Fale conosco
            </Link>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute right-6 bottom-6 hidden items-center gap-3 text-[10px] tracking-[0.2em] text-white/65 uppercase md:flex lg:right-12 lg:bottom-8">
        <span className="bg-accent h-8 w-px" aria-hidden="true" />
        Ideias que movem marcas
      </div>
    </section>
  );
}
