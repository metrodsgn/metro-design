"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 88;

export function CursorArrow() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const springX = useSpring(x, { stiffness: 420, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 420, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);

    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
      const target = event.target as HTMLElement | null;
      const cursorTarget = target?.closest?.("[data-cursor]");
      setLabel(cursorTarget?.getAttribute("data-cursor") ?? null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="bg-accent pointer-events-none fixed top-0 left-0 z-[200] flex size-22 items-center justify-center rounded-full px-3 text-center"
      style={{ x: springX, y: springY }}
      animate={{ scale: label ? 1 : 0.25, opacity: label ? 1 : 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="label-mono text-white">{label}</span>
    </motion.div>
  );
}
