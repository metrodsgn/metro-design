"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis } from "@/lib/smooth-scroll";

// Só repõe o scroll no topo a cada navegação (sem fade: troca de página imediata).
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
