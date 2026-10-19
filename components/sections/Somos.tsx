import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";

export function Somos() {
  return (
    <section
      id="somos"
      className="py-section-md md:py-section-lg"
    >
      <Container>
        <div className="about-composition">
          <div className="about-story">
            <Reveal>
              <h2 className="font-editorial text-foreground max-w-3xl text-3xl leading-tight tracking-tight md:text-5xl">
                {ABOUT.title}
              </h2>
            </Reveal>
            <div className="about-copy">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.1 + index * 0.1}>
                  <p className="text-muted text-base leading-relaxed md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
