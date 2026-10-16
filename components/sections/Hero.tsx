"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="hero-section bg-background relative isolate flex min-h-svh items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* O vídeo continua como elemento principal da composição. */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
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

      <Container className="max-w-none -translate-y-4 px-5 py-20 sm:px-6 md:-translate-y-24 md:px-10 md:py-28 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.04 },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            className="text-foreground/80 mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.18em] uppercase sm:text-xs sm:tracking-[0.24em] md:text-sm"
          >
            <span className="bg-accent h-px w-8" aria-hidden="true" />
            Estratégia · Identidade · Experiência
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            className="font-editorial text-foreground max-w-[54rem] text-[clamp(3.35rem,11vw,5.2rem)] leading-[0.9] font-normal tracking-[-0.035em] md:text-[clamp(5rem,8vw,7.5rem)]"
          >
            Não seguimos tendências.{" "}
            <span className="text-accent">
              <br />
              Criamos referências.
              <br />
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:mt-8 md:text-lg"
          >
            Design estratégico para transformar percepção em valor.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
