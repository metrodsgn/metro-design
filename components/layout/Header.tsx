"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const detectTextOverlap = () => {
      const inkItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-ink]"),
      );
      const header = document.querySelector("header");
      if (!header || inkItems.length === 0) return;

      const inkRects = inkItems.map((item) => ({
        item,
        rects: Array.from(item.getClientRects()),
      }));
      const overlaps = new Set<HTMLElement>();
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      const range = document.createRange();
      let node = walker.nextNode();

      while (node) {
        const text = node.textContent?.trim();
        const parent = node.parentElement;
        if (text && parent && !header.contains(parent)) {
          range.selectNodeContents(node);
          const textRects = Array.from(range.getClientRects());

          for (const { item, rects } of inkRects) {
            if (
              !overlaps.has(item) &&
              rects.some((inkRect) =>
                textRects.some(
                  (textRect) =>
                    inkRect.left < textRect.right &&
                    inkRect.right > textRect.left &&
                    inkRect.top < textRect.bottom &&
                    inkRect.bottom > textRect.top,
                ),
              )
            ) {
              overlaps.add(item);
            }
          }
        }
        node = walker.nextNode();
      }

      inkItems.forEach((item) => {
        item.dataset.overText = String(overlaps.has(item));
      });
    };

    const updateVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (currentY < 80) {
        setVisible(true);
      } else if (delta < -4) {
        setVisible(true);
      } else if (delta > 4) {
        setVisible(false);
      }

      previousY = currentY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detectTextOverlap);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header
      onFocusCapture={() => setVisible(true)}
      className={`sticky top-0 z-50 -mb-20 border-b border-transparent bg-transparent transition-transform duration-300 ease-out motion-reduce:transition-none md:-mb-24 ${
        visible || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-36 bg-linear-to-b from-black/85 via-black/45 to-transparent"
      />
      <div className="relative z-10 mx-auto flex h-20 max-w-none items-center justify-between px-5 sm:px-6 md:h-24 md:px-10 lg:px-12">
        {/* Logo Metro */}
        <div className="inline-flex items-center">
          <BrandWordmark className="header-logo-ink" data-header-ink />
        </div>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-header-ink
              className="header-adaptive-ink text-sm font-medium transition-colors"
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
        className="border-border bg-background absolute inset-x-0 top-full z-20 max-h-[calc(100svh-5rem)] overflow-y-auto border-b px-5 py-3 shadow-2xl sm:px-6 md:max-h-[calc(100svh-6rem)] xl:hidden"
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
