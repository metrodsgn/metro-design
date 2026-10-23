import type { Metadata } from "next";
import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { RevealLines } from "@/components/ui/RevealLines";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { AntesDepois } from "@/components/sections/AntesDepois";
import { Clientes } from "@/components/sections/Clientes";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { createSiteMetadata } from "@/lib/metadata";
import { SobrePhotoCollage } from "@/components/sections/SobrePhotoCollage";
import { SOBRE_COLLAGE_PHOTOS } from "@/data/sobre-fotos";

export const metadata: Metadata = createSiteMetadata({
  title: "Sobre — Metro Design",
  description:
    "Agência de branding e comunicação em Fortaleza. Falamos alto com tipografia, movemos para dizer algo e levamos a sério o trabalho.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <section className="sobre-intro pt-section-lg pb-section-md">
        <Container>
          <div className="sobre-intro__layout">
            <div className="sobre-intro__copy">
              <p className="section-eyebrow">Sobre a Metro</p>
              <RevealLines
                as="h1"
                className="font-editorial text-foreground mt-5 max-w-4xl text-4xl leading-[1.05] tracking-tight break-words md:text-6xl"
                lines={[
                  <Fragment key="sobre-title">
                    Falamos alto com tipografia.{" "}
                    <span className="text-accent italic">
                      Levamos a sério o trabalho.
                    </span>
                  </Fragment>,
                ]}
              />
              <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
                Somos uma agência de Fortaleza que constrói marcas com método e
                emoção — e não leva a si mesma tão a sério quanto leva cada projeto.
              </p>
            </div>
            <SobrePhotoCollage photos={SOBRE_COLLAGE_PHOTOS} />
          </div>
        </Container>
      </section>

      <Somos />
      <Fazemos />
      <AntesDepois />
      <Clientes />
      <Depoimentos />
      <CtaFinal />
    </>
  );
}
