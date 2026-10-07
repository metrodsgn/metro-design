import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo / nome */}
        <Link
          href="/"
          className="font-display text-foreground hover:text-accent text-lg font-bold tracking-tight transition-colors"
        >
          Metro Design
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 md:flex">
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

        {/* Botão hambúrguer (mobile) — funcionalidade na Fase 6 */}
        <button
          type="button"
          aria-label="Abrir menu"
          className="text-foreground md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}