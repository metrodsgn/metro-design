import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { buildProjectDetail } from "@/lib/project-detail";
import { getAllCases, getCaseBySlug } from "@/sanity/lib/fetchers";
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
      description:
        "Este projeto não foi encontrado no portfólio da Metro Design.",
      path: `/projetos/${slug}`,
    });
  }

  return createSiteMetadata({
    title: `${project.title.trim()} — Metro Design`,
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

  return (
    <ProjectDetail
      key={project.slug}
      project={buildProjectDetail(project, allCases)}
    />
  );
}
