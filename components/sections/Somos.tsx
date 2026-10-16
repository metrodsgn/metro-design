import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";

export function Somos() {
  return (
    <section id="somos" className="about-section py-20 md:py-32">
      <Container>
        <div className="about-composition">
          <Reveal className="about-heading">
            <h2 className="font-editorial text-foreground max-w-4xl text-4xl leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
              {ABOUT.title}
            </h2>
          </Reveal>

          <div className="about-copy">
            {ABOUT.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.1}>
                <p className="about-paragraph text-muted text-base leading-relaxed md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
