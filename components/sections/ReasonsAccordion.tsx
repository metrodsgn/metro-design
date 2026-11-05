"use client";

import { useState } from "react";
import styles from "@/app/fazemos/page.module.css";

type Reason = readonly [string, string];

export function ReasonsAccordion({ items }: { items: readonly Reason[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ol className={styles.reasonList}>
      {items.map(([title, description], index) => {
        const isOpen = openIndex === index;
        const panelId = `reason-description-${index}`;
        return (
          <li className={styles.reasonItem} key={title}>
            <h3>
              <button
                className={styles.reasonButton}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{title}</span>
                <span className={styles.reasonIcon} aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div className={styles.reasonPanel} id={panelId} hidden={!isOpen}>
              <p>{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
