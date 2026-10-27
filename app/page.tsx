import { Hero } from "@/components/sections/Hero";
import HeroScrollAnimation from "@/components/ui/hero-scroll-animation";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { FaixaTexto } from "@/components/sections/FaixaTexto";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { getAllCases, getFeaturedCases, type CaseListItem } from "@/sanity/lib/fetchers";

// Home curta: Hero → Projetos selecionados → Depoimentos → faixa → CTA.
export default async function Home() {
  const [allCases, featuredCases] = await Promise.all([
    getAllCases(),
    getFeaturedCases(),
  ]);

  const featuredIds = new Set(featuredCases.map((item) => item._id));
  const rest = allCases.filter((item) => !featuredIds.has(item._id));
  const projects: CaseListItem[] = [...featuredCases, ...rest].slice(0, 4);

  return (
    <>
      <Hero />
      <HeroScrollAnimation projects={projects} />
      <Depoimentos />
      <FaixaTexto />
      <CtaFinal />
    </>
  );
}
