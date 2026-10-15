"use client";

import { useRef } from "react";
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

      <Container className="max-w-none -translate-y-10 px-6 py-24 md:-translate-y-24 md:px-10 md:py-28 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-foreground/80 mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.24em] uppercase md:text-sm">
            <span className="bg-accent h-px w-8" aria-hidden="true" />
            Estratégia · Identidade · Experiência
          </p>

          <h1
            id="hero-title"
            className="font-display text-foreground max-w-[50rem] text-[clamp(2.75rem,5.2vw,5rem)] leading-[0.98] font-semibold tracking-[-0.055em]"
          >
            Não seguimos tendências.  {" "}
            <span className="text-accent"><br />Criamos referências.<br /></span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:mt-8 md:text-lg">
            Design estratégico para transformar percepção em valor.
          </p>

        </div>
      </Container>


    </section>
  );
}
