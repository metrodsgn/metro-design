import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";
import { SOBRE_STORY_PHOTO } from "@/data/sobre-fotos";

export function Somos() {
  return (
    <section id="somos" className="py-section-md md:py-section-lg">
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

          <Reveal className="about-visual" delay={0.15}>
            <figure className="about-visual__figure">
              <span className="about-visual__frame">
                <Image
                  src={SOBRE_STORY_PHOTO.src}
                  alt={SOBRE_STORY_PHOTO.alt}
                  fill
                  sizes="(max-width: 639px) 90vw, (max-width: 1023px) 50vw, 28vw"
                  className="about-visual__image"
                />
              </span>
              <figcaption className="about-visual__caption">
                <span className="about-visual__meta">Estúdio Metro</span>
                <span className="about-visual__title">
                  {SOBRE_STORY_PHOTO.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
