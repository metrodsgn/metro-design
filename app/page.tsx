import { Hero } from "@/components/sections/Hero";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { Reel } from "@/components/sections/Reel";
import { Metrus } from "@/components/sections/Metrus";
import { ProjetosSelecionados } from "@/components/sections/ProjetosSelecionados";
import { Clientes } from "@/components/sections/Clientes";

export default function Home() {
  return (
    <>
      <Hero />
      <Somos />
      <Fazemos />
      <Reel />
      <Metrus />
      <ProjetosSelecionados />
      <Clientes />
    </>
  );
}