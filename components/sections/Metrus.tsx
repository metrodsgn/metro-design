import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { MetrusMockup } from "@/components/sections/MetrusMockup";
import { METRUS } from "@/lib/constants";

export function Metrus() {
  return (
    <section id="metrus" className="py-section-md md:py-section-lg">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Coluna esquerda — texto */}
          <div>
            <RevealLines
              as="h2"
              className="font-editorial text-foreground max-w-xl text-3xl leading-tight tracking-tight md:text-5xl"
              lines={[METRUS.title]}
            />

            <Reveal delay={0.12}>
              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {METRUS.description}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8">
                <Link
                  href={METRUS.cta.href}
                  className="ui-button ui-button-primary"
                >
                  {METRUS.cta.label} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Coluna direita — mockup */}
          <MetrusMockup />
        </div>
      </Container>
    </section>
  );
}
