import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS } from "@/lib/constants";

const clientLogos = [
  ["Agropaulo", "/logo/agro.png"],
  ["BMY", "/logo/bmy.png"],
  ["Bob the Dog", "/logo/bob.png"],
  ["Braslimp", "/logo/braslimp.png"],
  ["Cantinho do Frango", "/logo/cantinho.png"],
  ["Castelo das Águas", "/logo/castelo.png"],
  ["Cinema do Dragão", "/logo/cine.png"],
  ["Colosso", "/logo/colosso.png"],
  ["Complexo Mareiro", "/logo/complexo.png"],
  ["Crocobeach", "/logo/croco.png"],
  ["Deberton Filmes", "/logo/deberton.png"],
  ["Festival de Velas Trairi", "/logo/festival.png"],
  ["Forneria São Cosme", "/logo/forneria.png"],
  ["GHO Water Sports", "/logo/water.png"],
  ["Integração Escola de Negócios", "/logo/integracao.png"],
  ["Leão Container", "/logo/leao.png"],
  ["Naturágua", "/logo/natu.png"],
  ["Natu", "/logo/naturagua.png"],
  ["NBA Store", "/logo/nba.png"],
  ["Personal Care", "/logo/personal.png"],
  ["São", "/logo/sao.png"],
  ["Sebrae", "/logo/sebrae.png"],
  ["Usibras", "/logo/usbras.png"],
  ["Yozenn", "/logo/yozenn.png"],
] as const;

export function Clientes() {
  return (
    <section id="clientes" className="py-section-md md:py-section-lg">
      <Container>
        <Reveal>
          <h2 className="type-h2 text-foreground max-w-2xl">{CLIENTS.title}</h2>
        </Reveal>
      </Container>

      <Reveal delay={0.15}>
        <div className="clients-marquee mt-16 overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={`row1-copy-${copy}`} aria-hidden={copy > 0} className="flex shrink-0 gap-4 pr-4">
                {clientLogos.map(([name, src], index) => <ClientLogo key={`row1-${copy}-${index}`} name={name} src={src} />)}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="clients-marquee mt-4 overflow-hidden">
          <div className="animate-marquee-reverse flex w-max">
            {[0, 1].map((copy) => (
              <div key={`row2-copy-${copy}`} aria-hidden={copy > 0} className="flex shrink-0 gap-4 pr-4">
                {[...clientLogos].reverse().map(([name, src], index) => <ClientLogo key={`row2-${copy}-${index}`} name={name} src={src} />)}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ClientLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex h-24 w-44 shrink-0 items-center justify-center sm:h-28 sm:w-52">
      <div className="relative h-16 w-40 sm:h-[4.5rem] sm:w-44">
        <Image src={src} alt={`Logo de ${name}`} fill sizes="176px" className="object-contain" />
      </div>
    </div>
  );
}
