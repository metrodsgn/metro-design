"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COPIES = 5;

export function TaglineEcho({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          section.classList.add("is-enhanced");
          const echoes = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-tagline-echo]:not(:first-child)"),
          );

          gsap.to(echoes, {
            height: 0,
            scaleY: 0,
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
            transformOrigin: "top center",
            stagger: { each: 0.08, from: "end" },
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "center center",
              scrub: true,
            },
          });

          return () => section.classList.remove("is-enhanced");
        },
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="tagline-echo" aria-label={text}>
      <div className="tagline-echo__layers" aria-hidden="true">
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} data-tagline-echo>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
