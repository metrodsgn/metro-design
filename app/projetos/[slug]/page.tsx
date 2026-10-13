import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { getAllCases, getCaseBySlug } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado — Metro Design" };
  }

  return {
    title: `${project.title} — Metro Design`,
    description: `${project.client} · ${project.category} · ${project.year}`,
  };
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

  return (
    <article className="bg-[#0a0a0a] pt-8 pb-20 text-[#f5f5f5] md:pt-12 md:pb-28">
      <Container>
        <div className="flex items-center justify-between gap-6 border-b border-white/15 pb-5">
          <Link
            href="/projetos"
            className="inline-flex min-h-10 items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> Todos os projetos
          </Link>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/65 uppercase">
            {project.category} <span className="px-1">/</span> {project.year}
          </span>
        </div>

        <header className="grid gap-8 pt-12 pb-12 md:pt-20 md:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
              {project.client}
            </p>
            <h1 className="font-display mt-5 max-w-5xl text-[clamp(3.25rem,8vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.065em]">
              {project.title}
            </h1>
          </div>

          {project.description && project.description.length > 0 && (
            <div className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg lg:pb-2">
              <PortableText value={project.description} />
            </div>
          )}
        </header>

        {project.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141414]">
            <Image
              src={urlFor(project.cover).width(1920).height(1080).url()}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {project.services && project.services.length > 0 && (
          <div className="flex flex-col gap-5 border-b border-white/15 py-8 md:flex-row md:items-center md:justify-between">
            <h2 className="text-sm font-medium">Serviços</h2>
            <ul className="flex flex-wrap gap-2">
              {project.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/65"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section
            className="mt-14 md:mt-20"
            aria-label={`Galeria de ${project.title}`}
          >
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                Galeria
              </h2>
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/65">
                {String(project.gallery.length).padStart(2, "0")} IMAGENS
              </span>
            </div>
            <div className="grid items-start gap-5 md:grid-cols-2 md:gap-8">
              {project.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden bg-[#141414]">
                  <Image
                    src={urlFor(image).width(1600).quality(85).url()}
                    alt={`${project.title} — imagem ${index + 1}`}
                    width={image.dimensions?.width ?? 1200}
                    height={image.dimensions?.height ?? 900}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="block h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <nav
          aria-label="Navegação entre cases"
          className="mt-20 grid border-y border-white/15 sm:grid-cols-2"
        >
          {previousProject ? (
            <Link
              href={`/projetos/${previousProject.slug}`}
              className="group border-b border-white/15 py-7 sm:border-r sm:border-b-0 sm:pr-8"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/65 uppercase">
                ← Anterior
              </span>
              <span className="group-hover:text-accent mt-3 block text-xl transition-colors">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              href={`/projetos/${nextProject.slug}`}
              className="group py-7 text-left sm:pl-8 sm:text-right"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/65 uppercase">
                Próximo →
              </span>
              <span className="group-hover:text-accent mt-3 block text-xl transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>
    </article>
  );
}
