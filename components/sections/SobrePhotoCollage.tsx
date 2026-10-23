import Image from "next/image";
import type { SobrePhoto } from "@/data/sobre-fotos";

export function SobrePhotoCollage({ photos }: { photos: SobrePhoto[] }) {
  if (photos.length === 0) return null;

  const isSingle = photos.length === 1;

  return (
    <div
      className={`sobre-photos${isSingle ? " sobre-photos--single" : ""}`}
      role="group"
      aria-label="Fotos da Metro Design"
    >
      {photos.map((photo, index) => (
        <figure
          key={photo.src}
          className={`sobre-photos__item sobre-photos__item--${index + 1}`}
        >
          <span className="sobre-photos__frame">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 767px) 52vw, (max-width: 1023px) 58vw, 22vw"
                  : "(max-width: 767px) 46vw, (max-width: 1023px) 36vw, 14vw"
              }
              className="sobre-photos__image"
              preload={index === 0}
            />
          </span>
          <figcaption className="sobre-photos__caption">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
      <span className="sobre-photos__index" aria-hidden="true">
        Metro · Fortaleza
      </span>
    </div>
  );
}
