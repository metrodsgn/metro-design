import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getAllCases } from "@/sanity/lib/fetchers";

export async function ProjetosSelecionados() {
  const cases = await getAllCases();

  return (
    <section id="jobs" className="py-24 md:py-32">
      <Container>
        {/* Cabeçalho */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                Jobs
              </span>
              <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
                Projetos selecionados.
              </h2>
            </div>

            <Link
              href="/projetos"
              className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              Ver mais cases
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Grid de projetos */}
        {cases.length === 0 ? (
          <p className="text-muted mt-16 text-center text-sm">
            Nenhum case cadastrado ainda.
          </p>
        ) : (
          <Reveal delay={0.15}>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  slug={project.slug}
                  category={project.category}
                  cover={project.cover}
                />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}