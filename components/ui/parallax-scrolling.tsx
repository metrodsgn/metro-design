"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ParallaxHeroProps = {
  title: string;
  backgroundSrc: string;
  backgroundAlt?: string;
  titleAriaLabel?: string;
};

export function ParallaxHero({
  title,
  backgroundSrc,
  backgroundAlt = "",
  titleAriaLabel,
}: ParallaxHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const context = gsap.context(() => {
      const wordmark = rootRef.current?.querySelector<HTMLElement>("[data-hero-wordmark]");
      if (!wordmark || !rootRef.current) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .to(wordmark, {
          y: () => -window.innerHeight * 0.8,
          opacity: 0,
          ease: "none",
        }, 0);
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="about-hero relative h-[145svh] bg-background">
      <div className="about-hero__sticky sticky top-0 h-svh overflow-hidden">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/60" aria-hidden="true" />

        <div className="about-hero__wordmark-center">
          <h1 aria-label={titleAriaLabel} className="about-hero__wordmark" data-hero-wordmark>
            {Array.from(title.replace(/\.$/, "")).map((character, index) => (
              <span
                key={`${character}-${index}`}
                className="about-hero__letter"
                aria-hidden="true"
              >
                {character}
              </span>
            ))}
            {title.endsWith(".") && (
              <span
                className="about-hero__letter text-accent"
                aria-hidden="true"
              >
                .
              </span>
            )}
          </h1>
        </div>

        <div className="about-hero__content relative z-10 h-full px-4 sm:px-6 md:px-10" aria-hidden="true" />
      </div>
    </section>
  );
}
