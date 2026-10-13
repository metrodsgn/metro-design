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
    <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32">
      <Container>
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          Jobs
        </span>

        <h1 className="font-editorial text-foreground mt-4 max-w-3xl text-[clamp(2.75rem,10vw,4rem)] leading-[1.02] tracking-tight md:text-6xl">
          Projetos.
        </h1>

        <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:mt-6 md:text-lg">
          Uma seleção de marcas que ajudamos a construir, reposicionar e
          comunicar.
        </p>

        {cases.length === 0 ? (
          <p className="text-muted mt-16 text-center text-sm">
            Nenhum case cadastrado ainda.
          </p>
        ) : (
          <div className="mt-10 grid gap-x-5 gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-y-12 lg:mt-16 lg:grid-cols-3 lg:gap-y-14">
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
