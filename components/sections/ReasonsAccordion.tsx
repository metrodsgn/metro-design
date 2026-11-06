"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "@/app/fazemos/page.module.css";

type Reason = readonly [string, string];

export function ReasonsAccordion({ items }: { items: readonly Reason[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { height: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.18 } };

  return (
    <ol className={styles.reasonList}>
      {items.map(([title, description], index) => {
        const isOpen = openIndex === index;
        const buttonId = `reason-button-${index}`;
        const panelId = `reason-description-${index}`;
        return (
          <li className={styles.reasonItem} key={title}>
            <h3>
              <button
                className={styles.reasonButton}
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{title}</span>
                <motion.span
                  className={styles.reasonIcon}
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
                >
                  +
                </motion.span>
              </button>
            </h3>
            <motion.div
              className={styles.reasonPanel}
              id={panelId}
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={panelTransition}
            >
              <motion.p
                initial={false}
                animate={{ y: isOpen ? 0 : -8 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
              >
                {description}
              </motion.p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
