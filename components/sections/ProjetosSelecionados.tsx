import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getAllCases } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export async function ProjetosSelecionados() {
  const cases = await getAllCases();

  return (
    <section id="jobs" className="py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-white/70 pb-5">
            <h2 className="text-foreground font-sans text-base font-medium tracking-normal md:text-lg">
              Projetos selecionados
            </h2>
            <Link
              href="/projetos"
              className="text-foreground/80 hover:text-accent inline-flex min-h-8 shrink-0 items-center gap-2 font-sans text-sm transition-colors"
            >
              Ver todos <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>

        {cases.length === 0 ? (
          <p className="text-muted mt-16 text-center text-sm">
            Nenhum case cadastrado ainda.
          </p>
        ) : (
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-y-24">
              {cases.map((project, index) => (
                <Link
                  key={project._id}
                  href={`/projetos/${project.slug}`}
                  aria-label={`Ver case ${project.title}`}
                  className={`group focus-visible:outline-accent relative block overflow-hidden bg-[#101010] focus-visible:outline-2 focus-visible:outline-offset-4 ${index % 3 === 1 ? "lg:mt-2" : index % 3 === 2 ? "lg:mt-0" : ""}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    {project.cover ? (
                      <Image
                        src={urlFor(project.cover)
                          .width(1000)
                          .height(1000)
                          .quality(85)
                          .url()}
                        alt={project.title}
                        fill
                        preload={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    ) : (
                      <div className="font-editorial text-foreground/30 flex h-full items-center justify-center text-8xl">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/55 group-focus-visible:bg-black/55">
                      <div className="translate-y-2 px-5 text-center opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <span className="font-sans text-xl font-medium text-white md:text-2xl">
                          {project.title}
                        </span>
                        <span className="mt-2 block font-sans text-xs text-white/75">
                          {project.category} <span className="px-1">/</span>{" "}
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
