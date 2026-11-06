"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: "110%" },
    visible: { y: "0%" },
  };

  return (
    <section
      className="hero-section bg-background relative isolate flex min-h-svh items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* O vídeo continua como elemento principal da composição. */}
      <div className="hero-video-exit absolute inset-0 -z-20" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/video-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradientes deixam o texto legível sem apagar o vídeo. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.16)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.48)_0%,transparent_38%,rgba(0,0,0,0.18)_100%)]"
        aria-hidden="true"
      />

      <Container className="hero-text-exit py-section-md md:py-section-lg">
        <motion.div
          className="max-w-none"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          <h1 id="hero-title" className="type-h1 text-foreground leading-[1.08]">
            <span className="block overflow-hidden pb-[0.35em]">
              <motion.span variants={lineVariants} transition={{ duration: 0.8, ease: EASE }} className="block">
                <span className="block"><span className="hero-title__marcas">Marcas</span>,</span>
                <span className="block">conteúdos e</span>
                <span className="block whitespace-nowrap">produtos <span className="text-accent">digitais</span></span>
              </motion.span>
            </span>
          </h1>

        </motion.div>
      </Container>

    </section>
  );
}
