"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ServiceArea = {
  title: string;
  items: readonly string[];
};

export function ServicesAccordion({
  areas,
}: {
  areas: readonly ServiceArea[];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { height: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.18 } };

  const toggle = (index: number) => {
    setOpenIndex((currentIndex) => currentIndex === index ? -1 : index);
  };

  return (
    <div className="services-accordion border-border border-t">
      {areas.map((area, index) => {
        const isOpen = openIndex === index;
        const panelId = `fazemos-panel-${index}`;
        const buttonId = `fazemos-button-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div key={area.title} className="services-accordion__item">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="services-accordion__button group motion-reduce:transition-none"
            >
              <span className="services-accordion__number" aria-hidden="true">
                {number}
              </span>
              <span className="services-accordion__title">{area.title}</span>
              <span className="services-accordion__icon" aria-hidden="true">
                <span className="services-accordion__icon-line" />
                <span
                  className={`services-accordion__icon-line services-accordion__icon-line--vertical ${isOpen ? "is-open" : ""}`}
                />
              </span>
            </button>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className="services-accordion__panel"
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={panelTransition}
            >
              <motion.ul
                className="services-accordion__list"
                initial={false}
                animate={{ y: isOpen ? 0 : -8 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
              >
                {area.items.map((item) => (
                  <li key={item} className="services-accordion__entry">
                    <span className="services-accordion__bullet" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
