import { SITE, CONTACT, SOCIAL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { RevealLines } from "@/components/ui/RevealLines";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Coluna 1 — Descrição */}
          <div className="footer-reveal">
            <p className="text-muted max-w-xs text-sm leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div className="footer-reveal">
            <h3 className="font-sans text-foreground text-sm font-semibold tracking-wide uppercase">
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
            <h3 className="font-sans text-foreground text-sm font-semibold tracking-wide uppercase">
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

        {/* Assinatura tipográfica */}
        <RevealLines
          as="p"
          className="font-sans text-accent mt-16 leading-[0.78] font-medium tracking-[-0.035em] break-all select-none text-[clamp(4rem,22vw,18rem)]"
          maskClassName="pt-[0.18em] -mt-[0.18em] pb-0!"
          lines={["metro."]}
        />

        {/* Rodapé inferior */}
        <div className="border-border mt-10 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-muted text-xs">
              © {currentYear} {SITE.name}. Todos os direitos reservados.
            </p>
            <p className="label-mono normal-case">
              Feito em Fortaleza, com método e emoção.
            </p>
            <Link
              href="/privacidade"
              className="footer-link text-muted hover:text-foreground text-xs"
            >
              Aviso de Privacidade
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
