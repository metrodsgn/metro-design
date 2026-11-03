import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AboutGsapMotion } from "@/components/ui/AboutGsapMotion";
import { ABOUT } from "@/lib/constants";
import { SOBRE_STORY_PHOTO } from "@/data/sobre-fotos";

const skylineHeights = ["36%", "58%", "42%", "74%", "48%", "88%", "56%", "70%", "40%", "62%", "82%", "46%", "68%", "52%", "94%", "60%", "43%", "77%", "55%", "84%", "48%", "72%", "39%", "64%", "91%", "53%", "75%", "45%", "67%", "83%", "50%", "71%"];

export function Somos() {
  const paragraphs = ABOUT.paragraphs.slice(0, 2);

  return (
    <section
      id="somos"
      aria-labelledby="somos-title"
      className="about-somos relative overflow-hidden bg-background text-foreground"
    >
      <AboutGsapMotion>
        <Container className="relative z-10 py-20 md:py-32">
          <p className="about-serif-label">sobre.</p>
          <h2 id="somos-title" className="about-somos__title">
            {ABOUT.title}
          </h2>

          <div className="about-somos__stories">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="about-somos__copy">
                {paragraph}
              </p>
            ))}
            <span className="about-somos__rule" data-scroll-draw aria-hidden="true" />
          </div>

          <Link href="#fazemos" className="ui-button ui-button-accent mt-8">
            MAIS SOBRE NÓS <span aria-hidden="true">↘</span>
          </Link>

          {SOBRE_STORY_PHOTO.src ? (
            <figure className="about-somos__photo">
              <div className="about-somos__photo-frame" data-photo-frame>
                <Image
                  src={SOBRE_STORY_PHOTO.src}
                  alt={SOBRE_STORY_PHOTO.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 88vw, 64rem"
                  className="about-somos__photo-image object-cover"
                  data-photo-image
                />
              </div>
              <figcaption>{SOBRE_STORY_PHOTO.caption}</figcaption>
            </figure>
          ) : null}
        </Container>

        <div className="about-somos__skyline" aria-hidden="true">
          {skylineHeights.map((height, index) => (
            <span
              key={index}
              data-skyline-bar
              style={{ height }}
            />
          ))}
        </div>
      </AboutGsapMotion>
    </section>
  );
}
