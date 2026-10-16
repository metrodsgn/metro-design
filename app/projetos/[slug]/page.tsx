import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProjectTransitionCard } from "@/components/sections/ProjectTransitionCard";
import { getAllCases, getCaseBySlug } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";
import { createSiteMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseBySlug(slug);

  if (!project) {
    return createSiteMetadata({
      title: "Projeto não encontrado — Metro Design",
      description: "Este projeto não foi encontrado no portfólio da Metro Design.",
      path: `/projetos/${slug}`,
    });
  }

  return createSiteMetadata({
    title: `${project.title} — Metro Design`,
    description: `${project.client} · ${project.category} · ${project.year}`,
    path: `/projetos/${project.slug}`,
  });
}

export default async function ProjetoPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, allCases] = await Promise.all([
    getCaseBySlug(slug),
    getAllCases(),
  ]);

  if (!project) {
    notFound();
  }

  const projectIndex = allCases.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? allCases[projectIndex - 1] : null;
  const nextProject = projectIndex >= 0 ? allCases[projectIndex + 1] : null;
  const projectImages = [
    ...(project.cover
      ? [
          {
            src: urlFor(project.cover).width(1920).fit("max").url(),
            alt: `${project.client} — ${project.title}`,
            width: project.coverDimensions?.width ?? 1200,
            height: project.coverDimensions?.height ?? 900,
          },
        ]
      : []),
    ...(project.gallery ?? []).map((image, index) => ({
      src: urlFor(image).width(1800).quality(85).fit("max").url(),
      alt: `${project.client} — ${project.title}, imagem ${index + 1}`,
      width: image.dimensions?.width ?? 1200,
      height: image.dimensions?.height ?? 900,
    })),
  ];

  return (
    <article className="bg-[#0a0a0a] pb-16 text-[#f5f5f5] md:pb-24">
      <Container>
        <header className="mx-auto max-w-5xl pt-12 text-center sm:pt-16 md:pt-20">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight font-normal tracking-[0.04em] break-words">
            {project.title}
          </h1>
          {project.description && project.description.length > 0 && (
            <div className="mx-auto mt-6 max-w-4xl space-y-5 text-sm leading-relaxed font-light break-words text-white/55 sm:text-base md:mt-8 md:text-lg">
              <PortableText value={project.description} />
            </div>
          )}
        </header>

        <ProjectGallery
          title={`${project.client} — ${project.title}`}
          images={projectImages}
        />

        <div className="mx-auto max-w-6xl">
          <section
            id="proximo-projeto"
            aria-label="Navegação entre projetos"
            className="project-navigation scroll-mt-36 pt-8 md:pt-10"
          >
            {(previousProject || nextProject) && (
              <div className="project-navigation__links">
                {previousProject && (
                  <ProjectTransitionCard
                    project={previousProject}
                    direction="previous"
                  />
                )}
                {nextProject && (
                  <ProjectTransitionCard project={nextProject} direction="next" />
                )}
              </div>
            )}
          </section>
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl justify-center sm:justify-start">
          <Link href="/projetos" className="project-back-button">
            <span className="project-back-button__circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="project-back-button__text">Todos os projetos</span>
          </Link>
        </div>
      </Container>
    </article>
  );
}
