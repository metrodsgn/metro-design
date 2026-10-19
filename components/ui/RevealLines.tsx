"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealLinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  maskClassName?: string;
  delay?: number;
};

export function RevealLines({
  lines,
  as: Component = "h2",
  className = "",
  maskClassName = "",
  delay = 0,
}: RevealLinesProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: 0.08 },
    },
  };

  const line: Variants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <Component className={className}>
      <motion.span
        className="flow-root"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
        variants={container}
      >
        {lines.map((content, index) => (
          <span
            key={index}
            className={`block overflow-hidden pb-[0.08em] ${maskClassName}`}
          >
            <motion.span
              className="block"
              variants={reduceMotion ? undefined : line}
            >
              {content}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
