"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function Depoimentos() {
  const listRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const total = TESTIMONIALS.items.length;

  // Atualiza o relógio a cada minuto
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
    const interval = setInterval(updateTime, 60_000); // a cada 60s

    return () => clearInterval(interval);
  }, []);

  // Atualiza o contador e o estado "atEnd" quando o usuário rola a lista
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
  }, []);

  const handleScrollHint = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ top: list.clientHeight * 0.7, behavior: "smooth" });
  };

  return (
    <section
      id="depoimentos"
      className="bg-surface border-border border-y py-24 md:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          {/* Coluna esquerda — texto */}
          <Reveal>
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                {TESTIMONIALS.label}
              </span>

              <h2 className="font-editorial text-foreground mt-4 max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {TESTIMONIALS.title}
              </h2>

              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {TESTIMONIALS.description}
              </p>
            </div>
          </Reveal>

          {/* Coluna direita — cartão */}
          <Reveal delay={0.15}>
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
                  {TESTIMONIALS.items.map((item, index) => (
                    <NotificationItem
                      key={index}
                      name={item.name}
                      company={item.company}
                      time={item.time}
                      quote={item.quote}
                      initial={item.initial}
                      listRef={listRef}
                    />
                  ))}
                </ul>

                {showScrollHint && (
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function NotificationItem({
  name,
  company,
  time,
  quote,
  initial,
  listRef,
}: {
  name: string;
  company: string;
  time: string;
  quote: string;
  initial: string;
  listRef: React.RefObject<HTMLUListElement | null>;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    const list = listRef.current;
    if (!item || !list) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { root: list, threshold: 0.15 },
    );

    observer.observe(item);
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
        <span className="font-display text-sm font-bold">{initial}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-foreground truncate text-sm font-semibold">
            {company}
          </p>
          <span className="text-muted shrink-0 text-xs">{time}</span>
        </div>
        <p className="text-muted mt-1 text-xs leading-relaxed">{quote}</p>
      </div>
    </li>
  );
}