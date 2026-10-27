"use client";

import { useEffect, useRef } from "react";

import { TAGLINE } from "@/lib/constants";

const COPIES = 4;

export function FaixaTexto() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let previousDuration = 0;

    const preservePhase = () => {
      const animation = track.getAnimations()[0];
      if (!animation) return;

      const duration = Number(
        animation.effect?.getComputedTiming().duration ?? 0,
      );
      if (!duration) return;

      if (previousDuration && duration !== previousDuration) {
        const currentTime = Number(animation.currentTime ?? 0);
        animation.currentTime = (currentTime / previousDuration) * duration;
      }

      previousDuration = duration;
    };

    preservePhase();

    const observer = new ResizeObserver(preservePhase);
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pb-section-md md:pb-section-lg">
      <p className="sr-only">{TAGLINE.text}</p>

      <div aria-hidden="true" className="faixa-texto py-7 md:py-11">
        <div ref={trackRef} className="faixa-texto__track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <div key={copy} className="faixa-texto__copy">
              <span className="faixa-texto__text">{TAGLINE.text}</span>
              <span className="faixa-texto__dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
