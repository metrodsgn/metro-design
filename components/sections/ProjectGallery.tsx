"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectGalleryProps = {
  title: string;
  images: ProjectImage[];
};

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null || images.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? index : (index + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? index : (index - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <section
      id="galeria"
      className="scroll-mt-36 mx-auto mt-12 max-w-7xl md:mt-16"
      aria-label={`Galeria de ${title}`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Ampliar imagem ${index + 1} de ${title}`}
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
            className="group focus-visible:outline-accent relative block w-full cursor-zoom-in overflow-hidden bg-surface focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`Visualização das imagens de ${title}`}
        className="project-lightbox"
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        {activeImage && activeIndex !== null && (
          <div className="flex h-full min-h-0 w-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <p className="min-w-0 truncate text-sm text-white/75">{title}</p>
              <div className="flex shrink-0 items-center gap-5">
                <span className="font-mono text-xs text-white/60">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  aria-label="Fechar visualização"
                  className="inline-flex size-11 shrink-0 items-center justify-center text-2xl font-bold text-accent transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-5 md:px-20">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain px-4 py-2 md:px-16 md:py-4"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((index) =>
                        index === null
                          ? 0
                          : (index - 1 + images.length) % images.length,
                      )
                    }
                    aria-label="Ver foto anterior"
                    className="absolute left-2 z-10 inline-flex size-11 items-center justify-center text-accent transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:left-8"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((index) =>
                        index === null ? 0 : (index + 1) % images.length,
                      )
                    }
                    aria-label="Ver próxima foto"
                    className="absolute right-2 z-10 inline-flex size-11 items-center justify-center text-accent transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-8"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex max-w-full justify-start gap-2 overflow-x-auto px-4 pb-4 md:justify-center md:px-8">
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-thumb-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ver imagem ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`relative h-12 w-[4.5rem] shrink-0 overflow-hidden border transition-colors ${index === activeIndex ? "border-accent" : "border-white/15 opacity-55 hover:opacity-100"}`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
