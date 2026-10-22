import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function Fazemos() {
  return (
    <section id="fazemos" className="py-section-md md:py-section-lg">
      <Container>
        <div className="grid gap-20 md:gap-28 lg:gap-32">
          {/* Cabeçalho — identificador, título e apresentação */}
          <div className="max-w-xl">
            <Reveal>
              <p className="section-eyebrow">O que fazemos</p>
              <h2 className="font-editorial text-foreground mt-4 max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {SERVICES.title}
              </h2>
              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {SERVICES.description}
              </p>
              <Link
                href="/contato"
                className="ui-button ui-button-primary mt-10 md:mt-12"
              >
                Fale Conosco <span aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>

          {/* Grade de áreas de atuação — editorial, aberta e leve */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-16 lg:gap-24">
            {SERVICES.areas.map((area, index) => (
              <AreaCard key={area.title} number={index + 1} area={area} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function AreaCard({
  number,
  area,
}: {
  number: number;
  area: { title: string; items: readonly string[] };
}) {
  return (
    <div className="border-b border-border py-10 md:py-0 last:border-b-0">
      <div className="flex items-baseline gap-2 mb-6">
        <span className="label-mono">0{number}</span>
        <h3 className="font-display text-foreground text-lg leading-tight tracking-tight md:text-xl">
          {area.title}
        </h3>
      </div>
      <ul className="space-y-3">
        {area.items.map((item) => (
          <li
            key={item}
            className="text-muted text-sm leading-relaxed border-b border-border/50 pb-3 last:border-b-0 md:text-base"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
