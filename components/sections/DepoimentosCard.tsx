"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Testimonial } from "@/sanity/lib/fetchers";

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
};

const EASE = [0.22, 1, 0.36, 1] as const;

const flipTransition = {
  duration: 0.65,
  ease: EASE,
};

export function DepoimentosCard({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const total = testimonials.length;

  if (total === 0) return null;

  const goTo = (index: number, visualDirection: number) => {
    setDirection(visualDirection);
    setActiveIndex((index + total) % total);
  };

  const visibleTestimonials =
    total >= 3
      ? [
          (activeIndex - 1 + total) % total,
          activeIndex,
          (activeIndex + 1) % total,
        ]
      : total === 2
        ? [(activeIndex + 1) % total, activeIndex, (activeIndex + 1) % total]
        : [activeIndex];

  return (
    <div className="relative mx-auto max-w-6xl px-2 sm:px-4 lg:px-14">
      <div
        className="overflow-hidden py-7"
        aria-live="polite"
        aria-atomic="true"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;

          if (startX === null || endX === undefined) return;
          const deltaX = endX - startX;

          if (Math.abs(deltaX) < 48) return;
          goTo(activeIndex + (deltaX < 0 ? 1 : -1), deltaX < 0 ? -1 : 1);
        }}
      >
        <div
          className={`flex items-stretch ${
            total > 1
              ? "w-[300%] -translate-x-1/3 lg:w-full lg:translate-x-0"
              : "w-full"
          }`}
        >
          <LayoutGroup id="testimonial-cards">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {visibleTestimonials.map((testimonialIndex, position) => {
                const testimonial = testimonials[testimonialIndex];

                return (
                  <motion.div
                    key={
                      total >= 3
                        ? testimonial._id
                        : `${testimonial._id}-${position}`
                    }
                    layout={total >= 3 ? "position" : false}
                    layoutId={
                      total >= 3 ? `testimonial-${testimonial._id}` : undefined
                    }
                    custom={direction}
                    variants={slideVariants}
                    initial={reduceMotion ? false : "enter"}
                    animate="center"
                    exit={reduceMotion ? undefined : "exit"}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            ...flipTransition,
                            layout: { duration: 0.65, ease: EASE },
                          }
                    }
                    className="h-full shrink-0 px-2 sm:px-3"
                    style={{ width: `${100 / visibleTestimonials.length}%` }}
                  >
                    <article className="flex h-full min-h-72 min-w-0 flex-col items-center rounded-card border border-border bg-surface px-5 pt-0 pb-7 text-center sm:px-8">
                      <TestimonialContent testimonial={testimonial} />
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1, -1)}
            className="absolute top-1/2 -left-5 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-transparent text-accent transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
            aria-label="Depoimento anterior"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1, 1)}
            className="absolute top-1/2 -right-5 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-transparent text-accent transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
            aria-label="Próximo depoimento"
          >
            <Arrow direction="right" />
          </button>
        </>
      )}

      {total > 1 && (
        <p className="text-muted mt-7 text-center font-mono text-xs" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}

function TestimonialContent({ testimonial }: { testimonial: Testimonial }) {
  return (
    <>
      <div
        className={`-mt-7 mb-5 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-background font-display text-xl font-semibold ${
          testimonial.avatarUrl ? "bg-surface" : "bg-accent text-white"
        }`}
        aria-hidden="true"
      >
        {testimonial.avatarUrl ? (
          <Image
            src={testimonial.avatarUrl}
            alt=""
            width={128}
            height={128}
            className="size-full object-cover"
          />
        ) : (
          testimonial.initial || testimonial.name.slice(0, 1)
        )}
      </div>
      <blockquote className="font-editorial text-foreground max-w-full text-xl leading-snug break-words sm:text-2xl">
        “{testimonial.quote}”
      </blockquote>
      <div className="mt-auto pt-6">
        <p className="text-foreground max-w-full text-sm font-semibold break-words">{testimonial.name}</p>
        <p className="text-muted mt-1 max-w-full text-sm break-words">
          {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
        </p>
      </div>
    </>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
