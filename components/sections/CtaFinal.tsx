import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CtaFinal() {
  return (
    <section className="py-section-md md:py-section-lg">
      <Container>
        <Reveal>
          <div className="border-border rounded-card border px-6 py-14 md:px-12 md:py-20">
            <p className="label-mono">Vamos começar</p>
            <h2 className="font-editorial text-foreground mt-4 max-w-3xl text-4xl leading-[1.02] tracking-tight md:text-6xl">
              Sua marca merece uma referência.{" "}
              <span className="text-accent italic">Vamos criar a sua.</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contato"
                className="ui-button ui-button-accent"
                data-cursor="Falar ↗"
              >
                Fale conosco <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/projetos" className="ui-button ui-button-secondary">
                Ver projetos
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
