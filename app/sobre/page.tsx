import type { Metadata } from "next";
import { ParallaxHero } from "@/components/ui/parallax-scrolling";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { AntesDepois } from "@/components/sections/AntesDepois";
import { Clientes } from "@/components/sections/Clientes";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "Sobre — Metro Design",
  description:
    "Agência de branding e comunicação em Fortaleza. Falamos alto com tipografia, movemos para dizer algo e levamos a sério o trabalho.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <ParallaxHero
        eyebrow="Sobre a Metro"
        title="Falamos alto com tipografia. Levamos a sério o trabalho."
        subtitle="Somos uma agência de Fortaleza que constrói marcas com método e emoção — e não leva a si mesma tão a sério quanto leva cada projeto."
        backgroundSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80"
        backgroundAlt="Equipe da Metro Design trabalhando junta no estúdio"
        cardSrc="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&h=1000&q=80"
        cardAlt="Ambiente de trabalho criativo com divisórias de vidro e iluminação natural"
        cardCaption="Estúdio · Fortaleza"
      />

      <Somos />
      <Fazemos />
      <AntesDepois />
      <Clientes />
      <Depoimentos />
      <CtaFinal />
    </>
  );
}
