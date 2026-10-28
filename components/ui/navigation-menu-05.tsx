"use client";

import { Home, LayoutGrid, Mail, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NAV_ICONS = {
  "/": Home,
  "/sobre": Users,
  "/projetos": LayoutGrid,
  "/contato": Mail,
} as const;

type NavigationMenuWithActiveItemProps = {
  overText?: boolean;
};

export default function NavigationMenuWithActiveItem({
  overText = false,
}: NavigationMenuWithActiveItemProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6 xl:space-x-8">
        {NAV_LINKS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = NAV_ICONS[item.href] ?? Home;

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink active={isActive} asChild>
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
                    "data-active:before:scale-x-100 data-[state=open]:before:scale-x-100",
                    "hover:bg-transparent focus:bg-transparent active:bg-transparent",
                    isActive && "header-adaptive-ink-active before:scale-x-100"
                  )}
                >
                  <span className="flex flex-row items-center gap-2.5">
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {item.label}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
