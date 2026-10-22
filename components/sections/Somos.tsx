import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";
import { CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/constants";

const cidadeSede = CONTACT.address.includes("Fortaleza") ? "Fortaleza" : "";

export function Somos() {
  return (
    <section id="somos" className="py-section-md md:py-section-lg">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 lg:gap-32">
          {/* Coluna lateral — identificador */}
          <div className="min-w-0 flex flex-col items-start justify-start">
            <Reveal>
              <p className="section-eyebrow">Quem somos</p>
            </Reveal>
          </div>

          {/* Área principal — apresentação e indicadores */}
          <div className="min-w-0">
            <Reveal>
              <h2 className="font-editorial text-foreground max-w-3xl text-3xl leading-tight tracking-tight md:text-5xl">
                {ABOUT.title}
              </h2>
            </Reveal>

            <div className="mt-6 md:mt-8 space-y-5 md:space-y-6">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.1 + index * 0.1}>
                  <p className="text-muted text-base leading-relaxed md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Indicadores institucionais */}
            <div className="mt-14 md:mt-16 border-t border-border pt-10">
              <h3 className="font-mono text-muted text-xs tracking-widest uppercase mb-8 md:mb-10">
                Dados da agência
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <Indicator
                  label="Ano de fundação"
                  value="2017"
                  note="Sediada em Fortaleza"
                />
                <Indicator
                  label="Frentes de atuação"
                  value={String(SERVICES.areas.length)}
                  note="Branding, conteúdo e audiovisual"
                />
                <Indicator
                  label="Cidade / sede"
                  value={cidadeSede}
                  note="CE, Brasil"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Indicator({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="min-w-0 border-b border-border pb-6 last:border-b-0">
      <span className="label-mono block">{label}</span>
      <span className="font-display text-foreground text-lg leading-tight md:text-xl mt-1 block">
        {value}
      </span>
      <span className="text-muted text-xs mt-1 block">{note}</span>
    </div>
  );
}
