"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ServiceArea = { title: string; items: readonly string[] };

export function ServicesDesktopCards({ areas }: { areas: readonly ServiceArea[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, index) => {
          const distance = [10, -14, 6][index % 3];
          gsap.to(card, {
            yPercent: distance,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }, rootRef);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className="about-services__grid">
      {areas.map((area) => (
        <Link key={area.title} href="/contato" className="about-service-card" data-service-card>
          <span className="about-service-card__title">{area.title.toLowerCase()}</span>
          <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <span className="about-service-card__arrow" aria-hidden="true"><ArrowUpRight /></span>
          <span className="about-service-card__explore">(explore este serviço)</span>
        </Link>
      ))}
    </div>
  );
}
