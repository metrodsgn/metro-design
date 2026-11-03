"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type MetroHouseSlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
  lqip?: string;
};

export function MetroHouseCarousel({ photos }: { photos: MetroHouseSlide[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiplePhotos = photos.length > 1;

  useEffect(() => {
    const nextPhoto = photos[activeIndex + 1];
    if (!nextPhoto || typeof window === "undefined") return;

    const preloadedImage = new window.Image();
    preloadedImage.src = nextPhoto.src;
  }, [activeIndex, photos]);

  const goTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex = Math.max(0, Math.min(index, photos.length - 1));
    viewport.scrollTo({
      left: nextIndex * viewport.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setActiveIndex(nextIndex);
  };

  const updateActiveIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport || !viewport.clientWidth) return;
    setActiveIndex(
      Math.min(photos.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)),
    );
  };

  return (
    <div
      className="metro-house-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da metro hause"
    >
      <div className="metro-house-carousel__media">
        <div
          ref={viewportRef}
          className="metro-house-carousel__viewport"
          onScroll={updateActiveIndex}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(activeIndex + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(activeIndex - 1);
            } else if (event.key === "Home") {
              event.preventDefault();
              goTo(0);
            } else if (event.key === "End") {
              event.preventDefault();
              goTo(photos.length - 1);
            }
          }}
          tabIndex={hasMultiplePhotos ? 0 : undefined}
        >
          {photos.map((photo, index) => {
            const isActive = index === activeIndex;
            const caption = photo.caption || photo.description;

            return (
              <figure
                key={photo.id}
                className="metro-house-carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${photos.length}`}
                aria-hidden={!isActive}
                inert={!isActive}
              >
                <div className="metro-house-carousel__frame">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 55vw, 48vw"
                    className="object-cover"
                    placeholder={photo.lqip ? "blur" : "empty"}
                    blurDataURL={photo.lqip}
                  />
                </div>
                {(caption || photo.description) && (
                  <figcaption>
                    {caption && <span>{caption}</span>}
                    {photo.description && caption !== photo.description && (
                      <p>{photo.description}</p>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>

        {hasMultiplePhotos && (
          <div className="metro-house-carousel__overlay">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Foto anterior"
            >
              <span aria-hidden="true">←</span>
            </button>
            <span className="metro-house-carousel__count" aria-hidden="true">
              {activeIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === photos.length - 1}
              aria-label="Próxima foto"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Foto {activeIndex + 1} de {photos.length}
      </p>

      {hasMultiplePhotos && (
        <div className="metro-house-carousel__dots" role="group" aria-label="Escolher foto">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Ir para a foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
