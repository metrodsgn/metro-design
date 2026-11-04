"use client";

import { useCallback, useEffect, useRef } from "react";

const REPEATS_PER_GROUP = 5;
const INFLUENCE_RADIUS = 250;
const AUTO_SPEED_DESKTOP = 22;
const AUTO_SPEED_MOBILE = 14;

type LetterPosition = {
  element: HTMLSpanElement;
  x: number;
  y: number;
  group: number;
  weight: number;
};

function applyLetterAppearance(letter: LetterPosition, weight: number, color: string) {
  letter.element.style.fontWeight = String(Math.max(200, weight));
  letter.element.style.transform = `scaleX(${0.8 + (weight - 100) / 4000})`;
  letter.element.style.color = color;
  letter.weight = weight;
}

function resetLetterAppearance(active: Set<HTMLSpanElement>, letters: LetterPosition[]) {
  for (const letter of letters) {
    if (!active.has(letter.element)) continue;
    applyLetterAppearance(letter, 900, "#ff2e2e");
  }
}

export function InteractiveMarquee({
  text = "metro.",
  variant = "footer",
  ariaLabel,
}: {
  text?: string;
  variant?: "footer" | "ribbon";
  ariaLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const offsetRef = useRef(0);
  const unitWidthRef = useRef(0);
  const lettersRef = useRef<LetterPosition[]>([]);
  const activeLettersRef = useRef(new Set<HTMLSpanElement>());
  const runFrameRef = useRef<(time: number) => void>(() => {});
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const dragRef = useRef({ startX: 0, startOffset: 0, lastX: 0, lastTime: 0 });
  const velocityRef = useRef(AUTO_SPEED_DESKTOP);
  const dragVelocityRef = useRef(0);
  const inertiaRef = useRef(false);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const frameRef = useRef(0);
  const previousFrameRef = useRef(0);
  const characters = Array.from(text);
  const accessibleText = ariaLabel ?? Array.from({ length: REPEATS_PER_GROUP * 2 }, () => text).join(" ");

  const normalizeOffset = useCallback((value: number) => {
    const width = unitWidthRef.current;
    if (!width) return 0;
    return ((value % width) + width) % width;
  }, []);

  const setOffset = useCallback((value: number) => {
    const normalized = normalizeOffset(value);
    offsetRef.current = normalized;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-normalized}px, 0, 0)`;
    }
  }, [normalizeOffset]);

  const clearActiveLetters = useCallback(() => {
    resetLetterAppearance(activeLettersRef.current, lettersRef.current);
    activeLettersRef.current.clear();
  }, []);

  const updateLetterWeights = useCallback(() => {
    const root = rootRef.current;
    const pointer = pointerRef.current;
    if (!root || !pointer) {
      clearActiveLetters();
      return false;
    }

    const width = unitWidthRef.current;
    const offset = offsetRef.current;
    const radiusSquared = INFLUENCE_RADIUS ** 2;
    const active = activeLettersRef.current;
    let changed = false;

    for (const letter of lettersRef.current) {
      const x = letter.x + letter.group * width - offset;
      const rawX = x - pointer.x;
      const wrappedX = ((rawX + width / 2) % width + width) % width - width / 2;
      const dy = letter.y - pointer.y;
      const distanceSquared = wrappedX * wrappedX + dy * dy;

      if (distanceSquared >= radiusSquared) {
        if (active.has(letter.element)) {
          applyLetterAppearance(letter, 900, "#ff2e2e");
          active.delete(letter.element);
          changed = true;
        }
        continue;
      }

      const distance = Math.sqrt(distanceSquared);
      const progress = distance / INFLUENCE_RADIUS;
      const eased = progress * progress * (3 - 2 * progress);
      const weight = Math.round(100 + eased * 800);
      if (Math.abs(weight - letter.weight) < 4) continue;

      const tint = Math.round(80 - (weight - 100) * (34 / 800));
      applyLetterAppearance(letter, weight, `rgb(255 ${tint} ${tint})`);
      active.add(letter.element);
      changed = true;
    }

    return changed;
  }, [clearActiveLetters]);

  const measureLetters = useCallback(() => {
    const root = rootRef.current;
    const firstGroup = groupRefs.current[0];
    if (!root || !firstGroup) return;

    const rootRect = root.getBoundingClientRect();
    const firstRect = firstGroup.getBoundingClientRect();
    const width = firstRect.width;
    if (!width) return;

    unitWidthRef.current = width;
    lettersRef.current = groupRefs.current.flatMap((group, groupIndex) => {
      if (!group) return [];
      const groupRect = group.getBoundingClientRect();
      return Array.from(group.querySelectorAll<HTMLSpanElement>("[data-footer-letter]")).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          x: rect.left - groupRect.left + rect.width / 2,
          y: rect.top - rootRect.top + rect.height / 2,
          group: groupIndex,
          weight: 900,
        };
      });
    });
    setOffset(offsetRef.current);
  }, [setOffset]);

  const runFrame = useCallback((time: number) => {
    frameRef.current = 0;
    const root = rootRef.current;
    if (!root || !visibleRef.current) return;

    const elapsed = previousFrameRef.current
      ? Math.min((time - previousFrameRef.current) / 1000, 0.05)
      : 0;
    previousFrameRef.current = time;

    const autoSpeed = window.innerWidth < 768 ? AUTO_SPEED_MOBILE : AUTO_SPEED_DESKTOP;
    let needsAnotherFrame = false;

    if (draggingRef.current) {
      needsAnotherFrame = true;
    } else if (inertiaRef.current && !reducedMotionRef.current) {
      const velocity = velocityRef.current;
      const blend = Math.min(1, elapsed / 0.85);
      const nextVelocity = velocity + (autoSpeed - velocity) * blend;
      velocityRef.current = nextVelocity;
      setOffset(offsetRef.current + nextVelocity * elapsed);
      if (Math.abs(nextVelocity - autoSpeed) < 2) {
        velocityRef.current = autoSpeed;
        inertiaRef.current = false;
      } else {
        needsAnotherFrame = true;
      }
    } else if (!reducedMotionRef.current) {
      velocityRef.current = autoSpeed;
      setOffset(offsetRef.current + autoSpeed * elapsed);
      needsAnotherFrame = true;
    }

    if (pointerRef.current && updateLetterWeights()) {
      needsAnotherFrame = true;
    }

    if (needsAnotherFrame) {
      frameRef.current = requestAnimationFrame((nextTime) => runFrameRef.current(nextTime));
    } else {
      previousFrameRef.current = 0;
    }
  }, [setOffset, updateLetterWeights]);

  const requestFrame = useCallback(() => {
    if (!frameRef.current && visibleRef.current) {
      frameRef.current = requestAnimationFrame((time) => runFrameRef.current(time));
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    runFrameRef.current = runFrame;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) {
        inertiaRef.current = false;
        velocityRef.current = 0;
      } else {
        velocityRef.current = window.innerWidth < 768 ? AUTO_SPEED_MOBILE : AUTO_SPEED_DESKTOP;
      }
      requestFrame();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      previousFrameRef.current = 0;
      if (entry.isIntersecting) requestFrame();
      else if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    });
    observer.observe(root);

    const resizeObserver = new ResizeObserver(measureLetters);
    resizeObserver.observe(root);
    resizeObserver.observe(groupRefs.current[0]!);
    motionQuery.addEventListener("change", updateMotionPreference);
    updateMotionPreference();
    measureLetters();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      runFrameRef.current = () => {};
    };
  }, [measureLetters, requestFrame, runFrame]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.pointerType === "touch") {
      pointerRef.current = null;
    } else {
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    if (draggingRef.current) {
      const now = performance.now();
      const deltaX = event.clientX - dragRef.current.lastX;
      const elapsed = Math.max((now - dragRef.current.lastTime) / 1000, 0.001);
      dragVelocityRef.current = -deltaX / elapsed;
      dragRef.current.lastX = event.clientX;
      dragRef.current.lastTime = now;
      setOffset(dragRef.current.startOffset - (event.clientX - dragRef.current.startX));
    }
    requestFrame();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    draggingRef.current = true;
    inertiaRef.current = false;
    dragVelocityRef.current = 0;
    dragRef.current = {
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
    };
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
    requestFrame();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!reducedMotionRef.current) {
      const autoSpeed = window.innerWidth < 768 ? AUTO_SPEED_MOBILE : AUTO_SPEED_DESKTOP;
      velocityRef.current = autoSpeed + Math.max(-900, Math.min(900, dragVelocityRef.current)) * 0.28;
      inertiaRef.current = true;
      requestFrame();
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" && !draggingRef.current) {
      pointerRef.current = null;
      requestFrame();
    }
  };

  const renderGroup = (groupIndex: number) => (
    <span
      key={groupIndex}
      ref={(element) => { groupRefs.current[groupIndex] = element; }}
      className="footer-wordmark__group"
      aria-hidden="true"
    >
      {Array.from({ length: REPEATS_PER_GROUP }, (_, repeatIndex) => (
        <span className="footer-wordmark__word" key={repeatIndex}>
          {characters.map((character, characterIndex) => (
            <span
              className="footer-wordmark__letter"
              data-footer-letter
              key={`${character}-${characterIndex}`}
              aria-hidden="true"
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={rootRef}
      className={`footer-wordmark ${variant === "ribbon" ? "footer-wordmark--ribbon" : ""}`}
      aria-label={accessibleText}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <span className="sr-only">{accessibleText}</span>
      <div ref={trackRef} className="footer-wordmark__track" role="presentation">
        {renderGroup(0)}
        {renderGroup(1)}
      </div>
    </div>
  );
}
