"use client";

import Image from "next/image";

export type MetroHouseSlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
  lqip?: string;
};

export function MetroHouseCarousel({ photos }: { photos: MetroHouseSlide[] }) {
  if (photos.length === 0) return null;

  const isMoving = photos.length > 1;
  const slides = isMoving
    ? Array.from({ length: Math.ceil(12 / photos.length) }, () => photos).flat()
    : photos;

  const renderSlides = (duplicate: boolean) =>
    slides.map((photo, index) => {
      const hidden = duplicate || index >= photos.length;
      const caption = [photo.caption, photo.description].filter(Boolean).join(" — ");

      return (
        <figure
          key={`${photo.id}-${index}`}
          className="metro-house-carousel__slide"
          aria-hidden={hidden}
        >
          <div className="metro-house-carousel__frame">
            <Image
              src={photo.src}
              alt={hidden ? "" : photo.alt || caption}
              fill
              sizes="(max-width: 639px) 58vw, (max-width: 1023px) 38vw, (max-width: 1900px) 17vw, 304px"
              className="object-cover"
              placeholder={photo.lqip ? "blur" : "empty"}
              blurDataURL={photo.lqip}
            />
          </div>
          {!hidden && caption && <figcaption className="sr-only">{caption}</figcaption>}
        </figure>
      );
    });

  return (
    <div
      className={`metro-house-carousel ${isMoving ? "is-moving" : "is-static"}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da agência Metro Design"
    >
      <div
        className="metro-house-carousel__viewport"
        tabIndex={isMoving ? 0 : undefined}
        aria-label={isMoving ? "Galeria de fotos. Use as setas para percorrer." : undefined}
      >
        <div
          className="metro-house-carousel__track"
          style={{ animationDuration: `${slides.length * 5.5}s` }}
        >
          <div className="metro-house-carousel__group">{renderSlides(false)}</div>
          {isMoving && (
            <div className="metro-house-carousel__group" aria-hidden="true">
              {renderSlides(true)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
