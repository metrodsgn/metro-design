"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { getLenis } from "@/lib/smooth-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [overText, setOverText] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const reduceMotion = useReducedMotion();

  // Esconde ao rolar para baixo, mostra ao subir + inversão de cor quando o
  // header sobrepõe texto da página (detecção geométrica, rAF-throttled).
  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    let lastDetect = 0;

    const detectTextOverlap = () => {
      // Abaixo de xl só o wordmark aparece no header: a varredura de todos os
      // nós de texto da página é desnecessária e custosa no mobile.
      if (window.innerWidth < 1280) {
        setOverText(false);
        return;
      }

      const inkItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-ink]"),
      );
      const header = headerRef.current;
      if (!header || inkItems.length === 0) {
        setOverText(false);
        return;
      }

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

      setOverText(overlaps.size > 0);
    };

    const update = () => {
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

      // A detecção geométrica não precisa rodar a cada frame do scroll.
      const now = performance.now();
      if (now - lastDetect < 160) return;
      lastDetect = now;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detectTextOverlap);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Bloqueia o scroll do body (compatível com Lenis) enquanto o menu está aberto.
  useEffect(() => {
    if (menuOpen) {
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
    } else {
      getLenis()?.start();
      document.body.style.overflow = "";
    }

    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Foco, trap e Esc no overlay do menu.
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusables = overlay.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Devolve o foco ao botão ao fechar.
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <header
      ref={headerRef}
      onFocusCapture={() => setVisible(true)}
      className={`sticky top-0 z-[60] -mb-20 border-b border-transparent bg-transparent transition-transform duration-300 ease-out motion-reduce:transition-none md:-mb-24 ${
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
          <Link
            href="/"
            aria-label="Metro Design — início"
            className="inline-flex items-center"
            onClick={menuOpen ? closeMenu : undefined}
          >
            <BrandWordmark
              className="header-logo-ink"
              data-header-ink
              data-over-text={overText && !menuOpen}
            />
          </Link>
        </div>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                data-header-ink
                data-over-text={overText}
                className={`header-adaptive-ink text-sm font-medium transition-colors ${isActive ? "header-adaptive-ink-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
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
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
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


    </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="main-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            className="bg-background fixed inset-0 z-[55] flex flex-col justify-start overflow-y-auto px-5 pt-24 pb-10 sm:px-6 md:px-10 lg:px-12 xl:hidden"
          >
            <div className="my-auto flex w-full flex-col">
              <motion.nav
                aria-label="Menu"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.06,
                      delayChildren: reduceMotion ? 0 : 0.08,
                    },
                  },
                }}
                className="mx-auto flex w-full max-w-none flex-col"
              >
                {NAV_LINKS.map((link, index) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className="border-border group flex min-h-16 items-center justify-between gap-4 border-b py-3 transition-colors sm:min-h-20"
                      >
                        <span
                          className={`font-editorial group-hover:text-accent text-4xl leading-none tracking-tight transition-colors sm:text-5xl md:text-6xl ${
                            isActive ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span className="label-mono shrink-0">
                          ({String(index + 1).padStart(2, "0")})
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <div className="mx-auto mt-10 flex w-full max-w-none flex-col gap-4 pb-[env(safe-area-inset-bottom)] sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/contato"
                  onClick={closeMenu}
                  className="ui-button ui-button-accent w-full sm:w-auto"
                >
                  Fale conosco <span aria-hidden="true">↗</span>
                </Link>
                <p className="label-mono">Fortaleza · CE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
