"use client";

import { useEffect, useState } from "react";
import { SITE, CONTACT, SOCIAL } from "@/lib/constants";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Coluna 1 — Marca */}
          <div>
            <h2 className="font-display text-foreground text-2xl font-bold tracking-tight">
              {SITE.name}
            </h2>
            <p className="text-muted mt-3 max-w-xs text-sm leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Contato
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-muted">{CONTACT.address}</li>
            </ul>
          </div>

          {/* Coluna 3 — Redes Sociais */}
          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Redes
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SOCIAL.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé inferior — copyright */}
        <div className="border-border mt-12 border-t pt-8">
          <p className="text-muted text-xs">
            © {currentYear ?? "----"} {SITE.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}