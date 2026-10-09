"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TAGLINE } from "@/lib/constants";

export function FaixaTexto() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = TAGLINE.text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 1", "end 0.5"],
  });

  return (
    <section className="border-border border-y py-32 md:py-48">
      <Container>
        <p
          ref={containerRef}
          className="font-editorial text-foreground flex flex-wrap gap-x-3 gap-y-3 text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          {words.map((word, index) => {
            const start = index / words.length;
            const end = (index + 1) / words.length;

            return (
              <Word
                key={index}
                progress={scrollYProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </Container>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, ["60%", "0%"]);

  return (
    <span className="inline-block overflow-hidden pb-1">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}