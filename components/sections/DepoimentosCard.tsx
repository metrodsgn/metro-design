"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/sanity/lib/fetchers";

export function DepoimentosCard({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const total = testimonials.length;

  // Relógio com hora real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      const weekdays = [
        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado",
      ];
      setDate(`Hoje, ${weekdays[now.getDay()]}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Contador e estado de scroll
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateScrollState = () => {
      const { scrollTop, scrollHeight, clientHeight } = list;
      const isAtEnd = scrollTop + clientHeight >= scrollHeight - 4;
      setShowScrollHint(!isAtEnd);

      const items = list.querySelectorAll("[data-notification]");
      let count = 0;
      const listRect = list.getBoundingClientRect();
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < listRect.bottom && rect.bottom > listRect.top) {
          count += 1;
        }
      });
      setVisibleCount(count);
    };

    updateScrollState();
    list.addEventListener("scroll", updateScrollState, { passive: true });
    return () => list.removeEventListener("scroll", updateScrollState);
  }, [testimonials]);

  const handleScrollHint = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ top: list.clientHeight * 0.7, behavior: "smooth" });
  };

  return (
    <div className="border-border bg-background mx-auto w-full max-w-[480px] rounded-[20px] border p-6">
      <div className="text-center">
        <p className="font-editorial text-foreground text-5xl leading-none md:text-6xl">
          {time || "—:—"}
        </p>
        <p className="text-muted mt-2 text-sm">{date || "Hoje"}</p>
      </div>

      <div className="border-border mt-8 flex items-center justify-between border-b pb-3">
        <span className="text-muted text-xs font-medium tracking-widest uppercase">
          Notificações
        </span>
        <span className="text-muted font-mono text-xs">
          {Math.min(visibleCount, total)} de {total}
        </span>
      </div>

      <div className="relative">
        <ul
          ref={listRef}
          tabIndex={0}
          role="region"
          aria-label="Lista de depoimentos de clientes"
          data-lenis-prevent
          className="depoimentos-list max-h-[clamp(300px,50vh,420px)] space-y-3 overflow-y-auto pt-4 pb-4"
        >
          {testimonials.map((item) => (
            <NotificationItem key={item._id} item={item} listRef={listRef} />
          ))}
        </ul>

        {showScrollHint && total > 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
            <button
              type="button"
              onClick={handleScrollHint}
              className="bg-foreground text-background pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-lg transition-opacity hover:opacity-90"
            >
              Role
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({
  item,
  listRef,
}: {
  item: Testimonial;
  listRef: React.RefObject<HTMLUListElement | null>;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    const list = listRef.current;
    if (!el || !list) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { root: list, threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [listRef]);

  return (
    <li
      ref={itemRef}
      data-notification
      className={`border-border bg-surface flex items-start gap-3 rounded-xl border p-3 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0"
      }`}
    >
      <div className="bg-accent text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]">
        <span className="font-display text-sm font-bold">{item.initial}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-foreground truncate text-sm font-semibold">
            {item.company}
          </p>
          <span className="text-muted shrink-0 text-xs">{item.time}</span>
        </div>
        <p className="text-muted mt-1 text-xs leading-relaxed">{item.quote}</p>
      </div>
    </li>
  );
}