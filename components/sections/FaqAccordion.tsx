"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({
  items,
  splitColumns = false,
}: {
  items: readonly FaqItem[];
  splitColumns?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const columns = splitColumns
    ? [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))]
    : [items];

  return (
    <div className="about-faq__grid">
      {columns.map((columnItems, columnIndex) => <div className="about-faq__column" key={columnIndex}>
      {columnItems.map((item) => {
        const index = items.indexOf(item);
        const isOpen = openIndex === index;
        const panelId = `about-faq-answer-${index}`;
        return (
          <article key={item.question} className={`about-faq__card${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="about-faq__icon" aria-hidden="true">{isOpen ? "×" : "+"}</span>
            </button>
            <div id={panelId} className="about-faq__answer" hidden={!isOpen}>
              {item.answer}
            </div>
          </article>
        );
      })}
      </div>)}
    </div>
  );
}
