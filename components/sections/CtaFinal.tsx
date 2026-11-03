import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_CTA, CONTACT } from "@/lib/constants";

const phoneHref = `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`;

export function CtaFinal() {
  return (
    <section className="about-cta bg-background py-16 text-foreground md:py-28">
      <Container>
        <Reveal>
          <div className="about-cta__main">
            <h2 className="about-cta__title">
              {ABOUT_CTA.titleLines.map((line) => <span key={line}>{line}</span>)}
            </h2>
            <nav aria-label="Próximos passos" className="about-cta__links">
              <Link href="/contato" className="ui-button ui-button-accent"><span>Iniciar um projeto</span><span aria-hidden="true">↗</span></Link>
              <Link href="/projetos" className="ui-button ui-button-secondary"><span>Ver projetos</span><span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
          <div className="about-cta__footer">
            <p>{ABOUT_CTA.supportStart}<span>{ABOUT_CTA.supportEmphasis}</span></p>
            <address>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={phoneHref}>{CONTACT.phone}</a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </address>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
