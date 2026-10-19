"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import type { AntesDepoisItem } from "@/data/antes-depois";

type AntesDepoisSliderProps = {
  item: AntesDepoisItem;
  eager: boolean;
};

export function AntesDepoisSlider({ item, eager }: AntesDepoisSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [position, setPosition] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const reduceMotion = useReducedMotion();

  const clearAnimationTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const markInteraction = () => {
    clearAnimationTimers();
    setIsAnimating(false);
  };

  useEffect(() => clearAnimationTimers, []);

  const updatePosition = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };

  const handleFramePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!item.antes || event.pointerType !== "mouse") return;
    if (event.target instanceof HTMLElement && event.target.closest("button")) {
      return;
    }
    markInteraction();
    updatePosition(event.clientX);
  };

  const handleHandlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    markInteraction();
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const handleHandlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      updatePosition(event.clientX);
    }
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    markInteraction();
    setPosition(Number(event.currentTarget.value));
  };

  const toggleComparison = () => {
    markInteraction();
    if (reduceMotion) {
      setPosition((current) => (current === 0 ? 100 : 0));
      return;
    }
    setIsAnimating(true);
    setPosition((current) => (current === 0 ? 100 : 0));
    timersRef.current.push(setTimeout(() => setIsAnimating(false), 350));
  };

  const imageAlt =
    item.altDepois ?? `Depois da identidade visual de ${item.cliente}`;

  return (
    <div
      ref={frameRef}
      onPointerDown={handleFramePointerDown}
      className="border-border bg-background focus-within:outline-accent relative aspect-video h-auto max-h-[55svh] min-h-40 touch-pan-y overflow-hidden rounded-card border focus-within:outline-2 focus-within:outline-offset-2 md:aspect-[4/3]"
    >
      <Image
        src={item.depois}
        alt={imageAlt}
        fill
        unoptimized
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 760px) 100vw, 72vw"
        className="object-cover"
      />

      {item.antes && (
        <>
          <div
            className={`absolute inset-0 z-10 ${
              isAnimating ? "transition-[clip-path] duration-300 ease-out" : ""
            }`}
            style={
              {
                clipPath: "inset(0 calc(100% - var(--x)) 0 0)",
                "--x": `${position}%`,
              } as CSSProperties & { "--x": string }
            }
          >
            <Image
              src={item.antes}
              alt={
                item.altAntes ?? `Antes da identidade visual de ${item.cliente}`
              }
              fill
              unoptimized
              loading={eager ? "eager" : "lazy"}
              sizes="(max-width: 760px) 100vw, 72vw"
              className="object-cover"
            />
          </div>

          <span className="text-foreground bg-background/80 pointer-events-none absolute top-3 left-3 z-20 rounded-sm px-2 py-1 font-mono text-[10px] tracking-widest">
            ANTES
          </span>
          <span className="text-foreground bg-background/80 pointer-events-none absolute top-3 right-3 z-20 rounded-sm px-2 py-1 font-mono text-[10px] tracking-widest">
            DEPOIS
          </span>

          <div
            aria-hidden="true"
            className={`bg-accent pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 -translate-x-1/2 ${
              isAnimating ? "transition-[left] duration-300 ease-out" : ""
            }`}
            style={{ left: `${position}%` }}
          />

          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onPointerDown={handleHandlePointerDown}
            onPointerMove={handleHandlePointerMove}
            className={`border-background bg-accent text-foreground absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border-2 ${
              isAnimating ? "transition-[left] duration-300 ease-out" : ""
            }`}
            style={{ left: `${position}%` }}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 5 3 12l5 7" />
              <path d="M16 5l5 7-5 7" />
              <path d="M3 12h18" />
            </svg>
          </button>

          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={position}
            aria-label={`Comparar antes e depois da marca ${item.cliente}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={position}
            onChange={handleRangeChange}
            className="pointer-events-none absolute inset-0 z-40 h-full w-full opacity-0"
          />

          <button
            type="button"
            onClick={toggleComparison}
            className="ui-button ui-button-secondary ui-button-small ui-button-over-image absolute bottom-3 left-3 z-30"
          >
            Alternar
          </button>
        </>
      )}
    </div>
  );
}
