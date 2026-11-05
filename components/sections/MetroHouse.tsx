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
      .slice(0, 10)
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

  return (
    <section
      id="metro-house"
      aria-labelledby="metro-house-title"
      className="metro-house-section relative z-10 bg-background py-20 md:py-32"
    >
      <Container>
        <div className="metro-house-section__heading">
          <p className="label-mono mb-4">Fotos da agência</p>
          <h2 id="metro-house-title" className="metro-house-section__title type-h2">
            Onde as marcas ganham forma.
          </h2>
        </div>

        <div className="metro-house-section__body">
          <div className="metro-house-section__intro">
            <p>Nosso escritório em Fortaleza é onde estratégia, design, estúdio e tecnologia trabalham lado a lado, todos os dias.</p>
            <span>Fortaleza, Ceará</span>
          </div>

          {photos.length > 0 ? (
            <MetroHouseCarousel photos={photos} />
          ) : (
            <p className="metro-house-section__empty">
              Em breve, um olhar por dentro da Metro House.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
