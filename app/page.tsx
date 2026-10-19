import { Hero } from "@/components/sections/Hero";
import { Metrus } from "@/components/sections/Metrus";
import { ProjetosSelecionados } from "@/components/sections/ProjetosSelecionados";
import { FaixaTexto } from "@/components/sections/FaixaTexto";
import { CtaFinal } from "@/components/sections/CtaFinal";

// Home curta: Hero → Projetos selecionados → Metrus → faixa → CTA.
// Somos, Fazemos, AntesDepois, Clientes e Depoimentos migraram para /sobre.
export default function Home() {
  return (
    <>
      <Hero />
      <ProjetosSelecionados />
      <Metrus />
      <FaixaTexto />
      <CtaFinal />
    </>
  );
}
