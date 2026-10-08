import { Container } from "@/components/ui/Container";
import { ABOUT } from "@/lib/constants";

export function Somos() {
  return (
    <section id="somos" className="py-24 md:py-32">
      <Container>
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          {ABOUT.label}
        </span>

        <h2 className="font-editorial text-foreground mt-4 max-w-4xl text-3xl leading-tight font-bold tracking-tight md:text-5xl">
          {ABOUT.title}
        </h2>

        <div className="mt-12 max-w-3xl space-y-6">
          {ABOUT.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted text-base leading-relaxed md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}