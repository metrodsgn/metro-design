"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorArrow } from "@/components/ui/CursorArrow";
import { ExitIntentModal } from "@/components/ui/ExitIntentModal";

type SiteShellProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  floatingAction: ReactNode;
};

export function SiteShell({
  children,
  header,
  footer,
  floatingAction,
}: SiteShellProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  const isContactPage = pathname === "/contato";

  if (isStudio) return children;

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {header}
      <main>{children}</main>
      {footer}
      {!isContactPage && floatingAction}
      {!isContactPage && <ExitIntentModal />}
      <CursorArrow />
    </MotionConfig>
  );
}
