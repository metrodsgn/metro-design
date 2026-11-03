"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

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
                "header-adaptive-ink inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                "focus:outline-hidden",
                "disabled:pointer-events-none disabled:opacity-50",
                "hover:bg-transparent focus:bg-transparent active:bg-transparent",
                isActive && "header-adaptive-ink-active",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
