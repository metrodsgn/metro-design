"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutGsapMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-scroll-draw]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-scroll-draw]", start: "top 80%" },
        },
      );

      gsap.fromTo(
        "[data-skyline-bar]",
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 0.7,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-skyline-bar]", start: "top 95%" },
        },
      );

      gsap.fromTo(
        "[data-photo-frame]",
        {
          clipPath: "inset(34% 30% round 2px)",
        },
        {
          clipPath: "inset(0% 0% round 2px)",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-photo-frame]",
            start: "top 84%",
            end: "center 48%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        "[data-photo-image]",
        { scale: 1.5 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-photo-frame]",
            start: "top 84%",
            end: "center 48%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        },
      );

    }, rootRef);

    return () => context.revert();
  }, []);

  return <div ref={rootRef} className="about-gsap-scope">{children}</div>;
}
