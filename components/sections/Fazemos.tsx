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
    <section id="fazemos" className="py-16 md:py-32">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          {/* Coluna esquerda — título + descrição */}
          <div>
            <Reveal>
              <h2 className="font-editorial text-foreground max-w-xl text-3xl leading-tight tracking-tight md:text-5xl">
                {SERVICES.title}
              </h2>

              <p className="text-muted mt-5 max-w-xl text-base leading-relaxed md:mt-6 md:text-lg">
                {SERVICES.description}
              </p>

              <Link
                href="/contato"
                className="ui-button ui-button-primary mt-7 md:mt-10"
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
                        className="relative h-5 w-5 shrink-0"
                      >
                        <span className="bg-muted absolute top-1/2 left-0 h-px w-5 -translate-y-1/2" />
                        <span
                          className={`bg-muted absolute top-0 left-1/2 h-5 w-px -translate-x-1/2 transition-transform duration-200 ease-out ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
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
