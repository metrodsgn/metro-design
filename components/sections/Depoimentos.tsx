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
      className="bg-background border-border border-y py-section-md md:py-section-lg"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <Reveal>
            <div>
              <h2 className="font-editorial text-foreground mx-auto max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
                {TESTIMONIALS.title}
              </h2>
            </div>
          </Reveal>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base">
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
