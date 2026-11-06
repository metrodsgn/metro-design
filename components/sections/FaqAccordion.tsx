"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FaqItem = { question: string; answer: string };
const FAQ_EASE = [0.22, 1, 0.36, 1] as const;

export function FaqAccordion({
  items,
  splitColumns = false,
}: {
  items: readonly FaqItem[];
  splitColumns?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : {
        height: { type: "spring" as const, stiffness: 180, damping: 30, mass: 1.1 },
        opacity: { duration: 0.28, ease: FAQ_EASE },
        paddingTop: { duration: 0.34, ease: FAQ_EASE },
        paddingBottom: { duration: 0.34, ease: FAQ_EASE },
      };
  const columns = splitColumns
    ? [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))]
    : [items];

  return (
    <div className="about-faq__grid">
      {columns.map((columnItems, columnIndex) => <div className="about-faq__column" key={columnIndex}>
      {columnItems.map((item) => {
        const index = items.indexOf(item);
        const isOpen = openIndex === index;
        const buttonId = `about-faq-question-${index}`;
        const panelId = `about-faq-answer-${index}`;
        return (
          <article key={item.question} className={`about-faq__card${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <motion.span
                className="about-faq__icon"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 26 }}
              >
                +
              </motion.span>
            </button>
            <motion.div
              id={panelId}
              className="about-faq__answer"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                paddingTop: isOpen && !splitColumns ? "0.5rem" : "0rem",
                paddingBottom: isOpen ? (splitColumns ? "0.85rem" : "1rem") : "0rem",
              }}
              transition={panelTransition}
            >
              {item.answer}
            </motion.div>
          </article>
        );
      })}
      </div>)}
    </div>
  );
}
