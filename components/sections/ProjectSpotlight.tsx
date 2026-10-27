"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type ProjectSpotlightImage = {
  src: string;
  alt: string;
};

type ProjectSpotlightProps = {
  image: ProjectSpotlightImage;
  caption: string;
  ariaLabel?: string;
  className?: string;
  parallaxDirection?: "up" | "down";
};

export function ProjectSpotlight({
  image,
  caption,
  ariaLabel,
  className = "",
  parallaxDirection = "up",
}: ProjectSpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const movesUp = parallaxDirection === "up";
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    movesUp ? ["-7%", "7%"] : ["7%", "-7%"]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    movesUp ? ["5%", "-5%"] : ["-5%", "5%"]
  );

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? `Destaque: ${caption}`}
      className={`w-full ${className}`}
    >
      <div className="rounded-card bg-surface relative isolate aspect-[4/5] overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={
            reduceMotion ? { scale: 1.18 } : { y: backgroundY, scale: 1.18 }
          }
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-cover opacity-60 blur-3xl saturate-50"
          />
        </motion.div>
        <div className="bg-background/60 absolute inset-0" />

        <div className="relative flex h-full flex-col items-center justify-center gap-5 p-5 sm:gap-6 sm:p-8">
          <figure className="flex w-[84%] max-w-[32rem] flex-col sm:w-[78%]">
            <div className="rounded-card bg-background/40 shadow-elevated relative aspect-square w-full overflow-hidden border border-white/10">
              <motion.div
                style={
                  reduceMotion ? { scale: 1.12 } : { y: imageY, scale: 1.12 }
                }
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 58vw, 32rem"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <figcaption className="label-mono text-foreground-soft mt-5 text-center tracking-[0.3em] sm:mt-6">
              {caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
