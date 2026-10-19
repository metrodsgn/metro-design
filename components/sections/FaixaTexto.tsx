"use client";

import { TAGLINE } from "@/lib/constants";

const words = TAGLINE.text.split(" ");

export function FaixaTexto() {
  return (
    <section className="py-section-md md:py-section-lg">
      <p className="sr-only">{TAGLINE.text}</p>

      <div
        aria-hidden="true"
        className="marquee border-border flex overflow-hidden border-y py-6 md:py-10"
      >
        <div className="animate-marquee flex w-max shrink-0 items-center">
          {[0, 1, 2, 3].map((copy) => (
            <p
              key={copy}
              className="font-editorial text-foreground flex shrink-0 items-center gap-x-[0.25em] pr-[0.25em] text-[clamp(2rem,6vw,5rem)] leading-none tracking-tight"
            >
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="marquee-word inline-block"
                >
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
