"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

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

  if (isStudio) return children;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
      {floatingAction}
    </>
  );
}
