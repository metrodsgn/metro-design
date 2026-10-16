"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TAGLINE } from "@/lib/constants";

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function FaixaTexto() {
  const reduceMotion = useReducedMotion();
  const hasMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  );

  return (
    <section className="py-24 md:py-32">
      <Container>
        <AnimatedTagline animate={hasMounted} move={reduceMotion === false} />
      </Container>
    </section>
  );
}

function AnimatedTagline({
  animate,
  move,
}: {
  animate: boolean;
  move: boolean;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = TAGLINE.text.split(" ");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 1", "end 0.5"],
  });

  return (
    <p
      ref={containerRef}
      className="font-editorial text-foreground flex w-full max-w-none flex-wrap gap-x-[0.22em] gap-y-[0.08em] text-[clamp(2.25rem,5.2vw,6rem)] leading-[1.08] tracking-tight"
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = (index + 1) / words.length;

        return (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            animate={animate}
            move={move}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  animate,
  move,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  animate: boolean;
  move: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, move ? ["20%", "0%"] : ["0%", "0%"]);

  return (
    <span className="inline-block overflow-hidden pb-1">
      <motion.span
        style={animate ? { opacity, y } : { opacity: 1, y: 0 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
