"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, UsersRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

type Metric = {
  label: string;
  value: number;
  icon: typeof CalendarDays;
};

export function AboutMetrics({ clientCount }: { clientCount: number }) {
  const metrics: Metric[] = [
    {
      label: "Anos de atuação",
      value: new Date().getUTCFullYear() - 2017,
      icon: CalendarDays,
    },
    ...(clientCount > 0
      ? [{ label: "Marcas atendidas", value: clientCount, icon: UsersRound }]
      : []),
  ];

  return (
    <section className="about-metrics py-section-md md:py-section-lg">
      <Container>
        <div className={`about-metrics__grid ${metrics.length === 2 ? "has-two" : "has-one"}`}>
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const Icon = metric.icon;

  useEffect(() => {
    const card = cardRef.current;
    const valueElement = valueRef.current;
    if (!card || !valueElement) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };
        valueElement.textContent = "0";
        gsap.to(counter, {
          value: metric.value,
          duration: 1.2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            valueElement.textContent = String(Math.round(counter.value));
          },
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => media.revert();
    }, card);

    return () => context.revert();
  }, [metric.value]);

  return (
    <article ref={cardRef} className="about-metrics__card">
      <Icon className="about-metrics__icon" aria-hidden="true" />
      <p className="about-metrics__label">{metric.label}</p>
      <p className="about-metrics__value">
        <span
          ref={valueRef}
          role="img"
          aria-label={`${metric.label}: ${metric.value}`}
        >
          {metric.value}
        </span>
      </p>
    </article>
  );
}
