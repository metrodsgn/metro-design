"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MethodologyMotion({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const path = stage.querySelector<SVGPathElement>("[data-method-path]");
    const mobileFill = stage.querySelector<HTMLElement>(
      "[data-method-mobile-fill]"
    );
    const steps = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-method-step]")
    );
    const startNode = stage.querySelector<HTMLElement>(
      "[data-method-start-node]"
    );
    const endNode = stage.querySelector<HTMLElement>("[data-method-end-node]");
    const desktop = window.matchMedia("(min-width: 768px)");
    let pathLength = 0;
    let stepPathLengths: number[] = [];
    let mobileThresholds: number[] = [];
    let resizeObserver: ResizeObserver | null = null;
    let active = true;

    const context = gsap.context(() => {
      const updateProgress = (progress: number) => {
        const p = Math.max(0, Math.min(1, progress));

        if (desktop.matches && path && pathLength) {
          gsap.set(path, { strokeDashoffset: pathLength * (1 - p) });
          const drawnLength = pathLength * p;
          steps.forEach((step, index) => {
            step.classList.toggle(
              "is-active",
              drawnLength >= (stepPathLengths[index] ?? Infinity) - 2
            );
          });
          endNode?.classList.toggle("is-active", p >= 1);
        } else {
          if (mobileFill) gsap.set(mobileFill, { scaleY: p });
          steps.forEach((step, index) => {
            step.classList.toggle(
              "is-active",
              p >= (mobileThresholds[index] ?? Infinity)
            );
          });
          endNode?.classList.toggle("is-active", p >= 1);
        }
      };

      const measure = () => {
        if (path) {
          pathLength = path.getTotalLength();
          stepPathLengths = steps.map((step) => {
            const targetX = Number(step.dataset.pointX);
            const targetY = Number(step.dataset.pointY);
            let nearestLength = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;

            for (let distance = 0; distance <= pathLength; distance += 2) {
              const point = path.getPointAtLength(
                Math.min(distance, pathLength)
              );
              const dx = point.x - targetX;
              const dy = point.y - targetY;
              const squaredDistance = dx * dx + dy * dy;
              if (squaredDistance < nearestDistance) {
                nearestDistance = squaredDistance;
                nearestLength = distance;
              }
            }

            return nearestLength;
          });
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        }

        const track = stage.querySelector<HTMLElement>(
          ".about-methodology__mobile-track"
        );
        if (track) {
          const trackRect = track.getBoundingClientRect();
          const trackHeight = trackRect.height || 1;
          mobileThresholds = steps.map((step) => {
            const node = step.querySelector<HTMLElement>(
              ".about-methodology__node"
            );
            const nodeRect = node?.getBoundingClientRect();
            const nodeCenter = nodeRect
              ? nodeRect.top + nodeRect.height / 2
              : step.getBoundingClientRect().top;
            return Math.max(
              0,
              Math.min(1, (nodeCenter - trackRect.top) / trackHeight)
            );
          });
        }
      };

      const currentProgress = () => {
        const rect = stage.getBoundingClientRect();
        return (window.innerHeight * 0.7 - rect.top) / (rect.height || 1);
      };

      measure();
      stage.classList.add("is-motion-ready");
      startNode?.classList.add("is-active");

      const progressDriver = { value: 0 };
      gsap.to(progressDriver, {
        value: 1,
        duration: 1,
        ease: "none",
        onUpdate: () => updateProgress(currentProgress()),
        scrollTrigger: {
          trigger: stage,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            updateProgress(currentProgress());
          },
        },
      });

      resizeObserver = new ResizeObserver(() => {
        measure();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(stage);

      document.fonts.ready.then(() => {
        if (active) {
          measure();
          ScrollTrigger.refresh();
        }
      });

      updateProgress(currentProgress());
    }, stage);

    return () => {
      active = false;
      resizeObserver?.disconnect();
      stage.classList.remove("is-motion-ready");
      startNode?.classList.remove("is-active");
      steps.forEach((step) => step.classList.remove("is-active"));
      endNode?.classList.remove("is-active");
      context.revert();
    };
  }, []);

  return (
    <div ref={stageRef} className="about-methodology__stage" data-method-stage>
      {children}
    </div>
  );
}
