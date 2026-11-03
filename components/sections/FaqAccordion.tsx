"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="about-faq__grid">
      {items.map((item, index) => {
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
    </div>
  );
}
