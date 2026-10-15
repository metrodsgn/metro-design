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
  const isContactPage = pathname === "/contato";

  if (isStudio) return children;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
      {!isContactPage && floatingAction}
    </>
  );
}
