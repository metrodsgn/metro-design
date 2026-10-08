import { Container } from "@/components/ui/Container";
import { CLIENTS } from "@/lib/constants";

export function Clientes() {
  // Divide a lista em 2 faixas para o efeito visual
  const half = Math.ceil(CLIENTS.items.length / 2);
  const firstRow = CLIENTS.items.slice(0, half);
  const secondRow = CLIENTS.items.slice(half);

  return (
    <section id="clientes" className="py-24 md:py-32">
      <Container>
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          {CLIENTS.label}
        </span>

        <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
          {CLIENTS.title}
        </h2>
      </Container>

      {/* Faixa 1 — rolando para a esquerda */}
      <div className="mt-16 overflow-hidden">
        <div className="animate-marquee flex gap-4">
          {[...firstRow, ...firstRow].map((client, index) => (
            <ClientCard key={`row1-${index}`} name={client} />
          ))}
        </div>
      </div>

      {/* Faixa 2 — rolando para a direita */}
      <div className="mt-4 overflow-hidden">
        <div className="animate-marquee-reverse flex gap-4">
          {[...secondRow, ...secondRow].map((client, index) => (
            <ClientCard key={`row2-${index}`} name={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientCard({ name }: { name: string }) {
  return (
    <div className="border-border bg-surface flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border px-6">
      <span className="font-display text-muted text-center text-sm font-medium tracking-tight">
        {name}
      </span>
    </div>
  );
}