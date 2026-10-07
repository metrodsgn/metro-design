import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/lib/constants";

export function Fazemos() {
  return (
    <section id="fazemos" className="py-24 md:py-32">
      <Container>
        {/* Label pequeno acima do título */}
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          {SERVICES.label}
        </span>

        {/* Título */}
        <h2 className="font-display text-foreground mt-4 max-w-4xl text-3xl leading-tight font-bold tracking-tight md:text-5xl">
          {SERVICES.title}
        </h2>

        {/* Descrição */}
        <p className="text-muted mt-8 max-w-3xl text-base leading-relaxed md:text-lg">
          {SERVICES.description}
        </p>

        {/* Grid de 3 colunas */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {SERVICES.areas.map((area) => (
            <div key={area.title}>
              <h3 className="font-display text-foreground text-xl font-bold md:text-2xl">
                {area.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted border-border flex items-start gap-3 border-b pb-3 text-sm"
                  >
                    {/* Marcador vermelho */}
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}