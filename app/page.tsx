import { Hero } from "@/components/sections/Hero";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { AntesDepois } from "@/components/sections/AntesDepois";
import { Metrus } from "@/components/sections/Metrus";
import { ProjetosSelecionados } from "@/components/sections/ProjetosSelecionados";
import { Clientes } from "@/components/sections/Clientes";
import { FaixaTexto } from "@/components/sections/FaixaTexto";
import { Depoimentos } from "@/components/sections/Depoimentos";

export default function Home() {
  return (
    <>
      <Hero />
      <Somos />
      <Fazemos />
      <AntesDepois />
      <Metrus />
      <ProjetosSelecionados />
      <Clientes />
      <FaixaTexto />
      <Depoimentos />
    </>
  );
}
