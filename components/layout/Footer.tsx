import { SITE, CONTACT, SOCIAL, FOOTER_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { InteractiveMarquee } from "@/components/ui/InteractiveMarquee";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [addressBeforeCity, addressAfterCity] = CONTACT.address.split("Fortaleza – CE");

  return (
    <footer className="site-footer border-border mt-24 border-t">
      <Container className="py-18 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* Coluna 1 — Descrição */}
          <div className="footer-reveal">
            <p className="text-muted max-w-sm text-base leading-relaxed">
              {SITE.description}
            </p>
            <nav aria-label="Links do rodapé" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-base">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link text-muted hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 2 — Contato */}
          <div className="footer-reveal">
            <h3 className="font-display text-foreground text-base font-semibold tracking-wide uppercase">
              Contato
            </h3>
            <ul className="mt-5 space-y-3 text-base">
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
                  href="https://wa.me/5585991999229?text=Oi%2C%20Metro!%20Quero%20conversar%20sobre%20projetos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-muted hover:text-accent"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="tel:+558520100883"
                  className="footer-link text-muted hover:text-accent break-words"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-muted break-words">
                {addressBeforeCity}
                <br />
                Fortaleza – CE{addressAfterCity}
              </li>
              <li>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-muted hover:text-accent"
                >
                  Ver no Google Maps ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Redes Sociais */}
          <div className="footer-reveal">
            <h3 className="font-display text-foreground text-base font-semibold tracking-wide uppercase">
              Redes
            </h3>
            <ul className="mt-5 space-y-3 text-base">
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

        {/* Assinatura tipográfica */}
        <div className="footer-wordmark-bleed">
          <InteractiveMarquee />
        </div>

        {/* Rodapé inferior */}
        <div className="border-border mt-10 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-muted text-sm">
              © {currentYear} {SITE.name}. Todos os direitos reservados.
            </p>
            <Link
              href="/privacidade"
              className="footer-link text-muted hover:text-foreground text-sm"
            >
              Aviso de Privacidade
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
