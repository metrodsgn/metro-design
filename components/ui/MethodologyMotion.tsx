"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MethodologyMotion({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const path = stage.querySelector<SVGPathElement>("[data-method-path]");
    const mobileFill = stage.querySelector<HTMLElement>("[data-method-mobile-fill]");
    const steps = Array.from(stage.querySelectorAll<HTMLElement>("[data-method-step]"));

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    const createTimeline = (draw: (timeline: gsap.core.Timeline) => void) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          pin: stage,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 0.9 : 1.15))}`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      draw(timeline);
      steps.slice(1).forEach((step, index) => {
        timeline.fromTo(
          step,
          { autoAlpha: 0.35 },
          { autoAlpha: 1, duration: 0.1, ease: "none" },
          (index + 1) / (steps.length + 1),
        );
      });
    };

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length + 1, strokeDashoffset: length + 1, visibility: "visible" });
      createTimeline((timeline) => {
        timeline.fromTo(
          path,
          { strokeDashoffset: length + 1 },
          { strokeDashoffset: 0, duration: 1, ease: "none" },
        );
      });
    });

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      if (!mobileFill) return;
      createTimeline((timeline) => {
        timeline.fromTo(
          mobileFill,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1, ease: "none" },
        );
      });
    });

    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
      media.revert();
    };
  }, []);

  return (
    <div ref={stageRef} className="about-methodology__stage" data-method-stage>
      {children}
    </div>
  );
}
