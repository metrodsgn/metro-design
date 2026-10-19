import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllCases } from "@/sanity/lib/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let cases: Awaited<ReturnType<typeof getAllCases>> = [];

  try {
    cases = await getAllCases();
  } catch (error) {
    console.error("Não foi possível carregar os projetos para o sitemap:", error);
  }

  const staticRoutes = ["", "/sobre", "/projetos", "/contato", "/privacidade"];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, SITE.url).toString(),
    })),
    ...cases
      .filter((project) => project.slug)
      .map((project) => ({
        url: new URL(`/projetos/${project.slug}`, SITE.url).toString(),
      })),
  ];
}
