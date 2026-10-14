"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { AntesDepoisItem } from "@/data/antes-depois";
import { AntesDepoisSlider } from "./AntesDepoisSlider";

export function AntesDepoisCarousel({ items }: { items: AntesDepoisItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const total = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;
        const index = slideRefs.current.findIndex(
          (slide) => slide === mostVisible.target
        );
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: 0.6 }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    if (reduceMotion !== false || isHovered || total < 2) return;

    const interval = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % total;
      const track = trackRef.current;
      const slide = slideRefs.current[nextIndex];
      if (!track || !slide) return;

      const trackLeft = track.getBoundingClientRect().left;
      const slideLeft = slide.getBoundingClientRect().left;
      track.scrollTo({
        left: track.scrollLeft + slideLeft - trackLeft,
        behavior: "smooth",
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeIndex, isHovered, reduceMotion, total]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;

    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const left =
      track.scrollLeft +
      slideRect.left -
      trackRect.left -
      (track.clientWidth - slide.clientWidth) / 2;

    track.scrollTo({
      left,
      behavior: reduceMotion === false ? "smooth" : "auto",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest("button, input, select, textarea")
    ) {
      return;
    }

    let nextIndex: number | null = null;
    if (event.key === "ArrowLeft") nextIndex = Math.max(0, activeIndex - 1);
    if (event.key === "ArrowRight")
      nextIndex = Math.min(total - 1, activeIndex + 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = total - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    scrollToIndex(nextIndex);
  };

  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <div
      className="mt-8 md:mt-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsHovered(false);
        }
      }}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Comparações de antes e depois de marcas"
        onKeyDown={handleKeyDown}
        className="focus-visible:outline-foreground flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain pb-1 outline-none [-ms-overflow-style:none] focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={item.cliente}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${total}`}
            className={`w-full shrink-0 snap-center transition-opacity duration-300 ${
              index === activeIndex ? "opacity-100" : "opacity-[.82]"
            }`}
          >
            <article className="border-border bg-surface grid items-start gap-5 rounded-[var(--radius-card)] border p-4 md:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.7fr)] md:gap-10 md:p-7 lg:gap-14 lg:p-9">
              <div className="flex flex-col items-start px-1 md:px-0 md:pt-2">
                <p className="text-accent font-mono text-[11px] tracking-[0.18em] uppercase">
                  {item.segmento} <span className="text-border px-1">/</span>{" "}
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-editorial text-foreground mt-5 text-4xl leading-[0.98] tracking-tight md:text-5xl lg:text-6xl">
                  {item.cliente}
                </h3>
                <p className="text-muted mt-5 max-w-sm text-sm leading-relaxed md:text-base">
                  {item.resumo}
                </p>
                <div className="border-border mt-7 flex w-full items-center gap-3 border-t pt-5">
                  <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                  <p className="text-foreground font-mono text-[11px] tracking-[0.12em] uppercase">
                    {item.entrega}
                  </p>
                </div>
              </div>

              <AntesDepoisSlider
                item={item}
                eager={index === 0}
              />
            </article>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Marca anterior"
            className="ui-icon-button"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === total - 1}
            aria-label="Próxima marca"
            className="ui-icon-button"
          >
            <ArrowIcon direction="right" />
          </button>
          <span
            aria-live="polite"
            className="text-muted ml-2 font-mono text-xs tracking-widest"
          >
            {formattedIndex} / {formattedTotal}
          </span>
        </div>

        <div aria-label="Escolher marca" className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.cliente}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir para ${item.cliente}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-11 min-w-4 cursor-pointer py-5 transition-all ${
                index === activeIndex ? "w-8" : "w-4"
              }`}
            >
              <span
                aria-hidden="true"
                className={`block h-0.5 w-full rounded-full transition-colors ${
                  index === activeIndex ? "bg-accent" : "bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
