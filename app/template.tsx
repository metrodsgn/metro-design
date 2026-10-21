"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis } from "@/lib/smooth-scroll";
import { motion, useReducedMotion } from "framer-motion";

// Apenas animação de ENTRADA (o App Router não anima saída de forma confiável).
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (pathname.startsWith("/studio")) return <>{children}</>;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
