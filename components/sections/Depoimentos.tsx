import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getAllTestimonials } from "@/sanity/lib/fetchers";
import { TESTIMONIALS } from "@/lib/constants";
import { DepoimentosCard } from "./DepoimentosCard";

export async function Depoimentos() {
  const testimonials = await getAllTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      className="bg-background border-border border-y py-20 md:py-28"
    >
      <Container>
        <div className="border-border mb-10 flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <Reveal>
            <div>
              <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
                {TESTIMONIALS.label}
              </span>
              <h2 className="font-editorial text-foreground mt-3 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
                {TESTIMONIALS.title}
              </h2>
            </div>
          </Reveal>
          <p className="text-muted max-w-sm text-sm leading-relaxed md:text-base">
            {TESTIMONIALS.description}
          </p>
        </div>

        <Reveal>
          <DepoimentosCard testimonials={testimonials} />
        </Reveal>
      </Container>
    </section>
  );
}
