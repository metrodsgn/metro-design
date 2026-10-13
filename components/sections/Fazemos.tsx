"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function Fazemos() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="fazemos" className="py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          {/* Coluna esquerda — título + descrição */}
          <div className="md:sticky md:top-24">
            <Reveal>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                {SERVICES.label}
              </span>

              <h2 className="font-editorial text-foreground mt-4 max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {SERVICES.title}
              </h2>

              <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                {SERVICES.description}
              </p>

              <Link
                href="/contato"
                className="ui-button ui-button-primary mt-10"
              >
                Fale Conosco
              </Link>
            </Reveal>
          </div>

          {/* Coluna direita — acordeão */}
          <Reveal delay={0.15}>
            <div className="border-border border-t">
              {SERVICES.areas.map((area, index) => {
                const isOpen = openIndex === index;
                const panelId = `fazemos-panel-${index}`;
                const buttonId = `fazemos-button-${index}`;

                return (
                  <div key={area.title}>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                      className="border-border font-display text-foreground flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 border-b py-6 text-left text-2xl leading-tight font-normal tracking-tight transition-colors duration-150 md:text-3xl"
                    >
                      <span>{area.title}</span>
                      <span
                        aria-hidden="true"
                        className="text-muted shrink-0 font-mono text-xl"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="text-muted flex items-start gap-3 py-3 text-sm leading-relaxed md:text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
