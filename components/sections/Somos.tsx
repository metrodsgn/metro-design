import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";

export function Somos() {
  return (
    <section id="somos" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="section-eyebrow">
            {ABOUT.label}
          </span>

          <h2 className="font-editorial text-foreground mt-4 max-w-4xl text-3xl leading-tight tracking-tight md:text-5xl">
            {ABOUT.title}
          </h2>
        </Reveal>

        <div className="mt-12 max-w-3xl space-y-6">
          {ABOUT.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.1 + index * 0.1}>
              <p className="text-muted text-base leading-relaxed md:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
