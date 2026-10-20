"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Curva de entrada do projeto — mesma assinatura de Reveal/RevealLines
 * (deceleração forte, entrada "premium").
 */
const EASE = [0.16, 1, 0.3, 1] as const;

type AnimatedTextProps = {
  text: string;
  className?: string;
  animationType?: "letters" | "words";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
  initialOpacity?: number;
  animateY?: number;
  animateOpacity?: number;
  /** Fração do elemento visível necessária para disparar. */
  viewportAmount?: number;
  /** Margem do viewport considerada no disparo. */
  viewportMargin?: string;
  /** Reexecuta a animação a cada nova entrada na viewport. */
  repeat?: boolean;
};

/**
 * Texto que surge de baixo para cima, letra a letra (ou palavra a palavra),
 * disparado pela entrada do elemento na viewport.
 *
 * Segue o mesmo sistema de revel do projeto (Reveal/RevealLines): variants
 * com stagger, entrada disparada por `whileInView` e easing de desaceleração.
 * Com `prefers-reduced-motion` o texto é entregue estático e legível.
 */
export default function AnimatedText({
  text,
  className = "",
  animationType = "letters",
  duration = 0.6,
  delay = 0,
  staggerDelay = 0.045,
  initialY = 40,
  initialOpacity = 0,
  animateY = 0,
  animateOpacity = 1,
  viewportAmount = 0.3,
  viewportMargin = "0px 0px -10% 0px",
  repeat = true,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();

  const letters = text.split("");
  const words = text.split(" ");

  // Movimento reduzido: nenhuma transformação é aplicada, o texto nasce
  // estático e legível (sem fade, sem deslocamento).
  if (reduceMotion) {
    return (
      <span className={className}>
        {animationType === "letters"
          ? letters.map((char, index) => (
              <span
                key={`letter-${index}`}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))
          : words.map((word, index) => (
              <span key={`word-${index}`} className="mr-2 inline-block">
                {word}
              </span>
            ))}
      </span>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: initialY, opacity: initialOpacity },
    visible: {
      y: animateY,
      opacity: animateOpacity,
      transition: { duration, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: viewportAmount, margin: viewportMargin }}
    >
      {animationType === "letters"
        ? letters.map((char, index) => (
            <motion.span
              key={`letter-${index}`}
              variants={itemVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))
        : words.map((word, index) => (
            <motion.span
              key={`word-${index}`}
              variants={itemVariants}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
    </motion.div>
  );
}
