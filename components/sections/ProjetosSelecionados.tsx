import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PROJECTS } from "@/lib/constants";

export function ProjetosSelecionados() {
  return (
    <section id="jobs" className="py-24 md:py-32">
      <Container>
        {/* Cabeçalho */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              {PROJECTS.label}
            </span>
            <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
              {PROJECTS.title}
            </h2>
          </div>

          <Link
            href={PROJECTS.cta.href}
            className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            {PROJECTS.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grid de projetos */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.items.map((project) => (
            <Link
              key={project.slug}
              href={`/projetos/${project.slug}`}
              className="group block"
            >
              {/* Placeholder colorido */}
              <div className="border-border bg-surface relative aspect-[4/3] overflow-hidden rounded-lg border transition-colors group-hover:border-accent">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-editorial text-muted/40 text-8xl transition-colors group-hover:text-accent/60">
                    {project.initial}
                  </span>
                </div>
              </div>

              {/* Info do projeto */}
              <div className="mt-4">
                <h3 className="font-display text-foreground group-hover:text-accent text-lg font-bold tracking-tight transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted mt-1 text-sm">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}