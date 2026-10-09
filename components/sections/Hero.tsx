"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: o vídeo se move mais devagar que o scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Palavras do título (para animar individualmente)
  const titleWords =
    "Transformamos negócios com design e comunicação estratégica.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Vídeo de fundo com parallax */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 h-[130%] w-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Conteúdo com parallax + fade */}
      <Container className="relative z-10">
        <motion.h1
          style={{ y: contentY, opacity: contentOpacity }}
          className="font-display text-foreground max-w-5xl text-4xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          {titleWords.map((word, index) => (
            <span
              key={index}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block pr-[0.25em]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>
      </Container>
    </section>
  );
}