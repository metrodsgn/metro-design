"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { METRUS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

type Status = "approved" | "pending" | "changes";

const VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" } as const;

const statusStyles: Record<Status, string> = {
  approved: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  changes: "bg-accent/15 text-accent",
};

const statusColors: Record<Status, { bg: string; fg: string }> = {
  approved: { bg: "rgba(52, 211, 153, 0.15)", fg: "#34d399" },
  pending: { bg: "rgba(251, 191, 36, 0.15)", fg: "#fbbf24" },
  changes: { bg: "rgba(255, 46, 46, 0.15)", fg: "#ff2e2e" },
};

export function MetrusMockup() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <div className="border-border bg-surface relative rounded-card border p-6 shadow-elevated">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <span className="font-display text-foreground text-base font-bold tracking-tight">
          Metrus
        </span>
        <div className="flex items-center gap-2">
          <span className="bg-border h-6 w-6 rounded-full" />
          <span className="bg-border h-2 w-16 rounded-full" />
        </div>
      </div>

      <motion.div
        className="mt-6 space-y-4"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT}
        variants={container}
      >
        {METRUS.mockups.map((mockup) => {
          const colors = statusColors[mockup.status];

          const pill: Variants = {
            hidden: { backgroundColor: "rgba(0, 0, 0, 0)", color: "#6b6b6b" },
            visible: {
              backgroundColor: colors.bg,
              color: colors.fg,
              transition: { duration: 0.45, ease: EASE, delay: 0.15 },
            },
          };

          return (
            <motion.div
              key={mockup.title}
              variants={reduceMotion ? undefined : item}
              className="border-border bg-background/50 grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 rounded-control border p-3 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4"
            >
              <div className="bg-border h-10 w-10 shrink-0 rounded-control sm:h-14 sm:w-14" />

              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {mockup.title}
                </p>
                <p className="text-muted mt-1 text-xs">
                  Última atualização há 2 dias
                </p>
              </div>

              <motion.span
                variants={reduceMotion ? undefined : pill}
                className={`col-start-2 justify-self-start rounded-full px-3 py-1 text-xs font-medium sm:col-start-auto sm:justify-self-auto ${
                  reduceMotion ? statusStyles[mockup.status] : ""
                }`}
              >
                {mockup.statusLabel}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
