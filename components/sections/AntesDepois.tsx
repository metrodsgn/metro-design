import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ANTES_DEPOIS } from "@/data/antes-depois";
import { getBeforeAfterItems } from "@/sanity/lib/fetchers";
import { AntesDepoisCarousel } from "./AntesDepoisCarousel";

export async function AntesDepois() {
  const editableItems = await getBeforeAfterItems();
  const items = editableItems.length > 0 ? editableItems : ANTES_DEPOIS;

  return (
    <section id="antes-depois" className="py-14 md:py-20">
      <Container>
        <Reveal>
          <span className="section-eyebrow">
            ANTES E DEPOIS
          </span>

          <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
            Veja a marca mudar.
          </h2>

          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed md:text-lg">
            Arraste para comparar como uma nova identidade transforma a presença
            de cada marca.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <AntesDepoisCarousel items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
