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
      <div className="relative mx-auto flex h-20 max-w-none items-center justify-between px-5 sm:px-6 md:h-24 md:px-10 lg:px-12">
        {/* Logo Metro */}
        <div className="inline-flex items-center">
          <BrandWordmark />
        </div>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex"
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

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/projetos" className="ui-button ui-button-accent">
            Ver projetos
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/contato" className="ui-button ui-button-secondary">
            Fale conosco
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="ui-icon-button -mr-2 xl:hidden"
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
        className="border-border bg-background absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto border-b px-5 py-3 shadow-2xl sm:px-6 md:max-h-[calc(100svh-6rem)] xl:hidden"
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
