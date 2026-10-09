import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { getCaseBySlug } from "@/sanity/lib/fetchers";
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
  const project = await getCaseBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <Link
          href="/projetos"
          className="text-muted hover:text-accent inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <span aria-hidden="true">←</span>
          Voltar para projetos
        </Link>

        <header className="mt-12">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            {project.category}
          </span>

          <h1 className="font-editorial text-foreground mt-4 max-w-4xl text-4xl leading-tight tracking-tight md:text-6xl">
            {project.title}
          </h1>

          <dl className="border-border mt-8 grid grid-cols-2 gap-6 border-y py-6 md:grid-cols-3">
            <div>
              <dt className="text-muted text-xs font-medium tracking-widest uppercase">
                Cliente
              </dt>
              <dd className="text-foreground mt-2 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs font-medium tracking-widest uppercase">
                Categoria
              </dt>
              <dd className="text-foreground mt-2 text-sm">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="text-muted text-xs font-medium tracking-widest uppercase">
                Ano
              </dt>
              <dd className="text-foreground mt-2 text-sm">{project.year}</dd>
            </div>
          </dl>
        </header>

        {project.cover && (
          <div className="border-border relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-lg border">
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

        {project.description && project.description.length > 0 && (
          <div className="text-foreground mt-16 max-w-3xl space-y-4 text-base leading-relaxed md:text-lg">
            <PortableText value={project.description} />
          </div>
        )}

        {project.services && project.services.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Serviços
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <li
                  key={service}
                  className="border-border bg-surface text-muted rounded-full border px-4 py-2 text-xs"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Galeria
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="border-border relative aspect-[4/3] overflow-hidden rounded-lg border"
                >
                  <Image
                    src={urlFor(image).width(1200).height(900).url()}
                    alt={`${project.title} — imagem ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-border mt-24 border-t pt-12">
          <h2 className="font-editorial text-foreground max-w-2xl text-2xl leading-tight tracking-tight md:text-4xl">
            Quer algo parecido para a sua marca?
          </h2>
          <Link
            href="/contato"
            className="bg-foreground text-background hover:bg-accent hover:text-foreground mt-8 inline-flex min-h-12 items-center rounded-md px-6 text-sm font-medium transition-colors"
          >
            Fale conosco
          </Link>
        </div>
      </Container>
    </article>
  );
}
