import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getAllTestimonials } from "@/sanity/lib/fetchers";
import { TESTIMONIALS } from "@/lib/constants";
import { DepoimentosCard } from "./DepoimentosCard";

export async function Depoimentos() {
  const testimonials = await getAllTestimonials();

  return (
    <section
      id="depoimentos"
      className="bg-surface border-border border-y py-24 md:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          {/* Coluna esquerda — texto */}
          <Reveal>
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                {TESTIMONIALS.label}
              </span>

              <h2 className="font-editorial text-foreground mt-4 max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {TESTIMONIALS.title}
              </h2>

              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {TESTIMONIALS.description}
              </p>
            </div>
          </Reveal>

          {/* Coluna direita — cartão (client) */}
          <Reveal delay={0.15}>
            <DepoimentosCard testimonials={testimonials} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}