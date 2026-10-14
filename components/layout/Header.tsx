"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="relative mx-auto flex h-24 max-w-none items-center justify-between px-6 md:px-10 lg:px-12">
        {/* Logo Metro */}
        <Link
          href="/"
          className="inline-flex items-center transition-opacity hover:opacity-80"
        >
          <BrandWordmark />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="ui-icon-button -mr-2 md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegação para celular"
        hidden={!menuOpen}
        className="border-border bg-background absolute inset-x-0 top-full border-b px-6 py-3 shadow-2xl md:hidden"
      >
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="border-border text-foreground hover:text-accent flex min-h-14 items-center justify-between border-b text-base transition-colors last:border-b-0"
          >
            <span>{link.label}</span>
            <span className="text-muted font-mono text-xs" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
