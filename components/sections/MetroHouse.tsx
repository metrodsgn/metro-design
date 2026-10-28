import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { METRO_HOUSE_PHOTOS } from "@/data/metro-house";

export function MetroHouse() {
  return (
    <section
      id="metro-house"
      aria-labelledby="metro-house-title"
      className="py-section-md md:py-section-lg"
    >
      <Container>
        <Reveal>
          <p className="section-eyebrow">NOSSO ESPAÇO</p>
          <h2
            id="metro-house-title"
            className="font-editorial text-foreground mt-4 text-3xl leading-tight tracking-tight md:text-5xl"
          >
            Metro House
          </h2>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed md:text-lg">
            Um espaço onde ideias ganham forma, projetos se encontram e novas
            possibilidades começam.
          </p>
        </Reveal>

        <div className="metro-house-gallery mt-10">
          {METRO_HOUSE_PHOTOS.map((photo, index) => (
            <Reveal
              key={photo.id}
              delay={index * 0.08}
              className={[
                "metro-house-gallery__item",
                index === 0 ? "metro-house-gallery__item--main" : "",
              ].join(" ")}
            >
              <figure className="metro-house-gallery__figure">
                <div className="metro-house-gallery__frame">
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 767px) 100vw, 66vw"
                          : "(max-width: 767px) 100vw, 33vw"
                      }
                      className="metro-house-gallery__image object-cover"
                    />
                  ) : (
                    <div className="metro-house-gallery__placeholder">
                      <span className="text-foreground text-sm">
                        {photo.alt}
                      </span>
                      <span className="text-muted text-xs">
                        Espaço reservado para fotografia real
                      </span>
                    </div>
                  )}
                </div>
                <figcaption className="text-muted mt-3 text-sm leading-relaxed">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
