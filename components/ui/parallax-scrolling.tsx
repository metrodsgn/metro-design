"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onLenisScroll } from "@/lib/smooth-scroll";

type ParallaxHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundSrc: string;
  backgroundAlt?: string;
  cardSrc: string;
  cardAlt?: string;
  cardCaption?: string;
};

// yPercent maior = camada "mais distante" (rola mais devagar)
const LAYERS = [
  { layer: "1", yPercent: 28 }, // fundo
  { layer: "2", yPercent: 18 }, // cartão
  { layer: "3", yPercent: 35 }, // título
] as const;

export function ParallaxHero({
  eyebrow,
  title,
  subtitle,
  backgroundSrc,
  backgroundAlt = "",
  cardSrc,
  cardAlt = "",
  cardCaption,
}: ParallaxHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const trigger = rootRef.current?.querySelector("[data-parallax-layers]");
        if (!trigger) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: 0,
          },
        });

        LAYERS.forEach(({ layer, yPercent }, i) => {
          tl.to(
            trigger.querySelectorAll(`[data-parallax-layer="${layer}"]`),
            { yPercent, ease: "none" },
            i === 0 ? undefined : "<",
          );
        });
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Mantém o ScrollTrigger sincronizado com o scroll suave do Lenis.
  useEffect(() => {
    return onLenisScroll(() => ScrollTrigger.update());
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden bg-background"
    >
      <div data-parallax-layers className="absolute inset-0">
        <div
          data-parallax-layer="1"
          className="absolute inset-x-0 -top-[40%] h-[140%]"
        >
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div
          data-parallax-layer="2"
          className="absolute right-[6%] bottom-[12%] hidden w-[26vw] max-w-[360px] rotate-3 lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={cardSrc}
              alt={cardAlt}
              fill
              sizes="(min-width: 768px) 26vw, 0px"
              className="object-cover"
            />
          </div>
          {cardCaption && (
            <p className="mt-3 text-xs tracking-widest text-white/80 uppercase">
              {cardCaption}
            </p>
          )}
        </div>

        <div
          data-parallax-layer="3"
          className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-16 lg:pr-[33vw]"
        >
          {eyebrow && (
            <p className="mb-4 text-sm tracking-[0.25em] text-white/80 uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </section>
  );
}
