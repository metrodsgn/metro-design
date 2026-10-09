import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS } from "@/lib/constants";

export function Clientes() {
  const half = Math.ceil(CLIENTS.items.length / 2);
  const firstRow = CLIENTS.items.slice(0, half);
  const secondRow = CLIENTS.items.slice(half);

  return (
    <section id="clientes" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            {CLIENTS.label}
          </span>

          <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
            {CLIENTS.title}
          </h2>
        </Reveal>
      </Container>

      <Reveal delay={0.15}>
        <div className="mt-16 overflow-hidden">
          <div className="animate-marquee flex gap-4">
            {[...firstRow, ...firstRow].map((client, index) => (
              <ClientCard key={`row1-${index}`} name={client} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-4 overflow-hidden">
          <div className="animate-marquee-reverse flex gap-4">
            {[...secondRow, ...secondRow].map((client, index) => (
              <ClientCard key={`row2-${index}`} name={client} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ClientCard({ name }: { name: string }) {
  return (
    <div className="border-border bg-surface hover:border-accent/50 flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border px-6 transition-colors duration-300">
      <span className="font-display text-muted hover:text-foreground text-center text-sm font-medium tracking-tight transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}