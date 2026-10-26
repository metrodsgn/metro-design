"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: "110%" },
    visible: { y: "0%" },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
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
          className="max-w-4xl"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          <h1
            id="hero-title"
            className="font-editorial text-foreground text-display leading-[0.95] tracking-[-0.03em]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={lineVariants}
                transition={{ duration: 0.8, ease: EASE }}
                className="block"
              >
                Não seguimos tendências.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={lineVariants}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-accent block italic"
              >
                Criamos referências.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeVariants}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-foreground/75 mt-6 max-w-xl text-base leading-relaxed md:mt-7 md:text-lg"
          >
            Design estratégico para transformar percepção em valor.
          </motion.p>

          <motion.div
            variants={fadeVariants}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4 md:mt-10"
          >
            <Link
              href="/projetos"
              className="ui-button ui-button-accent"
              data-cursor="Ver projetos ↗"
            >
              Ver projetos <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <motion.p
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
        className="label-mono absolute bottom-6 left-5 z-10 hidden md:block sm:left-6 md:left-8 lg:left-12"
      >
        (Scroll)
      </motion.p>
    </section>
  );
}
