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
    // Sem transform residual: um `transform` no wrapper cria containing block
    // e quebra elementos `position: fixed` (mapa do contato, progresso etc.).
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
