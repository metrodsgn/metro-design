import { Container } from "@/components/ui/Container";
import { MethodologyMotion } from "@/components/ui/MethodologyMotion";
import { METODOLOGIA } from "@/lib/constants";

export function Metodologia() {
  const steps = METODOLOGIA.steps;
  if (!steps.length) return null;

  return (
    <section className="about-methodology bg-background">
      <MethodologyMotion>
          <Container>
            {METODOLOGIA.statement.trim() ? (
              <h2 className="about-methodology__statement">
                {METODOLOGIA.statement}
              </h2>
            ) : null}

            <div className="about-methodology__start">início do projeto.</div>
            <div className="about-methodology__flow">
              <div className="about-methodology__mobile-track" aria-hidden="true">
                <span data-method-mobile-fill />
              </div>
              <svg
                className="about-methodology__line"
                viewBox="0 0 1000 620"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="about-methodology__track" d="M500 0 C500 90 230 80 230 170 S770 250 770 330 230 420 230 500 500 540 500 620" />
                <path data-method-path className="about-methodology__progress" d="M500 0 C500 90 230 80 230 170 S770 250 770 330 230 420 230 500 500 540 500 620" />
              </svg>
              <ol className="about-methodology__steps">
                {steps.map((step, index) => (
                  <li key={step.title} data-method-step className={`about-methodology__step about-methodology__step--${index + 1} about-methodology__step--${index % 2 === 0 ? "odd" : "even"}`}>
                    <span className="about-methodology__node" aria-hidden="true" />
                    <h3>{step.title}</h3>
                    {step.description.trim() ? <p>{step.description}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          </Container>
      </MethodologyMotion>
    </section>
  );
}
