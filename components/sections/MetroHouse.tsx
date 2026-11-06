import { Container } from "@/components/ui/Container";
import { MetroHouseCarousel, type MetroHouseSlide } from "@/components/ui/MetroHouseCarousel";

const photos: MetroHouseSlide[] = [
  { id: "dsc03245", src: "/fotos/DSC03245.JPG", alt: "Integrante da equipe conversando no escritório da Metro", caption: "", description: "" },
  { id: "dsc03248", src: "/fotos/DSC03248.JPG", alt: "Integrante da equipe conversando ao lado do computador", caption: "", description: "" },
  { id: "dsc03252", src: "/fotos/DSC03252.JPG", alt: "Integrante da equipe trabalhando no escritório da Metro", caption: "", description: "" },
  { id: "dsc03246", src: "/fotos/DSC03246.JPG", alt: "Integrante da equipe sorrindo durante uma conversa", caption: "", description: "" },
  { id: "dsc03249", src: "/fotos/DSC03249.JPG", alt: "Integrante da equipe sorrindo no escritório", caption: "", description: "" },
  { id: "dsc03247", src: "/fotos/DSC03247.JPG", alt: "Integrante da equipe em um momento de trabalho", caption: "", description: "" },
];

export function MetroHouse() {
  return (
    <section
      id="metro-house"
      aria-labelledby="metro-house-title"
      className="metro-house-section relative z-10 bg-background py-20 md:py-32"
    >
      <MetroHouseCarousel photos={photos} />
      <Container>
        <div className="metro-house-section__body">
          <div className="metro-house-section__heading">
            <h2 id="metro-house-title" className="metro-house-section__title type-h2">
              Onde as marcas ganham forma.
            </h2>
          </div>
          <div className="metro-house-section__intro">
            <p>Nosso escritório em Fortaleza é onde estratégia, design, estúdio e tecnologia trabalham lado a lado, todos os dias.</p>
            <span>Fortaleza, Ceará</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
