import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { METRUS } from "@/lib/constants";

type Status = "approved" | "pending" | "changes";

const statusStyles: Record<Status, string> = {
  approved: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  changes: "bg-accent/15 text-accent",
};

export function Metrus() {
  return (
    <section id="metrus" className="py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Coluna esquerda — texto */}
          <Reveal>
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                {METRUS.label}
              </span>

              <h2 className="font-editorial text-foreground mt-4 max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {METRUS.title}
              </h2>

              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {METRUS.description}
              </p>

              <Link
                href={METRUS.cta.href}
                className="bg-foreground text-background hover:bg-accent hover:text-foreground mt-10 inline-flex min-h-12 items-center rounded-md px-6 text-sm font-medium transition-colors"
              >
                {METRUS.cta.label}
              </Link>
            </div>
          </Reveal>

          {/* Coluna direita — mockup */}
          <Reveal delay={0.15}>
            <div className="border-border bg-surface relative rounded-xl border p-6 shadow-2xl">
              <div className="border-border flex items-center justify-between border-b pb-4">
                <span className="font-display text-foreground text-base font-bold tracking-tight">
                  Metrus
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-border h-6 w-6 rounded-full" />
                  <span className="bg-border h-2 w-16 rounded-full" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {METRUS.mockups.map((mockup) => (
                  <div
                    key={mockup.title}
                    className="border-border bg-background/50 flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="bg-border h-14 w-14 shrink-0 rounded-md" />

                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate text-sm font-medium">
                        {mockup.title}
                      </p>
                      <p className="text-muted mt-1 text-xs">
                        Última atualização há 2 dias
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[mockup.status]}`}
                    >
                      {mockup.statusLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}