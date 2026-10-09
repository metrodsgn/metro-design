import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getAllCases } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Projetos — Metro Design",
  description:
    "Conheça os projetos de branding, comunicação e audiovisual que a Metro Design já realizou.",
};

export default async function ProjetosPage() {
  const cases = await getAllCases();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          Jobs
        </span>

        <h1 className="font-editorial text-foreground mt-4 max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl">
          Projetos.
        </h1>

        <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
          Uma seleção de marcas que ajudamos a construir, reposicionar e
          comunicar.
        </p>

        {cases.length === 0 ? (
          <p className="text-muted mt-16 text-center text-sm">
            Nenhum case cadastrado ainda.
          </p>
        ) : (
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
        )}
      </Container>
    </section>
  );
}