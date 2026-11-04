"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ManifestoText({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const section = heading?.closest<HTMLElement>("[data-about-manifesto]");
    if (!heading || !section) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(
          heading.querySelectorAll("[data-manifesto-word]"),
        );
        const foreground = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-foreground")
          .trim() || "#f5f5f5";

        gsap.set(words, { color: "#454545" });
        gsap.to(words, {
          color: foreground,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 35%",
            scrub: true,
          },
        });
      });

      return () => media.revert();
    }, heading);

    return () => context.revert();
  }, []);

  const words = text.split(/\s+/);

  return (
    <h2
      ref={headingRef}
      className="about-manifesto__title type-h2 text-foreground"
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            {index > 0 ? " " : null}
            <span data-manifesto-word>{word}</span>
          </span>
        ))}
      </span>
    </h2>
  );
}
