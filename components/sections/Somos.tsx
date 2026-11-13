import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AboutGsapMotion } from "@/components/ui/AboutGsapMotion";
import { ABOUT } from "@/lib/constants";
import { SOBRE_STORY_PHOTO, type SobrePhoto } from "@/data/sobre-fotos";

export function Somos({ photo = SOBRE_STORY_PHOTO }: { photo?: SobrePhoto }) {
  const paragraphs = ABOUT.paragraphs;

  return (
    <section
      id="somos"
      aria-labelledby="somos-title"
      className="about-somos relative overflow-hidden bg-background text-foreground"
    >
      <AboutGsapMotion>
        <Container className="relative z-10 py-20 md:py-32">
          <h2 id="somos-title" className="about-somos__title type-h2">
            {ABOUT.title}
          </h2>
          <p className="about-somos__subtitle type-h4 font-sans text-muted mx-auto mt-5">{ABOUT.subtitle}</p>

          <div className="about-somos__stories">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="about-somos__copy">
                {paragraph}
              </p>
            ))}
            <span className="about-somos__rule" data-scroll-draw aria-hidden="true" />
          </div>

          <div className="mt-8 text-center">
            <p className="type-small text-muted">{ABOUT.facts}</p>
            <p className="label-mono mt-4">{ABOUT.signature}</p>
          </div>

          {photo.src ? (
            <figure className="about-somos__photo">
              <div
                className="about-somos__photo-frame"
                data-photo-frame
                style={
                  photo.width && photo.height
                    ? { aspectRatio: `${photo.width} / ${photo.height}` }
                    : undefined
                }
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 88vw, 64rem"
                  className="about-somos__photo-image object-contain"
                  data-photo-image
                />
              </div>
            </figure>
          ) : null}
        </Container>

      </AboutGsapMotion>
    </section>
  );
}
