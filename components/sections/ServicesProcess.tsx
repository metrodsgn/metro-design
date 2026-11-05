"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/fazemos/page.module.css";

const steps = [
  ["Diagnóstico.", "Entendemos o negócio, o público, a concorrência e o que precisa mudar."],
  ["Estratégia.", "Definimos posicionamento, prioridades e como o resultado será medido."],
  ["Planejamento.", "Escopo, cronograma e responsabilidades claros antes de começar."],
  ["Criação e entrega.", "Criamos, produzimos e desenvolvemos em etapas que você acompanha e aprova."],
  ["Resultado.", "Medimos o que foi entregue e seguimos evoluindo a marca com você."],
];
const curve = "M20 0 L20 1000";

export function ServicesProcess() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<SVGPathElement>(null);
  useEffect(() => {
    const stage = root.current;
    const path = progress.current;
    if (!stage || !path) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Tween | undefined;
    const measure = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      const bounds = stage.getBoundingClientRect();
      const mobile = window.innerWidth < 768;
      const points = Array.from(stage.querySelectorAll("h3")).map((heading, index) => {
        const rect = heading.getBoundingClientRect();
        return {
          x: mobile ? 12 : bounds.width * (index % 2 ? 0.55 : 0.45),
          y: rect.top - bounds.top + rect.height / 2,
        };
      });
      const svg = stage.querySelector("svg")!;
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      const first = points[0];
      let d = `M ${first.x} ${first.y}`;
      points.slice(1).forEach((point, index) => {
        const previous = points[index];
        const middle = (previous.y + point.y) / 2;
        d += ` C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.y}`;
      });
      stage.querySelectorAll("path").forEach(line => line.setAttribute("d", d));
      stage.querySelectorAll("circle").forEach((node, index) => {
        node.setAttribute("cx", String(points[index].x));
        node.setAttribute("cy", String(points[index].y));
      });
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: media.matches ? 0 : length });
      if (!media.matches) {
        tween = gsap.fromTo(path, { strokeDashoffset: length }, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: stage, start: `top+=${first.y} 65%`, end: `top+=${points[points.length - 1].y} 65%`, scrub: true, invalidateOnRefresh: true },
        });
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    media.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);
  return <div ref={root} className={styles.timeline}>
    <svg viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
      <path d={curve} className={styles.track} />
      <path ref={progress} d={curve} className={styles.progress} />
      {steps.map(([title]) => <circle key={title} r="5" className={styles.node} />)}
    </svg>
    <ol>{steps.map(([title, text], index) => <li key={title}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div><h3>{title}</h3><p>{text}</p></div>
    </li>)}</ol>
  </div>;
}
