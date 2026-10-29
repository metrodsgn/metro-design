"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "h-5 w-5 shrink-0",
} as const;

const NAV_ICONS: Record<string, ReactNode> = {
  "/": (
    <svg {...ICON_PROPS}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "/sobre": (
    <svg {...ICON_PROPS}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "/projetos": (
    <svg {...ICON_PROPS}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  "/contato": (
    <svg {...ICON_PROPS}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

type NavigationMenuWithActiveItemProps = {
  overText?: boolean;
};

export default function NavigationMenuWithActiveItem({
  overText = false,
}: NavigationMenuWithActiveItemProps) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-center space-x-6 xl:space-x-8">
      {NAV_LINKS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              data-header-ink
              data-over-text={overText}
              className={cn(
                "header-adaptive-ink group relative inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                "before:bg-accent before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:transition-transform",
                "hover:before:scale-x-100",
                "focus:outline-hidden focus:before:scale-x-100",
                "disabled:pointer-events-none disabled:opacity-50",
                "hover:bg-transparent focus:bg-transparent active:bg-transparent",
                isActive && "header-adaptive-ink-active before:scale-x-100",
              )}
            >
              <span className="flex flex-row items-center gap-2.5">
                {NAV_ICONS[item.href]}
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
