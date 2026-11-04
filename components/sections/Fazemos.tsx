import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { ServicesDesktopCards } from "@/components/sections/ServicesDesktopCards";
import { SERVICES } from "@/lib/constants";

export function Fazemos() {
  return (
    <section id="fazemos" className="about-services bg-background py-20 md:py-32">
      <Container>
        <div className="about-services__intro">
          <div>
            <p className="label-mono mb-4">{SERVICES.label}</p>
            <h2 className="type-h2">{SERVICES.title}</h2>
          </div>
          <div>
            <p>{SERVICES.description}</p>
            <Link href="#fazemos" className="ui-button ui-button-accent mt-5">
              Conheça as frentes <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <ServicesDesktopCards areas={SERVICES.areas} />
        </div>
        <div className="md:hidden">
          <ServicesAccordion areas={SERVICES.areas} />
        </div>
      </Container>
    </section>
  );
}
