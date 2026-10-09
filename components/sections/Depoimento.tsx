import { Container } from "@/components/ui/Container";
import { TESTIMONIAL } from "@/lib/constants";

export function Depoimento() {
  return (
    <section className="bg-surface border-border border-y py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Aspas decorativas */}
          <span
            aria-hidden="true"
            className="font-editorial text-accent block text-7xl leading-none md:text-8xl"
          >
            &ldquo;
          </span>

          {/* Citação */}
          <blockquote className="font-editorial text-foreground mt-4 text-2xl leading-snug tracking-tight md:text-4xl">
            {TESTIMONIAL.quote}
          </blockquote>

          {/* Autor */}
          <figcaption className="mt-12 flex flex-col items-center gap-4">
            <div className="bg-accent text-foreground flex h-16 w-16 items-center justify-center rounded-full">
              <span className="font-display text-xl font-bold">
                {TESTIMONIAL.initial}
              </span>
            </div>
            <div>
              <p className="font-display text-foreground text-base font-bold tracking-tight">
                {TESTIMONIAL.name}
              </p>
              <p className="text-muted mt-1 text-sm">
                {TESTIMONIAL.role} — {TESTIMONIAL.company}
              </p>
            </div>
          </figcaption>
        </div>
      </Container>
    </section>
  );
}