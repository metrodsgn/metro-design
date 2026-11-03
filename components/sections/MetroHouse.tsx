import { Container } from "@/components/ui/Container";
import { MetroHouseCarousel, type MetroHouseSlide } from "@/components/ui/MetroHouseCarousel";
import { getMetroHousePhotos } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export async function MetroHouse() {
  let photos: MetroHouseSlide[] = [];

  try {
    const uploadedPhotos = await getMetroHousePhotos();
    photos = uploadedPhotos
      .filter((photo) => Boolean(photo.asset?._ref))
      .map((photo) => ({
        id: photo._key,
        src: urlFor(photo).width(2000).fit("max").url(),
        alt: photo.alt?.trim() ?? "",
        caption: photo.caption?.trim() ?? "",
        description: photo.description?.trim() ?? "",
        lqip: photo.lqip,
      }));
  } catch {
    // A falha do Sanity não deve impedir a página Sobre de renderizar.
    return null;
  }

  if (photos.length === 0) return null;

  return (
    <section
      id="metro-house"
      aria-labelledby="metro-house-title"
      className="metro-house-section relative z-10 bg-background py-20 md:py-32"
    >
      <Container>
        <div className="metro-house-section__heading">
          <h2 id="metro-house-title" className="metro-house-section__title">
            metro hause<span aria-hidden="true">.</span>
          </h2>
        </div>

        <div className="metro-house-section__body">
          <div className="metro-house-section__intro">
            <p>
              Um espaço onde ideias ganham forma, projetos se encontram e novas
              possibilidades começam.
            </p>
            <span>Fortaleza, Ceará</span>
          </div>

          <MetroHouseCarousel photos={photos} />
        </div>
      </Container>
    </section>
  );
}
