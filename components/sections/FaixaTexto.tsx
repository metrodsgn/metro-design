"use client";

import { InteractiveMarquee } from "@/components/ui/InteractiveMarquee";
import { TAGLINE } from "@/lib/constants";

export function FaixaTexto() {
  return (
    <section className="pb-section-md md:pb-section-lg">
      <div className="faixa-texto">
        <InteractiveMarquee
          text={TAGLINE.text}
          ariaLabel={TAGLINE.text}
          variant="ribbon"
        />
      </div>
    </section>
  );
}
