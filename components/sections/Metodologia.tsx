import Image from "next/image";
import { MethodologyMotion } from "@/components/ui/MethodologyMotion";
import { METODOLOGIA } from "@/lib/constants";

type MethodologyPhoto = {
  src: string;
  alt: string;
  background?: string;
} | null;

const DESKTOP_POINTS = [
  { x: 430, y: 380, side: "left" },
  { x: 570, y: 720, side: "right" },
  { x: 430, y: 1060, side: "left" },
  { x: 570, y: 1400, side: "right" },
] as const;

const PATH =
  "M500 60 C500 170 430 230 430 380 C430 520 570 580 570 720 C570 860 430 920 430 1060 C430 1200 570 1260 570 1400 C570 1520 500 1560 500 1640";

export function Metodologia({ photos }: { photos: MethodologyPhoto[] }) {
  const steps = METODOLOGIA.steps;
  if (!steps.length) return null;

  return (
    <section
      className="about-methodology bg-background"
      aria-label="Metodologia"
    >
      <MethodologyMotion>
        <div className="about-methodology__start" data-method-start>
          <span>início do projeto.</span>
        </div>
        <span
          className="about-methodology__node about-methodology__node--start"
          data-method-start-node
          aria-hidden="true"
        />

        <svg
          className="about-methodology__line"
          viewBox="0 0 1000 1700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="about-methodology__track" d={PATH} />
          <path
            data-method-path
            className="about-methodology__progress"
            d={PATH}
          />
        </svg>

        <div className="about-methodology__mobile-track" aria-hidden="true">
          <span data-method-mobile-fill />
        </div>

        <ol className="about-methodology__steps">
          {steps.map((step, index) => {
            const point = DESKTOP_POINTS[index];
            const photo = photos[index] ?? null;

            return (
              <li
                key={step.title}
                className={`about-methodology__step about-methodology__step--${point?.side ?? "center"}`}
                style={{
                  left: `${((point?.x ?? 500) / 1000) * 100}%`,
                  top: `${((point?.y ?? 0) / 1700) * 100}%`,
                }}
                data-method-step
                data-method-node
                data-point-x={point?.x ?? 500}
                data-point-y={point?.y ?? 0}
                data-has-photo={photo ? "true" : "false"}
              >
                <span className="about-methodology__node" aria-hidden="true" />
                <div className="about-methodology__copy">
                  <h3>{step.title}</h3>
                  {step.description.trim() ? <p>{step.description}</p> : null}
                </div>
                {photo ? (
                  <div
                    className="about-methodology__photo"
                    data-method-photo
                    style={{
                      background: photo.background ?? "var(--color-surface)",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt || ""}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1200px) 38vw, 456px"
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <span
          className="about-methodology__node about-methodology__node--end"
          data-method-end-node
          aria-hidden="true"
        />
      </MethodologyMotion>
    </section>
  );
}
