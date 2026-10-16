import { SITE, CONTACT, SOCIAL } from "@/lib/constants";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Coluna 1 — Marca */}
          <div className="footer-reveal">
            <h2>
              <BrandWordmark />
            </h2>
            <p className="text-muted mt-3 max-w-xs text-sm leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div className="footer-reveal">
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Contato
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="footer-link text-muted hover:text-accent break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="footer-link text-muted hover:text-accent break-words"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-muted break-words">{CONTACT.address}</li>
            </ul>
          </div>

          {/* Coluna 3 — Redes Sociais */}
          <div className="footer-reveal">
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
                    className="footer-link text-muted hover:text-accent"
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted text-xs">
              © {currentYear} {SITE.name}. Todos os direitos reservados.
            </p>
            <Link
              href="/privacidade"
              className="footer-link text-muted hover:text-foreground text-xs"
            >
              Aviso de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
