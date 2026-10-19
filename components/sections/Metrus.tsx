import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { METRUS } from "@/lib/constants";

type Status = "approved" | "pending" | "changes";

const statusStyles: Record<Status, string> = {
  approved: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  changes: "bg-accent/15 text-accent",
};

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

            <Reveal delay={0.1}>
              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {METRUS.description}
              </p>

              <Link
                href={METRUS.cta.href}
                className="ui-button ui-button-primary mt-10"
              >
                {METRUS.cta.label}
              </Link>
            </Reveal>
          </div>

          {/* Coluna direita — mockup */}
          <Reveal delay={0.15}>
            <div className="border-border bg-surface relative rounded-card border p-6 shadow-elevated">
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
                    className="border-border bg-background/50 grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 rounded-control border p-3 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4"
                  >
                    <div className="bg-border h-10 w-10 shrink-0 rounded-control sm:h-14 sm:w-14" />

                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate text-sm font-medium">
                        {mockup.title}
                      </p>
                      <p className="text-muted mt-1 text-xs">
                        Última atualização há 2 dias
                      </p>
                    </div>

                    <span
                      className={`col-start-2 justify-self-start rounded-full px-3 py-1 text-xs font-medium sm:col-start-auto sm:justify-self-auto ${statusStyles[mockup.status]}`}
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
